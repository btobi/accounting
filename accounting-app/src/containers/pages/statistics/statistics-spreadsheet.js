import React from 'react'
import {Button, Icon, Label, Menu, Table} from 'semantic-ui-react'
import {connect} from 'react-redux';
import {getSpreadsheetData} from '../../../actions/statisticsActions';
import {getAccountLabel} from '../../util/commons';
import {setPageTitle} from '../../../actions/pageActions';
import {number} from 'helpers'

@connect((store) => {
    return {
        spreadsheet: store.statistics.spreadsheet
    }
})
export default class StatisticsSpreadsheet extends React.Component {

    componentWillMount() {
        this.props.dispatch(getSpreadsheetData());
        this.props.dispatch(setPageTitle('Bilanz', 'Jahresübersicht', 'table'))
    }

    spreadsheet() {

        const spreadsheet = this.props.spreadsheet;

        const columns = [];

        for (let i = 1; i <= 12; i++)
            columns.push(i)

        return (
            <Table definition>

                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell/>
                        {columns.map((c) => (<Table.HeaderCell textAlign="right" width={1}>{c}</Table.HeaderCell>))}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {spreadsheet.map((r) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{getAccountLabel({type: r.accountType, number: r.accountNumber})} &nbsp; {r.accountName}</Table.Cell>
                                {columns.map((c) => r[String(c)]).map((val) => (<Table.Cell textAlign="right">{val < 0 ? (<div style={{color: 'red'}}>{number(val)}</div>) : number(val)}</Table.Cell>))}
                            </Table.Row>
                        )})
                    }
                </Table.Body>

            </Table>
        )
    }

    render() {

        console.log(this.props.spreadsheet);

        return (<div>
            {this.spreadsheet()}
        </div>)
    }
}