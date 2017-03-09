import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Icon from '../components/primitive/Icon';
import '../../less/navbar.less';
import { connect } from 'react-redux';
import { logout } from '../actions/UserActions';

@connect( )
export default class NavBar extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        links: PropTypes.array
    };

    logout = ( ) => {
        this.props.dispatch(logout( ));
    }

    renderLinks( links ) {
        return links.map(( l, index ) => {
            let navElement = (<span className="nav-element">
                {l.icon}{l.name}
            </span>);

            if(l.path) {
                navElement = (<Link className="nav-element" to={l.path}>
                    {l.icon}{l.name}
                </Link>);

                if(l.path.includes('http')) {
                    navElement = (<a className="nav-element" href={l.path} target="_blank">
                        {l.icon}{l.name}
                    </a>);
                }
            }

            return (
                <li key={index} className="nav-item">
                    {navElement}
                    {l.sub && <ul className="nav-list">{this.renderLinks(l.sub)}</ul>}
                </li>
            );
        });
    }

    render( ) {
        const { links } = this.props;
        links.unshift({ name: 'Dashboard', path: '/tools', icon: <Icon name="settings"/> });
        links.unshift({ name: 'Home', path: '/', icon: <Icon name="world"/> });

        return (
            <header className="navbar-wrapper">
                <div className="navbar app-width">
                    <nav className="nav-left">
                        <ul className="nav-list">
                            {this.renderLinks( links )}
                        </ul>
                    </nav>
                    <nav className="nav-right">
                        <ul className="nav-list">
                            <li className="nav-item nav-item-has-children">
                                <span className="nav-element" href="#">
                                    <Icon name="person"/>Hey, Gast
                                </span>
                                <ul className="nav-list">
                                    <li className="nav-item">
                                        <button className="nav-element" onClick={this.logout}>logout</button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>

                </div>
            </header>
        );
    }
}
