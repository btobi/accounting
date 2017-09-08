const defaultState = {
    forms: []
}

export default function formReducer(state=defaultState, action) {

    switch (action.type) {

        case "FORM_CHANGE_VALUE": {
            const {form, name, value} = action.payload

            if (!form) {
                console.log("Form name is undefined");
                return state;
            }

            if (!state.forms[form])
                state.forms[form] = {}

            const _form = state.forms[form]
            _form[name] = value

            return {...state, forms: {...state.forms, [form]: {..._form}}}
        }

    }

    return state

}