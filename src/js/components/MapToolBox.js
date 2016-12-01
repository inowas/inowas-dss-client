import React from "react";

import Accordion from "./Accordion";
import AccordionItem from "./AccordionItem";
import { IndexLink, Link } from "react-router";
import ListItem from "./ListItem";

export default class MapToolBox extends React.Component {

  componentWillMount() {
    console.log(this.context);
  }

  disableMap() {
    this.context.map._handlers.forEach(function(handler) {
      handler.disable();
    });
  }

  enableMap() {
    this.context.map._handlers.forEach(function(handler) {
      handler.enable();
    });
  }

  zoomIn(){
    this.context.map.zoomIn()
  }
  zoomOut(){
    this.context.map.zoomOut()
  }

  render() {
    const boundaries = this.props.model.boundaries;
    return (
      <div className="map-tool-box panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">Toolbox</h3>
        </div>
        <div className="panel-body">
          <button type="button" onClick={this.zoomIn.bind(this)}>Zoom in</button>
          <Accordion>
            <AccordionItem heading="Model Area">bla blub</AccordionItem>
            <AccordionItem heading="Soilmodel">bla blub</AccordionItem>
            <AccordionItem heading="Boundaries" list>
                <ListItem bCount={boundaries.WEL.length}>
                  <Link to="/wells" onClick={this.disableMap.bind(this)}>Wells</Link>
                </ListItem>
                <ListItem bCount={boundaries.RIV.length}>Rivers</ListItem>
                <ListItem bCount={boundaries.RCH.length}>Recharge</ListItem>
                <ListItem bCount={boundaries.CHD.length}>Constant Head</ListItem>
                <ListItem bCount={boundaries.GHB.length}>General Head</ListItem>
            </AccordionItem>
            <AccordionItem heading="Properties">bla blub</AccordionItem>
            <AccordionItem heading="Calculation">bla blub</AccordionItem>
          </Accordion>
        </div>
      </div>
    );
  }

}
