import React from "react"

export default class Parameters extends React.Component{
    render(){
        return(
            <div className="grid-container">

                <div className="col stretch parameters-wrapper">
                    <table className="parameters">
                        <tbody>
                        <tr className="parameter">
                            <td className="parameter-label">
                                Hydraulic Conductivity, K (m/d)
                            </td>
                            <td className="">
                                <input className="parameter-min input input-xs" type="text"/>
                                <input className="parameter-max input input-xs" type="text"/>
                                <input className="parameter-input" type="range" min="0" max="30" step="1" defaultValue="15"/>
                            </td>
                        </tr>
                        <tr className="parameter">
                            <td className="parameter-label">
                                Depth to base of aquifer, B(m)
                            </td>
                            <td className="parameter-inputs">
                                <input className="parameter-min input input-xs" type="text"/>
                                <input className="parameter-max input input-xs" type="text"/>
                                <input className="parameter-input" type="range" min="0" max="30" step="1" defaultValue="15"/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="col col-rel-0-5">
                    <ul className="nav nav-stacked" role="navigation">
                        <li>
                            <button className="button button-accent">Default</button>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
