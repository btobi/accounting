import React from 'react'
import {Icon, Label, Menu, Table} from 'semantic-ui-react'

export default class AccountingRecords extends React.Component {

    render() {

        const records = this.props.records.map(a => (
            <Table.Row>
                <Table.Cell>{a.date}</Table.Cell>
                <Table.Cell><Label size="tiny">{a.debit.number}</Label></Table.Cell>
                <Table.Cell>{a.debit.name}</Table.Cell>
                <Table.Cell><Label size="tiny">{a.credit.number}</Label></Table.Cell>
                <Table.Cell>{a.credit.name}</Table.Cell>
                <Table.Cell>{a.amount}</Table.Cell>
                <Table.Cell>{a.comment}</Table.Cell>
                <Table.Cell>{a.person}</Table.Cell>
            </Table.Row>
        ));

        return (
            <div>
                <h2>Konten</h2>
                <Table definition>
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