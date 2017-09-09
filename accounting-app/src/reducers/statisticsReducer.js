const defaultState = {
    accounts: []
}

export default function statisticsReducer(state=defaultState, action) {

    switch(action.type) {

        case "GET_ACCOUNTS_STATISTICS_FULFILLED": {
            return {...state, accounts: action.payload.data}
        }

    }

    return state

}