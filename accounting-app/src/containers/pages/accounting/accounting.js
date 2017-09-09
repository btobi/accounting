import React from "react"
import {setPageTitle} from "../../../actions/pageActions";
import {connect} from "react-redux";
import {getAccountingRecords} from "../../../actions/accountingActions";
import AccountingRecords from "./accounting-records";
import {Container, right} from "semantic-ui-react";
import AccountingRecordsMenu from "./accounting-records-menu"

@connect((store) => {
    return {
        accounts: store.masterdata.accounts,
        recordData: store.accounting.records,
    }
})
export default class Accounting extends React.Component {

    componentWillMount() {
        this.props.dispatch(setPageTitle("Buchungssätze", "Monatliche Auflistung", "terminal"))
        this.props.dispatch(getAccountingRecords())
    }

    render() {

        return (
            <div>
                <AccountingRecordsMenu year={this.props.recordData.year} month={this.props.recordData.month} />
                <AccountingRecords records={this.props.recordData.data}/>
            </div>
        )

    }

}