import React from "react"
import {connect} from "react-redux";
import {setPageTitle} from "../actions/pageActions";

@connect((store) => {
    return {
        page: store.page
    }
})
export default class PageTitle extends React.Component {

    componentWillMount() {
        this.props.dispatch(setPageTitle("Willkommen"))
    }

    render() {
        return (
            <h1>{this.props.page.pageTitle}</h1>
        )
    }
}