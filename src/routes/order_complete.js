import React from 'react'
import styles from "../app.module.css"
import {Helmet} from "react-helmet/es/Helmet";


const OrderComplete = () => {
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
                    <a href="https://pf.kakao.com/_jSPaj" target="_blank" rel="noopener noreferrer">
                        <button className={styles.CTAYellow}>
                            문의하기
                        </button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default OrderComplete