import React from "react";
import {Link} from "react-router"
import ModelStore from "../../stores/ModelStore";

export default class BoundaryTypes extends React.Component {

  onClickHandler(e){
    ModelStore.setActiveBoundaryType(e.target.id);
  }

  getClassNames(activeBoundaryType, boundaryType) {
    if (activeBoundaryType == boundaryType) {
      return "list-group-item active";
    }

    return "list-group-item";
  }

  render() {
    const boundaryTypes = this.props.types;
    const activeBoundaryType = this.props.activeType;

    const activeModel = ModelStore.getActiveModel();

    const getClassNames = this.getClassNames;
    const onClickHandler = this.onClickHandler;

    const items = boundaryTypes.map(function(boundaryType, index) {
      const classNames = getClassNames(activeBoundaryType, boundaryType);
      return (
        <Link
          id={boundaryType}
          onClick={onClickHandler}
          key={boundaryType}
          className={classNames}
          to={`/mov/${activeModel}/${boundaryType}`}
        >
          {boundaryType}
        </Link>
      )
    });

    return (
      <div className="list-group">
        {items}
      </div>
    );
  }
}
