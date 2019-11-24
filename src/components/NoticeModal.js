import React from 'react'
import Modal from 'react-bootstrap/Modal'
import styles from "../app.module.css"


const NoticeModal = props => {

    return (
        <Modal 
            className={styles.noticeModal}
            size="lg"
            show={props.show_modal} 
            onHide={props.close_modal}>
                <div>
                    <img 
                        width="100%"
                        src={props.notice_modal.image} 
                        alt=""/>
                    <div className={styles.noticeModalFooter}>
                        <div onClick={props.close_modal}>
                            창 닫기
                        </div>
                    </div>
                </div>
                
        </Modal>
    )
}

export default NoticeModal