import React from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import styles from '../app.module.css'


class LoginForm extends React.Component {

    state = {
        username: "",
        password: "",
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

        if (
            this.state.username.match(/.+@.+\..+/) &&
            this.state.password
        ) {
            await this.props.authenticate(this.state.username, this.state.password)
            this.props.on_hide()
        } else {
            alert('입력값이 올바르지 않습니다.')
        }
    }

    render() {
        return (
            <div>
                <Modal.Header>로그인</Modal.Header>
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

                        <div className={styles.modalAdditionalButtons}>
                            <div onClick={() => this.props.move_page_to("RESETPASSWORD")}>
                                <a href="javascript:undefined">비밀번호 찾기</a>
                            </div>
                            <div onClick={() => this.props.move_page_to("SIGNUP")}>
                                <a href="javascript:undefined">회원가입</a>
                            </div>
                        </div>

                        <Button className={styles.basicButtonGreen} type="submit">
                            로그인
                        </Button>
                    </Form>
                </Modal.Body>
            </div>

        )
    }
}

export default LoginForm