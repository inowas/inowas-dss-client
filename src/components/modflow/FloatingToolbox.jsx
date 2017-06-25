import '../../less/floatingToolbox.less';

import React, { Component, PropTypes } from 'react';

import Accordion from '../primitive/Accordion';
import AccordionItem from '../primitive/AccordionItem';
import List from '../primitive/List';
import ListItem from '../primitive/ListItem';

export default class FloatingToolbox extends Component {

    static propTypes = {
        onToolClick: PropTypes.func,
        items: PropTypes.array
    }

    onClick = tool => {
        return ( ) => {
            this.props.onToolClick( tool );
        };
    }

    render( ) {
        const { items } = this.props;

        return (
            <Accordion className="floatingToolbox col-abs-2">
                <AccordionItem heading="Toolbox">
                    <List>
                        {items.map( i => <ListItem key={i.slug} icon={i.icon} clickAction={this.onClick(i.slug)}>{i.name}</ListItem>)}
                    </List>
                </AccordionItem>
            </Accordion>
        );
    }

}
