const defaultState = {};

export default function formReducer(state = defaultState, action) {

    /*
     form: name of form
     _form: form object containing values of form elements
     */

    switch (action.type) {

        case 'FORM_CHANGE_VALUE': {
            const {form, name, value} = action.payload;

            let newState;

            try {
                newState = checkFormState(state, form)
            } catch (e) {
                console.log('%cNo form name set for field ' + name + '.', 'color: red');
                return state
            }

            const _form = Object.assign({}, newState[form], { [name]:  value});
            return Object.assign({}, newState, { [form] : _form } )
        }

        case 'FILL_FORM': {
            const {form, data} = action.payload;

            let newState;

            try {
                newState = checkFormState(state, form)
            } catch (e) {
                return state
            }

            const _form = {...newState[form], ...data};

            _form.errors = {};

            return Object.assign({}, newState, { [form] : _form } )
        }

        case 'CLEAR_FORM': {
            const form = action.payload;
            return Object.assign({}, state, { [form]: {} } )
        }

    }

    if (action.type.endsWith('REJECTED')) {
        let newState = Object.assign({}, state);
        const configData = JSON.parse(action.payload.config.data);
        for (const form in state) {
            newState = Object.assign({}, newState, { [form]: {...state[form], _pending: false}})
        }
        let formName = '';
        if (typeof configData['_formName'] !== 'undefined')
            formName = configData['_formName'];
        newState[formName]['errors'] = action.payload.response.data.errors;
        return newState
    }

    return state

}


let checkFormState = (state, form) => {
    if (!form) {
        console.log('%cNo form name is undefined', 'color: red');
        throw FormDoesNotExistException()
    }

    if (!state[form]) {
        console.log('Form with name ' + form + ' is not present yet. Create!');
        return Object.assign({}, state, { [form]: {} });
    }

    return state
};

function FormDoesNotExistException() {
}
