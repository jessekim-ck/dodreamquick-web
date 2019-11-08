import React from 'react'
import styles from "../app.module.css"

// redux
import {connect} from 'react-redux'

import landing_schema from "../assets/landing_schema.png"
import landing_coin from "../assets/landing_coin.png"
import landing_clock from "../assets/landing_clock.png"
import landing_pc from "../assets/landing_pc.png"
import landing_phone from "../assets/landing_phone.png"


const Index = props => {

    const landing_door = require("../assets/landing_door.png")

    return (
        <div>
            <div
                className={styles.landingDoor}
                style={{backgroundImage: `url(${landing_door}`}}>
                <div className={styles.landingDoorText}>
                    서울 전 지역 6,000원부터!<br/>
                    고객님의 집 앞까지 배송합니다
                </div>
                <div className={styles.landingDoorCTA}>
                    <button className={styles.CTAWhite}>배송 신청하기</button>
                    <button className={styles.CTAYellow}>문의하기</button>
                </div>
            </div>

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
                <div className={styles.landingIntroImage}>
                    <img src={landing_schema} width="100%" height="" alt=""/>
                </div>
            </div>

            <div className={styles.landingAppeal}>
                <div className={styles.landingAppealTitle}>특별한 서비스 두드림퀵</div>
                <div className={styles.landingAppealItemContainer}>
                    <div className={styles.landingAppealItem}>
                        <img className={styles.landingAppealItemImage} src={landing_coin} alt=""/>
                        <div className={styles.landingAppealItemTitle}>
                            저렴한 요금
                        </div>
                        <div className={styles.landingAppealItemText}>
                            지하철을 이용해 배송하므로<br/>
                            오토바이 퀵보다<br/>
                            최대 50% 저렴합니다.
                        </div>
                    </div>

                    <div className={styles.landingAppealItem}>
                        <img className={styles.landingAppealItemImage} src={landing_clock} alt=""/>
                        <div className={styles.landingAppealItemTitle}>
                            신속 정확한 배송
                        </div>
                        <div className={styles.landingAppealItemText}>
                            고객님과 가장 가까운<br/>
                            지역에 위치한 기사님을<br/>
                            매칭하여 신속한 배송<br/>
                            서비스를 제공합니다.
                        </div>
                    </div>

                    <div className={styles.landingAppealItem}>
                        <img className={styles.landingAppealItemImage} src={landing_pc} alt=""/>
                        <div className={styles.landingAppealItemTitle}>
                            편리한 주문접수
                        </div>
                        <div className={styles.landingAppealItemText}>
                            두드림퀵 홈페이지를 통해<br/>
                            편리하게 주문접수를<br/>
                            하실 수 있습니다.
                        </div>
                    </div>

                    <div className={styles.landingAppealItem}>
                        <img className={styles.landingAppealItemImage} src={landing_phone} alt=""/>
                        <div className={styles.landingAppealItemTitle}>
                            배송 알림 서비스
                        </div>
                        <div className={styles.landingAppealItemText}>
                            카카오톡 알림톡을 통해<br/>
                            배송 상황을 알려드립니다.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => state.user

export default connect(mapStateToProps)(Index)

