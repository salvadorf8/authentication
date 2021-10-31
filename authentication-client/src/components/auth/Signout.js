import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

class Signout extends React.Component {
    componentDidMount() {
        this.props.signout();
    }
    render() {
        return <div>See you Later!</div>;
    }
}

export default connect(null, actions)(Signout);
