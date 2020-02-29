import React from 'react'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import styles from "../app.module.css";


const ListItem = props => {

    


    return (
        <Accordion className={styles.postItem}>
            <Accordion.Toggle className={styles.header} as={Card.Header} eventKey={props.FAQ.id}>
                <div className={styles.left}>
                    <div className={styles.index}>{props.FAQ.id}</div>
                    <div>{props.FAQ.title}</div>
                </div>
            </Accordion.Toggle>
            <Accordion.Collapse  className={styles.body} eventKey={props.FAQ.id}>
                <Card.Body>{props.FAQ.text}</Card.Body>
            </Accordion.Collapse>
        </Accordion>
    )
}


const FAQListView = props => {

    const list_items = props.FAQ_list.map(
        FAQ => <ListItem FAQ={{...FAQ}} key={FAQ.id}/>
    )

    return (
        <div className={styles.postList}>
            {list_items}
        </div>
    )
}

export default FAQListView
