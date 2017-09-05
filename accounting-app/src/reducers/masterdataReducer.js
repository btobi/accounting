const defaultState = {
    accounts: [],
}

export default function masterdataReducer(state=defaultState, action) {

    switch (action.type) {

        case "FETCH_ACCOUNTS_FULFILLED": {
            return {
                ...state,
                accounts: action.payload.data
            }
        }

    }

    return state;

}