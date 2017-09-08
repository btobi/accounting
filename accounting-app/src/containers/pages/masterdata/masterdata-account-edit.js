import React from "react";
import {connect} from "react-redux";
import {postAccountingRecord} from "../../../actions/accountingActions";
import {getAccounts, postAccount} from "../../../actions/masterdataActions";
import {Button} from "semantic-ui-react";
import Form from "../../../components/Form"
import FormModal from "../../../components/FormModal";

@connect((store) => {
    return {
        form: store.forms.forms.accountEdit
    }
})
export default class AccountEdit extends React.Component {

    componentWillMount(props) {

        this.state = {
            open: false,
        };

        this.handleSubmit = this.submit.bind(this)
    }

    submit(event, data) {
        event.preventDefault()
        this.props.dispatch(postAccount(this.props.form))
            .then(() => {
                this.close()
                this.props.dispatch(getAccounts())
            })
    }

    close = () => this.setState({open: false})
    open = () => this.setState({open: true})

    render() {

        const types = [
            {type: "EX", label: "Aufwand"},
            {type: "RE", label: "Ertrag"},
            {type: "AS", label: "Aktiv"},
            {type: "LI", label: "Passiv"},
        ]

        const typeList = types.map((a) => {
            return {
                key: a.type,
                value: a.type,
                text: a.label,
            }
        })

        return (
            <div>
                <Button onClick={this.open}>Neues Konto</Button>
                <FormModal title="Konto anlegen" open={this.state.open} handleSubmit={this.handleSubmit}
                           button="Speichern" icon="save" close={this.close.bind(this)}>
                    <Form.Input label="Kontennummer" name="number" form="accountEdit"/>
                    <Form.Input label="Name" name="name" form="accountEdit"/>
                    <Form.Dropdown label="Kontentyp" selection
                                   options={typeList} name="type" form="accountEdit"/>
                </FormModal>
            </div>
        )

    }

}