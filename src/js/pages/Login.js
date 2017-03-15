import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/UserActions';

import LoginForm from '../components/LoginForm';

import '../../less/login.less';

@connect(( store ) => {
    return { user: store.user };
})
export default class Login extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    }

    login = ( identifier, password ) => {
        this.props.dispatch(login( identifier, password ));
    }

    render( ) {
        return (
            <div className="login-container center-horizontal center-vertical">
                <LoginForm className="tile" login={this.login}/>
            </div>
        );
    }
}
