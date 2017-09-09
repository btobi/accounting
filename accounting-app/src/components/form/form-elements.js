import React from "react"
import {Form} from "semantic-ui-react";
import {connect} from "react-redux";
import withFormState from "./form-hoc"

export let FormInput = connect((store) => {
    return {forms: store.forms}
})(withFormState(Form.Input))

export let FormDropdown = connect((store) => {
    return {forms: store.forms}
})(withFormState(Form.Dropdown))