import React from 'react'
import Form from "react-bootstrap/Form";
import PostCodeForm from "./PostCodeForm";
import styles from "../app.module.css"
import {getOrderPrice, getPolicy, getUserDefaultLocations} from "../apis/api";
import ManageLocationModal from "./ManageLocationModal";
import ManageMemoModal from "./ManageMemoModal";
import {connect} from "react-redux";

class OrderForm extends React.Component {

    alert_cake = (event) => {
        if (event.target.value === "케이크" || event.target.value === "케익") {
            alert("케이크가 고정되어 있지 않은 경우 배송이 제한될 수 있으니 확인 부탁드리겠습니다!")
        }
    }

    receiver_request_messages = [
        '수령자 부재 시 전화 주세요.',
        '부재 시 문 앞에 놔주세요.',
        '부재 시 경비실에 맡겨 주세요.'
    ]

    state = {
        sender_name: '',
        sender_phone: '',
        sender_address: '',
        sender_address_detail: '',

        receiver_name: '',
        receiver_phone: '',
        receiver_address: '',
        receiver_address_detail: '',
        receiver_request_message: this.receiver_request_messages[0],

        depositor: '',

        pickup_time: '즉시 배송',
        carry_item: '',
        carry_item_price: null,
        memo: '',
        coupon_code: '',

        is_manual: false,
        agency_id: null,

        sender_address_finder: false,
        receiver_address_finder: false,

        notificate_sender: true,
        notificate_receiver: false,

        agree_all: false,
        agree_first_policy: false,
        agree_second_policy: false,
        agree_third_policy: false,

        credit_card: true,

        policies: [],
        show_first_policy: false,
        show_second_policy: false,

        show_modal: false,
        modal_target: "",

        price: 0,

        isSubmitting: false
    }

