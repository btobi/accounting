import { combineReducers } from 'redux'

import pageReducer from './pageReducer';
import commonReducer from './commonReducer';
import masterdataReducer from './masterdataReducer';
import accountingReducer from './accountingReducer';
import { formReducer } from 'react-redux-forms'
import statisticsReducer from './statisticsReducer';


export default combineReducers({
    page: pageReducer,
    common: commonReducer,
    masterdata: masterdataReducer,
    accounting: accountingReducer,
    forms: formReducer,
    statistics: statisticsReducer
})