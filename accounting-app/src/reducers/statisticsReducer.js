const defaultState = {
    accounts: [],
    spreadsheet: {
        columns: [],
        data: [],
        index: []
    }
}

export default function statisticsReducer(state=defaultState, action) {

    switch(action.type) {

        case "GET_ACCOUNTS_STATISTICS_FULFILLED": {
            return {...state, accounts: action.payload.data}
        }

        case "GET_SPREADSHEET_FULFILLED": {
            return {...state, spreadsheet: action.payload.data}
        }

    }

    return state

}