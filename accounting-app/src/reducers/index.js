import { combineReducers } from 'redux'

import pageReducer from './pageReducer';
import commonReducer from './commonReducer';
import masterdataReducer from './masterdataReducer';
import accountingReducer from './accountingReducer';
import statisticsReducer from './statisticsReducer';
import formReducer from './formReducer';


export default combineReducers({
    page: pageReducer,
    common: commonReducer,
    masterdata: masterdataReducer,
    accounting: accountingReducer,
    forms: formReducer,
    statistics: statisticsReducer
})