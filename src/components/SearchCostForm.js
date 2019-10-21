import React from 'react'
import {getLocationList, getOrderPrice} from "../apis/api";
import Table from 'react-bootstrap/Table'
import styles from '../app.module.css'


const SelectLocationForm = props => {

    const options = props.location_list.map(
        location => (<option value={location.name} key={location.id}>{location.name}</option>)
    )

    return (
        <select onChange={event => props.select_location(event.target.value)}>
            <option value="default" key={0}>주소 선택!</option>
            {options}
        </select>
    )
}


class SearchCostForm extends React.Component {

    state = {
        location_list: [],
        selected_departure_location: "",
        selected_arrival_location: "",
        order_price: ""
    }

    async componentDidMount() {
        const location_list = await getLocationList()
        this.setState({location_list})
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.selected_departure_location !== this.state.selected_departure_location ||
        prevState.selected_arrival_location !== this.state.selected_arrival_location) {
            await this.search_price()
        }
    }

    select_location = key => value => {
        this.setState({[key]: value})
    }

    search_price = async () => {
        const order_price = await getOrderPrice(this.state.selected_departure_location, this.state.selected_arrival_location)
        if (order_price !== 0) {
            this.setState({order_price})
        } else {
            this.setState({order_price: ""})
        }
    }

    render() {
        return (
            <div>
                <div className={styles.label}>
                    <div className={styles.title}>배송 요금 조회</div>
                    <div className={styles.description}>픽업지와 배송지의 지역구를 선택하신 후 [계산하기] 버튼을 클릭하여 주시기 바랍니다.</div>
                </div>

                <Table>
                    <thead>
                        <tr>
                            <th>픽업지</th>
                            <th>배송지</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div>
                                    <SelectLocationForm
                                        location_list={this.state.location_list}
                                        select_location={this.select_location("selected_departure_location")} />
                                </div>

                            </td>
                            <td>
                                <SelectLocationForm
                                    location_list={this.state.location_list}
                                    select_location={this.select_location("selected_arrival_location")} />
                            </td>
                        </tr>
                    </tbody>
                </Table>

                <div className={styles.label}>
                    <div className={styles.title}>계산 결과</div>
                    <div className={styles.description}>픽업지에서 배송지까지의 요금은</div>
                </div>

                <Table>
                    <thead>
                        <tr>
                            <th>픽업지</th>
                            <th>배송지</th>
                            <th>배송 요금</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.selected_departure_location}</td>
                            <td>{this.state.selected_arrival_location}</td>
                            <td>
                                {
                                    this.state.order_price &&
                                        this.state.order_price !== 0 &&
                                            <div>{this.state.order_price} 원</div>
                                }
                            </td>
                        </tr>
                    </tbody>
                </Table>

            </div>
        )
    }
}


export default SearchCostForm