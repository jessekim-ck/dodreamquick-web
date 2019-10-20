import React from 'react'
import styles from '../app.module.css'


const NewsItem = props => {
    return (
        <a href={props.news.href} target="_blank" rel="noopener noreferrer">
            <div className={styles.newsCard}>
                <img
                    className={styles.thumbnail}
                    src={props.news.image}
                    alt=""/>
                <div className={styles.title}>{props.news.title}</div>
                <div className={styles.text}>{props.news.text}</div>
            </div>
        </a>
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