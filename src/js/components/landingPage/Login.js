import React from 'react';
import { connect } from 'react-redux';

import Navbar from '../../pages/Navbar';

import { login } from '../../actions/UserActions';

@connect(( store ) => {
    return { user: store.user };
})
export default class Login extends React.Component {

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

    onSubmit( e ) {
        this.props.dispatch(login( this.state.identifier, this.state.password ));
    }

    onChange( e ) {
        this.setState({
            [ e.target.name ]: e.target.value
        });
    }

    render( ) {
        if ( this.props.user.apiKey ) {
            return ( <Navbar links={[ ]}/> );
        }
        const { errors, identifier, password, isLoading } = this.state;
        return (
                <div className="login-wrapper">
                    <div className="login">
                        <label htmlFor="user" className="sr-only">Username:</label>
                        <input onChange={this.onChange} value={identifier} name="identifier" className="input" placeholder="Username" required type="text"/>
                        <label htmlFor="inputPassword" className="sr-only">Password:</label>
                        <input onChange={this.onChange} value={password} name="password" className="input" placeholder="Password" required type="password"/>
                        <button onClick={this.onSubmit} className="button button-primary" type="submit">Login</button>
                    </div>
                </div>
        );
    }

}
