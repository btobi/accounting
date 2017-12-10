import React from 'react'
import PropTypes from 'prop-types';

import {Button, Modal} from 'semantic-ui-react';
import CForm from './CForm';
import {connect} from 'react-redux';

@connect((store) => {
    return {
        forms: store.forms
    }
})
export default class FormModal extends React.Component {

    close() {
        this.props.form.setValue('_modalOpen', false);
    }

    render() {

        const form = this.props.form;

        const open = form.getValue('_modalOpen');
        const pending = form.getValue('_pending');

        return (
            <Modal open={open}>
                <Modal.Header>{this.props.title}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <CForm pending={pending}>
                            {this.props.children}
                        </CForm>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.close.bind(this)}>Abbrechen</Button>
                    <Button positive icon={this.props.icon} labelPosition='right' content={this.props.button}
                            onClick={form.submit.bind(form)} loading={pending}
                            disabled={pending}/>
                </Modal.Actions>
            </Modal>
        )
    }
}

FormModal.propTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    icon: PropTypes.string,
    button: PropTypes.string,
    handleSubmit: PropTypes.func,
    close: PropTypes.func,
    form: PropTypes.object
};