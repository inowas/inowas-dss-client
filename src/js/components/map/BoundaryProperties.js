import React from "react"

import BoundarySidebar from "../boundaries/BoundarySidebar";
import WellProperties from "../boundaries/well/WellProperties";
import * as AppActions from "../../actions/ApplicationActions";

export default class BoundaryProperties extends React.Component {

    getWellById(id) {
        return this.context.model.boundaries.find(b => b.id == id);
    }

    setActiveBoundary(bType, id){
        AppActions.setActiveBoundary(bType, id);
    }

    componentWillMount(){
        const appState = this.props.appState;
        const bType = appState.boundaryProperties;
        const boundaries = this.props.model.boundaries.filter(b => b.type == bType);

        if (appState.activeBoundaries.hasOwnProperty(bType) == false){
            if (boundaries.length > 0) {
                this.setActiveBoundary(bType, boundaries[0].id);
            }
        }
    }

    render() {
        const appState = this.props.appState;
        const bType = this.props.appState.boundaryProperties;
        const boundaries = this.props.model.boundaries.filter(b => b.type == bType);

        return (
            <div className="boundaries-wrapper">
                <BoundarySidebar boundaries={boundaries} appState={appState} />
            </div>
        );
    }

}

BoundaryProperties.contextTypes = {
    model: React.PropTypes.object,
    updateBoundaryName: React.PropTypes.func,
};
