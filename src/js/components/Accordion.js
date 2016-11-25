import React from "react";

export default class Accordion extends React.Component {

  render() {
    return (
      <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
        {this.props.children}
      </div>
    );
  }

}
