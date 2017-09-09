import React from 'react'
import {Icon, Label, Menu, Table} from 'semantic-ui-react'
import {connect} from "react-redux";
import {fillForm} from "actions/formActions";
import {changeFormValue} from "actions/formActions";

@connect()
export default class AccountingRecords extends React.Component {

    constructor(props) {
        super(props)
        this.formName = "recordEdit"
        console.log("constructing records view")
    }

    fillFormData(record) {
        this.props.dispatch(fillForm(this.formName, record))
        this.props.dispatch(changeFormValue(this.formName, "_modalOpen", true))
    }

    render() {

        const records = this.props.records.map(a => (
            <Table.Row key={a.id} onClick={() => {this.fillFormData(a)}}>
                <Table.Cell textAlign="center">{a.date}</Table.Cell>
                <Table.Cell width="1"><Label size="tiny">{a.debit.number}</Label></Table.Cell>
                <Table.Cell>{a.debit.name}</Table.Cell>
                <Table.Cell width="1"><Label size="tiny">{a.credit.number}</Label></Table.Cell>
                <Table.Cell>{a.credit.name}</Table.Cell>
                <Table.Cell textAlign="right">{a.amount}</Table.Cell>
                <Table.Cell>{a.comment}</Table.Cell>
                <Table.Cell>{a.person}</Table.Cell>
            </Table.Row>
        ));

        return (
            <div>
                <h2>Buchungssätze</h2>
                <Table definition selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell colSpan="2">Soll</Table.HeaderCell>
                            <Table.HeaderCell colSpan="2">Haben</Table.HeaderCell>
                            <Table.HeaderCell>Betrag</Table.HeaderCell>
                            <Table.HeaderCell>Kommentar</Table.HeaderCell>
                            <Table.HeaderCell>Person</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {records}
                    </Table.Body>
                </Table>
            </div>
        )

    }

}