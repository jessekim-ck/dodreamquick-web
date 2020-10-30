import {combineReducers} from "redux";
import user_reducer from "./user_reducer"
import common_reducer from "./common_reducer"

const reducer = combineReducers({
    common: common_reducer,
    user: user_reducer
})

export default reducer
