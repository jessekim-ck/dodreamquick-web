import React from 'react'
import styles from '../app.module.css'


const NewsItem = props => {
    return (
        <div className={styles.newsCard}>
            <a href={props.news.href} target="_blank" rel="noopener noreferrer">
                <div className={styles.newsCardHeader}>
                    <img
                        className={styles.newsCardThumbnail}
                        src={props.news.image}
                        alt=""/>
                </div>
                <div className={styles.newsCardBody}>
                    <div className={styles.newsCardTitle}>{props.news.title}</div>
                    <div className={styles.newsCardText}>{props.news.text}</div>
                </div>
            </a>
        </div>
    )
}

const NewsListView = props => {

    const news_items = props.news_list.map(
        news => <NewsItem news={{...news}} key={news.id}/>
    )

    return (
        <div className={styles.newsContainer}>
            {news_items}
        </div>
    )
}

export default NewsListView