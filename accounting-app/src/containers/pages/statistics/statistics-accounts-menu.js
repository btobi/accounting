import React from 'react'
import {Button, Icon, Label, Menu, Table} from 'semantic-ui-react'
import {connect} from "react-redux";
import {getAccountingRecords} from "actions/accountingActions";
import {getAccountsStatistics} from "actions/statisticsActions"

@connect()
export default class StatisticsAccountsMenu extends React.Component {

    lastMonth() {
        this.props.dispatch(getAccountsStatistics({
            year: this.props.year,
            month: this.props.month,
            previous: true
        }))
    }

    nextMonth() {
        this.props.dispatch(getAccountsStatistics({
            year: this.props.year,
            month: this.props.month,
            next: true
        }))
    }

    render() {
        return (
            <Menu>
                <Menu.Menu position='right'>
                    <Menu.Item header>{this.props.month} / {this.props.year}</Menu.Item>
                    <Menu.Item icon="chevron left" onClick={this.lastMonth.bind(this)}/>
                    <Menu.Item icon="chevron right" onClick={this.nextMonth.bind(this)}/>
                </Menu.Menu>
            </Menu>

        )
    }
}