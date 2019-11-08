import React from 'react'
import {addOrder, makeOrderPaid, validateIMPPayment} from "../apis/api";
import OrderForm from "../components/OrderForm";
import styles from "../app.module.css"


class Order extends React.Component {

    make_order = async order_data => {
        await this.request_pay(order_data)
    }

    request_pay = order_data => {
        let IMP = window.IMP
        IMP.init('imp38282929') // 가맹점 식별코드
        IMP.request_pay({
            pg : 'html5_inicis',
            pay_method : 'card',
            merchant_uid : 'merchant_' + new Date().getTime(),
            name : '두드림퀵 배송 주문',
            amount : order_data.price,
            buyer_name : order_data.sender_name, // TODO: or username
            buyer_tel : order_data.sender_phone, // TODO: or user phone
            buyer_email: ''
        }, async response => {
            if (response.success) {
                const validated = await validateIMPPayment(response.imp_uid, order_data.price)
                if (validated === -2) {
                    alert("결제 승인 상태 확인에 실패했습니다. 두드림퀵 팀에 문의해주세요.")
                    return -1
                } else if (validated === -1) {
                    alert("결제 요청 금액과 실 결제 금액이 일치하지 않습니다. 두드림퀵 팀에 문의해주세요.")
                    return -1
                } else if (validated === 1) {
                    if (true) {
                        const order = await addOrder({...order_data})
                        await makeOrderPaid(order.id)
                        this.props.history.push("/order/complete")
                    } else {
                        // TODO: Add amount to the user's deposit
                        return 1
                    }
                } else {
                    alert("오류가 발생했습니다.")
                    return -1
                }
            } else {
                alert("결제에 실패했습니다. 오류 메시지: " + response.error_msg)
                return -1
            }
        })
    }

    render() {
        return (
            <div className={styles.contentContainer}>
                <div className={styles.orderCautionContainer}>
                    <div className={styles.orderCautionTitle}>
                        배송 신청 전 주의사항
                    </div>
                    <div className={styles.orderCautionContent}>
                        <div className={styles.orderCautionItem}>
                            <div className={styles.orderCautionItemTitle}>
                                예약 주문 불가
                            </div>
                            <div className={styles.orderCautionItemText}>
                                두드림퀵은 <span>예약 주문을 받지 않습니다.</span>
                            </div>
                        </div>

                        <div className={styles.orderCautionItem}>
                            <div className={styles.orderCautionItemTitle}>
                                주문 접수 가능 시간
                            </div>
                            <div className={styles.orderCautionItemText}>
                                주문 접수 가능 시간은 <span>월-금요일 오전 9시-오후 6시</span>입니다. (토, 일요일/공휴일 휴무)
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

export default Order