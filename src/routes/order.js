import React from 'react'
import {addOrder, completeOrderPayment, validateIMPPayment} from "../apis/api";
import OrderForm from "../components/OrderForm";
import styles from "../app.module.css"
import {Helmet} from "react-helmet/es/Helmet";
import {connect} from "react-redux";



const ReactGA = require('react-ga');
const caution_calendar = require("../assets/caution_calendar.png");
const caution_clock = require("../assets/caution_clock.png");


class Order extends React.Component {

    componentDidMount() {

        ReactGA.initialize('UA-158814088-1');
        ReactGA.pageview(window.location.pathname+window.location.search);
        const now = new Date();
        const current_hour = now.getHours();
        const current_day = now.getDay();

        alert("배송 가능한 택배원이 많지 않아 부득이하게 주문을 닫습니다. 정말 죄송합니다.");
        this.props.history.push("/");
        //alert("죄송합니다. 시스템 오류로 인해 잠시 주문접수를 중단합니다.")
        if (current_day === 6 || current_day === 0) {
            alert("공휴일 및 주말에는 주문이 불가능합니다 :) 평일에 찾아주세요!");
            this.props.history.push("/");
        }  else if (current_hour < 9 || current_hour > 16) {
            alert("주문 불가능한 시간입니다! 두드림퀵 배송 신청은 오전 9시부터 오후 5시까지입니다.");
            this.props.history.push("/");
        }
    }


    make_order = async order_data => {
        const is_company_user = this.props.role === 'CO'
        if (is_company_user) {
            if (!window.confirm('배송을 신청하시겠습니까?')) {
                return 0;
            }
        }
        const order = await addOrder({...order_data})
        if (order) {
            if (is_company_user) {
                await completeOrderPayment(order.id, order_data.price)
                this.props.history.push("/order/complete");
            } else {
                await this.request_pay(order_data, order)
                return 1;
            }
        }
    }

    request_pay = async (order_data, order) => {
        let IMP = window.IMP
        IMP.init('imp38282929') // 가맹점 식별코드
        await IMP.request_pay({
            pg : 'html5_inicis',
            pay_method : 'card',
            merchant_uid : 'merchant_' + new Date().getTime(),
            name : '두드림퀵 배송 주문 (' + order.id + ')',
            amount : order_data.price,
            buyer_name : order_data.sender_name,
            buyer_tel : order_data.sender_phone,
            buyer_email: this.props.username,
            m_redirect_url: `https://dodreamquick.com/order/complete/${order.id}/${order_data.price}`
        }, async response => {
            if (response.success) {
                // Validate IMP payment: it should be "paid" and the amount should be consistent
                const validated = await validateIMPPayment(response.imp_uid, order_data.price)

                // IMP payment status is not "paid"
                if (validated === -2) {
                    alert("결제 승인이 완료되지 않았습니다. 두드림퀵 팀에 문의해주세요.")
                    return -1
                // IMP payment amount is not consistent
                } else if (validated === -1) {
                    alert("결제 요청 금액과 실 결제 금액이 일치하지 않습니다. 두드림퀵 팀에 문의해주세요.")
                    return -1
                // Validation success
                } else if (validated === 1) {
                    await completeOrderPayment(order.id, order_data.price)
                    alert("결제가 완료되었습니다!")
                    this.props.history.push("/order/complete")
                // Unknown error
                } else {
                    alert("오류가 발생했습니다. 두드림퀵 팀에 문의해주세요.")
                    return -1
                }
            } else {
                alert("결제에 실패했습니다.\n오류 메시지: " + response.error_msg)
                return -1
            }
        })
    }

    render() {
        return (
            <div className={styles.contentContainer}>
                <Helmet>
                    <title>두드림퀵: 배송 신청</title>
                    <meta
                        name="description"
                        content="두드림퀵 지하철 퀵서비스 배송 신청" />
                    <link rel="canonical" href="https://dodreamquick.com/order" />
                </Helmet>
                <div className={styles.orderCautionContainer}>
                    <div className={styles.orderCautionTitle}>
                        배송 신청 전 주의사항
                    </div>
                    <div className={styles.orderCautionContent}>

                        <div className={styles.orderCautionItem}>
                            <div className={styles.orderCautionItemTitle}>
                                <img src={caution_calendar} width="30" height="30" style={{marginRight: 8}} alt=""/>
                                예약 주문 관련 안내
                            </div>
                            <div className={styles.orderCautionItemText}>
                                즉시 배송이 아니라 픽업 시간을 지정하시고 싶으신 경우 반드시 <span>사전 문의 바랍니다.</span>
                            </div>
                        </div>

                        <div className={styles.orderCautionItem}>
                            <div className={styles.orderCautionItemTitle}>
                                <img src={caution_clock} width="30" height="30" style={{marginRight: 8}} alt=""/>
                                주문 가능 시간
                            </div>
                            <div className={styles.orderCautionItemText}>
                                주문 가능 시간은 <span>월-금요일 오전 9시~오후 5시</span>입니다.
                                <br/>
                                (주말 및 공휴일 휴무)
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.orderFormContainer}>
                    <div className={styles.orderFormTitle}>배송 신청</div>
                    <OrderForm make_order={this.make_order}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state.user

export default connect(mapStateToProps)(Order)
