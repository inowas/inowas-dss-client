import '../less/login.less';

import React, { Component, PropTypes } from 'react';

import LoginForm from '../components/LoginForm';
import { authenticate } from '../actions/user';
import { connect } from 'react-redux';
import { isUserLoggedIn } from '../reducers/user';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router';

class Login extends Component {
    static propTypes = {
        userLoggedIn: PropTypes.bool.isRequired,
        push: PropTypes.func.isRequired,
        authenticate: PropTypes.func.isRequired
    }

    constructor( props ) {
        super( props );
        this.checkAuthentication( this.props );
    }

    componentWillReceiveProps( nextProps ) {
        this.checkAuthentication( nextProps );
    }

    checkAuthentication( props ) {
        // eslint-disable-next-line no-shadow
        const { userLoggedIn, push } = props;
        if ( userLoggedIn ) {
            push( '/' );
        }
    }

    render( ) {
        // eslint-disable-next-line no-shadow
        const { authenticate } = this.props;

        return (
            <div className="login-container center-horizontal center-vertical">
                <LoginForm className="tile" login={authenticate}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userLoggedIn: isUserLoggedIn( state.user )
    };
};

// eslint-disable-next-line no-class-assign
Login = withRouter( connect(mapStateToProps, { push, authenticate })( Login ));

export default Login;
