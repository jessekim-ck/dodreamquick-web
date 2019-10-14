import React from 'react'
import {getLocationList, getOrderPrice} from "../apis/api";


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
        selected_departure_location: null,
        selected_arrival_location: null
    }

    async componentDidMount() {
        const location_list = await getLocationList()
        this.setState({location_list})
    }

    select_location = key => value => {
        this.setState({[key]: value})
    }

    search_price = async () => {
        const order_price = await getOrderPrice(this.state.selected_departure_location, this.state.selected_arrival_location)
        this.setState({order_price})
    }

    render() {
        return (
            <div>
                <div>
                    픽업 장소:
                    <SelectLocationForm
                        location_list={this.state.location_list}
                        select_location={this.select_location("selected_departure_location")} />
                </div>
                <div>
                    배송 장소:
                    <SelectLocationForm
                        location_list={this.state.location_list}
                        select_location={this.select_location("selected_arrival_location")} />
                </div>

                <div>
                    <button onClick={this.search_price}>갸격 찾기</button>
                </div>

                <div>
                    {
                        this.state.order_price ?
                            <div>{this.state.order_price}</div> :
                            <div>주소를 선택해주세요!</div>
                    }
                </div>
            </div>
        )
    }
}


export default SearchCostForm