const defaultState = {
    pageTitle: ""
}

export default function pageReducer(state = defaultState, action) {

    switch (action.type) {
        case "CHANGE_PAGE_TITLE": {
            return {...state, pageTitle: action.payload}
        }
    }

    return state
}