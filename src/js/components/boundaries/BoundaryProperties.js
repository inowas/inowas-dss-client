import React from "react"

import Sidebar from "./BoundarySidebar";
import Content from "./BoundaryContent";
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
        const selectedBoundary = this.props.model.boundaries.filter(b => b.id == appState.activeBoundaries[bType]);

        return (
            <div className="boundaries-wrapper">
                <Sidebar boundaries={boundaries} appState={appState} />
                <Content boundary={selectedBoundary} />
            </div>
        );
    }
}

BoundaryProperties.contextTypes = {
    model: React.PropTypes.object,
};
