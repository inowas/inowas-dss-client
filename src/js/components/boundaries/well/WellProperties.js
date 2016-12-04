import React from "react";

import SoilDiagram from "./SoilDiagram";
import ObservationPoint from "../ObservationPoint";

export default class WellProperties extends React.Component {

    renderObservationPoints() {
        return this.props.data.observation_points.map(
            o => <ObservationPoint key={o.id} data={o}/>
        );
    }

    updateWellName(e) {
        this.props.updateBoundaryName(this.props.data.id, e.target.value);
    }

    render() {

        const {data} = this.props;

        return (
            <div className="scroll-vertical col-md-10 container-fluid">
                <h3>Well Properties</h3>
                <form className="form-horizontal col-md-6">

                    <div className="form-group form-group-sm">
                        <label for="inputName" className="col-sm-3 control-label">Well name</label>
                        <div className="col-sm-9">
                            <input onChange={this.updateWellName.bind(this)} value={data.name} name="name"
                                   id="inputName" type="text" className="form-control input-sm"
                                   placeholder="Well name"/>
                        </div>
                    </div>

                    <div className="container-flex">

                        <div className="col-flex stretch no-last-margin">

                            <div className="form-group form-group-sm">
                                <label for="inputLatitude" className="col-sm-3 control-label">Latitude</label>
                                <div className="col-sm-9 margin-bottom">
                                    <div className="input-group input-group-sm">
                                        <span className="input-group-addon">X</span>
                                        <input name="latitude" id="inputLatitude" type="number" step="any"
                                               className="form-control input-sm" placeholder="Latitude"/>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group form-group-sm">
                                <label for="inputLongitude" className="col-sm-3 control-label">Longitude</label>
                                <div className="col-sm-9">
                                    <div className="input-group input-group-sm">
                                        <span className="input-group-addon">Y</span>
                                        <input name="name" id="inputLongitude" type="number" step="any"
                                               className="form-control input-sm" placeholder="Longitude"/>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-flex align-content-center">
                            <button data-toggle="tooltip" data-placement="bottom" title="Get from map!"
                                    className="btn btn-sm btn-default" type="button">
                                <span className="glyphicon glyphicon-map-marker"></span>
                            </button>
                        </div>

                    </div>
                </form>

                <div className="col-md-6">
                    <SoilDiagram />
                </div>

                <div className="col-md-12">
                    {this.renderObservationPoints()}
                </div>
            </div>
        );
    }

}
