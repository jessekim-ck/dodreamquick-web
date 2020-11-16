import React from 'react'
import styles from "../app.module.css"
import {Helmet} from "react-helmet/es/Helmet";
import queryString from "query-string"
import {completeOrderPayment, validateIMPPayment} from "../apis/api";

class OrderComplete extends React.Component {

    state = {
        vbank: null
    }

    async componentDidMount() {
        if (this.props.location.state && this.props.location.state.detail) {
            this.setState({vbank: this.props.location.state.detail})
        }

        setTimeout(() => {
            window.scrollTo({top: 0});
        }, 300)
        if (this.props.match.params.id) {
            const order_id = this.props.match.params.id
            const order_price = this.props.match.params.price
            const query = queryString.parse(this.props.location.search)

            if (query.imp_success) {
                // Validate IMP payment: it should be "paid" and the amount should be consistent
                try {
                    const validated = await validateIMPPayment(query.imp_uid, order_price)

                    if (validated.status === 'ready') {
                        // await completeOrderPayment(order_id, order_price)
                        this.props.history.push({
                            pathname: '/order/complete',
                            state: {detail: validated}
                        })
                    } else if (validated.status !== 'paid') {
                        alert("결제 승인이 완료되지 않았습니다. 두드림퀵 팀에 문의해주세요.")
                        return -1
                    } else if (Number(order_price) !== Number(validated.amount)) {
                        alert("결제 요청 금액과 실 결제 금액이 일치하지 않습니다. 두드림퀵 팀에 문의해주세요.")
                        return -1
                    } else {
                        await completeOrderPayment(order_id, order_price)
                        alert("결제가 완료되었습니다!")
                        this.props.history.push("/order/complete")
                    }
                } catch (e) {
                    alert("오류가 발생했습니다. 두드림퀵 팀에 문의해주세요.")
                    console.error(e)
                    return -1
                }
            } else {
                alert("결제에 실패했습니다.")
                return -1
            }
        }
    }

    render() {
        const {vbank} = this.state
        return vbank ? (
            <div className={styles.contentContainer}>
                <div>
                    <Helmet>
                        <title>두드림퀵: 접수 완료</title>
                    </Helmet>
                </div>
                <div className={styles.orderComplete}>
                    <div className={styles.orderCompleteTitle}>
                        접수가 완료되었습니다.<br/>입금 확인 후 배송이 시작됩니다.
                    </div>
                    <div className={styles.orderCompleteText}>
                        <table className={styles.orderCompleteTable}>
                            <tr>
                                <td className="title">입금금액</td>
                                <td>{vbank.amount.toLocaleString()}원</td>
                            </tr>
                            <tr>
                                <td className="title">입금은행</td>
                                <td>{vbank.vbank_name}</td>
                            </tr>
                            <tr>
                                <td className="title">계좌번호</td>
                                <td>{vbank.vbank_num}</td>
                            </tr>
                        </table>
                        {/*<p>배송 현황은 카카오톡 알림톡으로 전달드립니다.</p>*/}
                        <p>주문 확인 및 변경을 원하실 경우 두드림퀵 카카오채널로 문의 부탁드립니다.</p>
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
        ) : (
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
                        <p>고객님의 물품을 신속하고 안전하게 배달하겠습니다.</p>
                        <p>배송 현황은 카카오톡 알림톡으로 전달드립니다.</p>
                        <p>주문 확인 및 변경을 원하실 경우 두드림퀵 카카오채널로 문의 부탁드립니다.</p>
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
