import{ combineReducers } from "redux"

import user from "./userReducer"
import stockReducer from "./stockReducer"


export default combineReducers({
    stocks : stockReducer,
})