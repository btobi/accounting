export default class FormActions {
    static fillForm(form, data) {
        return {
            type: 'FILL_FORM',
            payload: {form, data},
        }
    }

    static changeFormValue(form, name, value) {
        return {
            type: 'FORM_CHANGE_VALUE',
            payload: {
                form: form,
                name,
                value
            }
        }
    }

    static clearForm(form) {
        return {
            type: 'CLEAR_FORM',
            payload: form
        }
    }
}


