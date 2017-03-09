import React from 'react'

import '../../../less/4TileTool.less';
import '../../../less/toolT13.less';

import Header from '../../components/tools/Header';


export default class T13 extends React.Component {
    render() {
        return (
            <div className="app-width">
                <Header title={'T13: Travel time'}/>
                <div className="grid-container">
                    <a href="#/tools/T13A" className="tile col col-rel-1-t13">
                       <div className="div-block">
                            <h1>T13A</h1>
                            <p className="p-height">
                                Aquifer system with one no-flow boundary and one fixed head boundary condition and constant groundwater recharge
                            </p>
                            <div className="center-horizontal center-vertical">
                                <img className="sketch-image" src="/images/tools/T13A.png"/>
                            </div>
                        </div>
                    </a>
                    <a href="#/tools/T13B" className="tile col col-rel-1-t13">
                        <div className="div-block">
                            <h1>T13B</h1>
                            <p className="p-height">Aquifer system with two fixed head boundary conditions, a flow divide within the system and constant groundwater recharge</p>
                            <div className="center-horizontal center-vertical">
                                <img className="sketch-image" src="/images/tools/T13B.png"/>
                            </div>
                        </div>
                    </a>
                    <a href="#/tools/T13C" className="tile col col-rel-1-t13">
                        <div className="div-block">
                            <h1>T13C</h1>
                            <p className="p-height">Aquifer system with two fixed head boundary conditions, a flow divide outside of the system and constant groundwater recharge</p>
                            <div className="center-horizontal center-vertical">
                                <img className="sketch-image" src="/images/tools/T13C.png"/>
                            </div>
                        </div>
                    </a>
                    <a href="#/tools/T13A" className="tile col col-rel-1-t13">
                        <div className="div-block">
                            <h1>T13D</h1>
                            <p className="p-height">Aquifer system with two fixed head boundary conditions, constant groundwater recharge but user is not sure whether the flow divide lies within the system</p>
                            <div className="center-horizontal center-vertical">
                                <img className="sketch-image" src="/images/tools/T13A.png"/>
                            </div>
                        </div>
                    </a>
                    <a href="#/tools/T13E" className="tile col col-rel-1-t13">
                        <div className="div-block">
                            <h1>T13E</h1>
                            <p className="p-height">Aquifer system with one pumping well at constant rate, no groundwater recharge</p>
                            <div className="center-horizontal center-vertical">
                                <img className="sketch-image" src="/images/tools/T13E.png"/>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        )
    }
}
