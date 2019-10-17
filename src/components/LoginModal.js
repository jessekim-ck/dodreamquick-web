import React from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


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

                <Modal.Header>로그인하세요!</Modal.Header>
                <Modal.Body>
                    <Form onSubmit={event => this.on_submit(event)}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={event => this.on_change(event)}
                                placeholder="Username" />
                            <Form.Text className="text-muted">
                                Write your username!
                            </Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={event => this.on_change(event)}
                                placeholder="Password" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Log In
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>
        )
    }
}

export default LoginModal