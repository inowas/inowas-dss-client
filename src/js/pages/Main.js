import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Login from '../pages/Login';

import '../../less/scaffold.less';

@connect(( store ) => {
    return { user: store.user };
})
export default class Main extends Component {
    static propTypes = {
        children: PropTypes.node,
        user: PropTypes.object
    }

    isUserLoggedIn( ) {
        return this.props.user.apiKey !== null;
    }

    render( ) {
        if (this.isUserLoggedIn( )) {
            return (
                <div className="application-wrapper">
                    {this.props.children}
                </div>
            );
        }

        return (
            <div className="application-wrapper">
                <Login/>
            </div>
        );
    }
}
