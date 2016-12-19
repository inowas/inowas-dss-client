import React from "react";

import SoilDiagram from "./SoilDiagram";
import ObservationPoint from "../ObservationPoint";

export default class WellProperties extends React.Component {

    renderObservationPoints(ops, bType) {
        return ops.map(
            o => <ObservationPoint key={o.id} data={o} bType={bType}/>
        );
    }

    changeHandler(e){
        console.log(e.target);
    }

    render() {
        const boundary = this.props.boundary;
        const geometry = JSON.parse(boundary.geometry);
        const lng = geometry.coordinates[1];
        const lat = geometry.coordinates[0];
        const layer = boundary.layer_number + 1;


        return (
            <div className="scroll-vertical col-md-10 container-fluid">
                <h3>Well Properties</h3>
                <div className="row">
                    <form className="form-horizontal col-md-6">

                        <div className="row">
                            <div className="form-group form-group-sm">
                                <label className="col-sm-3 control-label">Well name</label>
                                <div className="col-sm-9">
                                    <div className="input-group">
                                        <input value={boundary.name} onChange={this.changeHandler.bind(this)} name="name" id="inputName" type="text" className="form-control input-sm" placeholder="Well name" />
                                        <span className="input-group-btn btn-group-sm">
                                            <button className="btn btn-default btn-group-sm" type="button">Save!</button>
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group form-group-sm">
                                <label className="col-sm-3 control-label">Latitude</label>
                                <div className="col-sm-9">
                                    <div className="input-group">
                                        <span className="input-group-addon" id="sizing-addon1">Lat</span>
                                        <input value={lat} name="latitude" id="inputLatitude" type="number" className="form-control input-sm" placeholder="Latitude"/>
                                        <span className="input-group-btn btn-group-sm">
                                            <button className="btn btn-default btn-group-sm" type="button">
                                                <span className="glyphicon glyphicon-map-marker" />
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group form-group-sm">
                                <label className="col-sm-3 control-label">Longitude</label>
                                <div className="col-sm-9">
                                    <div className="input-group">
                                        <span className="input-group-addon" id="sizing-addon1">Lng</span>
                                        <input value={lng} name="latitude" id="inputLatitude" type="number" className="form-control input-sm" placeholder="Longitude"/>
                                        <span className="input-group-btn btn-group-sm">
                                            <button className="btn btn-default btn-group-sm" type="button">
                                                <span className="glyphicon glyphicon-map-marker" />
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group form-group-sm">
                                <label className="col-sm-3 control-label">Layer</label>
                                <div className="col-sm-9">
                                    <div className="input-group">
                                        <input value={layer} name="latitude" id="inputLatitude" type="number" className="form-control input-sm" placeholder="Longitude"/>
                                        <span className="input-group-btn btn-group-sm">
                                            <button className="btn btn-default btn-group-sm" type="button">
                                                <span className="glyphicon glyphicon-map-marker" />
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>

                    <div className="col-md-6">
                        <SoilDiagram />
                    </div>
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
