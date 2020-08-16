import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import styles from '../app.module.css'
import {delete_user} from "../apis/api";



class DeleteUserModal extends React.Component {

    state = {
        username: "",
        show_modal : true,
        close_modal : false
    }

    delete_following_user = async event => {
        await event.preventDefault();
        const username=this.state.username;
        const delete_complete = await delete_user(username);
        if (delete_complete === 1) {
            alert("회원 탈퇴가 완료되었습니다!");
            this.setState({close_modal: true, show_modal: false});
            await this.props.dispatch(this.props.log_out());
        } else {
        alert('문제가 발생하였습니다. 두드림팀으로 연락 주세요.');
        this.setState({close_modal: true, show_modal: false});
        }
    }

    render() {
        return (
            <Modal show={this.state.show_modal} onHide={this.state.close_modal}>
                <Modal.Header>
                    <Modal.Title>
                        회원 탈퇴
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>탈퇴하실 경우 회원분의 이메일, 비밀번호 및 주소록 관련 정보가 삭제됩니다.</div>
                    <br/>
                    <Button
                        className={styles.basicButtonGreen}
                        onClick={event => this.delete_following_user(event)}>
                        탈퇴하기
                    </Button>
                    <Button
                        className={styles.basicButtonGreen}
                        onClick={()=> this.setState({close_modal: true, show_modal: false})}>
                        취소하기
                    </Button>
                </Modal.Body>
            </Modal>
        )
    }
}

export default DeleteUserModal