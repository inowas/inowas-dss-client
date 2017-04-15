import React from 'react'

import '../../../less/4TileTool.less';
import '../../../less/toolT13.less';


export default class T13 extends React.Component {
    render() {
        return (
            <div className="app-width">
                <h3>Please select the set of boundary conditions that apply to your problem:</h3>
                <div className="grid-container">
                    <a href="#/tools/T13A" className="tile col col-rel-1-t13">
                       <div className="div-block">
                            <h1>T13A</h1>
                            <p className="p-height">
                                Aquifer system with one no-flow boundary and one fixed head boundary condition and constant groundwater recharge
                            </p>
                            <div className="center-horizontal center-vertical">
                                <img className="sketch-image" src="/images/tools/intro_13a.png"/>
                            </div>
                        </div>
                    </a>
                    <a href="#/tools/T13B" className="tile col col-rel-1-t13">
                        <div className="div-block">
                            <h1>T13B</h1>
                            <p className="p-height">Aquifer system with two fixed head boundary conditions, a flow divide within the system and constant groundwater recharge</p>
                            <div className="center-horizontal center-vertical">
                                <img className="sketch-image" src="/images/tools/intro_13b.png"/>
                            </div>
                        </div>
                    </a>
                    <a href="#/tools/T13C" className="tile col col-rel-1-t13">
                        <div className="div-block">
                            <h1>T13C</h1>
                            <p className="p-height">Aquifer system with two fixed head boundary conditions, a flow divide outside of the system and constant groundwater recharge</p>
                            <div className="center-horizontal center-vertical">
                                <img className="sketch-image" src="/images/tools/intro_13c.png"/>
                            </div>
                        </div>
                    </a>
                    <a href="#/tools/T13D" className="tile col col-rel-1-t13">
                        <div className="div-block">
                            <h1>T13D</h1>
                            <p className="p-height">Aquifer system with two fixed head boundary conditions, constant groundwater recharge but user is not sure whether the flow divide lies within the system</p>
                            <div className="center-horizontal center-vertical">
                                <img className="sketch-image" src="/images/tools/intro_13d.png"/>
                            </div>
                        </div>
                    </a>
                    <a href="#/tools/T13E" className="tile col col-rel-1-t13">
                        <div className="div-block">
                            <h1>T13E</h1>
                            <p className="p-height">Aquifer system with one pumping well at constant rate, no groundwater recharge</p>
                            <div className="center-horizontal center-vertical">
                                <img className="sketch-image" src="/images/tools/intro_13e.png"/>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        )
    }
}
