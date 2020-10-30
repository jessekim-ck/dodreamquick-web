import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import styles from '../app.module.css'
import {isMobile} from 'react-device-detect'
import userImage from "../assets/user.png";

// redux
import {connect} from 'react-redux'
import {log_out} from "../redux/actions/user_actions";


class NavigationBar extends React.Component {

    state = {
        show_service_intro: false,
        show_post: false,
    }

    componentDidMount() {
        if (isMobile) {
            this.setState({
                show_service_intro: true,
                show_post: true,
            })
        }
    }

    on_mouse_hover = key => {
        if (!isMobile) {
            this.setState({
                [`show_${key}`]: true
            })
        }

    }

    on_mouse_leave = key => {
        if (!isMobile) {
            this.setState({
                [`show_${key}`]: false
            })
        }
    }

    do_log_out = async () => {
        await localStorage.removeItem('token')
        await this.props.dispatch(log_out())
    }

    render() {
        return (
            <Navbar expand={"lg"} className={styles.navBarContainer}>
                <Nav className={["mr-auto", styles.quickMenu]}>
                    <Nav.Link as={Link} to="/post/notice">공지사항</Nav.Link>
                    <Nav.Link href="https://blog.naver.com/dodream-enactus" target="_blank">
                        <img
                            src="/ic_naver_blog.png"
                            height="28"
                            alt="두드림퀵"/>
                    </Nav.Link>
                    <Nav.Link href="https://pf.kakao.com/_jSPaj" target="_blank">
                        <img
                            src="/ic_kakao_channel.png"
                            height="28"
                            alt="두드림퀵"/>
                    </Nav.Link>
                    <Nav.Link href="https://www.instagram.com/dodream_tale/?hl=ko" target="_blank">
                        <img
                            src="/ic_instagram.png"
                            height="28"
                            alt="두드림퀵"/>
                    </Nav.Link>
                </Nav>
                <Navbar.Toggle aria-controls="user-navbar-nav" children={(
                    <img
                        src={userImage}
                        height="15"
                        alt="두드림퀵"/>
                )} />
                <Navbar.Collapse className="justify-content-end" id="user-navbar-nav">
                    <div>
                        {
                            this.props.username ?
                                <Nav className={"mr-auto"}>
                                    <Nav.Link onClick={this.do_log_out} className="text-right">로그아웃</Nav.Link>
                                    <Nav.Link onClick={() => this.props.open_modal('user_info')} className="text-right">내 정보</Nav.Link>
                                </Nav> :
                                <Nav className={"mr-auto"}>
                                    <Nav.Link onClick={() => this.props.open_modal('auth')} className="text-right">로그인</Nav.Link>
                                </Nav>
                        }
                    </div>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps = state => state.user

export default connect(mapStateToProps)(NavigationBar)
