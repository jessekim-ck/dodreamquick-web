import React from 'react'
import {log_out} from "../redux/actions/user_actions";
import Button from "react-bootstrap/Button"

// redux
import {connect} from 'react-redux'
import ManageLocationModal from "../components/ManageLocationModal";


class MyPage extends React.Component {

    state = {
        show_modal: false
    }

    log_out = async () => {
        await localStorage.removeItem('token')
        await this.props.dispatch(log_out())
        await this.props.history.push("/")
    }

    open_modal = () => {
        this.setState({show_modal: true})
    }

    close_modal = () => {
        this.setState({show_modal: false})
    }

    render() {
        return (
            <div>
                <div>
                    <p>Username: {this.props.username}</p>
                </div>
                <Button onClick={() => {this.setState({show_modal: true})}}>주소지 관리</Button>
                <Button onClick={this.log_out}>로그아웃</Button>
                <ManageLocationModal
                    show_modal={this.state.show_modal}
                    close_modal={this.close_modal}
                />
            </div>
        )
    }
}

const mapStateToProps = state => state.user

export default connect(mapStateToProps)(MyPage)