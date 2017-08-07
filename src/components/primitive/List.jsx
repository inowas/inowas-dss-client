import React, { Component, PropTypes } from 'react';
import ReactList from 'react-list';
import ConfiguredRadium from 'ConfiguredRadium';
import ListItem from './ListItem';

const styles = {
    list: {
        listStyle: 'none',
        padding: 0,
        margin: 0
    }
};

@ConfiguredRadium
export default class List extends Component {

    static propTypes = {
        style: PropTypes.object,
        data: PropTypes.array,
        itemClickAction: PropTypes.func.isRequired,
    };

    renderItems = (children, ref) => {

        const style = {
            ...this.props.style,
            ...styles.list
        };

        return (
            <ul ref={ref} style={style}>{children}</ul>
        );
    };

    renderItem = (index, key) => {
        const b = this.props.data[index];

        return (
            <ListItem clickAction={() => this.props.itemClickAction( b.id, b.type )} key={b.id}>{b.name}</ListItem>
        );
    };

    render( ) {
        return (
                <ReactList
                    itemRenderer={this.renderItem}
                    itemsRenderer={this.renderItems}
                    length={this.props.data.length}
                    type='uniform'
                />
        );
    }

}
