import{ combineReducers } from "redux"

import user from "./userReducer"
import stockReducer from "./stockReducer"
import pageReducer from "./pageReducer";


export default combineReducers({
    stocks : stockReducer,
    page: pageReducer
})