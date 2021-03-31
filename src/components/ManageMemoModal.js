import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import {
    addUserMemo,
    deleteUserMemo,
    getUserMemoList,
    setDefaultMemo
} from "../apis/api";
import styles from "../app.module.css"


const MemItem = props => {

    return (
        <div className={styles.memoItem}>
            <div className={styles.name}>
                <div>
                    {
                        props.memo.is_default &&
                        <span className={styles.sticker}>기본 요청사항</span>
                    }
                </div>
                <div>{props.memo.memo}</div>
            </div>
            <div className={styles.buttons}>
                <button
                    className={styles.basicButtonGreen}
                    onClick={() => {if (props.on_select_memo) {props.on_select_memo(props.memo.memo)}}}>
                    선택
                </button>
                <button
                    className={styles.basicButtonWhite}
                    onClick={() => props.delete_memo(props.memo.id)}>
                    삭제
                </button>
            </div>

        </div>
    )
}


class MemoListView extends React.Component {

    memo_items = () => this.props.memo_list.map(
        memo => (
            <MemItem
                memo={{...memo}}
                delete_memo={this.props.delete_memo}
                on_select_memo={this.props.on_select_memo}
                key={memo.id}/>
        )
    )

    render() {
        return (
            <div>
                {this.memo_items()}
                <button
                    className={styles.addMemoButton}
                    onClick={this.props.start_add_memo} >
                    + 요청사항 추가
                </button>
            </div>
        )
    }
}


class MemoAddForm extends React.Component {

    state = {
        memo: "",
        is_default: false
    }

    add_memo = async event => {
        event.preventDefault()
        const memo = await addUserMemo(this.state.memo)
        if (this.state.is_default) {
            await setDefaultMemo(memo.id)
        }
        await this.props.update_memo_list()
        this.props.stop_add_memo()
    }

    on_complete = memo => {
        this.setState({memo: memo})
    }

    on_change = event => {
        const name = event.target.name
        const value = event.target.value

        this.setState({[name]: value})
    }

    render() {
        return (
            <div>
                <Form onSubmit={event => this.add_memo(event)}>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            name="memo"
                            placeholder="요청사항 내용"
                            value={this.state.memo}
                            className={styles.orderFormSectionRowInput}
                            onChange={event => this.on_change(event)}
                            required />
                    </Form.Group>

                    <Form.Group className={styles.orderFormSectionFlexRow}>
                        <Form.Check
                            id="is_default"
                            className={styles.orderFormSectionRowInput}
                            onChange={event => this.setState({
                                is_default: event.target.checked
                            })}
                            label="기본 요청사항으로 설정" />
                    </Form.Group>

                    <button className={styles.saveMemoButton} type="submit">저장</button>
                    <button className={styles.addMemoButton} onClick={this.props.stop_add_memo}>목록 보기</button>
                </Form>
            </div>
        )
    }
}


class ManageMemoModal extends React.Component {

    state = {
        memo_list: [],
        adding_memo: false,
    }

    update_memo_list = async () => {
        const memo_list = await getUserMemoList()
        const sorted = await memo_list.sort(
            (a, b) => {
                if (a.is_default) {
                    return -1
                } else if (b.is_default) {
                    return 1
                } else {
                    return 0
                }
            }
        )
        this.setState({memo_list: sorted})
    }

    async componentDidMount() {
        await this.update_memo_list()
    }

    start_add_memo = () => {
        this.setState({adding_memo: true})
    }

    stop_add_memo = () => {
        this.setState({adding_memo: false})
    }

    delete_memo = async memo_id => {
        await deleteUserMemo(memo_id)
        await this.update_memo_list()
    }

    hide_modal = () => {
        this.props.close_modal();
        this.setState({adding_memo: false})
    }

    render() {
        return (
            <Modal
                show={this.props.show_modal}
                onHide={this.hide_modal}>
                <Modal.Header>
                    <div>요청사항 관리</div>
                    <div onClick={this.hide_modal}>X</div>
                </Modal.Header>
                <Modal.Body className={styles.manageMemoModal}>
                    {
                        this.state.adding_memo ?
                            <MemoAddForm
                                update_memo_list={this.update_memo_list}
                                stop_add_memo={this.stop_add_memo}/> :
                            <MemoListView
                                on_select_memo={this.props.on_select_memo}
                                start_add_memo={this.start_add_memo}
                                delete_memo={this.delete_memo}
                                memo_list={this.state.memo_list}/>
                    }
                </Modal.Body>
            </Modal>
        )
    }
}

export default ManageMemoModal
