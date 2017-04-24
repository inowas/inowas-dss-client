import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';

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
        children: PropTypes.node
    }

    render( ) {
        return (
            <ul style={styles.list}>
                {this.props.children}
            </ul>
        );
    }

}
