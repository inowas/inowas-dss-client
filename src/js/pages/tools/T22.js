import React from 'react';
import Iframe from 'react-iframe';
import Navbar from '../Navbar';

export default class T22 extends React.Component {
    render( ) {
        return (
            <div>
                <Navbar links={[ ]}/>
                <Iframe url="https://ggis.un-igrac.org/ggis-viewer/viewer/globalmar/public/default"/>
            </div>
        );
    }
}
