import React from "react"
import policies from '../policies'
import Form from "react-bootstrap/Form";
import styles from "../app.module.css"
import {Helmet} from "react-helmet/es/Helmet";


const PolicyOfUse = () => {

    return (
        <div className={styles.contentContainer}>
            <div>
                <Helmet>
                    <title>두드림퀵: 이용 약관</title>
                </Helmet>
            </div>
            <h3>이용 약관</h3>
            <br/>
            <div>
                <Form.Control as="textarea" rows="30" value={policies.personal_information_offer} readOnly />
            </div>
        </div>
    )
}

export default PolicyOfUse
