import React, { Component, PropTypes } from 'react';
import ConfiguredRadium from 'ConfiguredRadium';
import styleGlobals from 'styleGlobals';

const styles = {
    td: {
        base: {
            padding: styleGlobals.dimensions.spacing.small,
            verticalAlign: 'top',
            textAlign: 'left',
            fontWeight: 300
        },

        head: {
            fontWeight: 700
        }
    }
};

@ConfiguredRadium
export default class Td extends Component {

    static propTypes = {
        children: PropTypes.node,
        style: PropTypes.object,
        head: PropTypes.bool
    }

    static defaultProps = {
        head: false
    };

    render( ) {
        const {
            children,
            style,
            head,
            ...rest
        } = this.props;

        if (head) {
            return (
                <th style={[ styles.td.base, styles.td.head, style ]} {...rest}>
                    {children}
                </th>
            );
        }

        return (
            <td style={[ styles.td.base, style ]} {...rest}>
                {children}
            </td>
        );
    }

}
