import React from "react";
import ModelList from "./ModelList";

export default class Models extends React.Component {

  render(){
    return (
      <ModelList models={this.props.models} activeModel={this.props.activeModel} />
    )
  }
}
