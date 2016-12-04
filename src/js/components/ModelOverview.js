import React from "react";
import BoundaryTypes from "./modelOverview/BoundaryTypes";
import BoundariesList from "./modelOverview/BoundariesList"
import ObservationPointsList from "./modelOverview/ObservationPointsList"
import StressPeriodsList from "./modelOverview/StressPeriodsList"
import Models from "./modelOverview/Models";
import ModelStore from "../stores/ModelStore"

export default class ModelOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            models: [],
            activeModel: null,
            boundaryTypes: [],
            activeBoundaryType: null,
            boundaries: [],
            activeBoundary: null,
            observationPoints: [],
            activeObservationPoint: null,
            stressPeriods: [],
        }
    }

    componentWillMount() {
        ModelStore.on("change", () => {
            this.setState({
                models: ModelStore.getAll(),
                activeModel: ModelStore.getActiveModel(),
                boundaryTypes: ModelStore.getBoundaryTypes(),
                activeBoundaryType: ModelStore.getActiveBoundaryType(),
                boundaries: ModelStore.getBoundaries(),
                activeBoundary: ModelStore.getActiveBoundary(),
                observationPoints: ModelStore.getObservationPoints(),
                activeObservationPoint: ModelStore.getActiveObservationPoint(),
                stressPeriods: ModelStore.getStressPeriods(),
            });
        });

        ModelStore.loadAllModels();
    }

    render() {
        return (

            <div className="container">
                <div className="row">

                    <div className="col-xs-2">
                        <h3>Models</h3>
                        <Models models={this.state.models} activeModel={this.state.activeModel}/>
                    </div>

                    <div className="col-xs-2">
                        <h3>BTypes</h3>
                        <BoundaryTypes types={this.state.boundaryTypes} activeType={this.state.activeBoundaryType}/>
                    </div>

                    <div className="col-xs-2">
                        <h3>Boundaries</h3>
                        <BoundariesList boundaries={this.state.boundaries} activeBoundary={this.state.activeBoundary}/>
                    </div>

                    <div className="col-xs-6">
                        <h3>&nbsp;</h3>
                        <ObservationPointsList observationPoints={this.state.observationPoints}
                                               activeObservationPoint={this.state.activeObservationPoint}/>
                        <StressPeriodsList stressperiods={this.state.stressPeriods}/>
                    </div>
                </div>
            </div>
        )
    }
}
