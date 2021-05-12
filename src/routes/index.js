import React from 'react'
import styles from "../app.module.css"
import {Helmet} from "react-helmet/es/Helmet";
import Carousel from 'react-bootstrap/Carousel';

// redux
import {connect} from 'react-redux'

import landing_coin from "../assets/landing_coin.png"
import landing_clock from "../assets/landing_clock.png"
import landing_pc from "../assets/landing_pc.png"
import landing_phone from "../assets/landing_phone.png"

import {getNoticeModal} from "../apis/api"
import NoticeModal from "../components/NoticeModal"

const ReactGA = require('react-ga');

class Index extends React.Component {

    state = {
        show_notice_modal: true,
        notice_modal: null,
    }

    async componentDidMount() {

        ReactGA.initialize('UA-158814088-1');
        ReactGA.pageview(window.location.pathname+window.location.search);

        const notice_modal = await getNoticeModal()
        if (notice_modal) {
            this.setState({notice_modal})
        }
    }

    close_notice_modal = () => {
        this.setState({show_notice_modal: false})
    }

    render() {
        return (
            <div>
                <div>
                    <Helmet>
                        <title>두드림퀵: 저렴하고 신속한 지하철 퀵서비스</title>
                        <meta
                            name="description"
                            content="행복을 전하는 지하철 퀵서비스 두드림퀵" />
                        <link rel="canonical" href="https://dodreamquick.com" />
                    </Helmet>
                </div>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://dodreamquick.com/landing_door_desktop.jpeg"
                            alt="First slide"
                            style={{
                                objectFit: "cover",
                                height: 400,
                            }}
                        />
                        <Carousel.Caption style={{top: "37%"}}>
                        <h1>버스,도보 추가요금 없이<br/>서울 전 지역 7,000원부터!</h1>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://dodreamquick.com/landing_door_desktop.jpeg"
                            alt="Second slide"
                            style={{
                                objectFit: "cover",
                                height: 400,
                            }}
                        />
                        <Carousel.Caption style={{top: "37%"}}>
                        <h1>버스,도보 추가요금 없이<br/>서울 전 지역 7,000원부터!</h1>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://dodreamquick.com/landing_door_desktop.jpeg"
                            alt="Third slide"
                            style={{
                                objectFit: "cover",
                                height: 400,
                            }}
                        />
                        <Carousel.Caption style={{top: "37%"}}>
                        <h1>버스,도보 추가요금 없이<br/>서울 전 지역 7,000원부터!</h1>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                {/*<div className={styles.landingDoor}>*/}
                    {/*<div className={styles.landingDoorText}>*/}
                    {/*    버스,도보 추가요금 없이<br/>*/}
                    {/*    서울 전 지역 7,000원부터!*/}
                    {/*</div>*/}
                    {/*<div className={styles.landingDoorCTA}>*/}
                    {/*    <button*/}
                    {/*        onClick={() => {this.props.history.push("/order"); Event("배송신청버튼", "배송신청하기","배송신청하기");}}*/}
                    {/*        className={styles.CTAWhite}>*/}
                    {/*        배송 신청하기*/}
                    {/*    </button>*/}
                    {/*    <a href="https://pf.kakao.com/_jSPaj" target="_blank" rel="noopener noreferrer">*/}
                    {/*        <button className={styles.CTAYellow}*/}
                    {/*            onClick={()=>ReactGA.ga('send','event','ask','ask','ask')}>*/}
                    {/*            문의하기*/}
                    {/*        </button>*/}
                    {/*    </a>*/}
                    {/*</div>*/}
                {/*</div>*/}

                <div className={styles.landingIntro}>
                    <div className={styles.landingIntroText}>
                        <div className={styles.landingIntroTextTitle}>
                            두드림퀵은
                        </div>
                        <div className={styles.landingIntroTextText}>
                            <p>
                                <span>만 65세 이상의 어르신</span>이 지하철을 이용하여 저렴하고 빠르게 물품을 배송해드리는 지하철 퀵서비스입니다.
                            </p>
                            <p>
                                두드림퀵은 지역별 노인일자리 전담기관인 시니어클럽과 연계하고 있으며, <span>배송지와 가까운 곳에 있는 기사님을 배정</span>하여 더욱 빠른 서비스를 제공합니다.
                                두드림퀵은 기사님들의 소득 향상 및 업무 환경 개선을 위해 최선을 다하고 있습니다.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.landingAppeal}>
                    <div className={styles.landingAppealTitle}>특별한 서비스 두드림퀵</div>
                    <div className={styles.landingAppealItemContainer}>
                        <div className={styles.landingAppealItem}>
                            <img className={styles.landingAppealItemImage} src={landing_coin} alt="두드림퀵 지하철 퀵서비스, 저렴한 요금"/>
                            <div className={styles.landingAppealItemTitle}>
                                저렴한 요금
                            </div>
                            <div className={styles.landingAppealItemText}>
                                지하철을 이용해 배송하므로 오토바이 퀵보다 최대 50% 저렴합니다.
                            </div>
                        </div>

                        <div className={styles.landingAppealItem}>
                            <img className={styles.landingAppealItemImage} src={landing_clock} alt="두드림퀵 지하철 퀵서비스, 신속 정확한 배송"/>
                            <div className={styles.landingAppealItemTitle}>
                                신속 정확한 배송
                            </div>
                            <div className={styles.landingAppealItemText}>
                                고객님과 가장 가까운 지역에 위치한 기사님을 매칭하여 신속한 배송 서비스를 제공합니다.
                            </div>
                        </div>

                        <div className={styles.landingAppealItem}>
                            <img className={styles.landingAppealItemImage} src={landing_pc} alt="두드림퀵 지하철 퀵서비스, 편리한 주문접수"/>
                            <div className={styles.landingAppealItemTitle}>
                                편리한 주문접수
                            </div>
                            <div className={styles.landingAppealItemText}>
                                두드림퀵 홈페이지를 통해 편리하게 주문접수를 하실 수 있습니다.
                            </div>
                        </div>

                        <div className={styles.landingAppealItem}>
                            <img className={styles.landingAppealItemImage} src={landing_phone} alt="두드림퀵 지하철 퀵서비스, 배송 알림 서비스"/>
                            <div className={styles.landingAppealItemTitle}>
                                배송 알림 서비스
                            </div>
                            <div className={styles.landingAppealItemText}>
                                카카오톡 알림톡을 통해 배송 상황을 알려드립니다.
                            </div>
                        </div>
                    </div>
                </div>

                {
                    this.state.notice_modal &&
                    <NoticeModal
                        show_modal={this.state.show_notice_modal}
                        close_modal={this.close_notice_modal}
                        notice_modal={this.state.notice_modal}/>
                }
            </div>
        )
    }
}


const mapStateToProps = state => state.user

export default connect(mapStateToProps)(Index)
