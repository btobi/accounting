import React from 'react'
import {Button, Dimmer, Icon, Label, Loader, Menu, Modal, Segment, Table} from 'semantic-ui-react'
import {connect} from "react-redux";
import {fillForm} from "actions/formActions";
import {changeFormValue} from "actions/formActions";
import {deleteAccountingRecord} from "actions/accountingActions";
import {getAccountingRecords} from "../../../actions/accountingActions";
import {getAccountColor, getAccountLabel} from "../../util/commons";

@connect((store) => {
    return {
        pending: store.common.pending
    }
})
export default class AccountingRecords extends React.Component {

    constructor(props) {
        super(props)
        this.formName = "recordEdit"
    }

    fillFormData(record) {
        this.props.dispatch(fillForm(this.formName, record))
        this.props.dispatch(changeFormValue(this.formName, "_modalOpen", true))
    }

    deleteRecord(record) {
        this.props.dispatch(deleteAccountingRecord(record)).then(() => {
            this.props.dispatch(getAccountingRecords())
        })
    }

    render() {

        const records = this.props.records.map(a => (
            <Table.Row key={a.id}>
                <Table.Cell textAlign="center">{a.date}</Table.Cell>
                <Table.Cell width="1">{getAccountLabel(a.debit)}</Table.Cell>
                <Table.Cell>{a.debit.name}</Table.Cell>
                <Table.Cell width="1">{getAccountLabel(a.credit)}</Table.Cell>
                <Table.Cell>{a.credit.name}</Table.Cell>
                <Table.Cell textAlign="right">{a.amount}</Table.Cell>
                <Table.Cell>{a.comment}</Table.Cell>
                <Table.Cell>{a.person}</Table.Cell>
                <Table.Cell selectable textAlign="center"><a href="javascript:" onClick={() => {this.fillFormData(a)}}><Icon name="pencil"/></a></Table.Cell>
                <Table.Cell selectable textAlign="center"><a href="javascript:" onClick={() => {this.deleteRecord(a)}}><Icon name="trash outline"/></a></Table.Cell>
            </Table.Row>
        ));

        return (
            <div>
                {/*<Modal*/}
                    {/*open={}*/}
                    {/*header={{icon: "archive", content: 'Löschen bestätigen'}}*/}
                    {/*content='Buchungssatz wirklich löschen?'*/}
                    {/*basic*/}
                    {/*actions={[*/}
                        {/*{key: 'cancel', content: 'Abbrechen', inverted: true, icon: 'remove', basic: true},*/}
                        {/*{key: 'done', content: 'Bestätigen', color: 'green', icon: 'checkmark', inverted: true, onClick: () => {console.log("hey")}},*/}
                    {/*]}*/}
                {/*/>*/}
                    <Table definition>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell/>
                                <Table.HeaderCell colSpan="2">Soll</Table.HeaderCell>
                                <Table.HeaderCell colSpan="2">Haben</Table.HeaderCell>
                                <Table.HeaderCell>Betrag</Table.HeaderCell>
                                <Table.HeaderCell>Kommentar</Table.HeaderCell>
                                <Table.HeaderCell>Person</Table.HeaderCell>
                                <Table.HeaderCell/>
                                <Table.HeaderCell/>
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