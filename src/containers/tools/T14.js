import React from 'react'

import '../../less/4TileTool.less';
import '../../less/toolT13.less';
import image14A from '../../images/tools/T14A.png';
import image14B from '../../images/tools/T14B.png';
import image14C from '../../images/tools/T14C.png';
import image14D from '../../images/tools/T14D.png';

export default class T14 extends React.Component {
    render() {
        return (
            <div className="app-width">
                <h3>Please select the set of boundary conditions that apply to your problem:</h3>
                <div className="grid-container">
                    <a href="../T14A/14A_1" className="tile col col-rel-1-t13">
                       <div className="div-block">
                            <h1>T14A</h1>
                            <p className="p-height">
                                Fully penetrating stream with no streambed resistance (Jenkins, 1968)
                            </p>
                            <div className="center-horizontal center-vertical">
                                <img className="sketch-image" src={image14A}/>
                            </div>
                        </div>
                    </a>
                    <a href="../T14B/14B_1" className="tile col col-rel-1-t13">
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
                    <a href="../T14C/14C_1" className="tile col col-rel-1-t13">
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
                    <a href="../T14D/14D_1" className="tile col col-rel-1-t13">
                        <div className="div-block">
                            <h1>T14D</h1>
                            <p className="p-height">
                                Partially penetrating stream in an aquitard overlying a pumped aquifer (Hunt, 2003)
                            </p>
                            <div className="center-horizontal center-vertical">
                                <img className="sketch-image" src={image14D}/>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        )
    }
}
