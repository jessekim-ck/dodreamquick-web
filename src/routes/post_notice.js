import React from 'react'
import {getNoticeList} from "../apis/api";
import NoticeListView from "../components/NoticeListView";
import styles from '../app.module.css'


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
                <div className={styles.label}>
                    <div className={styles.title}>공지사항</div>
                </div>
                <div>
                    <NoticeListView notice_list={this.state.notice_list}/>
                </div>
            </div>

        )
    }
}

export default PostNotice
