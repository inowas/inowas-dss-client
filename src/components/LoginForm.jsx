import React, { Component, PropTypes } from 'react';

import '../less/loginForm.less';

export default class LoginForm extends Component {

    static propTypes = {
        login: PropTypes.func.isRequired,
        className: PropTypes.string
    };

    state = {
        identifier: '',
        password: ''
    };

    submit = ( e ) => {
        e.preventDefault();
        this.props.login( this.state.identifier, this.state.password );
    };

    onChange = e => {
        this.setState({
            [ e.target.name ]: e.target.value
        });
    };

    render( ) {
        const { identifier, password } = this.state;
        const { className } = this.props;
        return (
                <form className={'loginForm' + ' ' + (className || '')} onSubmit={this.submit}>
                    <p>
                        <label className="label" htmlFor="user">Username:</label>
                        <input onChange={this.onChange} value={identifier} name="identifier" className="input" placeholder="Username" required type="text"/>
                    </p>
                    <p>
                        <label className="label" htmlFor="inputPassword">Password:</label>
                        <input onChange={this.onChange} value={password} name="password" className="input" placeholder="Password" required type="password"/>
                    </p>
                    <p>
                        <input type="submit" className="button button-primary" value="Login" />
                    </p>
                </form>
        );
    }
}
