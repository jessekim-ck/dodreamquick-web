import React from 'react'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'


const ListItem = props => {

    return (
        <div>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={props.FAQ.id}>
                    {props.FAQ.title}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={props.FAQ.id}>
                    <Card.Body>{props.FAQ.text}</Card.Body>
                </Accordion.Collapse>
            </Card>
        </div>
    )
}


const FAQListView = props => {

    const list_items = props.FAQ_list.map(
        FAQ => <ListItem FAQ={{...FAQ}} key={FAQ.id}/>
    )

    return (
        <Accordion>
            {list_items}
        </Accordion>
    )
}

export default FAQListView
