/**
 * Takes an array of objects shape of [{id, name, type}]
 *
 * @author Martin Wudenka
 */
import React, { PropTypes } from 'react';

import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import ConfiguredRadium from 'ConfiguredRadium';
import List from './List';
import { groupBy, keys } from 'lodash';
import { pure } from 'recompose';

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

@ConfiguredRadium
class FilterableList extends React.PureComponent {
    static propTypes = {
        list: PropTypes.array.isRequired,
        style: PropTypes.object,
        onCategoryClick: PropTypes.func,
        itemClickAction: PropTypes.func.isRequired,
        activeType: PropTypes.string
    };

    render() {
        const {
            style,
            list,
            activeType,
            itemClickAction,
            onCategoryClick
        } = this.props;

        const groupedList = groupBy(list, 'type');
        const keyList = keys(groupedList);
        const firstActive =
            keyList.indexOf(activeType) !== -1
                ? keyList.indexOf(activeType)
                : 0;

        return (
            <div style={[styles.wrapper, style]}>
                <div style={styles.content}>
                    {(() => {
                        if (keyList.length === 1) {
                            return (
                                <List
                                    itemClickAction={itemClickAction}
                                    style={styles.list}
                                    data={groupedList[keyList[0]]}
                                />
                            );
                        }
                        return (
                            <Accordion firstActive={firstActive}>
                                {keyList.map(key =>
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
                                                    ({groupedList[key].length})
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
                                            data={groupedList[key]}
                                        />
                                    </AccordionItem>
                                )}
                            </Accordion>
                        );
                    })()}
                </div>
            </div>
        );
    }
}
export default pure(FilterableList);
