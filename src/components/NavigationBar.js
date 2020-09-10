import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import styles from '../app.module.css'
import {isMobile} from 'react-device-detect'

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
            <Navbar expand={isMobile ? true : "lg"} className={styles.navBarContainer}>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className={["mr-auto", styles.quickMenu]}>
                        <Nav.Link href="/post/notice">공지사항</Nav.Link>
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
                        {/*<Nav.Link href="/order">배송 신청</Nav.Link>*/}
                        {/*<NavDropdown*/}
                        {/*    title="서비스 안내"*/}
                        {/*    show={this.state.show_service_intro}*/}
                        {/*    onMouseEnter={() => this.on_mouse_hover('service_intro')}*/}
                        {/*    onMouseLeave={() => this.on_mouse_leave('service_intro')}>*/}
                        {/*    <NavDropdown.Item href="/price">요금 안내</NavDropdown.Item>*/}
                        {/*    <NavDropdown.Item href="/how_to_use">이용 방법</NavDropdown.Item>*/}
                        {/*</NavDropdown>*/}
                        {/*<NavDropdown*/}
                        {/*    title="게시판"*/}
                        {/*    show={this.state.show_post}*/}
                        {/*    onMouseEnter={() => this.on_mouse_hover('post')}*/}
                        {/*    onMouseLeave={() => this.on_mouse_leave('post')}>*/}
                        {/*    <NavDropdown.Item href="/post/notice">공지사항</NavDropdown.Item>*/}
                        {/*    <NavDropdown.Item href="/post/faq">FAQ</NavDropdown.Item>*/}
                        {/*    <NavDropdown.Item href="/post/news">언론 보도</NavDropdown.Item>*/}
                        {/*</NavDropdown>*/}
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <div>
                        {
                            this.props.username ?
                                <Nav className={"mr-auto"}>
                                    <Nav.Link onClick={this.do_log_out}>로그아웃</Nav.Link>
                                    <Nav.Link onClick={() => this.props.open_modal('user_info')}>내 정보</Nav.Link>
                                </Nav> :
                                <Nav className={"mr-auto"}>
                                    <Nav.Link onClick={() => this.props.open_modal('auth')}>로그인</Nav.Link>
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
