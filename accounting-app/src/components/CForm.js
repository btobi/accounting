import React from 'react'
import PropTypes from 'prop-types';
import { Dimmer, Form, Loader } from 'semantic-ui-react';

export default class CForm extends React.Component {

    render() {

        return (
            <Form>
                <Dimmer active={this.props.pending} inverted>
                    <Loader inverted />
                </Dimmer>
                {this.props.children}
            </Form>
        )
    }

}

CForm.propTypes = {
    name: PropTypes.string,
};