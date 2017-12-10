import React from 'react'
import PropTypes from 'prop-types';

import {Button, Modal} from 'semantic-ui-react';
import CForm from './CForm';

export default class FormModal extends React.Component {

    render() {
        return (
            <Modal open={this.props.open}>
                <Modal.Header>{this.props.title}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <CForm onSubmit={this.props.handleSubmit} pending={this.props.pending}>
                            {this.props.children}
                        </CForm>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.props.close}>Abbrechen</Button>
                    <Button positive icon={this.props.icon} labelPosition='right' content={this.props.button}
                            onClick={this.props.handleSubmit} loading={this.props.pending}
                            disabled={this.props.pending}/>
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
    close: PropTypes.func
}