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
    return (
      <div class="map-tool-box panel panel-primary">
        <div class="panel-heading">
          <h3 class="panel-title">Toolbox</h3>
        </div>
        <div class="panel-body">
          <button type="button" onClick={this.zoomIn.bind(this)}>Zoom in</button>
          <Accordion>
            <AccordionItem heading="Model Area">bla blub</AccordionItem>
            <AccordionItem heading="Soilmodel">bla blub</AccordionItem>
            <AccordionItem heading="Boundaries" list>
                <ListItem>
                  <Link to="/wells" onClick={this.disableMap.bind(this)}>Wells</Link>
                </ListItem>
                <ListItem>Rivers</ListItem>
                <ListItem>Recharge</ListItem>
                <ListItem>Constant Head</ListItem>
                <ListItem>General Head</ListItem>
            </AccordionItem>
            <AccordionItem heading="Properties">bla blub</AccordionItem>
            <AccordionItem heading="Calculation">bla blub</AccordionItem>
          </Accordion>
        </div>
      </div>
    );
  }

}
