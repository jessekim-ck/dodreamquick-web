import React from 'react'
import SearchCostForm from '../components/SearchCostForm'
import styles from "../app.module.css"
import {Helmet} from "react-helmet/es/Helmet";
import ReactGA from "react-ga";


const SearchCost = () => {
    return (
        <div className={styles.contentContainer}>
            <div>
                <Helmet>
                    <title>두드림퀵: 배송 요금 조회</title>
                    <meta 
                            name="description"
                            content="두드림퀵 지하철 퀵서비스 배송 요금 조회" />
                    <link rel="canonical" href="https://dodreamquick.com/price" />
                </Helmet>
            </div>
            <SearchCostForm />
        </div>
    )
}

export default SearchCost