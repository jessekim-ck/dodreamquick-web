import React from 'react'
import {getNews} from "../apis/api";
import NewsListView from "../components/NewsListView";
import styles from '../app.module.css'


class PostNews extends React.Component {

    state = {
        news_list: [],
    }

    async componentDidMount() {
        const news_list = await getNews()
        this.setState({news_list})
    }

    render() {
        console.log(this.state.news_list)
        return (
            <div>
                <div className={styles.label}>
                    <div className={styles.title}>DODREAM NEWS</div>
                </div>
                <NewsListView news_list={this.state.news_list}/>
            </div>

        )
    }
}

export default PostNews
