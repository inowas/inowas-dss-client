import React, { PropTypes } from 'react';

import { connect } from 'react-redux';

import '../../less/scaffold.less';
import NavBar from '../components/Navbar';

import { logout } from '../actions/UserActions';

@connect()
export default class Scaffold extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        children: PropTypes.node
    };

    logout = ( ) => {
        this.props.dispatch(logout( ));
    }

    render( ) {
        return (
            <div>
                <NavBar logout={this.logout}/>
                <div className="application-wrapper">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
