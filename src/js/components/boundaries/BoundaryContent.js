import React from "react";
import WellProperties from "./well/WellProperties";

export default class BoundaryContent extends React.Component {

    render() {
        if (this.props.boundary.length == 0){
            return <span>TEST_No_bType</span>;
        }

        const boundary = this.props.boundary[0];

        if (boundary.type == 'WEL'){
            return (
                <WellProperties boundary={boundary} />
            );
        }
    }
}
