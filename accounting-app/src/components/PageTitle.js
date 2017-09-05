import React from "react"
import {connect} from "react-redux";
import {setPageTitle} from "../actions/pageActions";

@connect((store) => {
    return {
        page: store.page,
        pending: store.common.pending
    }
})
export default class PageTitle extends React.Component {

    componentWillMount() {
        this.props.dispatch(setPageTitle("Willkommen"))
    }

    render() {
        return (
            <h1>
                {this.props.page.pageTitle}
                &nbsp;
                {/*{this.props.pending ? <div>PENDING</div> : null}*/}
            </h1>
        )
    }
}