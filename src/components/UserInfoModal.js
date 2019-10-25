import React from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import styles from '../app.module.css'
import {connect} from "react-redux";


class UserInfoModal extends React.Component {

    state = {
        username: "",
        password: ""
    }

    async componentDidMount() {
        const username = await this.props.username
        console.log(username)
        this.setState({
            username: this.props.username
        })
    }

    on_change = event => {
        const name = event.target.name
        const value = event.target.value

        this.setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    on_submit = async event => {
        await event.preventDefault()

        if (this.state.password.length >= 6) {
            await this.props.set_password(this.state.password)
            this.props.close_modal()
        } else {
            alert('비밀번호는 6자리 이상이어야 합니다.')
        }
    }

    render() {
        return (
            <Modal show={this.props.show_modal} onHide={this.props.close_modal}>
                <Modal.Header>회원 정보 변경</Modal.Header>
                <Modal.Body>
                    <Form onSubmit={event => this.on_submit(event)}>
                        <Form.Group>
                            <Form.Label>이메일 주소</Form.Label>
                            <Form.Control
                                required
                                readOnly={true}
                                type="text"
                                name="username"
                                className={styles.input}
                                value={this.state.username || this.props.username}
                                onChange={event => this.on_change(event)}
                                placeholder="test@test.com" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                name="password"
                                className={styles.input}
                                value={this.state.password}
                                onChange={event => this.on_change(event)}
                                placeholder="비밀번호를 입력해주세요" />
                        </Form.Group>

                        <Button className={styles.basicButtonGreen} type="submit">
                            비밀번호 변경
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

        )
    }
}

const mapStateToProps = state => state.user

export default connect(mapStateToProps)(UserInfoModal)