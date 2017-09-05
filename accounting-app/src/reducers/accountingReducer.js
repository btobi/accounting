const defaultState = {
    records: [],
}

export default function accountingReducer(state=defaultState, action) {

    switch (action.type) {

        case "FETCH_ACCOUNTING_RECORDS_FULFILLED": {
            return {
                ...state,
                records: action.payload.data
            }
        }

    }

    return state;

}