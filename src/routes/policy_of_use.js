import React from "react"
import policies from '../policies'
import Form from "react-bootstrap/Form";


const PolicyOfUse = () => {

    return (
        <div>
            <h3>이용 약관</h3>
            <br/>
            <div>
                <Form.Control as="textarea" rows="30" value={policies.personal_information_offer} readOnly />
            </div>
        </div>
    )
}

export default PolicyOfUse
