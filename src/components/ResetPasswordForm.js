import React from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import styles from '../app.module.css'
import {findUsername, resetPassword} from "../apis/api";


class ResetPasswordForm extends React.Component {

    state = {
        username: "",
        searched_username: "",
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

        const found_username = await findUsername(this.state.username)

        if (found_username === 1) {
            this.setState({searched_username: this.state.username})
        } else {
            alert("이메일 주소를 찾을 수 없습니다.")
        }
    }

    reset_password = async () => {
        const reset_complete = await resetPassword(this.state.searched_username)
        if (reset_complete === 1) {
            alert("해당 이메일 주소로 임시 비밀번호가 전송되었습니다!")
        }
    }

    render() {
        if (this.state.searched_username) {
            return (
                <div>
                    <Modal.Header>비밀번호 찾기</Modal.Header>
                    <Modal.Body>
                        <div>다음과 같은 이메일 주소로 가입된 계정을 찾았습니다. 임시 비밀번호를 아래의 이메일 주소로 전송하시겠습니까?</div>
                        <br/>
                        <div>{this.state.searched_username}</div>
                        <br/>
                        <Button
                            className={styles.basicButtonGreen}
                            onClick={this.reset_password}>
                            임시 비밀번호 전송
                        </Button>
                    </Modal.Body>
                </div>
            )
        } else {
            return (
                <div>
                    <Modal.Header>비밀번호 찾기</Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={event => this.on_submit(event)}>
                            <Form.Group>
                                <Form.Label>이메일 주소</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="username"
                                    className={styles.input}
                                    value={this.state.username}
                                    onChange={event => this.on_change(event)}
                                    placeholder="test@test.com" />
                            </Form.Group>

                            <Button className={styles.basicButtonGreen} type="submit">
                                찾기
                            </Button>
                        </Form>
                    </Modal.Body>
                </div>
            )
        }

    }
}

export default ResetPasswordForm