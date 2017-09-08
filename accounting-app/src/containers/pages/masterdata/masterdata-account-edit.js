import React from "react";
import {connect} from "react-redux";
import {postAccountingRecord} from "../../../actions/accountingActions";
import {getAccounts, postAccount} from "../../../actions/masterdataActions";
import {Form, Button} from "semantic-ui-react";
import FormModal from "../../../components/FormModal";

@connect((store) => {

})
export default class AccountEdit extends React.Component {

    componentWillMount(props) {

        this.state = {
            open: false,
            account: {
                number: "",
                name: "",
                type: "",
            }
        };

        this.handleChange = this.change.bind(this)
        this.handleSubmit = this.submit.bind(this)
    }

    change(event, data) {
        this.setState({account: {...this.state.account, [data.name]: data.value}})
    }

    submit(event, data) {
        event.preventDefault()
        this.props.dispatch(postAccount(this.state.account))
            .then(() => {
                this.close()
                this.props.dispatch(getAccounts())
            })
    }

    close = () => this.setState({open: false})
    open = () => this.setState({open: true})

    render() {

        this.state.account = {...this.props.account}
        this.state.open = this.props.open

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
                    <Form.Input label="Kontennummer" name="number" value={this.state.account.number} onChange={this.handleChange}/>
                    <Form.Input label="Name" name="name" value={this.state.account.name} onChange={this.handleChange}/>
                    <Form.Dropdown label="Kontentyp" selection
                                   options={typeList} name="type" value={this.state.account.type}
                                   onChange={this.handleChange}/>
                </FormModal>
            </div>
        )

    }

}