import React from 'react'
import SearchCostForm from '../components/SearchCostForm'
import styles from "../app.module.css"
import {Helmet} from "react-helmet/es/Helmet";


const SearchCost = () => {
    return (
        <div className={styles.contentContainer}>
            <div>
                <Helmet>
                    <title>두드림퀵: 배송 요금 조회</title>
                </Helmet>
            </div>
            <SearchCostForm />
        </div>
    )
}

export default SearchCost