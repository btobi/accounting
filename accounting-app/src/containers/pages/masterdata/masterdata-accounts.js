import React from 'react'
import {Container, Icon, Label, Menu, Table} from 'semantic-ui-react'
import AccountEdit from "./masterdata-account-edit";
import {connect} from "react-redux";
import {fillForm} from "actions/formActions";
import {changeFormValue} from "../../../actions/formActions";

@connect()
export default class Accounts extends React.Component {

    constructor() {
        super();
        this.state = {
            account: {},
            openModal: false
        }

    }

    fillFormData(account) {
        this.props.dispatch(fillForm("accountEdit", account))
        this.props.dispatch(changeFormValue("accountEdit", "_modalOpen", true))
    }

    render() {


        const accounts = this.props.accounts.map(a => {
            return (
                <Table.Row key={a.number} onClick={() => {this.fillFormData(a)}}>
                    <Table.Cell>{a.number}</Table.Cell>
                    <Table.Cell>{a.type}</Table.Cell>
                    <Table.Cell>{a.name}</Table.Cell>
                </Table.Row>
            )
        });


        return (

            <div>
                <h2>Konten</h2>
                <Container textAlign="right">
                    <AccountEdit account={this.state.account} open={this.state.openModal}/>
                </Container>
                <Table celled selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Kontennummer</Table.HeaderCell>
                            <Table.HeaderCell>Typ</Table.HeaderCell>
                            <Table.HeaderCell>Bezeichnung</Table.HeaderCell>
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