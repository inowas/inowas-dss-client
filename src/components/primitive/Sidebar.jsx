
/*

items = [{
    name,
    icon,
    items: [{
        name,
        onClick
    }]
}]

*/

import React, { Component, PropTypes } from 'react';

import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import ConfiguredRadium from 'ConfiguredRadium';
import styleGlobals from 'styleGlobals';

const styles = {

    menu: {
        width: styleGlobals.dimensions.gridColumn,
        marginLeft: styleGlobals.dimensions.gridGutter,
        marginRight: styleGlobals.dimensions.gridGutter,
        marginBottom: 'auto', // pin element to top
        position: 'relative',
        zIndex: 1100
    },

    wrapper: {
        backgroundColor: styleGlobals.colors.background,
        padding: 16,
        boxShadow: styleGlobals.boxShadow
    },

    title: {
        textAlign: 'center',
        fontSize: 16,
        borderBottom: 0
    },

    list: {
        listStyle: 'none',
        marginLeft: 36,
        padding: 0
    },

    listItem: {
        paddingTop: 6,
        paddingBottom: 6
    },

    disabled: {
        opacity: 0.5
    }

};

@ConfiguredRadium
export default class Sidebar extends Component {

    static propTypes = {
        title: PropTypes.string,
        items: PropTypes.array,
        firstActive: PropTypes.number
    };

    render( ) {
        const { title, items, firstActive } = this.props;

        return (
            <nav style={[styles.wrapper, styles.menu]}>
                <Accordion>
                    <AccordionItem style={styles.title} heading={title}>
                        <Accordion firstActive={firstActive}>
                            {items.map((i, index) => (
                                <AccordionItem style={[i.disabled && styles.disabled]} icon={i.icon}
                                               heading={i.name} onClick={i.onClick} key={index}>
                                    <ul style={styles.list}>
                                        {i.items && i.items.map((i2, index2) => (
                                            <li style={[styles.listItem, (i.disabled || i2.disabled) && styles.disabled]}
                                                key={index2}>
                                                {(() => {
                                                    if (i2.onClick) {
                                                        return (
                                                            <button onClick={i2.onClick} className="link"
                                                                    disabled={i.disabled || i2.disabled}>
                                                                {i2.name}
                                                            </button>
                                                        );
                                                    }
                                                    return i2.name;
                                                })()}
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </AccordionItem>
                </Accordion>
            </nav>
        );

    }
}
