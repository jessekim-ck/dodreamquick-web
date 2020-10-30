import {LOG_IN, LOG_OUT} from "../actions/user_actions";


const initial_state = {
    username: '',
    deposit: 0
}

const user_reducer = (state = initial_state, action) => {
    switch (action.type) {
        case LOG_IN:
            return ({...action.payload})
        case LOG_OUT:
            return initial_state
        default:
            return state
    }
}

export default user_reducer
