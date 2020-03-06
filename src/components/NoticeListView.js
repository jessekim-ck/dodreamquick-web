import React from 'react'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import styles from '../app.module.css'


const ListItem = props => {
    const React = require('react')
    const ReactMarkdown = require('react-markdown')

    const regex = new RegExp("\\d+-\\d+-\\d+");
    
    return (
        <Accordion className={styles.postItem}>
            <Accordion.Toggle className={styles.header} as={Card.Header} eventKey={props.notice.id}>
                <div className={styles.left}>
                    <div className={styles.index}>{props.notice.id}</div>
                    <div>{props.notice.title}</div>
                </div>
                <div className={styles.right}>
                    <div>{regex.exec(props.notice.created)}</div>
                </div>
            </Accordion.Toggle>
            <Accordion.Collapse className={styles.body} eventKey={props.notice.id}>
                <Card.Body><ReactMarkdown source={props.notice.text}/></Card.Body>
            </Accordion.Collapse>
        </Accordion>
    )
}


const NoticeListView = props => {

    const list_items = props.notice_list.map(
        notice => <ListItem notice={{...notice}} key={notice.id}/>
    )

    return (
        <div className={styles.postList}>
            {list_items}
        </div>
    )
}

export default NoticeListView
