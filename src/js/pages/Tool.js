import React from "react"
import { connect } from "react-redux";

import ModflowMap from "./ModFlowMap";

import * as modflowAction from "../actions/ModelActions"
import * as appAction from "../actions/ApplicationActions"


@connect((store) => {
    return {
        models: store.models,
    }
})
export default class Tool extends React.Component {

    render(){
        return(

            <div className="page-wrapper">

                <div className="grid-container">
                    <section className="tile col col-abs-2 stacked">
                        <h2>Background</h2>
                        <div className="center-horizontal center-vertical">
                            <img src="img/diagram.png" />
                        </div>
                    </section>

                    <section className="tile col col-abs-3 stretch">
                        <h2>Calculation</h2>
                        <div className="grid-container">
                            <div className="col stretch">
                                <div className="aspect-ratio-wrapper">
                                    <div className="aspect-ratio-element diagram">

                                    </div>
                                </div>
                            </div>
                            <div className="col col-rel-0-5">
                                <ul className="nav nav-stacked" role="navigation">
                                    <li><button className="button">PNG</button></li>
                                    <li><button className="button">CSV</button></li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="grid-container">
                    <section className="tile col col-abs-2">
                        <h2>Settings</h2>
                        <div className="center-vertical center-horizontal">
                            <div className="radio-group">
                                <div>
                                    <input name="radio-group-1" type="radio" value="" id="radio1" />
                                <label for="radio1">Confined Aquifer</label>
                            </div>
                            <div>
                                <input name="radio-group-1" type="radio" value="" id="radio2" />
                            <label for="radio2">Unconfined Aquifer</label>
                        </div>
                </div>
            </div>

        </section>

            <section className="tile col col-abs-3 stretch">
                <div className="grid-container">
                    <div className="col stretch parameters-wrapper">
                        <table className="parameters">
                            <tr className="parameter">
                                <td className="parameter-label">
                                    Hydraulic Conductivity, K (m/d)
                                </td>
                                <td className="">
                                    <input className="parameter-min input input-xs" type="text" />
                                    <input className="parameter-max input input-xs" type="text" />
                                    <input className="parameter-input" type="range" min="0" max="30" step="1" defaultValue="15" />
                                </td>
                            </tr>
                            <tr className="parameter">
                                <td className="parameter-label">
                                    Depth to base of aquifer, B(m)
                                </td>
                                <td className="parameter-inputs">
                                    <input className="parameter-min input input-xs" type="text" />
                                    <input className="parameter-max input input-xs" type="text" />
                                    <input className="parameter-input" type="range" min="0" max="30" step="1" defaultValue="15" />
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="col col-rel-0-5">
                        <ul className="nav nav-stacked" role="navigation">
                            <li><button className="button button-accent">Default</button></li>
                        </ul>
                    </div>
                </div>


            </section>
        </div>

        </div>
        )
    }
}

