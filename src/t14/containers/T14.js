import PropTypes from 'prop-types';
import React from 'react';
import {withRouter} from 'react-router';

import '../../less/4TileTool.less';

import image14A from '../images/T14A.png';
import image14B from '../images/T14B.png';
import image14C from '../images/T14C.png';
import image14D from '../images/T14D.png';

import Icon from '../../components/primitive/Icon';
import Navbar from '../../containers/Navbar';

const navigation = [{
    name: 'Documentation',
    path: 'https://wiki.inowas.hydro.tu-dresden.de/t14-pumping-induced-river-drawdown/',
    icon: <Icon name="file"/>
}];

class T14 extends React.Component {

    pushToTool = (tool) => {
        return this.props.router.push('/tools/' + tool);
    };

    render() {
        return (
            <div className="app-width">
                <Navbar links={navigation}/>
                <h3>Please select the set of boundary conditions that apply to your problem:</h3>
                <div className="grid-container">
                    <a style={{'cursor': 'pointer'}} onClick={() => this.pushToTool('T14A')}  className="tile col col-rel-1-t13">
                        <div className="div-block">
                            <h1>T14A</h1>
                            <p className="p-height">
                                Fully penetrating stream with no streambed resistance (Jenkins, 1968)
                            </p>
                            <div className="center-horizontal center-vertical">
                                <img className="sketch-image" src={image14A} width="230px" style={{marginBottom:40}}/>
                            </div>
                        </div>
                    </a>
                    <a style={{'cursor': 'pointer'}} onClick={() => this.pushToTool('T14B')}  className="tile col col-rel-1-t13">
                        <div className="div-block">
                            <h1>T14B</h1>
                            <p className="p-height">
                                Fully penetrating stream with semipervious layer (Hantush, 1965)
                            </p>
                            <div className="center-horizontal center-vertical">
                                <img className="sketch-image" src={image14B}/>
                            </div>
                        </div>
                    </a>
                    <a style={{'cursor': 'pointer'}} onClick={() => this.pushToTool('T14C')}  className="tile col col-rel-1-t13">
                        <div className="div-block">
                            <h1>T14C</h1>
                            <p className="p-height">
                                Partially penetrating stream with streambed resistance (Hunt, 1999)
                            </p>
                            <div className="center-horizontal center-vertical">
                                <img className="sketch-image" src={image14C}/>
                            </div>
                        </div>
                    </a>
{/*                    <a style={{'cursor': 'pointer'}} onClick={() => this.pushToTool('T14D')}  className="tile col col-rel-1-t13">
                        <div className="div-block">
                            <h1>T14D</h1>
                            <p className="p-height">
                                Partially penetrating stream in an aquitard overlying a pumped aquifer (Hunt, 2003)
                            </p>
                            <div className="center-horizontal center-vertical">
                                <img className="sketch-image" src={image14D}/>
                            </div>
                        </div>
                    </a>*/}
                </div>
            </div>
        );
    }
}

T14.propTypes = {
    params: PropTypes.object,
    router: PropTypes.object.isRequired,
    toolInstance: PropTypes.object,
};

export default withRouter(T14);
