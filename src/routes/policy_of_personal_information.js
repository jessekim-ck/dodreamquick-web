import React from "react"
import Form from "react-bootstrap/Form";
import styles from "../app.module.css"
import {Helmet} from "react-helmet/es/Helmet";
import {getPolicy} from "../apis/api"


class PolicyOfPersonalInformation extends React.Component {

    state = {
        personal_information: ""
    }

    async componentDidMount() {
        const policies = await getPolicy()
        const personal_information = await policies.personal_information
        this.setState({personal_information})
    }

    render() {
        return (
            <div className={styles.contentContainer}>
                <div>
                    <Helmet>
                        <title>두드림퀵: 개인정보 처리 방침</title>
                    </Helmet>
                </div>
                <h3>개인정보 처리 방침</h3>
                <br/>
                <div>
                    <Form.Control as="textarea" rows="30" value={this.state.personal_information} readOnly />
                </div>
            </div>
        )
    }
}

export default PolicyOfPersonalInformation
