import React from "react"
import Form from "react-bootstrap/Form";
import styles from "../app.module.css"
import {Helmet} from "react-helmet/es/Helmet";
import {getPolicy} from "../apis/api"


class PolicyOfUse extends React.Component {

    state = {
        terms_of_use: ""
    }

    async componentDidMount() {
        const policies = await getPolicy()
        const terms_of_use = await policies.terms_of_use
        this.setState({terms_of_use})
    }

    render() {
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
                    <Form.Control as="textarea" rows="30" value={this.state.terms_of_use} readOnly />
                </div>
            </div>
        )
    }

    
}

export default PolicyOfUse
