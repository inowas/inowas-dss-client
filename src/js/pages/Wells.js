import React from "react"

import BoundarySidebar from "../components/boundaries/BoundarySidebar"
import WellProperties from "../components/boundaries/well/WellProperties"

export default class Wells extends React.Component {

  getWellById(id) {
    return this.context.model.boundaries.WEL.find(b => b.id == id);
  }

  render() {

    const { params } = this.props;
    const { model, updateWellName } = this.context;

    return (
      <div className="wells-wrapper">
        <BoundarySidebar path="wells" boundaries={model.boundaries.WEL} />
        {params.wellId && <WellProperties data={this.getWellById(params.wellId)} updateWellName={updateWellName} />}
      </div>
    );
  }

}

Wells.contextTypes = {
  model: React.PropTypes.object,
  updateWellName: React.PropTypes.func,
};
