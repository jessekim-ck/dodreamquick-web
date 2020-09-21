import React from "react"
import {Helmet} from "react-helmet/es/Helmet";
import {connect} from "react-redux";
import styles from "../app.module.css";
import {baseURL} from "../apis/config";
import {getNews, getResource} from "../apis/api";
import NewsListView from "../components/NewsListView";

const ReactGA = require('react-ga');

class About extends React.Component {

    state = {
        selectedTab: 0,
        resource: null,
        news_list: [],
    }

    on_click_tab = index => {
        this.setState(prevState => ({
            ...prevState,
            selectedTab: index
        }))
    }

    async componentDidMount() {
        ReactGA.initialize('UA-158814088-1');
        ReactGA.pageview(window.location.pathname + window.location.search);

        const resource = await getResource(1)
        this.setState({resource})

        const news_list = await getNews()
        this.setState({news_list})
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
                <div className={styles.introTableTabs}>
                    <div
                        onClick={() => this.on_click_tab(0)}
                        className={[styles.introTableTab, this.state.selectedTab === 0 && styles.active].join(' ')}
                    >
                        두드림퀵 소개
                    </div>
                    <div
                        onClick={() => this.on_click_tab(1)}
                        className={[styles.introTableTab, this.state.selectedTab === 1 && styles.active].join(' ')}
                    >
                        언론 보도
                    </div>
                </div>
                {
                    this.state.selectedTab === 0
                        ? (
                            <div className={[styles.contentContainer, styles.aboutContainer].join(' ')}>
                                {resource ? <img className={styles.aboutImg} src={`${baseURL}${resource.image}`}
                                                 alt="두드림퀵 지하철 퀵서비스 회사소개"/> : null}
                            </div>
                        )
                        : (
                            <div className={styles.contentContainer}>
                                <NewsListView news_list={this.state.news_list}/>
                            </div>
                        )
                }
            </div>
        )
    }
}


const mapStateToProps = state => state.user

export default connect(mapStateToProps)(About)
