/**
 * Takes an array of objects shape of [{id, name, type}]
 *
 * @author Martin Wudenka
 */
import React from 'react';
import PropTypes from 'prop-types';

import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import ConfiguredRadium from 'ConfiguredRadium';
import List from './List';
import {groupBy, keys} from 'lodash';
import {pure} from 'recompose';

const styles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column'
    },

    searchWrapper: {
        marginBottom: 6
    },

    content: {
        flex: 1,
        minHeight: 0,
        overflow: 'auto'
    },

    group: {
        background: '#EEEEEE',
        paddingLeft: 16,
        paddingRight: 16,
        borderBottom: 0
    },

    overview: {
        fontWeight: 600,
        paddingTop: 8,
        paddingBottom: 8,
        textTransform: 'uppercase',
        cursor: 'pointer'
    },

    list: {
        background: '#FBFBFB'
    },

    accordionTitleNumber: {
        marginLeft: '0.5em',
        fontWeight: 400
    }
};

const FilterableList = ({style, list, activeType, itemClickAction, onCategoryClick}) => {
    const groupedListByTypeProperty = groupBy(list, 'type');
    const types = keys(groupedListByTypeProperty);
    const firstActive = types.indexOf(activeType) !== -1 ? types.indexOf(activeType) : 0;

    return (
        <div style={[styles.wrapper, style]}>
            <div style={styles.content}>
                {(() => {
                    if (types.length === 1) {
                        return (
                            <List
                                itemClickAction={itemClickAction}
                                style={styles.list}
                                data={groupedListByTypeProperty[types[0]]}
                            />
                        );
                    }
                    return (
                        <Accordion firstActive={firstActive}>
                            {types.map(key =>
                                <AccordionItem
                                    style={styles.group}
                                    key={key}
                                    heading={
                                        <span>
                                                {key}
                                            <span
                                                style={[
                                                    styles.accordionTitleNumber
                                                ]}
                                            >
                                                    ({groupedListByTypeProperty[key].length})
                                                </span>
                                            </span>
                                    }
                                    onClick={
                                        onCategoryClick &&
                                        onCategoryClick(key)
                                    }
                                >
                                    <List
                                        itemClickAction={itemClickAction}
                                        style={styles.list}
                                        data={groupedListByTypeProperty[key]}
                                    />
                                </AccordionItem>
                            )}
                        </Accordion>
                    );
                })()}
            </div>
        </div>
    );
};

FilterableList.propTypes = {
    list: PropTypes.array.isRequired,
    style: PropTypes.object,
    onCategoryClick: PropTypes.func,
    itemClickAction: PropTypes.func.isRequired,
    activeType: PropTypes.string
};

export default pure(ConfiguredRadium(FilterableList));
