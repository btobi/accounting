import React from 'react';
import {getAccounts, postAccount} from 'actions/masterdataActions';
import {Menu} from 'semantic-ui-react';
import XForm from 'components/XForm'
import FormModal from 'components/FormModal';

export default class AccountEdit extends React.Component {

    constructor() {
        super();
    }

    newEntry = () => {
        this.props.form.clearData();
        this.props.form.setValue('_modalOpen', true);
    };


    render() {

        const types = [
            {type: 'EX', label: 'Aufwand'},
            {type: 'RE', label: 'Ertrag'},
            {type: 'AS', label: 'Aktivum'},
            {type: 'LI', label: 'Passivum'},
        ];

        const typeList = types.map((a) => {
            return {
                key: a.type,
                value: a.type,
                text: a.label,
            }
        });

        return (
            <div>
                <Menu.Menu>
                    <Menu.Item onClick={this.newEntry}>Neues Konto</Menu.Item>
                </Menu.Menu>
                <FormModal title="Konto anlegen" form={this.props.form}
                           button="Speichern" icon="save">
                    <XForm.Input label="Kontennummer" name="number" form={this.props.form}/>
                    <XForm.Input label="Name" name="name" form={this.props.form}/>
                    <XForm.Dropdown label="Kontentyp"
                                   options={typeList} name="type" form={this.props.form}/>
                    <XForm.Input label="IBAN" name="iban" form={this.props.form}/>
                </FormModal>
            </div>
        )

    }

}