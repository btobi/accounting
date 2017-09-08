defaultState = {
    forms: []
}

export default function formReducer(state=defaultState, action) {

    const form = state.forms[action.payload.form]

}