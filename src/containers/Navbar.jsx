import '../less/navbar.less';

import PropTypes from 'prop-types';
import React from 'react';
import { authenticate, loadUserInformation, logout } from '../actions/user';
import { getApiKey, getName, isUserLoggedIn } from '../reducers/user';

import Icon from '../components/primitive/Icon';
import { Link } from 'react-router';
import LoginForm from '../components/LoginForm';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class NavBar extends React.Component {

    componentDidMount( ) {
        const { userLoggedIn } = this.props;
        if ( userLoggedIn ) {
            this.loadUserInformation( );
        }
    }

    componentDidUpdate( prevProps ) {
        const { apiKey, userLoggedIn } = this.props;
        if ( apiKey !== prevProps.apiKey && userLoggedIn ) {
            this.loadUserInformation( );
        }
    }

    loadUserInformation( ) {
        // eslint-disable-next-line no-shadow
        const { name, loadUserInformation } = this.props;

        if ( !name || name === '' ) {
            loadUserInformation( );
        }
    }

    renderLinks( links, recursionDepth = 0 ) {
        return links.filter( l => l ).map(( l, index ) => {
            let active = false;
            const currentPath = this.props.routing.locationBeforeTransitions.pathname;

            if ( currentPath && l.path ) {
                active = true;
                const currentPathFragments = currentPath.trimLeft( '/' ).split( '/' );
                const linkPathFragments = l.path.trimLeft( '/' ).split( '/' );
                for ( let i = recursionDepth; i < Math.max( currentPathFragments.length, linkPathFragments.length ); i++ ) {
                    if (currentPathFragments[i] !== linkPathFragments[i]) {
                        active = false;
                        break;
                    }
                }

                if ( l.path.trimLeft( '/' ) === 'tools' ) {
                    active = l.path.trimLeft( '/' ) === currentPath.trimLeft( '/' );
                }
            }

            let navElement = (
                <span className="nav-element" data-active={active}>
                    {l.icon}{l.name}
                </span>
            );

            if ( l.path ) {
                navElement = (
                    <Link className="nav-element" to={l.path} data-active={active}>
                        {l.icon}{l.name}
                    </Link>
                );

                if (l.path.includes( 'http' )) {
                    navElement = (
                        <a className="nav-element" href={l.path} target="_blank" data-active={active}>
                            {l.icon}{l.name}
                        </a>
                    );
                }
            }

            return (
                <li key={index} className="nav-item">
                    {navElement}
                    {l.sub && <ul className="nav-list">{this.renderLinks( l.sub, recursionDepth + 1 )}</ul>}
                </li>
            );
        });
    }

    renderInfo = (info) => <li style={{margin: 5}}><span dangerouslySetInnerHTML={{__html: info}} /></li>;

    renderUserNavigation( ) {
        // eslint-disable-next-line no-shadow
        const { userLoggedIn, logout, authenticate, name } = this.props;

        if ( userLoggedIn ) {
            return (
                <li className="nav-item nav-item-has-children">
                    <span className="nav-element">
                        <Icon name="person"/>Hey, {name}
                    </span>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <button className="nav-element" onClick={logout}>logout</button>
                        </li>
                    </ul>
                </li>
            );
        }
        return (
            <li className="nav-item nav-item-has-children">
                <span className="nav-element">
                    <Icon name="person"/>Login
                </span>
                <ul className="nav-list">
                    <li className="nav-item">
                        <LoginForm login={authenticate}/>
                    </li>
                </ul>
            </li>
        );
    }

    render( ) {
        const standardLinks = [
            {
                name: 'Home',
                path: '/',
                icon: <Icon name="world"/>
            }
        ];

        const standardLinksAuthenticationRequired = [
            {
                name: 'Dashboard',
                path: '/tools',
                icon: <Icon name="settings"/>
            }
        ];

        return (
            <header className="navbar-wrapper">
                <div className="navbar app-width">
                    <nav className="nav-left">
                        <ul className="nav-list">
                            {this.renderLinks( standardLinks )}
                            {this.props.userLoggedIn && this.renderLinks(standardLinksAuthenticationRequired.concat( this.props.links ))}
                            {!this.props.userLoggedIn && this.props.info && this.renderInfo(this.props.info)}
                        </ul>
                    </nav>
                    <nav className="nav-right">
                        <ul className="nav-list">
                            {this.renderUserNavigation( )}
                        </ul>
                    </nav>

                </div>
            </header>
        );
    }
}

const mapStateToProps = ( state, ownProps ) => {
    return {
        userLoggedIn: isUserLoggedIn( state.user ),
        apiKey: getApiKey( state.user ),
        routing: state.routing,
        name: getName( state.user ),
        ...ownProps
    };
};

NavBar.propTypes = {
    userLoggedIn: PropTypes.bool,
    routing: PropTypes.object,
    links: PropTypes.array,
    authenticate: PropTypes.func,
    logout: PropTypes.func,
    name: PropTypes.string,
    loadUserInformation: PropTypes.func,
    apiKey: PropTypes.string,
    info: PropTypes.string
};

// eslint-disable-next-line no-class-assign
NavBar = withRouter( connect(mapStateToProps, { authenticate, logout, loadUserInformation })( NavBar ));

export default NavBar;
