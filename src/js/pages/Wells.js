import React from "react"

import BoundarySidebar from "../components/boundaries/BoundarySidebar"
import WellProperties from "../components/boundaries/well/WellProperties"

export default class Wells extends React.Component {

    getWellById(id) {
        return this.context.model.boundaries.find(b => b.id == id);
    }

    render() {

        const {params} = this.props;
        const {model, updateBoundaryName} = this.context;

        return (
            <div className="boundaries-wrapper">
                <BoundarySidebar path="wells" boundaries={model.boundaries.filter(b => b.type == 'WEL')}/>
                {params.wellId &&
                <WellProperties data={this.getWellById(params.wellId)} updateBoundaryName={updateBoundaryName}/>}
            </div>
        );
    }

}

Wells.contextTypes = {
    model: React.PropTypes.object,
    updateBoundaryName: React.PropTypes.func,
};
