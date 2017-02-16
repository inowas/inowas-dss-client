import React from 'react';
import {connect} from 'react-redux';

import Scaffold from '../pages/Scaffold';
import Login from '../pages/Login';

@connect((store) => {
    return {user: store.user}
})
export default class Main extends React.Component {

    isUserLoggedIn() {
        return !(this.props.user.apiKey == null);
    }

    render() {
        if (this.isUserLoggedIn()) {
            return <Scaffold>
                {this.props.children}
            </Scaffold>;
        }

        return <Login/>;
    }
}
