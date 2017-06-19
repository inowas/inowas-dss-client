/**
 * Takes an array of objects shape of [{id, name, type}]
 *
 * @author Martin Wudenka
 */

import React, { Component, PropTypes } from 'react';

import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import ConfiguredRadium from 'ConfiguredRadium';
import List from './List';
import ListItem from './ListItem';
import { groupBy, keys } from 'lodash';
import Levenshtein from 'levenshtein';
import Input from './Input';

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
        background: '#FBFBFB',
        flex: 1,
        overflow: 'auto'
    }
};

@ConfiguredRadium
export default class FilterableList extends Component {

    static propTypes = {
        list: PropTypes.array.isRequired,
        style: PropTypes.object,
        itemClickAction: PropTypes.func,
        groupClickAction: PropTypes.func,
        activeType: PropTypes.string
    }

    state = {
        searchTerm: ''
    }

    itemClickAction = id => {
        return ( ) => {
            this.props.itemClickAction( id );
        };
    }

    groupClickAction = type => {
        return ( ) => {
            this.props.groupClickAction( type );
        };
    }

    setSearchTerm = e => {
        this.setState({ searchTerm: e.target.value });
    }

    render( ) {
        const { style, list, activeType } = this.props;
        const { searchTerm } = this.state;

        let workingList = list;

        if ( searchTerm ) {
            const listWithLevenshteinDistance = list.map(i => {
                const leven = new Levenshtein( i.name, searchTerm );
                return {
                    ...i,
                    levenshtein: leven.distance
                };
            }).sort(( a, b ) => {
                return a.levenshtein - b.levenshtein;
            });

            workingList = listWithLevenshteinDistance;
        }

        const groupedList = groupBy( workingList, 'type' );
        const keyList = keys(groupedList);
        const firstActive = keyList.indexOf(activeType);

        return (
            <div style={[ styles.wrapper, style ]}>
                <div style={styles.searchWrapper}>
                    <Input type="search" placeholder="search..." value={searchTerm} onChange={this.setSearchTerm}/>
                </div>
                <div style={styles.content}>
                    <div style={[styles.group, styles.overview]} onClick={this.groupClickAction( null )}>
                        Overview
                    </div>
                    <Accordion firstActive={firstActive}>
                        {keyList.map(key => (
                            <AccordionItem onClick={this.groupClickAction( key )} style={styles.group} key={key} heading={key + ' (' + groupedList[key].length + ')'}>
                                <List style={styles.list}>
                                    {groupedList[key].map( b => <ListItem clickAction={this.itemClickAction( b.id )} key={b.id}>{b.name}</ListItem>)}
                                </List>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        );
    }
}
