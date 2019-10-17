import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

// redux
import {connect} from 'react-redux'


const NavigationBar = props => {

    return (
        <Navbar expand="lg">
            <Navbar.Brand href="/">Dodreamquick</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/order">Order</Nav.Link>
                    <Nav.Link href="/search_cost">Cost</Nav.Link>
                    <Nav.Link href="/post">Post</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                <div>
                    {
                        props.username ?
                            <Nav className={"mr-auto"}>
                                <Nav.Link href="/my_page">{props.username} (마이페이지)</Nav.Link>
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