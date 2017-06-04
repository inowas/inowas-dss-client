import '../less/navbar.less';

import React, { PropTypes } from 'react';
import { authenticate, logout } from '../actions/user';

import Icon from '../components/primitive/Icon';
import { Link } from 'react-router';
import LoginForm from '../components/LoginForm';
import { connect } from 'react-redux';

@connect(( store ) => {
    return { user: store.user, routing: store.routing };
})
export default class NavBar extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        routing: PropTypes.object.isRequired,
        links: PropTypes.array
    };

    login = ( identifier, password ) => {
        this.props.dispatch(authenticate( identifier, password ));
    }

    logout = ( ) => {
        this.props.dispatch(logout( ));
    }

    renderLinks( links, recursionDepth = 0 ) {
        return links.filter(l => l).map(( l, index ) => {
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

    renderUserNavigation( ) {
        if ( this.props.user.apiKey ) {
            return (
                <li className="nav-item nav-item-has-children">
                    <span className="nav-element">
                        <Icon name="person"/>Hey, Guest
                    </span>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <button className="nav-element" onClick={this.logout}>logout</button>
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
                        <LoginForm login={this.login}/>
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
                            {this.props.user.apiKey && this.renderLinks(standardLinksAuthenticationRequired.concat( this.props.links ))}
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
