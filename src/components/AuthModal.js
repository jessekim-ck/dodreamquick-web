import React from 'react'
import Modal from 'react-bootstrap/Modal'
import LoginForm from "./LogInForm";
import SignupForm from "./SignupForm";
import ResetPasswordForm from "./ResetPasswordForm";

class AuthModal extends React.Component {

    state = {
        current_page: "LOGIN"
    }

    on_hide = () => {
        this.props.close_modal()
        this.setState({current_page: "LOGIN"})
    }

    move_page_to = key => {
        this.setState({current_page: key})
    }

    page_to_render = () => {
        switch (this.state.current_page) {
            case "LOGIN":
                return <LoginForm
                    authenticate={this.props.authenticate}
                    on_hide={this.on_hide}
                    move_page_to={this.move_page_to}/>
            case "SIGNUP":
                return <SignupForm
                    sign_up={this.props.sign_up}
                    on_hide={this.on_hide}
                    move_page_to={this.move_page_to}/>
            case "RESETPASSWORD":
                return <ResetPasswordForm />
            default:
                return <div></div>

        }
    }

    render() {
        return (
            <Modal show={this.props.show_modal} onHide={this.on_hide} >
                {this.page_to_render()}
            </Modal>
        )
    }
}

export default AuthModal