import React from "react"

export default class Login extends React.Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="Absolute-Center is-Responsive">
                        <div className="col-sm-12 col-md-10 col-md-offset-1">
                            <form action="" id="loginForm">
                                <div className="form-group input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-user"/></span>
                                    <input className="form-control" type="text" name='username' placeholder="username"/>
                                </div>
                                <div className="form-group input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock"/></span>
                                    <input className="form-control" type="password" name='password' placeholder="password"/>
                                </div>
                                <div className="form-group">
                                    <button type="button" className="btn btn-def btn-block">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
};
