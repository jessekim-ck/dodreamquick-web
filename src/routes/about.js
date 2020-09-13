import React from "react"
import {Helmet} from "react-helmet/es/Helmet";
import styles from "../app.module.css";
import {baseURL} from "../apis/config";
import {getResource} from "../apis/api";
import {connect} from "react-redux";

const ReactGA = require('react-ga');

class About extends React.Component {

    state = {
        selectedTab: 0,
        resource: null,
    }

    async componentDidMount() {
        ReactGA.initialize('UA-158814088-1');
        ReactGA.pageview(window.location.pathname + window.location.search);

        const resource = await getResource(1)
        this.setState({resource})
    }

    render() {
        const {resource} = this.state
        return (
            <div>
                <div>
                    <Helmet>
                        <title>두드림퀵: 회사소개</title>
                        <meta
                            name="description"
                            content="두드림퀵 회사소개"/>
                        <link rel="canonical" href="https://dodreamquick.com/about"/>
                    </Helmet>
                </div>
                <div className={[styles.contentContainer, styles.aboutContainer].join(' ')}>
                    {resource ? <img className={styles.aboutImg} src={`${baseURL}${resource.image}`} alt="두드림퀵 지하철 퀵서비스 회사소개"/> : null}
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => state.user

export default connect(mapStateToProps)(About)
