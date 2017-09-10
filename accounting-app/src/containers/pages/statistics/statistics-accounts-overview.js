import React from "react"
import {connect} from "react-redux";

import {getAccountsStatistics} from "actions/statisticsActions"
import {Container, Divider, Grid, Header, Label, Menu, Segment, Table} from "semantic-ui-react";
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
        this.props.dispatch(getAccountsStatistics())
        this.props.dispatch(setPageTitle("Kontenübersicht", "Auflistung nach Kontentyp", "pie chart"))
    }

    getTotalOfType(type) {
        let total = 0
        this.getAccountsOfType(type).forEach((a) => total += a.total)
        return total
    }

    getAccountsOfType(type) {
        return this.props.accounts.filter((a) => a.account.type === type)
    }

    renderAccountsOfType(type) {
        const accounts = this.getAccountsOfType(type).map(a => {
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
            const label = r.isDebit ? (<Label size="tiny" color="black" circular empty/>) : (
                <Label color="orange" circular empty/>)
            return (
                <Table.Row key={r.id}>
                    <Table.Cell>{label}</Table.Cell>
                    <Table.Cell>{r.date}</Table.Cell>
                    <Table.Cell textAlign="right">{r.amount}</Table.Cell>
                    <Table.Cell>{getAccountLabel(r.counterAccount)} &nbsp; {r.counterAccount.name}</Table.Cell>
                </Table.Row>
            )
        })
    }

    getLabelForTotal(type) {
        return (
            <span>
                &nbsp; &nbsp; <Label basic color={getAccountColor(type)}>{this.getTotalOfType(type)}</Label>
            </span>
        )
    }

    getSection(type, headline) {
        return (
            <div>
                <Header color={getAccountColor(type)} as="h3">{headline} {this.getLabelForTotal(type)}</Header>
                <Grid columns={2}>
                    {this.renderAccountsOfType(type)}
                </Grid>
                <Divider />
            </div>
        )
    }

    render() {

        return (
            <div>
                {this.getSection("AS", "Aktiva")}
                {this.getSection("LI", "Passiva")}
                {this.getSection("RE", "Ertragskonten")}
                {this.getSection("EX", "Aufwandskonten")}
            </div>
        )
    }

}