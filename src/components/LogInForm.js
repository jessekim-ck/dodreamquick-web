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
        const authenticated = await this.props.authenticate(this.state.username, this.state.password)
        if (authenticated) {
            this.props.on_hide()
        }
    }

    render() {
        return (
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>로그인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={event => this.on_submit(event)}>
                        <Form.Group>
                            <Form.Label>이메일 주소</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                name="username"
                                className={styles.input}
                                value={this.state.username}
                                onChange={event => this.on_change(event)}
                                placeholder="example@example.com" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                name="password"
                                minlength="6"
                                className={styles.input}
                                value={this.state.password}
                                onChange={event => this.on_change(event)}
                                placeholder="비밀번호를 입력해주세요" />
                        </Form.Group>

                        <div className={styles.modalAdditionalButtons}>
                            <div onClick={() => this.props.move_page_to("RESETPASSWORD")}>
                                <a onClick={event => event.preventDefault()} href="/">비밀번호 찾기</a>
                            </div>
                            <div onClick={() => this.props.move_page_to("SIGNUP")}>
                                <a onClick={event => event.preventDefault()} href="/">회원가입</a>
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
