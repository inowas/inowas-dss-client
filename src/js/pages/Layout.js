import React from "react";

import ModFlowMap from "../components/ModFlowMap";
import Model from "./../modflow_model_example_data"

export default class Layout extends React.Component {

  render() {
    return (
      <div className="page-wrapper">
        <ModFlowMap model={Model}>
          {this.props.children}
        </ModFlowMap>
      </div>
    );
  }

}
