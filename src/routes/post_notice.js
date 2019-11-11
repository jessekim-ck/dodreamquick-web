import React from 'react'
import {getNoticeList} from "../apis/api";
import NoticeListView from "../components/NoticeListView";
import styles from '../app.module.css'
import {Helmet} from "react-helmet/es/Helmet";


class PostNotice extends React.Component {

    state = {
        notice_list: [],
    }

    async componentDidMount() {
        const notice_list = await getNoticeList()
        this.setState({notice_list})
    }

    render() {
        return (
            <div className={styles.contentContainer}>
                <div>
                    <Helmet>
                        <title>두드림퀵: 공지사항</title>
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
