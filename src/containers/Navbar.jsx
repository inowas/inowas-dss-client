import '../less/navbar.less';

import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../components/primitive/Icon';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

class NavBar extends React.Component {

    historyPushTo = route => {
        this.props.router.push(route);
    };

    renderLinks(links, recursionDepth = 0) {
        return links.filter(l => l).map((l, index) => {
            let active = false;
            const currentPath = this.props.routing.locationBeforeTransitions.pathname;

            if (currentPath && l.path) {
                active = true;
                const currentPathFragments = currentPath.trimLeft('/').split('/');
                const linkPathFragments = l.path.trimLeft('/').split('/');
                for (let i = recursionDepth; i < Math.max(currentPathFragments.length, linkPathFragments.length); i++) {
                    if (currentPathFragments[i] !== linkPathFragments[i]) {
                        active = false;
                        break;
                    }
                }

                if (l.path.trimLeft('/') === 'tools') {
                    active = l.path.trimLeft('/') === currentPath.trimLeft('/');
                }
            }

            let navElement = (
                <span className="nav-element" data-active={active}>
                    {l.icon}{l.name}
                </span>
            );

            if (l.path) {
                navElement = (
                    <Link className="nav-element" to={l.path} data-active={active}>
                        {l.icon}{l.name}
                    </Link>
                );

                if (l.path.includes('http')) {
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
                    {l.sub && <ul className="nav-list">{this.renderLinks(l.sub, recursionDepth + 1)}</ul>}
                </li>
            );
        });
    }

    renderInfo = (info) => <li style={{margin: 5}}><span dangerouslySetInnerHTML={{__html: info}}/></li>;

    renderUserNavigation(userIsLoggedIn) {
        const roles = this.props.user.roles;
        if (userIsLoggedIn && roles && Array.isArray(roles)) {
            return (
                <li className="nav-item nav-item-has-children">
                    <span className="nav-element">
                        <Icon name="person"/>{this.props.user.name}
                    </span>
                    <ul className="nav-list">
                        { roles.includes('ROLE_ADMIN') &&
                            <li className="nav-item">
                                <button className="nav-element" onClick={() => this.historyPushTo('/admin')}>Admin</button>
                            </li>
                        }
                        <li className="nav-item">
                            <button className="nav-element" onClick={() => this.historyPushTo('/logout')}>logout</button>
                        </li>
                    </ul>
                </li>
            );
        }
        return (
            <li className="nav-item nav-item-has-children">
                <span className="nav-element" onClick={() => this.historyPushTo('/login')}>
                    <Icon name="person"/>Login
                </span>
            </li>
        );
    }

    render() {
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

        const userIsLoggedIn = this.props.session.apiKey;

        return (
            <header className="navbar-wrapper">
                <div className="navbar app-width">
                    <nav className="nav-left">
                        <ul className="nav-list">
                            {this.renderLinks(standardLinks)}
                            {userIsLoggedIn && this.renderLinks(standardLinksAuthenticationRequired.concat(this.props.links))}
                            {!userIsLoggedIn && this.props.info && this.renderInfo(this.props.info)}
                        </ul>
                    </nav>
                    <nav className="nav-right">
                        <ul className="nav-list">
                            {this.renderUserNavigation(userIsLoggedIn)}
                        </ul>
                    </nav>

                </div>
            </header>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
        session: state.session,
        routing: state.routing,
        ...ownProps
    };
};

NavBar.propTypes = {
    router: PropTypes.object.isRequired,
    routing: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    info: PropTypes.string,
    links: PropTypes.array
};

// eslint-disable-next-line no-class-assign
NavBar = withRouter(connect(mapStateToProps)(NavBar));

export default NavBar;
