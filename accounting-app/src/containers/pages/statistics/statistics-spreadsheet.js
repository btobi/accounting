import React from 'react'
import {Button, Icon, Label, Menu, Table} from 'semantic-ui-react'
import {connect} from "react-redux";
import {getSpreadsheetData} from "../../../actions/statisticsActions";
import {getAccountLabel} from "../../util/commons";

@connect((store) => {
    return {
        spreadsheet: store.statistics.spreadsheet
    }
})
export default class Spreadsheet extends React.Component {

    componentWillMount() {
        this.props.dispatch(getSpreadsheetData())
    }

    spreadsheet() {

        const spreadsheet = this.props.spreadsheet
        const columns = spreadsheet.columns
        const data = spreadsheet.data
        const index = spreadsheet.index

        const rows = []

        for (let i in index) {
            rows.push({
                index: index[i],
                data: data[i]
            })
        }

        return (
            <Table definition>

                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell/>
                        {columns.map((c) => (<Table.HeaderCell textAlign="right">{c}</Table.HeaderCell>))}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {rows.map((r) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{getAccountLabel({type: r.index[0], number: r.index[3]})} &nbsp; {r.index[1]}</Table.Cell>
                                {r.data.map((d) => (<Table.Cell textAlign="right">{d}</Table.Cell>))}
                            </Table.Row>
                        )})
                    }
                </Table.Body>

            </Table>
        )
    }

    render() {

        console.log(this.props.spreadsheet)

        return (<div>
            {this.spreadsheet()}
        </div>)
    }
}