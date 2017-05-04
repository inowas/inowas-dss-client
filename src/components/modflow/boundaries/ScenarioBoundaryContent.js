import React from "react";
import WellProperties from "./well/ScenarioWellProperties";
import RiverProperties from "./well/RiverProperties";

export default class ScenarioBoundaryContent extends React.Component {

    render() {
        const boundary = this.props.boundary[0];

        if (boundary.type == 'WEL'){
            return (
                <WellProperties boundary={boundary} />
            );
        }

        if (boundary.type == 'RIV'){
            return (
                <RiverProperties boundary={boundary} />
            );
        }
    }
}
