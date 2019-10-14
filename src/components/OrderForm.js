import React from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import policies from "../policies"
import PostCodeForm from "./PostCodeForm";


class OrderForm extends React.Component {

    state = {
        sender_name: '테스트',
        sender_phone: '01086422068',
        sender_address: '부산 어쩌구',
        sender_detail_address: '테스트',

        receiver_name: '테스트',
        receiver_phone: '01086422068',
        receiver_address: '부산 어쩌구',
        receiver_detail_address: '테스트',

        depositor: '테스트',

        pickup_time: '즉시 배송',
        carry_item: '테스트',
        memo: '테스트',
        coupon_code: '테스트',

        is_manual: false,
        agency_id: null,

        sender_address_finder: false,
        receiver_address_finder: false,
    }

    on_submit = async event => {
        await event.preventDefault();
        await event.stopPropagation();
        const make_order = await this.props.make_order({
            ...this.state,
            sender_address: this.state.sender_address + ' ' + this.state.sender_detail_address,
            receiver_address: this.state.receiver_address + ' ' + this.state.receiver_detail_address,
        })
        return make_order
    }

    on_change = event => {
        const name = event.target.name
        const value = event.target.value

        this.setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    on_complete = key => address => {
        this.setState({
            [key]: address,
            [key + "_finder"]: false
        })
    }

    render () {
        return (
            <Form onSubmit={this.on_submit}>
                <div id="sender_group">
                    <Form.Group>
                        <Form.Label>보내시는 분 성함</Form.Label>
                        <Form.Control
                            type="text"
                            name="sender_name"
                            value={this.state.sender_name}
                            onChange={event => this.on_change(event)}
                            placeholder="예: 홍길동" required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>보내시는 분 핸드폰 번호</Form.Label>
                        <Form.Control
                            type="text"
                            name="sender_phone"
                            value={this.state.sender_phone}
                            onChange={event => this.on_change(event)}
                            placeholder="01012345678" required />
                        <Form.Text className="text-muted">
                            "-"를 제외하고 입력해주세요. 입력해 주신 핸드폰 번호로 배송 알림 문자를 보내드립니다.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>출발지 (물품 수령 장소)</Form.Label>
                        <Form.Control
                            id="sender_address"
                            type="text"
                            placeholder="주소 (클릭하여 검색)"
                            value={this.state.sender_address}
                            onChange={event => this.on_change(event)}
                            onClick={() => this.setState(prevState => ({sender_address_finder: !prevState.sender_address_finder}))}
                            readOnly required />
                        {
                            this.state.sender_address_finder &&
                                <PostCodeForm on_complete={this.on_complete('sender_address')}/>
                        }
                        <Form.Control
                            id="sender_detail_address"
                            type="text"
                            name="sender_detail_address"
                            value={this.state.sender_detail_address}
                            onChange={event => this.on_change(event)}
                            placeholder="상세 주소 입력" required />
                        <Form.Text className="text-muted">
                            택배원이 배송 물품을 수령할 주소를 입력해주세요. 입력된 주소로 택배원이 물품을 가지러 갑니다.
                        </Form.Text>
                    </Form.Group>
                </div>


                <div id="receiver_group">
                    <Form.Group>
                        <Form.Label>받으시는 분 성함</Form.Label>
                        <Form.Control
                            type="text"
                            name="receiver_name"
                            value={this.state.receiver_name}
                            onChange={event => this.on_change(event)}
                            placeholder="예: 홍길동" required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>받으시는 분 핸드폰 번호</Form.Label>
                        <Form.Control
                            type="text"
                            name="receiver_phone"
                            value={this.state.receiver_phone}
                            onChange={event => this.on_change(event)}
                            placeholder="01012345678" required />
                        <Form.Text className="text-muted">
                            "-"를 제외하고 입력해주세요. 입력해 주신 핸드폰 번호로 배송 알림 문자를 보내드립니다.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>도착지 (배송 장소)</Form.Label>
                        <Form.Control
                            id="receiver_address"
                            type="text"
                            placeholder="주소 (클릭하여 검색)"
                            value={this.state.receiver_address}
                            onClick={() => this.setState(prevState => ({receiver_address_finder: !prevState.receiver_address_finder}))}
                            readOnly required />
                        {
                            this.state.receiver_address_finder &&
                            <PostCodeForm on_complete={this.on_complete('receiver_address')}/>
                        }
                        <Form.Control
                            id="receiver_detail_address"
                            type="text"
                            name="receiver_detail_address"
                            value={this.state.receiver_detail_address}
                            onChange={event => this.on_change(event)}
                            placeholder="상세 주소 입력" required />
                        <Form.Text className="text-muted">
                            택배원이 배송 물품을 전달할 주소를 입력해주세요. 입력된 주소로 택배원이 물품을 배송합니다.
                        </Form.Text>
                    </Form.Group>
                </div>

                <div>
                    <Form.Group>
                        <Form.Label>입금자명</Form.Label>
                        <Form.Control
                            type="text"
                            name="depositor"
                            value={this.state.depositor}
                            onChange={event => this.on_change(event)}
                            placeholder="예: 홍길동" required />
                    </Form.Group>
                </div>

                <div>
                    <Form.Group>
                        <Form.Label>배송 물품의 무게가 5kg 이하인가요?</Form.Label>
                        <Form.Check label="예" required />
                    </Form.Group>
                </div>

                <div>
                    <Form.Group>
                        <Form.Label>배송 물품</Form.Label>
                        <Form.Control
                            type="text"
                            name="carry_item"
                            value={this.state.carry_item}
                            onChange={event => this.on_change(event)}
                            placeholder="예: 꽃 바구니" />
                    </Form.Group>
                </div>

                <div>
                    <Form.Group>
                        <Form.Label>추가 요청사항 (선택)</Form.Label>
                        <Form.Control
                            type="text"
                            name="memo"
                            value={this.state.memo}
                            onChange={event => this.on_change(event)} />
                    </Form.Group>
                </div>

                <div>
                    <Form.Group>
                        <Form.Label>쿠폰 코드 (선택)</Form.Label>
                        <Form.Control
                            type="text"
                            name="coupon_code"
                            value={this.state.coupon_code}
                            onChange={event => this.on_change(event)} />
                    </Form.Group>
                </div>

                <div>
                    <Form.Group>
                        <Form.Label>개인 정보 수집 및 이용 동의</Form.Label>
                        <Form.Control as="textarea" rows="5" value={policies.personal_information_collection} readOnly />
                        <Form.Check label="예" required />
                    </Form.Group>
                </div>

                <div>
                    <Form.Group>
                        <Form.Label>개인 정보 제 3자 제공 동의</Form.Label>
                        <Form.Control as="textarea" rows="5" value={policies.personal_information_offer} readOnly />
                        <Form.Check label="예" required />
                    </Form.Group>
                </div>

                <Button type="submit">
                    배송 신청
                </Button>
            </Form>
        )
    }
}

export default OrderForm