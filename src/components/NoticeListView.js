import React from 'react'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'


const ListItem = props => {

    return (
        <div>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={props.notice.id}>
                    {props.notice.title}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={props.notice.id}>
                    <Card.Body>{props.notice.text}</Card.Body>
                </Accordion.Collapse>
            </Card>
        </div>
    )
}


const NoticeListView = props => {

    const list_items = props.notice_list.map(
        notice => <ListItem notice={{...notice}} />
    )

    return (
        <Accordion>
            {list_items}
        </Accordion>
    )
}

export default NoticeListView
