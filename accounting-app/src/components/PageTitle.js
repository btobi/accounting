import React from 'react'
import {connect} from 'react-redux';
import {setPageTitle} from '../actions/pageActions';
import {Header, Icon} from 'semantic-ui-react';

@connect((store) => {
    return {
        page: store.page,
        pending: store.common.pending
    }
})
export default class PageTitle extends React.Component {

    componentWillMount() {
        this.props.dispatch(setPageTitle('Willkommen', '', 'protect'))
    }

    render() {
        return (
            <div style={{marginBottom: '40px'}}>
                <Header as='h2' color="blue">
                    <Icon name={this.props.page.icon}/>
                    <Header.Content>
                        {this.props.page.pageTitle}
                        <Header.Subheader>
                            {this.props.page.subTitle}
                        </Header.Subheader>
                    </Header.Content>
                </Header>
            </div>
        )
    }
}