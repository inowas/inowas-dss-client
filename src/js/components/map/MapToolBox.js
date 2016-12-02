import React from "react";

import { IndexLink, Link } from "react-router";

import Accordion from "../primitive/Accordion";
import AccordionItem from "../primitive/AccordionItem";
import ListItem from "../primitive/ListItem";

export default class MapToolBox extends React.Component {

  render() {
    const boundaries = this.props.model.boundaries;
    return (
      <div className="map-tool-box panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">Toolbox</h3>
        </div>
        <div className="panel-body">
          <Accordion>
            <AccordionItem heading="Model Area">bla blub</AccordionItem>
            <AccordionItem heading="Soilmodel">bla blub</AccordionItem>
            <AccordionItem heading="Boundaries" list>
                <ListItem bCount={boundaries.WEL.length}>
                  <IndexLink to="/wells" activeClassName="active">Wells</IndexLink>
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
