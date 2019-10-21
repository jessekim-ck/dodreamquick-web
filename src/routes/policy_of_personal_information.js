import React from "react"
import policies from '../policies'
import Form from "react-bootstrap/Form";


const PolicyOfPersonalInformation = () => {

    return (
        <div>
            <h3>개인정보 처리 방침</h3>
            <br/>
            <div>
                <Form.Control as="textarea" rows="30" value={policies.personal_information_collection} readOnly />
            </div>
        </div>
    )
}

export default PolicyOfPersonalInformation
