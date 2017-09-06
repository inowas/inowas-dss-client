import React, { Component, PropTypes } from 'react';
import ConfiguredRadium from 'ConfiguredRadium';
import styleGlobals from 'styleGlobals';

const styles = {
    tr: {
        base: {
            borderBottom: '1px solid ' + styleGlobals.colors.graySemilight,
        },

        head: {
            borderBottom: '1px solid ' + styleGlobals.colors.grayDark,
        }
    }
};

@ConfiguredRadium
export default class Tr extends Component {

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

        return (
            <tr style={[ styles.tr.base, head && styles.tr.head, style ]} {...rest}>
                {children}
            </tr>
        );
    }

}
