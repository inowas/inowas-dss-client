import React, { Component, PropTypes } from 'react';
import Footer from '../components/Footer';

export default class App extends Component {

    static propTypes = {
        children: PropTypes.node
    }

    render( ) {
        const { children } = this.props;

        return (
            <div className="application-wrapper">
                <div className="application-content">
                    {children}
                </div>
                <Footer/>
            </div>
        );
    }
}
