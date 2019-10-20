import React from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import styles from '../app.module.css'


class LoginModal extends React.Component {

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
        await this.props.authenticate(this.state.username, this.state.password)
    }

    render() {
        return (
            <Modal
                show={this.props.show_modal}
                onHide={this.props.close_modal} >

                <Modal.Header>로그인</Modal.Header>
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

                        <Button className={styles.basicButtonGreen} type="submit">
                            로그인
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>
        )
    }
}

export default LoginModal