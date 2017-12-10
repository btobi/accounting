import React from 'react'
import {Container, Icon, Label, Menu, Table} from 'semantic-ui-react'
import AccountEdit from './masterdata-account-edit';
import {connect} from 'react-redux';
import { FormActions} from 'react-redux-forms';
import MasterdataAccountsMenu from './masterdata-accounts.menu';

@connect()
export default class Accounts extends React.Component {

    fillFormData(account) {
        this.props.dispatch(FormActions.fillForm('accountEdit', account));
        this.props.dispatch(FormActions.changeFormValue('accountEdit', '_modalOpen', true))
    }

    render() {

        const accounts = this.props.accounts.map(a => {
            return (
                <Table.Row key={a.number}>
                    <Table.Cell>{a.number}</Table.Cell>
                    <Table.Cell>{a.type}</Table.Cell>
                    <Table.Cell>{a.name}</Table.Cell>
                    <Table.Cell>{a.iban}</Table.Cell>
                    <Table.Cell selectable textAlign="center"><a href="javascript:" onClick={() => {this.fillFormData(a)}}><Icon name="pencil"/></a></Table.Cell>
                </Table.Row>
            )
        });

        return (
            <div>
                <MasterdataAccountsMenu />
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Kontennummer</Table.HeaderCell>
                            <Table.HeaderCell>Typ</Table.HeaderCell>
                            <Table.HeaderCell>Bezeichnung</Table.HeaderCell>
                            <Table.HeaderCell>IBAN</Table.HeaderCell>
                            <Table.HeaderCell/>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {accounts}
                    </Table.Body>
                </Table>
            </div>
        )

    }

}