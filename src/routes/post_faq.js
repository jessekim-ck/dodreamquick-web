import React from 'react'
import {getFAQList} from "../apis/api";
import styles from '../app.module.css'
import FAQListView from "../components/FAQListView";
import {Helmet} from "react-helmet/es/Helmet";


class PostFAQ extends React.Component {

    state = {
        FAQ_list: [],
    }

    async componentDidMount() {
        const FAQ_list = await getFAQList()
        this.setState({FAQ_list})
    }

    render() {
        return (
            <div className={styles.contentContainer}>
                <div>
                    <Helmet>
                        <title>두드림퀵: 자주 묻는 질문</title>
                    </Helmet>
                </div>
                <div className={styles.pageTitle}>자주 묻는 질문</div>
                <FAQListView FAQ_list={this.state.FAQ_list} />
            </div>

        )
    }
}

export default PostFAQ
