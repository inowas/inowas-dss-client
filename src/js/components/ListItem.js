import React from "react";

export default class ListItem extends React.Component {

  render() {
    return (
      <span className="list-group-item">{this.props.children}</span>
    );
  }

}