    async componentDidMount() {
        const default_locations = await getUserDefaultLocations()

        if (default_locations) {
            const default_departure_location = await default_locations.default_departure_location
            const default_arrival_location = await default_locations.default_arrival_location

            if (default_departure_location) {
                this.setState({
                    sender_name: default_departure_location.name || "",
                    sender_address: default_departure_location.location || "",
                    sender_address_detail: default_departure_location.location_detail || "",
                    sender_phone: default_departure_location.phone || "",
                })
            }

            if (default_arrival_location) {
                this.setState({
                    receiver_name: default_arrival_location.name || "",
                    receiver_address: default_arrival_location.location || "",
                    receiver_address_detail: default_arrival_location.location_detail || "",
                    receiver_phone: default_arrival_location.phone || "",
                })
            }

            await this.update_order_price()
        }
        const policies = await getPolicy()
        this.setState({policies})
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.sender_address && this.state.receiver_address) {
            if (prevState.sender_address !== this.state.sender_address ||
                prevState.receiver_address !== this.state.receiver_address) {
                await this.update_order_price()
            }
        }
    }

    update_order_price = async () => {
        const price = await getOrderPrice(this.state.sender_address, this.state.receiver_address)
        this.setState({price})
    }

    on_submit_order = async event => {
        this.setState({ isSubmitting: true });
        await event.preventDefault();
        await event.stopPropagation();

        if (!this.state.price) {
            alert("주문할 수 없는 지역입니다! 두드림퀵 카카오톡 플러스친구로 문의해주세요.")
            this.setState({ isSubmitting: false });
            return 0
        }
        const make_order = await this.props.make_order({
            ...this.state,
            sender_address: this.state.sender_address + ' ' + this.state.sender_address_detail,
            receiver_address: this.state.receiver_address + ' ' + this.state.receiver_address_detail,
            memo: `${this.state.memo}${this.state.receiver_request_message === '없습니다.' ? '' : ' / ' + this.state.receiver_request_message}`,
            price: this.state.coupon_code === '신속배송' ? this.state.price * 0.9 : this.state.price
        })
        if (make_order) {
            setTimeout(() => {
                this.setState({ isSubmitting: false });
            }, 3000);
        } else {
            this.setState({ isSubmitting: false });
        }
        return make_order
    }

    on_change = async event => {
        const name = event.target.name
        const value = event.target.value

        this.setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    on_change_receiver_request_message = async event => {
        const value = event.target.value
        this.setState(prevState => ({
            ...prevState,
            receiver_request_message: value
        }))
    }

    on_toggle = event => {
        const name = event.target.name
        const checked = event.target.checked

        if (name === "agree_all") {
            this.setState({
                agree_all: checked,
                agree_first_policy: checked,
                agree_second_policy: checked,
                agree_third_policy: checked
            })
            return 1
        }

        this.setState({
            [name]: checked
        })
    }

    on_complete_search = key => address => {
        this.setState({
            [key]: address,
            [key + "_detail"]: "",
            [key + "_finder"]: false,
        })
    }

    on_select_location = key => user_location => {
        this.setState({
            [`${key}_name`]: user_location.name,
            [`${key}_address`]: user_location.location,
            [`${key}_address_detail`]: user_location.location_detail,
            [`${key}_phone`]: user_location.phone
        })
        this.close_modal()
    }

    on_select_memo = key => user_memo => {
        this.setState({
            memo: user_memo,
        })
        this.close_modal()
    }

    open_modal = target => {
        this.setState({
            show_modal: true,
            modal_target: target
        })
    }

    close_modal = () => {
        this.setState({show_modal: false})
    }

    render() {
        const receiver_request_message_select_value = this.receiver_request_messages.includes(this.state.receiver_request_message) ? this.state.receiver_request_message : ''
        return (
            <div>
                <Form onSubmit={this.on_submit_order}>

                    <div id="sender_group" className={styles.orderFormSection}>

                        <div className={styles.orderFormSectionLabel}>
                            1. 픽업지 정보 입력
                        </div>


                        <div className={styles.orderFormSectionBox}>
                            <Form.Group className={styles.orderFormSectionRow}>
                                <Form.Label className={styles.orderFormSectionRowName}>
                                    성함
                                </Form.Label>
                                <div className={styles.orderFormSectionRowInput}>
                                    <Form.Control
                                        type="text"
                                        name="sender_name"
                                        value={this.state.sender_name}
                                        onChange={event => this.on_change(event)}
                                        placeholder="예: 홍길동" required/>
                                </div>
                            </Form.Group>

                            <Form.Group className={styles.orderFormSectionRow}>
                                <Form.Label className={styles.orderFormSectionRowName}>핸드폰 번호</Form.Label>
                                <div className={styles.orderFormSectionRowInput}>
                                    <Form.Control
                                        type="tel"
                                        name="sender_phone"
                                        value={this.state.sender_phone}
                                        onChange={event => this.on_change(event)}
                                        placeholder="01012345678" required/>
                                    <Form.Text className="text-muted">
                                        "-"를 제외하고 입력해주세요. 입력해 주신 핸드폰 번호로 배송 알림톡을 보내드립니다.
                                    </Form.Text>
                                </div>
                            </Form.Group>

                            <Form.Group className={styles.orderFormSectionRow}>
                                <Form.Label className={styles.orderFormSectionRowName}>주소</Form.Label>
                                <div className={styles.orderFormSectionRowInput}>
                                    <Form.Control
                                        id="sender_address"
                                        type="text"
                                        placeholder="주소 (클릭하여 검색)"
                                        value={this.state.sender_address}
                                        onChange={event => this.on_change(event)}
                                        onClick={() => this.setState(prevState => ({sender_address_finder: !prevState.sender_address_finder}))}
                                        readOnly required/>
                                    {
                                        this.state.sender_address_finder &&
                                        <PostCodeForm on_complete={this.on_complete_search('sender_address')}/>
                                    }
                                    <Form.Control
                                        id="sender_address_detail"
                                        type="text"
                                        name="sender_address_detail"
                                        value={this.state.sender_address_detail}
                                        onChange={event => this.on_change(event)}
                                        placeholder="상세 주소 입력" required/>
                                    <Form.Text className="text-muted">
                                        주소 검색을 통해 시, 구가 포함된 정확한 주소를 입력해주세요. 입력된 주소로 택배원이 물품을 가지러 갑니다.
                                    </Form.Text>
                                    <Form.Text className="text-muted">
                                        버스 또는 도보 이동 경로가 지나치게 긴 경우 원칙적으로 주문 접수가 취소될 수 있습니다.
                                    </Form.Text>
                                </div>
                            </Form.Group>

                            {
                                this.props.username &&
                                <button
                                    type="button"
                                    className={styles.basicButtonGreen}
                                    onClick={() => this.open_modal("sender")}>
                                    주소지 목록
                                </button>
                            }
                        </div>

                    </div>


                    <div id="receiver_group" className={styles.orderFormSection}>

                        <div className={styles.orderFormSectionLabel}>
                            2. 배송지 정보 입력
                        </div>

                        <div className={styles.orderFormSectionBox}>
                            <Form.Group className={styles.orderFormSectionRow}>
                                <Form.Label className={styles.orderFormSectionRowName}>성함</Form.Label>
                                <div className={styles.orderFormSectionRowInput}>
                                    <Form.Control
                                        type="text"
                                        name="receiver_name"
                                        value={this.state.receiver_name}
                                        onChange={event => this.on_change(event)}
                                        placeholder="예: 홍길동" required/>
                                </div>
                            </Form.Group>

                            <Form.Group className={styles.orderFormSectionRow}>
                                <Form.Label className={styles.orderFormSectionRowName}>핸드폰 번호</Form.Label>
                                <div className={styles.orderFormSectionRowInput}>
                                    <Form.Control
                                        type="tel"
                                        name="receiver_phone"
                                        value={this.state.receiver_phone}
                                        onChange={event => this.on_change(event)}
                                        placeholder="01012345678" required/>
                                    <Form.Text className="text-muted">
                                        "-"를 제외하고 입력해주세요. 입력해 주신 핸드폰 번호로 배송 알림톡을 보내드립니다.
                                    </Form.Text>
                                </div>
                            </Form.Group>

                            <Form.Group className={styles.orderFormSectionRow}>
                                <Form.Label className={styles.orderFormSectionRowName}>주소</Form.Label>
                                <div className={styles.orderFormSectionRowInput}>
                                    <Form.Control
                                        id="receiver_address"
                                        type="text"
                                        placeholder="주소 (클릭하여 검색)"
                                        value={this.state.receiver_address}
                                        onChange={event => this.on_change(event)}
                                        onClick={() => this.setState(prevState => ({receiver_address_finder: !prevState.receiver_address_finder}))}
                                        readOnly required/>
                                    {
                                        this.state.receiver_address_finder &&
                                        <PostCodeForm on_complete={this.on_complete_search('receiver_address')}/>
                                    }
                                    <Form.Control
                                        id="receiver_address_detail"
                                        type="text"
                                        name="receiver_address_detail"
                                        value={this.state.receiver_address_detail}
                                        onChange={event => this.on_change(event)}
                                        placeholder="상세 주소 입력" required/>
                                    <Form.Text className="text-muted">
                                        주소 검색을 통해 시, 구가 포함된 정확한 주소를 입력해주세요. 입력된 주소로 택배원이 물품을 전달합니다.
                                    </Form.Text>
                                    <Form.Text className="text-muted">
                                        버스 또는 도보 이동 경로가 지나치게 긴 경우 원칙적으로 주문 접수가 취소될 수 있습니다.
                                    </Form.Text>
                                </div>
                            </Form.Group>

                            {
                                this.props.username &&
                                <button
                                    type="button"
                                    className={styles.basicButtonGreen}
                                    onClick={() => this.open_modal("receiver")}>
                                    주소지 목록
                                </button>
                            }

                            <Form.Group className={styles.orderFormSectionRow}>
                                <Form.Label className={styles.orderFormSectionRowName}>물품 수령자<br />부재 시 요청 사항</Form.Label>
                                <div className={styles.orderFormSectionRowInput}>
                                    <Form.Control
                                        as="select"
                                        value={receiver_request_message_select_value}
                                        onChange={event => this.on_change_receiver_request_message(event)}
                                    >
                                        {this.receiver_request_messages.map(msg => (
                                            <option key={msg}>{msg}</option>
                                        ))}
                                        <option value=''>기타 - 직접입력</option>
                                    </Form.Control>
                                    {receiver_request_message_select_value === ''
                                        ? (
                                            <Form.Control
                                                type="text"
                                                id="receiver_request_message"
                                                name="receiver_request_message"
                                                value={this.state.receiver_request_message}
                                                onChange={event => this.on_change(event)}
                                                maxLength={200}
                                                placeholder="요청사항 입력" required/>
                                        )
                                        : null}
                                </div>
                            </Form.Group>

                        </div>

                    </div>

                    <div className={styles.orderFormSection}>

                        <div className={styles.orderFormSectionLabel}>
                            3. 기타 정보 입력
                        </div>

                        <div className={styles.orderFormSectionBox}>

                            <Form.Group className={styles.orderFormSectionRow}>
                                <Form.Label className={styles.orderFormSectionRowName}>배송 물품</Form.Label>
                                <div className={styles.orderFormSectionRowInput}>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="carry_item"
                                        value={this.state.carry_item}
                                        onChange={event => this.on_change(event) && this.alert_cake(event)}
                                        placeholder="예: 꽃 바구니"/>
                                </div>
                            </Form.Group>

                            <Form.Group className={styles.orderFormSectionRow}>
                                <Form.Label className={styles.orderFormSectionRowName}>물품가액 (선택)</Form.Label>
                                <div className={styles.orderFormSectionRowInput}>
                                    <Form.Control
                                        type="number"
                                        name="carry_item_price"
                                        value={this.state.carry_item_price}
                                        onChange={event => this.on_change(event)}
                                        placeholder="예: 50000"/>
                                    <Form.Text className="text-muted">
                                        물품가액이 300,000원 이상일 경우 원칙적으로 주문 접수가 거절될 수 있습니다.
                                    </Form.Text>
                                </div>
                            </Form.Group>

                            <Form.Group className={styles.orderFormSectionRow}>
                                <Form.Label className={styles.orderFormSectionRowName}>배송 무게 제한</Form.Label>
                                <div className={styles.orderFormSectionRowInput}>
                                    <Form.Check id="agree_weight" label="배송 물품의 무게가 5kg 이하입니다" required/>
                                    <Form.Text className="text-muted">
                                        배송 물품의 무게가 5kg 이상일 시 배송이 취소됩니다.
                                    </Form.Text>
                                </div>
                            </Form.Group>


                            <Form.Group className={styles.orderFormSectionRow}>
                                <Form.Label className={styles.orderFormSectionRowName}>알림톡 수신</Form.Label>
                                <div className={styles.orderFormSectionRowInput}>
                                    <Form.Check
                                        inline
                                        id="notificate_sender"
                                        name="notificate_sender"
                                        type="checkbox"
                                        label="보내시는 분"
                                        checked={this.state.notificate_sender}
                                        onChange={event => this.on_toggle(event)}/>
                                    <Form.Check
                                        inline
                                        id="notificate_receiver"
                                        name="notificate_receiver"
                                        type="checkbox"
                                        label="받으시는 분"
                                        checked={this.state.notificate_receiver}
                                        onChange={event => this.on_toggle(event)}/>
                                    <Form.Text className="text-muted">
                                        택배원 배정 안내, 픽업 완료 안내, 배송 완료 안내를 카카오톡 알림톡으로 보내드립니다.
                                    </Form.Text>
                                </div>
                            </Form.Group>


                            <Form.Group className={styles.orderFormSectionRow}>
                                <Form.Label className={styles.orderFormSectionRowName}>추가 요청사항 (선택)</Form.Label>
                                <div className={styles.orderFormSectionRowInput}>
                                    <Form.Control
                                        type="text"
                                        name="memo"
                                        value={this.state.memo}
                                        onChange={event => this.on_change(event)}/>
                                    <Form.Text className="text-muted">
                                        보내시는/받으시는 분이 부재중이실 예정인 경우 물건을 찾을/둘 위치를 꼭 기입해주세요.
                                    </Form.Text>
                                    <Form.Text className="text-muted">
                                        예 : 픽업지 도착 10분 전 전화 주세요. / 배송지에 부재 시 현관문 앞에 놔 주세요. 
                                    </Form.Text>
                                </div>

                            </Form.Group>

                            {
                                this.props.username &&
                                <button
                                    type="button"
                                    className={styles.basicButtonGreen}
                                    onClick={() => this.open_modal("memo")}>
                                    요청사항 목록
                                </button>
                            }

                            <Form.Group className={styles.orderFormSectionRow}>
                                <Form.Label className={styles.orderFormSectionRowName}>쿠폰코드 (선택)</Form.Label>
                                <div className={styles.orderFormSectionRowInput}>
                                    <Form.Control
                                        type="text"
                                        name="coupon_code"
                                        value={this.state.coupon_code}
                                        onChange={event => this.on_change(event)}/>
                                    <Form.Text className="text-muted">
                                        받으신 쿠폰 코드를 기입해주시면 결제 시 쿠폰에 해당하는 금액을 할인해드립니다.
                                    </Form.Text>
                                </div>

                            </Form.Group>

                        </div>

                    </div>

                    <div className={styles.orderFormSection}>
                        <div className={styles.orderFormSectionLabel}>
                            4. 결제 정보
                        </div>

                        <div className={styles.orderFormSectionBox}>
                            <Form.Group className={styles.orderFormSectionRow}>
                                <Form.Label className={styles.orderFormSectionRowName}>
                                    결제 금액
                                </Form.Label>
                                <Form.Label className={[styles.orderFormSectionRowInput, styles.priceRow].join(' ')}>
                                    <p className={this.state.coupon_code === '신속배송' ? styles.prevPrice : ''}>{this.state.price} 원</p>
                                    { this.state.coupon_code === '신속배송' ? (<p>{this.state.price * 0.9} 원</p>) : '' }
                                </Form.Label>
                            </Form.Group>

                            <Form.Group className={styles.orderFormSectionRow}>
                                <Form.Label className={styles.orderFormSectionRowName}>결제 방식</Form.Label>
                                <div className={styles.orderFormSectionRowInput}>
                                    <Form.Check
                                        inline
                                        name="credit_card"
                                        type="radio"
                                        label="카드 결제"
                                        checked={this.state.credit_card}
                                        onChange={event => this.on_toggle(event)}/>
                                    <Form.Text className="text-muted">
                                        계좌이체를 원하시는 분은 배송신청을 누르신 후 두드림퀵 카카오 채널로 연락 주세요.
                                    </Form.Text>
                                </div>
                            </Form.Group>
                        </div>
                    </div>

                    <div className={styles.orderFormSection}>

                        <div className={styles.orderFormSectionLabel}>
                            5. 약관 동의
                        </div>

                        <div className={styles.orderFormSectionBox}>
                            <Form.Group className={styles.orderFormSectionFlexRow}>
                                <Form.Check
                                    id="agree_all"
                                    name="agree_all"
                                    checked={this.state.agree_all}
                                    onChange={event => this.on_toggle(event)}
                                    label="전체 동의"/>
                            </Form.Group>

                            <Form.Group className={styles.orderFormSectionFlexRow}>
                                <Form.Check
                                    id="agree_first_policy"
                                    name="agree_first_policy"
                                    checked={this.state.agree_first_policy}
                                    onChange={event => this.on_toggle(event)}
                                    label="두드림퀵의 이용 약관에 동의합니다." required/>
                                <div
                                    style={{cursor: 'pointer'}}
                                    onClick={() => this.setState(prevState => ({show_first_policy: !prevState.show_first_policy}))}>
                                    [내용 보기]
                                </div>
                            </Form.Group>
                            {
                                this.state.show_first_policy &&
                                <Form.Control style={{fontSize: 12, margin: 12}} as="textarea" rows="5"
                                              value={this.state.policies.terms_of_use} readOnly/>
                            }

                            <Form.Group className={styles.orderFormSectionFlexRow}>
                                <Form.Check
                                    id="agree_second_policy"
                                    name="agree_second_policy"
                                    checked={this.state.agree_second_policy}
                                    onChange={event => this.on_toggle(event)}
                                    label="개인정보 처리 방침 및 개인정보 제 3자 제공에 동의합니다." required/>
                                <div
                                    style={{cursor: 'pointer'}}
                                    onClick={() => this.setState(prevState => ({show_second_policy: !prevState.show_second_policy}))}>
                                    [내용 보기]
                                </div>
                            </Form.Group>
                            {
                                this.state.show_second_policy &&
                                <Form.Control style={{fontSize: 12, margin: 12}} as="textarea" rows="5"
                                              value={this.state.policies.personal_information} readOnly/>
                            }

                            <Form.Group className={styles.orderFormSectionFlexRow}>
                                <Form.Check
                                    required
                                    id="agree_third_policy"
                                    name="agree_third_policy"
                                    checked={this.state.agree_third_policy}
                                    onChange={event => this.on_toggle(event)}
                                    label="물품가액을 신고하지 않은 화물의 멸실, 훼손, 연착 배상액은 100,000원을 넘을 수 없음을 확인합니다."
                                />
                            </Form.Group>
                        </div>

                    </div>

                    <div className={styles.orderFormSubmit}>
                        {
                            this.state.isSubmitting
                                ? (
                                    <button className={[styles.CTAGreen, styles.loading].join(' ')} type="button">
                                        잠시만 기다려주세요...
                                    </button>
                                )
                                : (
                                    <button className={styles.CTAGreen} type="submit">
                                        배송 신청
                                    </button>
                                )
                        }
                    </div>
                </Form>

                {
                    this.props.username && (
                        this.state.modal_target === 'memo'
                            ? (
                                <ManageMemoModal
                                    show_modal={this.state.show_modal}
                                    close_modal={this.close_modal}
                                    on_select_memo={this.on_select_memo(this.state.modal_target)}/>
                            )
                            : (
                                <ManageLocationModal
                                    show_modal={this.state.show_modal}
                                    close_modal={this.close_modal}
                                    on_select_location={this.on_select_location(this.state.modal_target)}/>
                            )
                    )
                }

            </div>
        )
    }
}

const mapStateToProps = state => state.user

export default connect(mapStateToProps)(OrderForm)
