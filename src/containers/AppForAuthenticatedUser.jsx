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
    };

    constructor( props ) {
        super( props );
        this.checkAuthentication( this.props );
    }

    componentWillReceiveProps( nextProps ) {
        this.checkAuthentication( nextProps );
    }

    checkAuthentication( props ) {
        // eslint-disable-next-line no-shadow
        const { userLoggedIn, push } = props;
        if ( !userLoggedIn ) {
            push( '/login' );
        }
    }

    render( ) {
        return <App children={this.props.children}/>;
    }
}

const mapStateToProps = state => {
    return {userLoggedIn: isUserLoggedIn( state.user )};
};

// eslint-disable-next-line no-class-assign
AppForAuthenticatedUser = withRouter( connect(mapStateToProps, { push })( AppForAuthenticatedUser ));

export default AppForAuthenticatedUser;
