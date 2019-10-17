import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {addUserLocation, getUserLocationList, setDefaultLocation} from "../apis/api";
import PostCodeForm from "./PostCodeForm";


const LocationItem = props => {

    return (
        <div>
            <p></p>
            <p>{props.location.name}</p>
            <Button>선택</Button>
        </div>
    )
}


class LocationListView extends React.Component {

    location_items = () => this.props.location_list.map(
        location => (<LocationItem location={{...location}}/>)
    )

    render() {
        return (
            <div>
                {this.location_items()}
                <Button
                    onClick={this.props.start_add_location} >
                    주소지 추가
                </Button>
            </div>
        )
    }
}


class LocationAddForm extends React.Component {

    state = {
        alias: "",
        name: "",
        default_departure_location: false,
        default_arrival_location: false,

        show_postcode: false
    }

    add_location = async event => {
        event.preventDefault()
        await addUserLocation(this.state.name)
        if (this.state.default_departure_location) {
            await setDefaultLocation("departure", this.state.name)
        } else if (this.state.default_arrival_location) {
            await setDefaultLocation("arrival", this.state.name)
        }
        await this.props.update_location_list()
        this.props.stop_add_location()
    }

    toggle_postcode = () => {
        this.setState(prevState => ({show_postcode: !prevState.show_postcode}))
    }

    on_complete = address => {
        this.setState({name: address, show_postcode: false})
    }

    on_change = event => {
        const name = event.target.name
        const value = event.target.value

        this.setState({[name]: value})
    }

    render() {
        return (
            <div>
                <Form onSubmit={event => this.add_location(event)}>
                    <Form.Group>
                        <Form.Label>주소지 이름</Form.Label>
                        <Form.Control
                            type="text"
                            name="alias"
                            value={this.state.alias}
                            onChange={event => this.on_change(event)}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>주소</Form.Label>
                        <Form.Control
                            type="text"
                            value={this.state.name}
                            readOnly={true}
                            onClick={this.toggle_postcode}
                            required
                        />
                        {
                            this.state.show_postcode &&
                            <PostCodeForm on_complete={this.on_complete}/>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Check
                            onChange={
                                event => this.setState({
                                    default_departure_location: event.target.checked
                                })
                            }
                            label="기본 픽업 주소지로 설정" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Check
                            onChange={
                                event => this.setState({
                                    default_arrival_location: event.target.checked
                                })
                            }
                            label="기본 도착 주소지로 설정" />
                    </Form.Group>

                    <Button type="submit">
                        주소지 추가하기
                    </Button>
                </Form>

                <Button
                    onClick={this.props.stop_add_location}>
                    목록 보기
                </Button>
            </div>
        )
    }
}


class ManageLocationModal extends React.Component {

    state = {
        location_list: [],
        adding_location: false,
    }

    update_location_list = async () => {
        const location_list = await getUserLocationList()
        this.setState({location_list})
    }

    async componentDidMount() {
        await this.update_location_list()
    }

    start_add_location = () => {
        this.setState({adding_location: true})
    }

    stop_add_location = () => {
        this.setState({adding_location: false})
    }

    render() {
        return (
            <Modal
                show={this.props.show_modal}
                onHide={this.props.close_modal}>
                <Modal.Header>주소지 관리</Modal.Header>
                <Modal.Body>
                    {
                        this.state.adding_location ?
                            <LocationAddForm
                                update_location_list={this.update_location_list}
                                stop_add_location={this.stop_add_location}/> :
                            <LocationListView
                                start_add_location={this.start_add_location}
                                location_list={this.state.location_list}/>
                    }
                </Modal.Body>
            </Modal>
        )
    }
}

export default ManageLocationModal