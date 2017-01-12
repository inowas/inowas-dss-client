import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {login} from '../../actions/UserActions';

@connect((store) => {
    return {user: store.user}
})
export default class Login extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            identifier: '',
            password: '',
            errors: {},
            isLoading: false
        };

        this.onSubmit = this
            .onSubmit
            .bind(this);
        this.onChange = this
            .onChange
            .bind(this);
    }

    onSubmit(e) {
        this
            .props
            .dispatch(login(this.state.identifier, this.state.password));
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        if (this.props.user.apiKey) {
            return (
                <Link to="tools">Zur App</Link>
            );
        } else {
            const {errors, identifier, password, isLoading} = this.state;
            return (
                <div className="form-signin">
                    <h2 className="form-signin-heading">Sign in!</h2>
                    <label for="user" className="sr-only">Username</label>
                    <input onChange={this.onChange} value={identifier} name="identifier" id="user" className="form-control" placeholder="Username" required="" autoFocus="" type="text"/>
                    <label for="inputPassword" className="sr-only">Password</label>
                    <input onChange={this.onChange} value={password} name="password" id="inputPassword" className="form-control" placeholder="Password" required="" type="password"/>
                    <div className="checkbox">
                        <label>
                            <input value="remember-me" type="checkbox"/>
                            Remember me
                        </label>
                    </div>
                    <button onClick={this.onSubmit} className="btn btn-lg btn-primary btn-block" type="submit">Go</button>
                </div>
            );
        }
    }

}
