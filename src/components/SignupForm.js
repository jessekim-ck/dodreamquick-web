import React from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import styles from '../app.module.css'


class SignupForm extends React.Component {

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

        if (!this.state.username.match(/.+@.+\..+/)) {
            alert('올바른 이메일 형식을 입력해주세요!')
        } else if (this.state.password.length < 6) {
            alert('비밀번호는 6자리 이상이어야 합니다!')
        } else {
            await this.props.sign_up(this.state.username, this.state.password)
            this.props.on_hide()
        }
    }

    render() {
        return (
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>두드림퀵에 오신 것을 환영합니다!</Modal.Title>
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
                                placeholder="test@test.com" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                className={styles.input}
                                value={this.state.password}
                                onChange={event => this.on_change(event)}
                                placeholder="비밀번호를 입력해주세요" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Text>
                                두드림퀵의 <a href="/policy/use" target="_blank">이용 약관</a> 및 <a href="/policy/personal_information" target="_blank">개인정보 취급 방침</a>에 동의합니다.
                            </Form.Text>
                        </Form.Group>

                        <Button className={styles.basicButtonGreen} type="submit">
                            회원 가입
                        </Button>
                    </Form>
                </Modal.Body>
            </div>
        )
    }
}

export default SignupForm