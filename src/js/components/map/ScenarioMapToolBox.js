import React from "react";

import Accordion from "../primitive/Accordion";
import AccordionItem from "../primitive/AccordionItem";
import ListItem from "../primitive/ListItem";
import Icon from "../primitive/Icon.js";
import {showBoundaryProperties} from "../../actions/ApplicationActions"

export default class ScenarioMapToolBox extends React.Component {
    constructor(props){
        super(props)
    }

    onClickHandler(e){
        if (e.target.name == 'calculate'){
            this.props.onCalculate();
        }
    }

    render() {
        const boundaries = this.props.model.boundaries;

        return (
            <Accordion className="map-tool-box col-abs-2">
                <AccordionItem primary={true} heading="Toolbox">
                    <Accordion>
                        <AccordionItem heading="Boundaries" icon={<Icon icon="marker" />} list>
                            <ListItem boundaries={boundaries} icon={<Icon icon="marker" />} type={'WEL'} active={'WEL' == this.props.appState.boundaryProperties}>Wells</ListItem>
                            <ListItem boundaries={boundaries} icon={<Icon icon="marker" />} type={'RIV'} active={'RIV' == this.props.appState.boundaryProperties}>Rivers</ListItem>
                            <ListItem boundaries={boundaries} icon={<Icon icon="marker" />} type={'RCH'} active={'RCH' == this.props.appState.boundaryProperties}>Recharge</ListItem>
                            <ListItem boundaries={boundaries} icon={<Icon icon="marker" />} type={'CHD'} active={'CHD' == this.props.appState.boundaryProperties}>Constant Head</ListItem>
                            <ListItem boundaries={boundaries} icon={<Icon icon="marker" />} type={'GHB'} active={'GHB' == this.props.appState.boundaryProperties}>General Head</ListItem>
                        </AccordionItem>
                        <AccordionItem heading="Calculation" icon={<Icon icon="calculator" />} >
                            <div className="btn-calculation">
                                <button type="button" name="calculate" onClick={::this.onClickHandler} className="btn btn-success btn-block">Run calculation</button>
                            </div>
                        </AccordionItem>
                    </Accordion>
                </AccordionItem>
            </Accordion>
        );
    }

}
