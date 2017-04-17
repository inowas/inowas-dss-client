import React from "react";

import ObservationPoint from "../ObservationPoint";

export default class RiverProperties extends React.Component {

    renderObservationPoints(ops, bType) {
        return ops.map(
            o => <ObservationPoint key={o.id} data={o} bType={bType}/>
        );
    }

    render() {
        const boundary = this.props.boundary;

        return (
            <div className="scroll-vertical col-md-10 container-fluid">
                <h3>River Properties</h3>
                <div className="row">
                    <form className="form-horizontal col-md-6">
                        <div className="row">
                            <div className="form-group form-group-sm">
                                <label className="col-sm-3 control-label">River name</label>
                                <div className="col-sm-9">
                                    <div className="input-group">
                                        <input value={boundary.name} name="name" id="inputName" type="text" className="form-control input-sm" placeholder="River name" />
                                        <span className="input-group-btn btn-group-sm">
                                            <button className="btn btn-default btn-group-sm" type="button">Save!</button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="col-md-6"></div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        {this.renderObservationPoints(boundary.observation_points, boundary.type)}
                    </div>
                </div>
            </div>
        );
    }
}
