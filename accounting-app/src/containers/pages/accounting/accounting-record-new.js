import React from "react"
import {Button, Form} from "semantic-ui-react";
import {connect} from "react-redux";
import {getAccountingRecords, postAccountingRecord} from "actions/accountingActions"
import FormModal from "components/FormModal";
import XForm from "components/XForm"
import {fillForm} from "actions/formActions"
import {changeFormValue} from "actions/formActions";


@connect((store) => {
    return {
        accounts: store.masterdata.accounts,
        record: store.forms.recordEdit,
        forms: store.forms
    }
})
export default class AccountingRecordNew extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.submit.bind(this)
        this.formName = "recordEdit"
        this.props.dispatch(changeFormValue(this.formName, "_pending", false))
        close()
    }

    submit(event, data) {
        event.preventDefault()
        this.props.dispatch(changeFormValue(this.formName, "_pending", true))
        const {_modalOpen, _pending, debit, credit, ...record} = this.props.record
        this.props.dispatch(postAccountingRecord(record))
            .then(() => {
                this.close()
                this.props.dispatch(changeFormValue(this.formName, "_pending", false))
                this.props.dispatch(getAccountingRecords())
            })
    }

    close = () => this.props.dispatch(changeFormValue(this.formName, "_modalOpen", false))
    open = () => this.props.dispatch(changeFormValue(this.formName, "_modalOpen", true))

    render() {

        const accounts = this.props.accounts.map((a) => {
            return {
                key: a.number + " " + a.name,
                value: a.number,
                text: <div>{a.number} &nbsp; {a.name}</div>,
            }
        })

        const formName = this.formName
        let open = false;
        let pending = false;

        if (this.props.record) {
            open = this.props.record._modalOpen
            pending = this.props.record._pending
        }

        console.log(this.props.record)

        return (
            <div>
                <Button onClick={this.open}>Neuer Buchungssatz</Button>
                <FormModal title="Neuen Buchungssatz anlegen" open={open} handleSubmit={this.handleSubmit}
                           button="Speichern" icon="save" close={this.close.bind(this)} pending={pending}>
                    <XForm.Input name="id" form={formName}/>
                    <h3>Konten</h3>
                    <Form.Group widths="equal">
                        <XForm.Dropdown label="Soll" placeholder="Konto - Soll" selection options={accounts}
                                       name="debit_id" form={formName}/>
                        <XForm.Dropdown label="Haben" placeholder="Konto - Haben" selection options={accounts}
                                       name="credit_id" form={formName}/>
                    </Form.Group>
                    <h3>Info</h3>
                    <Form.Group widths="equal">
                        <XForm.Input label='Betrag' name="amount" form={formName}/>
                        <XForm.Input label='Datum' name="date" form={formName}/>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <XForm.Input label='Kommentar' name="comment" form={formName}/>
                        <XForm.Input label='Person' name="person" form={formName}/>
                    </Form.Group>
                </FormModal>
            </div>
        )

    }

}