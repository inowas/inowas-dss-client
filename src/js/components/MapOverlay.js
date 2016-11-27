import React from "react";

export default class MapOverlay extends React.Component {

  render() {
    return (
      <div class="map-overlay">
        {this.props.children}
      </div>
    );
  }

}
