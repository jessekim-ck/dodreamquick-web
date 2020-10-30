import {GET_SETTING} from "../actions/common_actions";


const initial_state = {
    setting: null
}

const common_reducer = (state = initial_state, action) => {
    switch (action.type) {
        case GET_SETTING:
            return ({...action.payload})
        default:
            return state
    }
}

export default common_reducer
