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
import { groupBy } from 'lodash';
import Levenshtein from 'levenshtein';

const styles = {
    wrapper: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },

    searchWrapper: {
        marginBottom: 6
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
        groupClickAction: PropTypes.func
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
        const { style, list } = this.props;
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

        workingList = groupBy( workingList, 'type' );

        return (
            <div style={[ style, styles.wrapper ]}>
                <div style={styles.searchWrapper}>
                    <input className="input" placeholder="search..." value={searchTerm} onChange={this.setSearchTerm}/>
                </div>
                <div style={styles.content}>
                    <Accordion>
                        <div style={[styles.group, styles.overview]} onClick={this.groupClickAction( null )}>
                            Overview
                        </div>
                        {(( ) => {
                            const items = [ ];
                            for ( const key in workingList ) {
                                if (workingList.hasOwnProperty( key )) {
                                    items.push(
                                        <AccordionItem onClick={this.groupClickAction( key )} style={styles.group} key={key} heading={key + ' (' + workingList[key].length + ')'}>
                                            <List style={styles.list}>
                                                {workingList[key].map( b => <ListItem clickAction={this.itemClickAction( b.id )} key={b.id}>{b.name}</ListItem>)}
                                            </List>
                                        </AccordionItem>
                                    );
                                }
                            }
                            return items;
                        })( )}
                    </Accordion>
                </div>
            </div>
        );
    }
}
