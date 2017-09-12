import React from "react"

import Accounts from "./masterdata-accounts"
import {setPageTitle} from "../../../actions/pageActions";
import {connect} from "react-redux";
import {getAccounts} from "../../../actions/masterdataActions"

@connect((store) => {
    return {
        accounts: store.masterdata.accounts
    }
})
export default class Masterdata extends React.Component {

    componentWillMount() {
        this.props.dispatch(setPageTitle("Stammdaten", "Konten anlegen und bearbeiten", "settings"))
    }

    render() {


        return (
            <Accounts accounts={this.props.accounts} />
        )

    }

}