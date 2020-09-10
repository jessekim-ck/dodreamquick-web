import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import styles from '../app.module.css'
import {isMobile} from 'react-device-detect'

// redux
import {connect} from 'react-redux'


class MenuBar extends React.Component {

    render() {
        const pathName = window.location.pathname
        return (
            <Navbar expand={true} className={[styles.menuBarContainer, isMobile ? styles.mobile : '']}>
                <Navbar.Collapse id="basic-navbar-nav" className={[styles.collapse]}>
                    <Nav className={[styles.menuBarNav, pathName === '/about' && styles.active]}>
                        <Nav.Link href="/about">회사소개</Nav.Link>
                    </Nav>
                    <Nav className={[styles.menuBarNav, pathName === '/order' && styles.active]}>
                        { isMobile ? null : <div className={styles.specialMenu}><p>바로가기</p></div> }
                        <Nav.Link href="/order">배송신청</Nav.Link>
                    </Nav>
                    <Nav className={[styles.menuBarNav, pathName === '/price' && styles.active]}>
                        <Nav.Link href="/price">요금안내</Nav.Link>
                    </Nav>
                    <Nav className={[styles.menuBarNav, pathName === '/how_to_use' && styles.active]}>
                        <Nav.Link href="/how_to_use">이용방법</Nav.Link>
                    </Nav>
                    <Nav className={[styles.menuBarNav]}>
                        <Nav.Link href="https://dodreamquick.com/mall" target="_blank">두드림몰</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps = state => state.user

export default connect(mapStateToProps)(MenuBar)
