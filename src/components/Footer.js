import React from "react"
import styles from "../app.module.css"


const Footer = () => {

    return (
        <div className={styles.footer}>
            <div className={styles.footerTitle}>
                (주) 두드림퀵 사업자 정보
            </div>
            <div className={styles.footerText}>
                <div>상호명: 두드림퀵 | 대표: 양승훈</div>
                <div>사업자등록번호 : 811-88-01483</div>
                <div>통신판매번호: 제2019-서울금천-1887호</div>
                <div>본사 : 서울특별시 금천구 가산디지털2로 98, 롯데IT캐슬 2동 1107호</div>
                <br/>
                <div>고객센터 상담시간 : 평일 09:00~17:00(주말 및 공휴일 휴무)</div>
            </div>
            <div className={styles.footerPolicy}>
                <a href="/policy/use" className={styles.footerPolicyLink}>이용 약관</a>
                <a href="/policy/personal_information" className={styles.footerPolicyLink}>개인정보 처리 방침</a>
            </div>
        </div>
    )
}

export default Footer
