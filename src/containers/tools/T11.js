import React from 'react';
import Iframe from 'react-iframe';
import Navbar from '../Navbar';
import Icon from '../../components/primitive/Icon';

const navigation = [{
    name: 'Documentation',
    path: 'https://inowas.hydro.tu-dresden.de/tools/t11-mar-model-selection/',
    icon: <Icon name="file"/>
}];

class T11 extends React.Component {
    render() {
        return (
            <div>
                <Navbar links={navigation}/>
                <Iframe height={'calc(100% - 200px)'} url="https://inowas.shinyapps.io/mar_model_selection/"/>
            </div>
        );
    }
}

export default T11;
