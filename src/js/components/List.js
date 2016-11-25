import React from "react";

export default class List extends React.Component {

  render() {
    return (
      <div class="list-group">
        {this.props.children}
      </div>
    );
  }

}
