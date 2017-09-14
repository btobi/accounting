import React from "react"

import {Dimmer, Form, Loader} from "semantic-ui-react";
import DjangoCSRFToken from 'django-react-csrftoken'
import {connect} from "react-redux";

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