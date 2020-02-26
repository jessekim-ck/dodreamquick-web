import React from "react"
import Carousel from "react-bootstrap/Carousel"
import styles from '../app.module.css'

import intro_man from "../assets/intro_man.png"
import intro_senior from "../assets/intro_senior.png"
import intro_together from "../assets/intro_together.png"
import {Helmet} from "react-helmet/es/Helmet";


const HowToUse = () => {

    return (
        <div>
            <div>
                <Helmet>
                    <title>두드림퀵: 이용 방법</title>
                    <meta 
                        name="description"
                        content="두드림퀵 지하철 퀵서비스 이용 방법" />
                    <link rel="canonical" href="https://dodreamquick.com/how_to_use" />
                </Helmet>
            </div>
            <Carousel className={styles.carousel} indicators={false} interval={0}>
                <Carousel.Item>
                    <div className={styles.carouselItem}>
                        <div className={styles.carouselTitleMobile}>두드림퀵 이용 방법</div>
                        <div className={styles.carouselLeft}>
                            <img className={styles.carouselImg} src={intro_man} alt="두드림퀵 지하철 퀵서비스 이용 방법 1"/>
                        </div>
                        <div className={styles.carouselRight}>
                            <div className={styles.carouselTitleDesktop}>두드림퀵 이용 방법</div>
                            <div className={styles.carouselText}>
                                <div className={styles.carouselTextTitle}>1. 배송 신청</div>
                                <div className={styles.carouselTextText}>
                                    두드림퀵 홈페이지에서 배송 신청을 해주세요.
                                    택배원이 배정되면 배정 안내 알림톡을 보내드립니다.
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>

                <Carousel.Item>
                    <div className={styles.carouselItem}>
                        <div className={styles.carouselTitleMobile}>두드림퀵 이용 방법</div>
                        <div className={styles.carouselLeft}>
                            <img className={styles.carouselImg} src={intro_senior} alt="두드림퀵 지하철 퀵서비스 이용 방법 2"/>
                        </div>
                        <div className={styles.carouselRight}>
                            <div className={styles.carouselTitleDesktop}>두드림퀵 이용 방법</div>
                            <div className={styles.carouselText}>
                                <div className={styles.carouselTextTitle}>2. 물품 픽업</div>
                                <div className={styles.carouselTextText}>
                                    택배원이 보내시는 분이 계신 곳에 방문하여 물품을 픽업합니다.
                                    택배원의 위치가 궁금하시다면 알림톡에 안내된 택배원 연락처로 연락해주세요.
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>

                <Carousel.Item>
                    <div className={styles.carouselItem}>
                        <div className={styles.carouselTitleMobile}>두드림퀵 이용 방법</div>
                        <div className={styles.carouselLeft}>
                            <img className={styles.carouselImg} src={intro_together} alt="두드림퀵 지하철 퀵서비스 이용 방법 3"/>
                        </div>
                        <div className={styles.carouselRight}>
                            <div className={styles.carouselTitleDesktop}>두드림퀵 이용 방법</div>
                            <div className={styles.carouselText}>
                                <div className={styles.carouselTextTitle}>3. 배송 완료</div>
                                <div className={styles.carouselTextText}>
                                    택배원이 받으시는 분이 계신 곳에 도착하여 물품 배송을 완료합니다.
                                    물품 배송이 완료되면 배송 완료 알림톡을 보내드립니다.
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>

            <div className={styles.contentContainer}>
                <div className={styles.introTableContainer}>
                    <div className={styles.introTableTitle}>
                        배송 관련 사항 안내
                    </div>

                    <div className={styles.introTable}>
                        <div className={styles.introTableRow}>
                            <div className={styles.introTableRowTitle}>
                                배송 가능 지역
                            </div>
                            <div className={styles.introTableRowText}>
                                배송 가능 지역은 <span>서울 전 지역 및 경기, 인천 지역</span>입니다.
                                지하철을 통한 배송이 불가능한 지역의 경우에는 배송이 제한될 수 있습니다.
                            </div>
                        </div>

                        <div className={styles.introTableRow}>
                            <div className={styles.introTableRowTitle}>
                                배송 소요 시간
                            </div>
                            <div className={styles.introTableRowText}>
                                평균 배송 소요 시간은 <span>서울 지역</span>의 경우 <span>택배원 배정 후 3시간 내외,</span>
                                <span>인천 및 경기 지역</span>의 경우 <span>택배원 배정 후 4시간 내외</span>입니다.
                            </div>
                        </div>
 
                        <div className={styles.introTableRow}>
                            <div className={styles.introTableRowTitle}>
                                주문 접수 가능 시간
                            </div>
                            <div className={styles.introTableRowText}>
                                주문 접수 가능 시간은 <span>월-금요일 오전 9시-오후 5시</span>입니다.
                                (토, 일요일/공휴일 휴무) 해당 시간 이외에 주문하시는 경우 접수되지 않으니 유의해주세요.
                            </div>
                        </div>

                        <div className={styles.introTableRow}>
                            <div className={styles.introTableRowTitle}>
                                배송 취소 및 환불
                            </div>
                            <div className={styles.introTableRowText}>
                                주문 접수 후 기사님이 배정되어 고객님께 <span>접수 확인 알림톡이 전송되면 취소와 환불이 불가능</span>합니다.
                                택배원 배정 알림톡이 전송되기 전에 주문을 취소하고 싶으신 경우 카카오톡 플러스친구 '두드림퀵'으로 문의해주세요.

                            </div>
                        </div>

                        <div className={styles.introTableRow}>
                            <div className={styles.introTableRowTitle}>
                                배송 불가능 품목
                            </div>
                            <div className={styles.introTableRowText}>
                                노인 택배원이 운반하기 어려운 <span>5kg 이상의 물품은 배송이 제한됩니다.</span>
                                또한, 지하철 안전 수칙에 따라 악취가 나는 물질, 알루미늄 풍선, 위해물품, 동물 등은 배송이 불가하니 양해 부탁드립니다.
                            </div>
                        </div>

                        <div className={styles.introTableRow}>
                            <div className={styles.introTableRowTitle}>
                                주의사항
                            </div>
                            <div className={styles.introTableRowText}>
                                전화 문의가 불가능합니다.
                                택배원 현 위치 등이 궁금하시면 <span>알림톡에 안내된 택배원 또는 시니어클럽 전화번호</span>로 문의해주세요.
                                또한, 배송 예약은 받지 않습니다.
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default HowToUse