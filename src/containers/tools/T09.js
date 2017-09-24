import PropTypes from 'prop-types';
import React from 'react';

import '../../less/4TileTool.less';
import '../../less/toolT13.less';
import image9A from '../../images/tools/T09A.png';
import image9B from '../../images/tools/T09B.png';
import image9C from '../../images/tools/T09C.png';
import image9D from '../../images/tools/T09D.png';
import image9E from '../../images/tools/T09E.png';
import Icon from '../../components/primitive/Icon';
import Navbar from '../Navbar';


class T09 extends React.Component {

    state = {
        navigation: [{
            name: 'Documentation',
            path: 'https://wiki.inowas.hydro.tu-dresden.de/t09-simple-saltwater-intrusion-equations/',
            icon: <Icon name="file"/>
        }]
    };

    pushToTool = tool => {
        return this.props.router.push('/tools/' + tool);
    };

    render() {
        const { navigation } = this.state;
        return (
            <div className="app-width">
                <Navbar links={navigation} />
                <h3>Please select the set of boundary conditions that apply to your problem:</h3>
                <div className="grid-container">
                    <a className="col-rel-1-t13" />
                    <a style={{'cursor': 'pointer'}} onClick={() => this.pushToTool('T09A')}  className="tile col col-rel-1-t13">
                       <div className="div-block">
                            <h1>T09A</h1>
                            <p className="p-height">
                                Depth of saltwater interface (Ghyben-Herzberg relation)
                            </p>
                            <div className="center-horizontal center-vertical">
                                <img className="sketch-image" src={image9A}/>
                            </div>
                        </div>
                    </a>
                    <a style={{'cursor': 'pointer'}} onClick={() => this.pushToTool('T09B')}  className="tile col col-rel-1-t13">
                        <div className="div-block">
                            <h1>T09B</h1>
                            <p className="p-height">
                                Freshwater-Saltwater interface (Glover equation)
                            </p>
                            <div className="center-horizontal center-vertical">
                                <img className="sketch-image" src={image9B}/>
                            </div>
                        </div>
                    </a>
                    <a style={{'cursor': 'pointer'}} onClick={() => this.pushToTool('T09C')}  className="tile col col-rel-1-t13">
                        <div className="div-block">
                            <h1>T09C</h1>
                            <p className="p-height">
                                Saltwater intrusion // Upcoming
                            </p>
                            <div className="center-horizontal center-vertical">
                                <img className="sketch-image" src={image9C}/>
                            </div>
                        </div>
                    </a>
                    { /*
                    <a style={{'cursor': 'pointer'}} onClick={() => this.pushToTool('T09D')}  className="tile col col-rel-1-t13">
                        <div className="div-block">
                            <h1>T09D</h1>
                            <p className="p-height">
                                Critical well discharge
                            </p>
                            <div className="center-horizontal center-vertical">
                                <img className="sketch-image" src={image9D}/>
                            </div>
                        </div>
                    </a>
                    <a className="tile col col-rel-1-t13">
                        <div className="div-block">
                            <h1>T09E</h1>
                            <p className="p-height">
                                Sea level rise
                            </p>
                            <div className="center-horizontal center-vertical">
                                <img className="sketch-image" src={image9E}/>
                            </div>
                        </div>
                    </a>
                    */
                    }
                </div>
            </div>
        );
    }
}

T09.propTypes = {
    router: PropTypes.object
};

export default T09;
