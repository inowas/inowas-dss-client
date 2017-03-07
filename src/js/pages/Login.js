import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/UserActions';

import '../../less/login.less';

@connect(( store ) => {
    return { user: store.user };
})
export default class Login extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    }

    constructor( props ) {
        super( props );
        this.state = {
            identifier: '',
            password: '',
            errors: {},
            isLoading: false
        };

        this.onSubmit = this.onSubmit.bind( this );
        this.onChange = this.onChange.bind( this );
    }

    onSubmit( ) {
        this.props.dispatch(login( this.state.identifier, this.state.password ));
    }

    onChange( e ) {
        this.setState({
            [ e.target.name ]: e.target.value
        });
    }

    render( ) {
        const { errors, identifier, password, isLoading } = this.state;
        return (
            <div className="login-container center-horizontal center-vertical">
                <form className="tile" id="loginForm" onSubmit={this.onSubmit}>
                    <div>
                        <input value={identifier} onChange={this.onChange} name="identifier" className="input" type="text" placeholder="username"/>
                    </div>
                    <div>
                        <input value={password} onChange={this.onChange} name="password" className="input" type="password" placeholder="password"/>
                    </div>
                    <div>
                        <button onClick={this.onSubmit} type="button" className="button">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}
