import React from "react";

import C3Chart from 'react-c3js';

import * as DiagramActions from "../actions/DiagramActions";
import * as ModelActions from "../actions/ModelActions";

import DiagramStore from "../stores/DiagramStore";
import ModelStore from "../stores/ModelStore";


export default class Diagram extends React.Component {
  constructor() {
    super();
    this.updateData = this.updateData.bind(this);

    this.state = {
      data: DiagramStore.getData(),
      type: 'line',
      options: {
        padding: {
          top: 32,
          bottom: 32,
          left: 32,
          right: 32
        },
        size: {
          height: 600
        },
        //subchart: true,
        zoom: false,
        grid: {
          x: true,
          y: true
        },
        axis: {
          y: {
            min: 0,
            max: 500,
          }
        },
        axisLabel: {
          x: 'x-Achse',
          y: 'y-Achse'
        }
      }
    };
  }

  componentWillMount() {
    DiagramStore.on("change", this.updateData);
    ModelStore.on("change", this.updateData);
  }

  componentWillUnmount() {
    DiagramStore.removeListener("change", this.updateData);
  }

  updateData() {
    this.setState({
      data: DiagramStore.getData()
    });
  }

  loadData() {
    DiagramActions.loadData();
  }

  fetchModels() {
    console.log("Diagram.fetchModels executed");
    ModelActions.fetchModels();
  }

  render() {
    const {data, type, options} = this.state;
    return (
      <div>
        <p>Test</p>
        <C3Chart data={data} type={type} options={options}/>
        <button onClick={this.loadData.bind(this)}>Lade neue Daten</button>
        <button onClick={this.fetchModels.bind(this)}>Lade neue Models</button>
      </div>
    );
  }
}
