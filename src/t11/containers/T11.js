import React from 'react';
import Iframe from 'react-iframe';
import Navbar from '../../containers/Navbar';
import Icon from '../../components/primitive/Icon';

const navigation = [{
    name: 'Documentation',
    path: 'https://inowas.hydro.tu-dresden.de/tools/t11-mar-model-selection/',
    icon: <Icon name="file"/>
}];

export default class T11 extends React.Component {
    render( ) {
        return (
            <div>
                <Navbar links={navigation}/>
                <Iframe url="https://inowas.shinyapps.io/mar_model_selection/"/>
            </div>
        );
    }
}
