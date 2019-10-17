import React from 'react'
import {getFAQList, getNoticeList} from "../apis/api";
import NoticeListView from "../components/NoticeListView";
import FAQListView from "../components/FAQListView";


class Post extends React.Component {

    state = {
        notice_list: [],
        FAQ_list: [],
        show_notice: true
    }

    async componentDidMount() {
        const notice_list = await getNoticeList()
        const FAQ_list = await getFAQList()
        this.setState({notice_list, FAQ_list})
    }

    render() {
        return (
            <div>
                <div>
                    <div onClick={() => this.setState({show_notice: true})}>공지사항</div>
                    <div onClick={() => this.setState({show_notice: false})}>자주 묻는 질문</div>
                </div>
                <div>
                    {
                        this.state.show_notice ?
                            <NoticeListView notice_list={this.state.notice_list}/>:
                            <FAQListView FAQ_list={this.state.FAQ_list}/>
                    }
                </div>
            </div>

        )
    }
}

export default Post
