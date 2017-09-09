const defaultState = {
    stocks: {}
}

export default function stockReducer(state = defaultState, action) {

    switch (action.type) {
        case "FETCH_STOCKS_PENDING": {
            console.log("PENDING")
            return {...state, fetching: true}
            break;
        }
        case "FETCH_STOCKS_REJECTED": {
            return {...state, fetching: true}
            break;
        }
        case "FETCH_STOCKS_FULFILLED": {
            console.log("FULFILLED")
            return {
                ...state,
                fetching: false,
                stocks: action.payload.data
            }
            break;
        }
    }
    return state
}