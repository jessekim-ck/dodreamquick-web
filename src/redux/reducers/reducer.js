import {combineReducers} from "redux";
import user_reducer from "./user_reducer"


const reducer = combineReducers({
    user: user_reducer
})

export default reducer
