import React from "react";

export default function withFormState(Component) {

    return class extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.change.bind(this);

            const {forms, dispatch, form, ...sanitizedProps} = this.props
            this.forms = forms;
            this.formName = form;
            this.form = forms[this.formName];
            this.dispatch = dispatch;
            this.sanitizedProps = sanitizedProps;
        }

        change(event, data) {
            this.setState({accountingRecord: {...this.state.accountingRecord, [data.name]: data.value}})
        }

        change(event, data) {
            const {name, value} = data
            this.dispatch({
                type: "FORM_CHANGE_VALUE",
                payload: {
                    form: this.formName,
                    name,
                    value
                }
            })
        }

        render() {
            const sanitizedProps = this.sanitizedProps
            return <Component {...sanitizedProps} onChange={this.handleChange}/>
        }
    }

}