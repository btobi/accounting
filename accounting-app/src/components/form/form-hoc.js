import React from "react";
import {changeFormValue} from "actions/formActions";

export default function withFormState(Component) {

    return class extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.change.bind(this);

            const {forms, dispatch, form, ...sanitizedProps} = this.props
            this.forms = forms;
            this.formName = form;
            this.dispatch = dispatch;
            this.sanitizedProps = sanitizedProps;
        }

        // componentWillMount() {
        //     const {name, defaultValue} = this.sanitizedProps
        //     console.log("Mount form component", name, defaultValue)
        //     this.change(null, {name, value: defaultValue})
        // }

        componentWillMount() {
            this.value = this.forms[this.formName][this.props.name] || ""
        }

        change(event, data) {
            const {name, value} = data
            this.value = value
            this.dispatch(changeFormValue(this.formName, name, value))
        }

        render() {
            const sanitizedProps = this.sanitizedProps
            if (sanitizedProps.type === "hidden")
                sanitizedProps.style = {display: 'none'}
            return <Component {...sanitizedProps} onChange={this.handleChange} value={this.value}/>
        }
    }

}