import React from 'react'

import '../../less/scaffold.less';
import NavBar from '../components/Navbar';

export default class Scaffold extends React.Component {

    render() {
        return (
            <div>
                <NavBar />
                <div className="application-wrapper">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
