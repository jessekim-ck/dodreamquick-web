import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

// redux
import {connect} from 'react-redux'
import {log_out} from "../redux/actions/user_actions";
import NavDropdown from "react-bootstrap/NavDropdown";


const NavigationBar = props => {

    const on_log_out = async () => {
        await localStorage.removeItem('token')
        props.dispatch(log_out())
    }

    return (
        <Navbar expand="lg">
            <Navbar.Brand href="/">Dodreamquick</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/order">Order</Nav.Link>
                    <Nav.Link href="/search_cost">Cost</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    {
                        props.username ?
                            <NavDropdown title={"Hello, " + props.username}>
                                <NavDropdown.Item onClick={on_log_out}>Log Out</NavDropdown.Item>
                            </NavDropdown> :
                            <Nav.Link href="/user/log_in">Log In</Nav.Link>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

const mapStateToProps = state => state.user

export default connect(mapStateToProps)(NavigationBar)