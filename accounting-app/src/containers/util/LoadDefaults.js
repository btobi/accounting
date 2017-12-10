import React from 'react'
import { connect } from 'react-redux';
import { getAccounts } from '../../actions/masterdataActions';

@connect()
export default class LoadDefaults extends React.Component {

    componentWillMount() {
        this.props.dispatch(getAccounts())
    }

    render() {return (<div/>)}

}