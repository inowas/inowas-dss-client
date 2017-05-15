import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import styleGlobals from 'styleGlobals';

const styles = {
    heading: {
        backgroundColor: styleGlobals.colors.background,
        margin: 0,
        padding: styleGlobals.dimensions.spacing.medium,
        position: 'fixed',
        top: styleGlobals.dimensions.spacing.large + styleGlobals.dimensions.navBarHeight,
        left: 2 * styleGlobals.dimensions.gridColumn + 3 * styleGlobals.dimensions.gridGutter,
        boxShadow: styleGlobals.boxShadow,
        zIndex: 1800
    }
};

@ConfiguredRadium
export default class FloatingTitle extends Component {

    static propTypes = {
        title: PropTypes.string
    }

    render( ) {
        const { title } = this.props;

        if ( title ) {
            return (
                <h2 style={styles.heading}>{title}</h2>
            );
        }

        return null;
    }

}
