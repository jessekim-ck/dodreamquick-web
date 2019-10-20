import React from 'react'
import {getFAQList} from "../apis/api";
import styles from '../app.module.css'
import FAQListView from "../components/FAQListView";


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
            <div>
                <div className={styles.label}>
                    <div className={styles.title}>자주 묻는 질문</div>
                </div>
                <FAQListView FAQ_list={this.state.FAQ_list} />
            </div>

        )
    }
}

export default PostFAQ
