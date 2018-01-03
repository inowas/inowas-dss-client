import React from 'react';
import Iframe from 'react-iframe';
import Navbar from '../Navbar';

export default class T17 extends React.Component {
    render( ) {
        return (
            <div>
                <Navbar links={[ ]}/>
                <Iframe url="http://marportal.un-igrac.org"/>
            </div>
        );
    }
}
