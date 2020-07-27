import React from 'react'
import {getNoticeList} from "../apis/api";
import NoticeListView from "../components/NoticeListView";
import styles from '../app.module.css'
import {Helmet} from "react-helmet/es/Helmet";
const ReactGA = require('react-ga');

class PostNotice extends React.Component {

    state = {
        notice_list: [],
    }

    async componentDidMount() {
        ReactGA.initialize('UA-158814088-1'); 
        ReactGA.pageview(window.location.pathname+window.location.search);
        
        const notice_list = await getNoticeList()
        this.setState({notice_list})
    }

    render() {
        return (
            <div className={styles.contentContainer}>
                <div>
                    <Helmet>
                        <title>두드림퀵: 공지사항</title>
                        <meta 
                            name="description"
                            content="두드림퀵 지하철 퀵서비스 공지사항" />
                        <link rel="canonical" href="https://dodreamquick.com/post/notice" />
                    </Helmet>
                </div>
                <div className={styles.pageTitle}>공지사항</div>
                <div>
                    <NoticeListView notice_list={this.state.notice_list}/>
                </div>
            </div>

        )
    }
}

export default PostNotice
