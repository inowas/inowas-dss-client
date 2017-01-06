import React from "react";
import WellProperties from "./well/WellProperties";
import RiverProperties from "./well/RiverProperties";

export default class BoundaryContent extends React.Component {

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
