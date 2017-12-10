import React from 'react'
import AccountForm from '../../../components/forms/AccountForm';
import {postAccount} from '../../../actions/masterdataActions';
import CForm from '../../../components/CForm';

export default class FormSample extends React.Component {

    constructor() {
        super();
        this.form = new AccountForm(postAccount);
    }

    render() {
        return (
            <CForm form={this.form}>

            </CForm>
        )
    }

}
