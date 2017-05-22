/**
 * Takes an array of objects like [{name, type}]
 *
 * @author Martin Wudenka
 */

import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import List from './List';
import ListItem from './ListItem';
import { uniqBy } from 'lodash';
import levenshtein from 'levenshtein';

const styles = {
    wrapper: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },

    filterButton: {
        base: {
            background: 'transparent',
            display: 'inline-block',
            border: 0,
            borderRadius: 0,
            cursor: 'pointer',
            textDecoration: 'underline',

            ':hover': {
                color: '#000000'
            }
        }
    },

    list: {
        flex: 1,
        overflow: 'auto'
    }
};

@ConfiguredRadium
export default class FilterableList extends Component {

    static propTypes = {
        list: PropTypes.array.isRequired,
        style: PropTypes.object,
        clickAction: PropTypes.func
    }

    state = {
        filterType: '',
        searchTerm: ''
    }

    setFilterType = type => {
        return ( ) => {
            this.setState({ filterType: type });
        };
    }

    itemClickAction = id => {
        return ( ) => {
            this.props.clickAction( id );
        };
    }

    setSearchTerm = e => {
        this.setState({ searchTerm: e.target.value });
    }

    renderFilterButton( text, onClick, index = 0 ) {
        return (
            <button key={index} onClick={onClick} style={styles.filterButton.base}>{text}</button>
        );
    }

    render( ) {
        const {
            style,
            list,
            // eslint-disable-next-line no-unused-vars
            clickAction,
            ...rest
        } = this.props;
        const { filterType, searchTerm } = this.state;

        const filter = uniqBy( list, 'type' );

        let filteredList = list;
        if ( filterType ) {
            filteredList = list.filter(i => ( i.type === filterType ));
        }

        if ( searchTerm ) {
            const listWithLevenshteinDistance = filteredList.map(i => {
                const leven = new levenshtein( i.name, searchTerm );
                return {
                    ...i,
                    levenshtein: leven.distance
                };
            });

            listWithLevenshteinDistance.sort(( a, b ) => {
                return a.levenshtein - b.levenshtein;
            });

            filteredList = listWithLevenshteinDistance;
        }

        return (
            <div {...rest} style={[ style, styles.wrapper ]}>
                <div>
                    filter: {this.renderFilterButton( 'all', this.setFilterType( null ), filter.length )}
                    {filter.map(( f, index ) => this.renderFilterButton( f.type, this.setFilterType( f.type ), index ))}

                    <div>
                        <input className="input" placeholder="search..." value={searchTerm} onChange={this.setSearchTerm}/>
                    </div>
                </div>
                <List style={styles.list}>
                    {filteredList.map(( i, index ) => <ListItem clickAction={this.itemClickAction( i.id )} key={index}>{i.name}</ListItem>)}
                </List>
            </div>
        );
    }
}
