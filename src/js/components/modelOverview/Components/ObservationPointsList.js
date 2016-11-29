import React from "react";
import ObservationsPointsListItem from "./ObservationPointListItem"

export default class ObservationPointsList extends React.Component {

  render() {
    const observationPoints = this.props.observationPoints;
    const activeObservationPoint = this.props.activeObservationPoint;

    let items = "";
    if (observationPoints.length > 0){
      items = observationPoints.map(function(op){
        return (
          <ObservationsPointsListItem
            key={op.id} observationPoint={op} active={op.id == activeObservationPoint}/>
        )
      });

      return (
        <ul className="nav nav-tabs" role="tablist">
          {items}
        </ul>
      );
    }

    return null;
  }
}
