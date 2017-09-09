import React from "react"
import {connect} from "react-redux";

import {getAccountsStatistics} from "actions/statisticsActions"
import {Container, Divider, Grid, Label, Menu, Segment, Table} from "semantic-ui-react";
import {getAccountColor, getAccountLabel} from "../../util/commons";
import {setPageTitle} from "../../../actions/pageActions";

@connect((store) => {
    return {
        accounts: store.statistics.accounts,
        statistics: store.statistics
    }
})
export default class StatisticsAccounts extends React.Component {

    componentWillMount() {
        console.log("statistics", this.props.statistics)
        this.props.dispatch(getAccountsStatistics())
        this.props.dispatch(setPageTitle("Kontenübersicht", "Auflistung nach Kontentyp", "pie chart"))
    }

    getAccountsOfType(type) {
        const accounts = this.props.accounts.filter((a) => a.account.type === type).map(a => {
            return (
                <Grid.Column computer={4} tablet={8} mobile={16} key={a.account.id}>
                    <Table color={getAccountColor(a.account.type)} attached="top">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>{getAccountLabel(a.account)}</Table.HeaderCell>
                                <Table.HeaderCell>{a.account.name}</Table.HeaderCell>
                                <Table.HeaderCell textAlign="right">{a.total} &euro;</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body/>
                    </Table>
                    <Table attached="bottom">
                        {this.getTableHeader(a.account)}
                        <Table.Body>
                            {this.getRecords(a)}
                        </Table.Body>
                    </Table>
                    <Divider hidden/>
                </Grid.Column>
            )
        })
        return accounts
    }

    getTableHeader(account) {
        return (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell/>
                    <Table.HeaderCell>Datum</Table.HeaderCell>
                    <Table.HeaderCell textAlign="right">Betrag</Table.HeaderCell>
                    <Table.HeaderCell>Gegenkonto</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        )
    }

    getRecords(account) {
        return account.records.map(r => {
            const isDebit = r.debit.number === account.account.number
            const counterAccount = isDebit ? r.credit : r.debit
            const label = isDebit ? (<Label size="tiny" color="black" circular empty/>) : (
                <Label color="orange" circular empty/>)
            return (
                <Table.Row key={r.id}>
                    <Table.Cell>{label}</Table.Cell>
                    <Table.Cell>{r.date}</Table.Cell>
                    <Table.Cell textAlign="right">{r.amount}</Table.Cell>
                    <Table.Cell>{getAccountLabel(counterAccount)} &nbsp; {counterAccount.name}</Table.Cell>
                </Table.Row>
            )
        })
    }


    render() {
        return (
            <div>
                <h2>Aktiva</h2>
                <Grid columns={2}>
                    {this.getAccountsOfType("AS")}
                </Grid>
                <h2>Passiva</h2>
                <Grid columns={2}>
                    {this.getAccountsOfType("LI")}
                </Grid>
                <h2>Ertragskonten</h2>
                <Grid columns={2}>
                    {this.getAccountsOfType("RE")}
                </Grid>
                <h2>Aufwandskonten</h2>
                <Grid columns={2}>
                    {this.getAccountsOfType("EX")}
                </Grid>
            </div>
        )
    }

}