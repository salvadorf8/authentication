import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux'; // compose is a nicer way to compose code in a much nicer higher order syntax
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends React.Component {
    onSubmit = (formProps) => {
        this.props.signin(formProps, () => {
            this.props.history.push('/feature');
        });
    };

    render() {
        // handleSubmit is provided by reduxForm
        const { handleSubmit, errorMessage } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <fieldset>
                    <label>Email</label>
                    <Field name='email' type='text' component='input' autoComplete='none' />
                </fieldset>
                <fieldset>
                    <label>Password</label>
                    <Field name='password' type='password' component='input' autoComplete='none' />
                </fieldset>
                <div>{errorMessage}</div>
                <button>Sign in!</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.errorMessage
    };
}

// export default connect(null, { actions })(reduxForm({ form: 'signup' })(Signup));

export default compose(
    connect(mapStateToProps, actions), // first higher order component we want to apply to Signup
    reduxForm({ form: 'signin' }) // other higher order component we want to apply to Signup
)(Signin);
