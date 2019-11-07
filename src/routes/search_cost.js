import React from 'react'
import SearchCostForm from '../components/SearchCostForm'
import styles from "../app.module.css"


const SearchCost = () => {
    return (
        <div className={styles.contentContainer}>
            <SearchCostForm />
        </div>
    )
}

export default SearchCost