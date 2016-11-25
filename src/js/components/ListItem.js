import React from "react";

import { IndexLink, Link } from "react-router";

export default class ListItem extends React.Component {

  render() {
    return (
      <Link to={this.props.to} class="list-group-item">{this.props.children}</Link>          
    );
  }

}
