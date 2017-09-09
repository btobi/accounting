export function fillForm(form, data) {
    return {
        type: "FILL_FORM",
        payload: {form, data},
    }
}

export function changeFormValue(form, name, value) {
    return {
        type: "FORM_CHANGE_VALUE",
        payload: {
            form: form,
            name,
            value
        }
    }
}