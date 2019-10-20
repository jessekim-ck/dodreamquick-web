import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Logo from '../assets/favicon.png'
import styles from '../app.module.css'


// redux
import {connect} from 'react-redux'
import {log_out} from "../redux/actions/user_actions";


const NavigationBar = props => {

    const do_log_out = async () => {
        await localStorage.removeItem('token')
        await props.dispatch(log_out())
    }

    return (
        <Navbar expand="lg" fixed="top" className={styles.navBarContainer}>
            <Navbar.Brand href="/">
                <img
                    src={Logo}
                    height="35"
                    alt="두드림퀵"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/order">배송 신청</Nav.Link>
                    <NavDropdown title="서비스 안내">
                        <NavDropdown.Item href="/search_cost">요금 안내</NavDropdown.Item>
                        <NavDropdown.Item href="/no_page_yet">이용 방법</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="게시판">
                        <NavDropdown.Item href="/post/notice">공지사항</NavDropdown.Item>
                        <NavDropdown.Item href="/post/faq">FAQ</NavDropdown.Item>
                        <NavDropdown.Item href="/post/news">언론 보도</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                <div>
                    {
                        props.username ?
                            <Nav className={"mr-auto"}>
                                <Nav.Link onClick={do_log_out}>로그아웃</Nav.Link>
                                <Nav.Link href="/my_page">내 정보</Nav.Link>
                            </Nav> :
                            <Nav className={"mr-auto"}>
                                <Nav.Link onClick={() => props.open_modal('login')}>로그인</Nav.Link>
                                <Nav.Link onClick={() => props.open_modal('signup')}>회원가입</Nav.Link>
                            </Nav>
                    }
                </div>
            </Navbar.Collapse>
        </Navbar>
    )
}

const mapStateToProps = state => state.user

export default connect(mapStateToProps)(NavigationBar)