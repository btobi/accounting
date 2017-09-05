import React from "react"

import Accounts from "./masterdata-accounts"
import {setPageTitle} from "../../../actions/pageActions";
import {connect} from "react-redux";

@connect()
export default class Masterdata extends React.Component {

    componentWillMount() {
        this.props.dispatch(setPageTitle("Stammdaten"))
    }

    render() {


        return (
            <Accounts />
        )

    }

}