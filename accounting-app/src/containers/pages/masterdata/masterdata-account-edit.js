import React from "react";
import {connect} from "react-redux";
import {getAccounts, postAccount} from "actions/masterdataActions";
import {Button} from "semantic-ui-react";
import XForm from "components/XForm"
import FormModal from "components/FormModal";
import {changeFormValue} from "actions/formActions"

@connect((store) => {
    return {
        account: store.forms.accountEdit
    }
})
export default class AccountEdit extends React.Component {

    componentWillMount(props) {
        this.handleSubmit = this.submit.bind(this)
        this.formName = "accountEdit"
        this.props.dispatch(changeFormValue(this.formName, "_pending", false))
        close()
    }

    submit(event, data) {
        event.preventDefault()
        this.props.dispatch(changeFormValue(this.formName, "_pending", true))
        const {_pending, _modalOpen, ...account} = this.props.account
        this.props.dispatch(postAccount(account))
            .then(() => {
                this.close()
                this.props.dispatch(changeFormValue(this.formName, "_pending", false))
                close()
                this.props.dispatch(getAccounts())
            })
    }

    close = () => this.props.dispatch(changeFormValue(this.formName, "_modalOpen", false))
    open = () => this.props.dispatch(changeFormValue(this.formName, "_modalOpen", true))

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

        let open = false
        let pending = false

        if (this.props.account) {
            open = this.props.account._modalOpen
            pending = this.props.account._pending
        }

        return (
            <div>
                <Button onClick={this.open.bind(this)}>Neues Konto</Button>
                <FormModal title="Konto anlegen" open={open} handleSubmit={this.handleSubmit}
                           button="Speichern" icon="save" close={this.close.bind(this)} pending={pending}>
                    <XForm.Input label="Kontennummer" name="number" form="accountEdit"/>
                    <XForm.Input label="Name" name="name" form="accountEdit"/>
                    <XForm.Dropdown label="Kontentyp" selection
                                   options={typeList} name="type" form="accountEdit"/>
                    <XForm.Input label="IBAN" name="iban" form="accountEdit"/>
                </FormModal>
            </div>
        )

    }

}