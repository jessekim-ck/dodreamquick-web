import React from 'react'
import {getFAQList} from "../apis/api";
import styles from '../app.module.css'
import FAQListView from "../components/FAQListView";
import {Helmet} from "react-helmet/es/Helmet";
import { connect } from 'react-redux';


class PostFAQ extends React.Component {

    state = {
        FAQ_list: [],
    }

    async componentDidMount() {
        const FAQ_list = await getFAQList()
        this.setState({FAQ_list})
    }

    render() {
        console.log(this.props.id)
        return (
            <div className={styles.contentContainer}>
                <div>
                    <Helmet>
                        <title>두드림퀵: 자주 묻는 질문</title>
                        <meta 
                            name="description"
                            content="두드림퀵 지하철 퀵서비스 자주 묻는 질문" />
                        <link rel="canonical" href="https://dodreamquick.com/post/faq" />
                    </Helmet>
                </div>
                <div className={styles.pageTitle}>자주 묻는 질문</div>
                <FAQListView FAQ_list={this.state.FAQ_list} />
            </div>

        )
    }
}


const mapStateToProps = state => state.user

export default connect(mapStateToProps)(PostFAQ)
