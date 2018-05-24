import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {hasSessionKey, getFetched} from '../user/reducers/index';
import {withRouter} from 'react-router';

class LandingPage extends React.Component {
    render() {
        this.props.userIsLoggedIn ? this.props.router.push('/tools') : this.props.router.push('/login');
        return null;
    }
}

const mapStateToProps = state => {
    return {
        userIsLoggedIn: hasSessionKey(state.session),
        userShouldBeFetched: !getFetched(state.user)
    };
};

LandingPage.propTypes = {
    children: PropTypes.node,
    fetchUser: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    userIsLoggedIn: PropTypes.bool.isRequired,
    userShouldBeFetched: PropTypes.bool.isRequired
};

export default withRouter(connect(mapStateToProps)(LandingPage));
