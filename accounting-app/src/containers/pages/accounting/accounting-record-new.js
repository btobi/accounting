import React from "react"
import {Button, Divider, Dropdown, Form, Header, Label, Modal, Segment} from "semantic-ui-react";


export default class AccountingRecordNew extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            accountingRecord: {
                debit: "",
                credit: "",
                amount: "",
                date: "",
                person: "",
                comment: "",
            }
        };

        this.handleChange = this.change.bind(this);
        this.handleSubmit = this.submit.bind(this);
    }

    change(event, data) {
        this.setState({accountingRecord: {...this.state.accountingRecord, [data.name] : data.value}});
    }

    submit(event, data) {
        console.log(this.state)
        event.preventDefault();
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
                <Modal open={this.state.open}>
                    <Modal.Header>Neuen Buchungssatz anlegen</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Form onSubmit={this.handleSubmit}>
                                <h3>Konten</h3>
                                <Form.Group widths="equal">
                                    <Form.Dropdown label="Soll" placeholder="Konto - Soll" selection
                                                   options={accounts} name="debit" value={this.state.debit}
                                                   onChange={this.handleChange}/>
                                    <Form.Dropdown label="Haben" placeholder="Konto - Haben" selection
                                                   options={accounts} name="credit" value={this.state.credit}
                                                   onChange={this.handleChange}/>
                                </Form.Group>
                                <h3>Info</h3>
                                <Form.Group widths="equal">
                                    <Form.Input label='Betrag' name="amount" value={this.state.amount}
                                                onChange={this.handleChange}/>
                                    <Form.Input label='Datum' name="date" value={this.state.date}
                                                onChange={this.handleChange}/>
                                </Form.Group>
                                <Form.Group widths="equal">
                                    <Form.Input label='Kommentar' name="comment" value={this.state.comment}
                                                onChange={this.handleChange}/>
                                    <Form.Input label='Person' name="person" value={this.state.person}
                                                onChange={this.handleChange}/>
                                </Form.Group>
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.close}>Abbrechen</Button>
                        <Button positive icon='checkmark' labelPosition='right' content="Buchen"
                                onClick={this.handleSubmit}/>
                    </Modal.Actions>
                </Modal>
            </div>
        )

    }

}