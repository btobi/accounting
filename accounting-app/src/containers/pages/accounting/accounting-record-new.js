import React from "react"
import {Button, Divider, Form, Dropdown, Header, Label, Modal, Segment} from "semantic-ui-react";
import {connect} from "react-redux";
import {getAccountingRecords, postAccountingRecord} from "../../../actions/accountingActions"
import CForm from "../../../components/CForm";
import FormModal from "../../../components/FormModal";


@connect()
export default class AccountingRecordNew extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            accountingRecord: {
                debit_id: 0,
                credit_id: 0,
                amount: 0,
                date: "",
                person: "",
                comment: "",
            }
        };

        this.handleChange = this.change.bind(this)
        this.handleSubmit = this.submit.bind(this)
    }

    change(event, data) {
        this.setState({accountingRecord: {...this.state.accountingRecord, [data.name]: data.value}})
    }

    submit(event, data) {
        event.preventDefault()
        this.props.dispatch(postAccountingRecord(this.state.accountingRecord))
            .then(() => {
                this.close()
                this.props.dispatch(getAccountingRecords())
            })
    }

    close = () => this.setState({open: false})
    open = () => this.setState({open: true})

    render() {

        const accounts = this.props.accounts.map((a) => {
            return {
                key: a.number + " " + a.name,
                value: a.number,
                text: <div>{a.number} &nbsp; {a.name}</div>,
            }
        })

        return (
            <div>
                <Button onClick={this.open}>Neuer Buchungssatz</Button>
                <FormModal title="Neuen Buchungssatz anlegen" open={this.state.open} handleSubmit={this.handleSubmit}
                           button="Speichern" icon="save" close={this.close.bind(this)}>
                    <h3>Konten</h3>
                    <Form.Group widths="equal">
                        <Form.Dropdown label="Soll" placeholder="Konto - Soll" selection
                                       options={accounts} name="debit_id" value={this.state.accountingRecord.debit_id}
                                       onChange={this.handleChange}/>
                        <Form.Dropdown label="Haben" placeholder="Konto - Haben" selection
                                       options={accounts} name="credit_id" value={this.state.credit_id}
                                       onChange={this.handleChange}/>
                    </Form.Group>
                    <h3>Info</h3>
                    <Form.Group widths="equal">
                        <Form.Input label='Betrag' name="amount" value={this.state.accountingRecord.amount}
                                    onChange={this.handleChange}/>
                        <Form.Input label='Datum' name="date" value={this.state.accountingRecord.date}
                                    onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Input label='Kommentar' name="comment" value={this.state.accountingRecord.comment}
                                    onChange={this.handleChange}/>
                        <Form.Input label='Person' name="person" value={this.state.accountingRecord.person}
                                    onChange={this.handleChange}/>
                    </Form.Group>
                </FormModal>
            </div>
        )

    }

}