import React, { Component, PropTypes } from 'react';

import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
// import ListItem from './ListItem';
import Icon from './Icon';

import '../../less/floatingToolbox.less';

export default class FloatingToolbox extends Component {

    static propTypes = {
        onToolClick: PropTypes.func
    }

    onClick = tool => {
        return () => {
            this.props.onToolClick(tool);
        };
    }

    render( ) {
        return (
            <Accordion className="floatingToolbox col-abs-2">
                <AccordionItem heading="Toolbox">
                    <Accordion>
                        <AccordionItem heading="Model Area" icon={( <Icon name="marker_multiple"/> )}/>
                        <AccordionItem heading="Soilmodel" icon={( <Icon name="layer_horizontal"/> )}/>
                        <AccordionItem heading="Boundaries" icon={( <Icon name="marker"/> )} >
                            <ul>
                                <li onClick={this.onClick('test')}>Wells</li>
                            </ul>
                        </AccordionItem>
                        <AccordionItem heading="Properties" icon={( <Icon name="settings"/> )}/>
                        <AccordionItem heading="Calculation" icon={( <Icon name="calculator"/> )}>
                            <button type="button" className="button">Run calculation</button>
                        </AccordionItem>
                    </Accordion>
                </AccordionItem>
            </Accordion>
        );
    }

}
