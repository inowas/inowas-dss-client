import React from 'react'

import '../../less/4TileTool.less';
import '../../less/toolT13.less';
import image13A from '../../images/tools/intro_13a.png';
import image13B from '../../images/tools/intro_13b.png';
import image13C from '../../images/tools/intro_13c.png';
import image13D from '../../images/tools/intro_13d.png';
import image13E from '../../images/tools/intro_13e.png';
import Icon from '../../components/primitive/Icon';
import Navbar from '../Navbar';


export default class T13 extends React.Component {

    state = {
        navigation: [{
            name: 'Documentation',
            path: 'https://wiki.inowas.hydro.tu-dresden.de/t13-travel-time-through-unconfined-aquifer/',
            icon: <Icon name="file"/>
        }]
    };

    render() {
        const { navigation } = this.state;
        return (
            <div className="app-width">
                <Navbar links={navigation} />
                <h3>Please select the set of boundary conditions that apply to your problem:</h3>
                <div className="grid-container">
                    <a className="col-rel-1-t13" />
                    <a href="../T13A/13A_1" className="tile col col-rel-1-t13">
                       <div className="div-block">
                            <h1>T13A</h1>
                            <p className="p-height">
                                Aquifer system with one no-flow boundary and one fixed head boundary condition and constant groundwater recharge
                            </p>
                            <div className="center-horizontal center-vertical">
                                <img className="sketch-image" src={image13A}/>
                            </div>
                        </div>
                    </a>
                    <a href="../T13B/13B_1" className="tile col col-rel-1-t13">
                        <div className="div-block">
                            <h1>T13B</h1>
                            <p className="p-height">Aquifer system with two fixed head boundary conditions, a flow divide within the system and constant groundwater recharge</p>
                            <div className="center-horizontal center-vertical">
                                <img className="sketch-image" src={image13B}/>
                            </div>
                        </div>
                    </a>
                    <a href="../T13C/13C_1" className="tile col col-rel-1-t13">
                        <div className="div-block">
                            <h1>T13C</h1>
                            <p className="p-height">Aquifer system with two fixed head boundary conditions, a flow divide outside of the system and constant groundwater recharge</p>
                            <div className="center-horizontal center-vertical">
                                <img className="sketch-image" src={image13C}/>
                            </div>
                        </div>
                    </a>
                    {/*
                    <a href="../T13D/13D_1" className="tile col col-rel-1-t13">
                        <div className="div-block">
                            <h1>T13D</h1>
                            <p className="p-height">Aquifer system with two fixed head boundary conditions, constant groundwater recharge but user is not sure whether the flow divide lies within the system</p>
                            <div className="center-horizontal center-vertical">
                                <img className="sketch-image" src={image13D}/>
                            </div>
                        </div>
                    </a>
                    <a href="../T13E/13E_1" className="tile col col-rel-1-t13">
                        <div className="div-block">
                            <h1>T13E</h1>
                            <p className="p-height">Aquifer system with one pumping well at constant rate, no groundwater recharge</p>
                            <div className="center-horizontal center-vertical">
                                <img className="sketch-image" src={image13E}/>
                            </div>
                        </div>
                    </a>
                    */}
                </div>
            </div>
        )
    }
}
