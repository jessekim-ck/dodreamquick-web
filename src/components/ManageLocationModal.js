import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import {
    addUserLocation,
    deleteUserLocation,
    getUserLocationList,
    setDefaultLocation
} from "../apis/api";
import PostCodeForm from "./PostCodeForm";
import styles from "../app.module.css"


const LocationItem = props => {

    return (
        <div className={styles.locationItem}>
            <div className={styles.name}>
                <div>이름: {props.location.name}</div>
                <div>
                    {
                        props.location.is_default_departure &&
                            <div className={styles.sticker}>기본 출발지</div>
                    }
                    {
                        props.location.is_default_arrival &&
                        <div className={styles.sticker}>기본 도착지</div>
                    }
                </div>
            </div>
            <div className={styles.address}>주소: {props.location.location}</div>
            <div className={styles.address}>상세주소: {props.location.location_detail}</div>
            <div className={styles.phone}>핸드폰 번호: {props.location.phone}</div>
            <div className={styles.buttons}>
                <button
                    className={styles.basicButtonGreen}
                    onClick={() => {if (props.on_select_location) {props.on_select_location(props.location)}}}>
                    선택
                </button>
                <button
                    className={styles.basicButtonWhite}
                    onClick={() => props.delete_location(props.location.id)}>
                    삭제
                </button>
            </div>

        </div>
    )
}


class LocationListView extends React.Component {

    location_items = () => this.props.location_list.map(
        location => (
            <LocationItem
                location={{...location}}
                delete_location={this.props.delete_location}
                on_select_location={this.props.on_select_location}
                key={location.id}/>
        )
    )

    render() {
        return (
            <div>
                {this.location_items()}
                <button
                    className={styles.addLocationButton}
                    onClick={this.props.start_add_location} >
                    + 주소지 추가
                </button>
            </div>
        )
    }
}


class LocationAddForm extends React.Component {

    state = {
        alias: "",
        name: "",
        location: "",
        location_detail: "",
        phone: "",

        default_departure_location: false,
        default_arrival_location: false,

        show_postcode: false
    }

    add_location = async event => {
        event.preventDefault()
        const location = await addUserLocation(
            this.state.name,
            this.state.location,
            this.state.location_detail,
            this.state.phone
        )
        if (this.state.default_departure_location) {
            await setDefaultLocation("departure", location.id)
        } else if (this.state.default_arrival_location) {
            await setDefaultLocation("arrival", location.id)
        }
        await this.props.update_location_list()
        this.props.stop_add_location()
    }

    toggle_postcode = () => {
        this.setState(prevState => ({show_postcode: !prevState.show_postcode}))
    }

    on_complete = address => {
        this.setState({location: address, show_postcode: false})
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
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="보내시는(받는) 분 성함"
                            value={this.state.name}
                            className={styles.orderFormSectionRowInput}
                            onChange={event => this.on_change(event)}
                            required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="주소 (클릭하여 검색)"
                            className={styles.orderFormSectionRowInput}
                            value={this.state.location}
                            onClick={this.toggle_postcode}
                            readOnly={true}
                            required />
                        {
                            this.state.show_postcode &&
                            <PostCodeForm on_complete={this.on_complete}/>
                        }
                        <Form.Control
                            type="text"
                            name="location_detail"
                            placeholder="상세 주소"
                            className={styles.orderFormSectionRowInput}
                            value={this.state.location_detail}
                            onChange={event => this.on_change(event)}
                            required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            name="phone"
                            placeholder="보내시는(받는) 분 핸드폰 번호"
                            value={this.state.phone}
                            className={styles.orderFormSectionRowInput}
                            onChange={event => this.on_change(event)}
                            required />
                    </Form.Group>

                    <Form.Group className={styles.orderFormSectionFlexRow}>
                        <Form.Check
                            className={styles.orderFormSectionRowInput}
                            onChange={event => this.setState({
                                default_departure_location: event.target.checked
                            })}
                            label="기본 픽업지로 설정" />
                        <Form.Check
                            className={styles.orderFormSectionRowInput}
                            onChange={event => this.setState({
                                default_arrival_location: event.target.checked
                            })}
                            label="기본 도착지로 설정" />
                    </Form.Group>

                    <button className={styles.saveLocationButton} type="submit">저장</button>
                    <button className={styles.addLocationButton} onClick={this.props.stop_add_location}>목록 보기</button>
                </Form>
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
        const sorted = await location_list.sort(
            (a, b) => {
                if (a.is_default_departure) {
                    return -1
                } else if (b.is_default_departure) {
                    return 1
                } else if (a.is_default_arrival) {
                    return -1
                } else if (b.is_default_arrival) {
                    return 1
                } else {
                    return 0
                }
            }
        )
        this.setState({location_list: sorted})
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

    delete_location = async location_id => {
        await deleteUserLocation(location_id)
        await this.update_location_list()
    }

    hide_modal = () => {
        this.props.close_modal();
        this.setState({adding_location: false})
    }

    render() {
        return (
            <Modal
                show={this.props.show_modal}
                onHide={this.hide_modal}>
                <Modal.Header>
                    <div>주소지 관리</div>
                    <div onClick={this.hide_modal}>X</div>
                </Modal.Header>
                <Modal.Body className={styles.manageLocationModal}>
                    {
                        this.state.adding_location ?
                            <LocationAddForm
                                update_location_list={this.update_location_list}
                                stop_add_location={this.stop_add_location}/> :
                            <LocationListView
                                on_select_location={this.props.on_select_location}
                                start_add_location={this.start_add_location}
                                delete_location={this.delete_location}
                                location_list={this.state.location_list}/>
                    }
                </Modal.Body>
            </Modal>
        )
    }
}

export default ManageLocationModal