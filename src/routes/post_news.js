import React from 'react'
import {getNews} from "../apis/api";
import NewsListView from "../components/NewsListView";
import styles from '../app.module.css'
import {Helmet} from "react-helmet/es/Helmet";


class PostNews extends React.Component {

    state = {
        news_list: [],
    }

    async componentDidMount() {
        const news_list = await getNews()
        this.setState({news_list})
    }

    render() {
        return (
            <div className={styles.contentContainer}>
                <div>
                    <Helmet>
                        <title>두드림퀵: 언론 보도</title>
                    </Helmet>
                </div>
                <div className={styles.pageTitle}>DODREAM NEWS</div>
                <NewsListView news_list={this.state.news_list}/>
            </div>

        )
    }
}

export default PostNews
