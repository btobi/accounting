import React from 'react'
import {Icon, Label, Menu, Table} from 'semantic-ui-react'

export default class Accounts extends React.Component {

    render() {

        const accounts = this.props.accounts.map(a => (
            <Table.Row>
                <Table.Cell>{a.number}</Table.Cell>
                <Table.Cell>{a.type}</Table.Cell>
                <Table.Cell>{a.name}</Table.Cell>
            </Table.Row>
        ));

        return (
            <div>
                <h2>Konten</h2>
                <Table celled>
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