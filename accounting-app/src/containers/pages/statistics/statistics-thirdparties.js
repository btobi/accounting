import React from "react";
import {connect} from "react-redux";
import {setPageTitle} from "../../../actions/pageActions";

@connect((store) => {
    return {
        spreadsheet: store.statistics.spreadsheet
    }
})
export default class StatisticsThirdParties extends React.Component {

    componentWillMount() {
        this.props.dispatch(setPageTitle("Dritte", "Forderungen und Verbindlichkeiten", "money"))
    }


    render() {
        return (
            <div>
                
            </div>
        )
    }
}