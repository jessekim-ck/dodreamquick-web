import React from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import styles from '../app.module.css'
import {connect} from "react-redux";
import DeleteUserModal from "./DeleteUserModal";

class UserInfoModal extends React.Component {

    state = {
        username: "",
        password: "",
        password_check: "",
        delete_state: false
    }

    on_change = event => {
        const name = event.target.name
        const value = event.target.value

        this.setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    delete_on = () => {
        this.setState({delete_state: true})
    }

    on_submit = async event => {
        await event.preventDefault()

        if (this.state.password && this.state.password.length < 6) {
            alert("비밀번호는 6자리 이상이어야 합니다!")
        } else if (this.state.password !== this.state.password_check) {
            alert("입력한 두 비밀번호가 같지 않습니다. 다시 입력해주세요!")
        } else if (this.state.username && !this.state.username.match(/.+@.+\..+/)) {
            alert("올바른 이메일 형식을 입력해주세요!")
        } else {
            await this.props.edit_user_info(this.state.username, this.state.password)
            await this.props.dispatch(this.props.log_out())
            await this.props.close_modal()
            await this.setState({
                username: "",
                password: "",
                password_check: "",
            })
            this.props._modal()
        }
    }

    render() {
        if (this.state.delete_state) {
            return (
                <DeleteUserModal
                    close_user_info_modal={this.props.close_modal}
                    authenticate={this.props.authenticate}
                    log_out={this.props.log_out}/>
            )
        } else {
            return (
                <Modal show={this.props.show_modal} onHide={this.props.close_modal}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            회원 정보 변경
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={event => this.on_submit(event)}>
                            <Form.Group>
                                <Form.Label>이메일 주소</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    className={styles.input}
                                    value={this.state.username}
                                    onChange={event => this.on_change(event)}
                                    placeholder={this.props.username}
                                    readOnly/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    className={styles.input}
                                    value={this.state.password}
                                    onChange={event => this.on_change(event)}
                                    placeholder="새 비밀번호 입력"/>
                                <Form.Control
                                    type="password"
                                    name="password_check"
                                    className={styles.input}
                                    value={this.state.password_check}
                                    onChange={event => this.on_change(event)}
                                    placeholder="새 비밀번호 확인"/>
                            </Form.Group>

                            <Button className={styles.basicButtonGreen} type="submit">
                                비밀번호 변경
                            </Button>

                            <div className={styles.modalAdditionalButton}>
                                <div onClick={() => this.delete_on() && this.props.close_modal}>
                                    <a onClick={event => event.preventDefault()} href="/">회원 탈퇴하기</a>
                                </div>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            )
        }
    }
}

const mapStateToProps = state => state.user

export default connect(mapStateToProps)(UserInfoModal)
