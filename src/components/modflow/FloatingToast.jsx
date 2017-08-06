import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import styleGlobals from 'styleGlobals';

const styles = {
    backgroundColor: styleGlobals.colors.background,
    margin: 0,
    padding: styleGlobals.dimensions.spacing.medium,
    position: 'absolute',
    bottom: styleGlobals.dimensions.spacing.large,
    left: styleGlobals.dimensions.spacing.large,
    boxShadow: styleGlobals.boxShadow,
    cursor: 'pointer',
    zIndex: 1100
};

@ConfiguredRadium
export default class FloatingToast extends Component {

    static propTypes = {
        children: PropTypes.node
    };

    render( ) {
        const { children } = this.props;

        if ( children ) {
            return (
                <div onClick={this.props.onClick}>
                    <p style={[ styles ]}>{children}</p>
                </div>
            );
        }

        return null;
    }

}
