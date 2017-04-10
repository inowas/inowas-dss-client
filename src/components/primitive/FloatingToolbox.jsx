import React, { PropTypes, Component } from 'react';

import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
// import ListItem from './ListItem';
import Icon from './Icon';

import '../../less/floatingToolbox.less';

export default class FloatingToolbox extends Component {

    render( ) {
        return (
            <Accordion className="floatingToolbox col-abs-2">
                <AccordionItem primary heading="Toolbox">
                    <Accordion>
                        <AccordionItem heading="Model Area" icon={( <Icon name="area"/> )}/>
                        <AccordionItem heading="Soilmodel" icon={( <Icon name="layer"/> )}/>
                        <AccordionItem heading="Boundaries" icon={( <Icon name="marker"/> )}/>
                        <AccordionItem heading="Properties" icon={( <Icon name="properties"/> )}/>
                        <AccordionItem heading="Calculation" icon={( <Icon name="calculator"/> )}>
                            <button type="button" className="button">Run calculation</button>
                        </AccordionItem>
                    </Accordion>
                </AccordionItem>
            </Accordion>
        );
    }

}
