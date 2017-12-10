import React from 'react';
import FormActions from '../../actions/formActions';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

export default function withFormState(Component) {

    class FormHOC extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.change.bind(this);

            const {forms, dispatch, form, ...sanitizedProps} = this.props;
            this.forms = forms;
            this.formName = form.getName();
            this.form = form;
            this.dispatch = dispatch;
            this.sanitizedProps = sanitizedProps;
            this.name = sanitizedProps.name;
        }

        componentWillMount() {
            this.value = this.forms[this.formName][this.props.name] || ''
        }

        change(event, data) {
            const {name, value} = data;
            this.value = value;
            this.dispatch(FormActions.changeFormValue(this.formName, name, value))
        }

        render() {
            let sanitizedProps = this.sanitizedProps;

            if (sanitizedProps.type === 'hidden')
                sanitizedProps.style = {display: 'none'};

            const error = this.form.getError(this.name);

            if (error)
                sanitizedProps = {...sanitizedProps, label: `${sanitizedProps.label} (${error})`, error: true};

            return <Component {...sanitizedProps} onChange={this.handleChange} value={this.value}/> ;
        }
    }

  return connect(
      (store) => ({
          forms: store.forms
      })
  )(FormHOC);

}