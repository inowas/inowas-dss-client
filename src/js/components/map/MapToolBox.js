import React from "react";

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
                            <ListItem boundaries={boundaries} type={'WEL'} active={'WEL' == this.props.appState.boundaryProperties}>Wells</ListItem>
                            <ListItem boundaries={boundaries} type={'RIV'} active={'RIV' == this.props.appState.boundaryProperties}>Rivers</ListItem>
                            <ListItem boundaries={boundaries} type={'RCH'} active={'RCH' == this.props.appState.boundaryProperties}>Recharge</ListItem>
                            <ListItem boundaries={boundaries} type={'CHD'} active={'CHD' == this.props.appState.boundaryProperties}>Constant Head</ListItem>
                            <ListItem boundaries={boundaries} type={'GHB'} active={'GHB' == this.props.appState.boundaryProperties}>General Head</ListItem>
                        </AccordionItem>
                        <AccordionItem heading="Properties">bla blub</AccordionItem>
                        <AccordionItem heading="Calculation">bla blub</AccordionItem>
                    </Accordion>
                </div>
            </div>
        );
    }

}
