import React from "react"
import Carousel from "react-bootstrap/Carousel"
import styles from '../app.module.css'
import logo from '../assets/logo.png'


const HowToUse = props => {

    return (
        <Carousel className={styles.carousel}>
            <Carousel.Item>
                <div className={styles.carouselItem}>
                    <div className={styles.carouselLeft}>
                        <img className={styles.carouselImg} src={logo} alt=""/>
                    </div>
                    <div className={styles.carouselRight}>
                        <h3>Hello!</h3>
                        <p>hello world!</p>
                    </div>
                </div>
            </Carousel.Item>
        </Carousel>
    )
}

export default HowToUse