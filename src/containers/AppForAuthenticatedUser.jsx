import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { isUserLoggedIn } from '../reducers/user';
import { withRouter } from 'react-router';
import App from '../components/App';

class AppForAuthenticatedUser extends Component {
    static propTypes = {
        userLoggedIn: PropTypes.bool.isRequired,
        push: PropTypes.func.isRequired,
        children: PropTypes.node
    }

    componentWillMount( ) {
        // eslint-disable-next-line no-shadow
        const { userLoggedIn, push } = this.props;
        if ( !userLoggedIn ) {
            push( '/login' );
        }
    }

    render( ) {
        return <App children={this.props.children}/>;
    }
}

const mapStateToProps = state => {
    return {userLoggedIn: isUserLoggedIn( state )};
};

// eslint-disable-next-line no-class-assign
AppForAuthenticatedUser = withRouter( connect(mapStateToProps, { push })( AppForAuthenticatedUser ));

export default AppForAuthenticatedUser;
