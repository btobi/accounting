const defaultState = {
    records: {
        start: "",
        end: "",
        data: []
    },
}

export default function accountingReducer(state=defaultState, action) {

    switch (action.type) {

        case "FETCH_ACCOUNTING_RECORDS_FULFILLED": {
            console.log({
                ...state,
                ...action.payload.data
            })
            return {
                ...state,
                records: {...action.payload.data}
            }
        }

    }

    return state;

}