import React from "react"
import { connect } from "react-redux"
import { login } from "../actions/UserActions"

@connect((store) => {
    return {
        user: store.user,
    }
})
export default class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            identifier: "",
            password: "",
            errors: {},
            isLoading: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e){
        this.props.dispatch(login(this.state.identifier, this.state.password));
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { errors,  identifier, password, isLoading } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="Absolute-Center is-Responsive">
                        <div className="col-sm-12 col-md-10 col-md-offset-1">
                            <form id="loginForm" onSubmit={this.onSubmit}>
                                <div className="form-group input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-user"/></span>
                                    <input value={identifier} onChange={this.onChange} name="identifier" className="form-control" type="text" placeholder="username"/>
                                </div>
                                <div className="form-group input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock"/></span>
                                    <input value={password} onChange={this.onChange} name="password" className="form-control" type="password" placeholder="password"/>
                                </div>
                                <div className="form-group">
                                    <button onClick={this.onSubmit} type="button" className="btn btn-def btn-block">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
