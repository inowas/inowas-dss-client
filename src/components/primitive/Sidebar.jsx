import React, { Component, PropTypes } from 'react';

import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import MenuItem from './MenuItem';
import styleGlobals from 'styleGlobals';

const styles = {
    menu: {
        backgroundColor: styleGlobals.colors.background,
        padding: 16,
        boxShadow: styleGlobals.boxShadow,
        width: styleGlobals.dimensions.gridColumn,
        marginLeft: styleGlobals.dimensions.gridGutter,
        marginRight: styleGlobals.dimensions.gridGutter,
        marginBottom: 'auto', // pin element to top
        position: 'relative',
        zIndex: 1100
    },

    title: {
        textAlign: 'center',
        fontWeight: 'bold',
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
        opacity: 0.5,
        cursor: 'not-allowed'
    }
};

export default class Sidebar extends Component {
    static propTypes = {
        title: PropTypes.string,
        items: PropTypes.array,
        onClick: PropTypes.func,
        selectedProperty: PropTypes.string,
        selectedType: PropTypes.string
    };

    handleClick = (property, type) => {
        this.props.onClick(property, type);
    };

    renderItems = items => {
        return items.map((i, index) => {
            if (i.items && i.items.length > 0) {
                const active = i.name === this.props.selectedProperty;

                return (
                    <AccordionItem
                        key={index}
                        style={[i.disabled && styles.disabled]}
                        icon={i.icon}
                        heading={i.title}
                        active={active}
                        onClick={() => this.handleClick(i.name)}
                    >
                        {this.renderSubItems(i.name, i.items)}
                    </AccordionItem>
                );
            }

            return (
                <MenuItem
                    style={[i.disabled && styles.disabled]}
                    key={index}
                    icon={i.icon}
                    heading={i.title}
                    disabled={i.disabled}
                    onClick={() => this.handleClick(i.name)}
                />
            );
        });
    };

    renderSubItems = (property, items) => {
        return (
            <ul style={styles.list}>
                {items &&
                    items.map((i, index) =>
                        <li key={index} style={styles.listItem}>
                            <button
                                onClick={() =>
                                    this.handleClick(property, i.name)}
                                className="link"
                                disabled={false}
                            >
                                {i.title}
                            </button>
                        </li>
                    )}
            </ul>
        );
    };

    render() {
        const { title, items } = this.props;

        let activeItem = 0;
        items.forEach((i, index) => {
            if (i.name === this.props.selectedProperty) {
                activeItem = index;
            }
        });

        return (
            <nav style={styles.menu}>
                <h1 style={styles.title}>
                    {title}
                </h1>
                <Accordion firstActive={activeItem}>
                    {this.renderItems(items)}
                </Accordion>
            </nav>
        );
    }
}
