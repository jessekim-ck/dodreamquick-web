import React from 'react'
import {addOrder, completeOrderPayment, getSetting, validateIMPPayment} from "../apis/api";
import OrderForm from "../components/OrderForm";
import styles from "../app.module.css"
import {Helmet} from "react-helmet/es/Helmet";
import {connect} from "react-redux";
import {get_setting} from "../redux/actions/common_actions";



const ReactGA = require('react-ga');
const caution_calendar = require("../assets/caution_calendar.png");
const caution_clock = require("../assets/caution_clock.png");


class Order extends React.Component {

    state = {
        is_opened: false
    }

    async componentDidMount() {
        ReactGA.initialize('UA-158814088-1');
        ReactGA.pageview(window.location.pathname + window.location.search);

        const setting = await getSetting()
        await this.props.dispatch(get_setting(setting))

        if (setting) {
            this.setIsOpen(setting);
        }
    }

    setIsOpen = (setting) => {
        const now = new Date();
        const open = new Date();
        const close = new Date();
        const current_day = now.getDay();

        let close_message = setting.order_close_message === '' ? null : setting.order_close_message

        open.setHours(Number(setting.order_open_time.slice(0, 2)), Number(setting.order_open_time.slice(3, 5)), 0)
        close.setHours(Number(setting.order_close_time.slice(0, 2)), Number(setting.order_close_time.slice(3, 5)), 0)

        if (setting.order_never_open) {
            this.setState({ is_opened: false });
            alert(close_message || "죄송합니다. 내부사정으로 인해 잠시 주문접수를 중단합니다.");
            this.props.history.goBack();
            return;
        } else if (setting.order_open_company_user && this.props.role === 'CO') {
        } else if (current_day === 6 || current_day === 0) {
            this.setState({ is_opened: false });
            alert(close_message || "공휴일 및 주말에는 주문이 불가능합니다 :) 평일에 찾아주세요!");
            this.props.history.goBack();
            return;
        } else if (now < open || now > close) {
            this.setState({ is_opened: false });
            alert(close_message || "주문이 불가능한 시간입니다!두드림퀵 배송 신청은 오전 9시부터 오후 5시까지입니다.");
            this.props.history.goBack();
            return;
        }
        this.setState({ is_opened: true });
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
        const dueDateMonth = (new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1
        const dueDateDate = new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()
        await IMP.request_pay({
            pg : 'html5_inicis',
            pay_method : order_data.pay_method,
            merchant_uid : 'merchant_' + new Date().getTime(),
            name : '두드림퀵 배송 주문 (' + order.id + ')',
            amount : order_data.price,
            buyer_name : order_data.sender_name,
            buyer_tel : order_data.sender_phone,
            buyer_email: this.props.username,
            m_redirect_url: `https://dodreamquick.com/order/complete/${order.id}/${order_data.price}`,
            vbank_due: `${new Date().getFullYear()}${dueDateMonth}${dueDateDate}1730`
        }, async response => {
            if (response.success) {
                try {
                    const validated = await validateIMPPayment(response.imp_uid, order_data.price)

                    if (validated.status === 'ready') {
                        // await completeOrderPayment(order_id, order_price)
                        this.props.history.push({
                            pathname: '/order/complete',
                            state: { detail: validated }
                        })
                    } else if (validated.status !== 'paid') {
                        alert("결제 승인이 완료되지 않았습니다. 두드림퀵 팀에 문의해주세요.")
                        return -1
                    } else if (Number(order_data.price) !== Number(validated.amount)) {
                        alert("결제 요청 금액과 실 결제 금액이 일치하지 않습니다. 두드림퀵 팀에 문의해주세요.")
                        return -1
                    } else {
                        await completeOrderPayment(order.id, order_data.price)
                        alert("결제가 완료되었습니다!")
                        this.props.history.push("/order/complete")
                    }
                } catch (e) {
                    alert("오류가 발생했습니다. 두드림퀵 팀에 문의해주세요.")
                    console.error(e)
                    return -1
                }
            } else {
                alert("결제에 실패했습니다.\n오류 메시지: " + response.error_msg)
                return -1
            }
        })
    }

    render() {
        const { setting } = this.props;
        return this.state.is_opened && setting ? (
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
                                즉시 배송이 아니라 픽업 시간을 지정하시고 싶으신 경우 반드시 <span>카카오톡 채널을 통해 사전 문의 바랍니다.</span> 문의되지 않은 예약 주문은 정상 진행되지 않을 수 있으며, 사전 고지 없이 환불될 수 있습니다.
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
        ) : null
    }
}

const mapStateToProps = state => ({...state.common, ...state.user})

export default connect(mapStateToProps)(Order)
