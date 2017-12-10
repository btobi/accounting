import PropTypes from 'prop-types';
import FormActions from 'actions/formActions'
import store from 'store'

export default class Form {

    constructor(name, preSubmit, postSubmit, action, defaultData) {
        this.name = name;
        this.preSubmit = preSubmit;
        this.postSubmit = postSubmit;
        this.action = action;

        this.fillData(defaultData);
        this.setValue('_formName', this.name);

        this.currentValue = {};
        this.errors = {};

        this.unsubscribe = store.subscribe(this._changeHandler.bind(this));
    }

    _changeHandler() {
        let previousValue = this.currentValue;
        this.currentValue = this.getData();

        if (previousValue !== this.currentValue) {
            if (typeof this.currentValue.errors !== 'undefined')
                this.errors = this.currentValue.errors;
            else {
                this.errors = {}
            }
        }
    }

    _forms() {
        return store.getState().forms;
    }

    fillData(data) {
        store.dispatch(FormActions.fillForm(this.name, data));
    }

    getData() {
        return this._forms()[this.name];
    }

    getName() {
        return this.name;
    }

    submit() {

        console.log(`Submitting form ${this.name}.`);

        if (typeof this.preSubmit === 'function')
            this.preSubmit();
        this.setValue('_pending', true);
        store.dispatch(this.action(this.getData())).then(() => {
            console.log('Request ended');
            this.setValue('_pending', false);
            if (typeof this.postSubmit === 'function')
                this.postSubmit();
        });
    }

    clearData() {
        store.dispatch(FormActions.clearForm(this.name));
    }

    setValue(key, value) {
        store.dispatch(FormActions.changeFormValue(this.name, key, value))
    }

    getValue(key) {
        return this.getData()[key];
    }

    getError(field) {
        if (this.errors)
            return this.errors[field];
    }

}

Form
    .propTypes = {
    name: PropTypes.string,
};