import React from "react";

import Accordion from "./Accordion";
import AccordionItem from "./AccordionItem";
import List from "./List";
import ListItem from "./ListItem";

export default class MapToolBox extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div class="map-tool-box panel panel-primary">
        <div class="panel-heading">
          <h3 class="panel-title">Toolbox</h3>
        </div>
        <div class="panel-body">
          <Accordion>
            <AccordionItem heading="Model Area">bla blub</AccordionItem>
            <AccordionItem heading="Soilmodel">bla blub</AccordionItem>
            <AccordionItem heading="Boundaries">
              <List>
                <ListItem to="/wells">Wells</ListItem>
                <ListItem>Rivers</ListItem>
                <ListItem>Recharge</ListItem>
                <ListItem>Constant Head</ListItem>
                <ListItem>General Head</ListItem>
              </List>
            </AccordionItem>
            <AccordionItem heading="Properties">bla blub</AccordionItem>
            <AccordionItem heading="Calculation">bla blub</AccordionItem>
          </Accordion>
        </div>
      </div>
    );
  }

}
