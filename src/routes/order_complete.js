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
            Order Completed!
        </div>
    )
}

export default OrderComplete