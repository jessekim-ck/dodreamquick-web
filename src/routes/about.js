import React from "react"
import {Helmet} from "react-helmet/es/Helmet";
import styles from "../app.module.css";


const About = () => {

    return (
        <div>
            <div>
                <Helmet>
                    <title>두드림퀵: 회사소개</title>
                    <meta
                        name="description"
                        content="두드림퀵 회사소개"/>
                    <link rel="canonical" href="https://dodreamquick.com/about"/>
                </Helmet>
            </div>
            <div className={styles.contentContainer}>
                회사소개
            </div>
        </div>
    )
}

export default About
