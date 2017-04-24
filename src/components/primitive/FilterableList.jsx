import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import List from './List';
import ListItem from './ListItem';
import { uniqBy } from 'lodash';

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
        filterType: ''
    }

    setFilterType = type => {
        return ( ) => {
            this.setState({ filterType: type });
        };
    }

    itemClickAction = id => {
        return () => {
            this.props.clickAction(id);
        };
    }

    render( ) {
        const {
            style,
            list,
            ...rest
        } = this.props;
        const { filterType } = this.state;

        const filter = uniqBy( list, 'type' );

        let filteredList = list;
        if ( filterType ) {
            filteredList = list.filter(i => ( i.type === filterType ));
        }

        return (
            <div {...rest} style={[ style, styles.wrapper ]}>
                <div> filter:
                    <button onClick={this.setFilterType( null )} style={styles.filterButton.base}>all</button>
                    {filter.map(( f, index ) => <button onClick={this.setFilterType( f.type )} key={index} style={styles.filterButton.base}>{f.type}</button>)}
                </div>
                <List style={styles.list}>
                    {filteredList.map(( i, index ) => <ListItem clickAction={this.itemClickAction(i.name)} key={index}>{i.name}</ListItem>)}
                </List>
            </div>
        );
    }
}
