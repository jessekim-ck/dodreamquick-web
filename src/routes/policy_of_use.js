import React from "react"
import policies from '../policies'
import Form from "react-bootstrap/Form";
import styles from "../app.module.css"


const PolicyOfUse = () => {

    return (
        <div className={styles.contentContainer}>
            <h3>이용 약관</h3>
            <br/>
            <div>
                <Form.Control as="textarea" rows="30" value={policies.personal_information_offer} readOnly />
            </div>
        </div>
    )
}

export default PolicyOfUse
