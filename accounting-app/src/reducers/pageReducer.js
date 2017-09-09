const defaultState = {
    pageTitle: "",
    subTitle: "",
    icon: ""
}

export default function pageReducer(state = defaultState, action) {

    switch (action.type) {
        case "CHANGE_PAGE_TITLE": {
            return {...state, ...action.payload}
        }
    }

    return state
}