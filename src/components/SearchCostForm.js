import React from 'react'
import {getLocationList, getOrderPrices} from "../apis/api";
import Table from 'react-bootstrap/Table'
import styles from '../app.module.css'

const ReactGA = require('react-ga');

const SelectLocationForm = props => {

    const options = props.location_list.map(
        location => (<option value={location.name} key={location.id}>{location.name}</option>)
    )

    return (
        <select onChange={event => props.select_location(event.target.value)}>
            <option value="default" key={0}>주소 선택</option>
            {options}
        </select>
    )
}


class SearchCostForm extends React.Component {

    state = {
        location_list: [],
        selected_departure_location: "",
        selected_arrival_location: "",
        prices: null
    }

    async componentDidMount() {

        ReactGA.initialize('UA-158814088-1');
        ReactGA.pageview(window.location.pathname+window.location.search);

        const location_list = await getLocationList()
        const location_list_sorted = location_list.sort(
            (a, b) => (a.id < b.id) ? -1 : 1
        )
        this.setState({location_list: location_list_sorted})
        console.log(this.state.location_list)
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.selected_departure_location !== this.state.selected_departure_location ||
        prevState.selected_arrival_location !== this.state.selected_arrival_location) {
            await this.search_prices()
        }
    }

    select_location = key => value => {
        this.setState({[key]: value})
    }

    search_prices = async () => {
        const prices = await getOrderPrices(this.state.selected_departure_location, this.state.selected_arrival_location)
        this.setState({prices})
    }

    render() {
        return (
            <div>
                <div className={styles.searchCostForm}>
                    <div className={styles.searchCostFormLabel}>
                        <div className={styles.searchCostFormLabelTitle}>
                            배송 요금 조회
                        </div>
                        <div className={styles.searchCostFormLabelDescription}>
                            픽업지와 배송지의 지역구를 선택해주세요.
                        </div>
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
                </div>


                <div className={styles.searchCostForm}>
                    <div className={styles.searchCostFormLabel}>
                        <div className={styles.searchCostFormLabelTitle}>
                            계산 결과
                        </div>
                        <div className={styles.searchCostFormLabelDescription}>
                            픽업지에서 배송지까지의 요금은 다음과 같습니다.
                        </div>
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
                        {
                            this.state.prices && this.state.prices.default > 0 && (
                                <tr>
                                    <td>{this.state.selected_departure_location}</td>
                                    <td>{this.state.selected_arrival_location}</td>
                                    <td style={{maxWidth: '200px'}}>
                                        {
                                            this.state.prices &&
                                            <div>{this.state.prices.default.toLocaleString()} 원</div>
                                        }
                                        <span className={styles.searchCostDescription}>
                                            ※ 픽업지, 도착지가 지하철역으로부터 700m 바깥에 있을 경우 각각 배송 가격이 1,000원씩 상승됩니다.
                                        </span>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}


export default SearchCostForm
