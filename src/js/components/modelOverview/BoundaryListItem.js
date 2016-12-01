import React from "react";
import ModelStore from "../../stores/ModelStore"

export default class BoundaryListItem extends React.Component {

  onClickHandler(e){
    ModelStore.setActiveBoundary(e.target.id)
  }

  getClassNames(active) {
    if (active){
      return "list-group-item active";
    }

    return "list-group-item";
  }

  render() {
    const boundary = this.props.boundary;
    const active = this.props.active;

    return (
      <a
        id={boundary.id}
        className={this.getClassNames(active)}
        onClick={this.onClickHandler}
      >
        {boundary.name}
      </a>
    );
  }
}
