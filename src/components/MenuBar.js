import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import styles from '../app.module.css'
import {isMobile} from 'react-device-detect'

// redux
import {connect} from 'react-redux'


class MenuBar extends React.Component {

    render() {
        return (
            <Navbar expand={true} className={[styles.menuBarContainer, isMobile ? styles.mobile : '']}>
                <Navbar.Collapse id="basic-navbar-nav" className={[styles.collapse]}>
                    <Nav className={[styles.menuBarNav]} as={NavLink} activeClassName={styles.active} exact to="/about">
                        <Nav.Link as={NavLink} to="/about">회사소개</Nav.Link>
                    </Nav>
                    <Nav className={[styles.menuBarNav]} as={NavLink} activeClassName={styles.active} exact to="/order">
                        { isMobile ? null : <div className={styles.specialMenu}><p>바로가기</p></div> }
                        <Nav.Link as={NavLink} to="/order">배송신청</Nav.Link>
                    </Nav>
                    <Nav className={[styles.menuBarNav]} as={NavLink} activeClassName={styles.active} exact to="/price">
                        <Nav.Link as={NavLink} to="/price">요금안내</Nav.Link>
                    </Nav>
                    <Nav className={[styles.menuBarNav]} as={NavLink} activeClassName={styles.active} exact to="/how_to_use">
                        <Nav.Link as={NavLink} to="/how_to_use">이용방법</Nav.Link>
                    </Nav>
                    <Nav className={[styles.menuBarNav]}>
                        <Nav.Link href="https://dodreamall.modoo.at/" target="_blank">두드림몰</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps = state => state.user

export default connect(mapStateToProps)(MenuBar)
