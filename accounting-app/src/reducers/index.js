import{combineReducers} from "redux"

import stockReducer from "./stockReducer"
import pageReducer from "./pageReducer";
import commonReducer from "./commonReducer";
import masterdataReducer from "./masterdataReducer";
import accountingReducer from "./accountingReducer";


export default combineReducers({
    stocks: stockReducer,
    page: pageReducer,
    common: commonReducer,
    masterdata: masterdataReducer,
    accounting: accountingReducer,
})