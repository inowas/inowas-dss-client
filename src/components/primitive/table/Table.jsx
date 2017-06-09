import React, { Component, PropTypes } from 'react';
import ConfiguredRadium from 'ConfiguredRadium';


const styles = {
    table: {
        width: '100%',
        maxWidth: '100%',
        borderSpacing: 0,
        borderCollapse: 'collapse'
    }
};

@ConfiguredRadium
export default class Table extends Component {

    static propTypes = {
        children: PropTypes.node,
        style: PropTypes.object
    }

    render( ) {
        const {
            children,
            style,
            ...rest
        } = this.props;

        return (
            <table style={[ styles.table, style ]} {...rest}>
                {children}
            </table>
        );
    }

}
