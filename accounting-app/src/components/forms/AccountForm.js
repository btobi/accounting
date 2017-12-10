import {getAccounts, postAccount} from '../../actions/masterdataActions';
import Form from './Form';
import store from 'store'

const defaultData = {
    _modalOpen: false,
    _pending: false
};

export default class AccountForm extends Form {

    constructor() {
        super('accountEdit', () => {
        }, () => {
            store.dispatch(getAccounts());
            this.setValue('_modalOpen', false)
        }, postAccount, defaultData);
    }

}