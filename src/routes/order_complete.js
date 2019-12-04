import React from 'react'
import styles from "../app.module.css"
import {Helmet} from "react-helmet/es/Helmet";
import queryString from "query-string"
import {completeOrderPayment, validateIMPPayment} from "../apis/api";

class OrderComplete extends React.Component {

    async componentDidMount() {

        if (this.props.match.params.id) {
            const order_id = this.props.match.params.id
            const order_price = this.props.match.params.price
            const query = queryString.parse(this.props.location.search)

            if (query.imp_success) {
                // Validate IMP payment: it should be "paid" and the amount should be consistent
                const validated = await validateIMPPayment(query.imp_uid, order_price)

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
                    await completeOrderPayment(order_id, order_price)
                    alert("결제가 완료되었습니다!")
                    this.props.history.push("/order/complete")
                // Unknown error
                } else {
                    alert("오류가 발생했습니다. 두드림퀵 팀에 문의해주세요.")
                    return -1
                }
            } else {
                alert("결제에 실패했습니다.")
                return -1
            }
        }
    }

    render() {
        return (
            <div className={styles.contentContainer}>
                <div>
                    <Helmet>
                        <title>두드림퀵: 배송 완료</title>
                    </Helmet>
                </div>
                <div className={styles.orderComplete}>
                    <div className={styles.orderCompleteTitle}>
                        배송 접수가 완료되었습니다.
                    </div>
                    <div className={styles.orderCompleteText}>
                        고객님의 물품을 신속하고 안전하게 배달하겠습니다.
                        배송 현황은 카카오톡 알림톡으로 전달드립니다.
                    </div>
                    <div className={styles.orderCompleteCTA}>
                        <a href="/">
                            <button className={styles.CTAGreen}>
                                홈으로
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderComplete