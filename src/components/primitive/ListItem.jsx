import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import styleGlobals from 'styleGlobals';

@ConfiguredRadium
export default class ListItem extends Component {

    static propTypes = {
        children: PropTypes.node,
        icon: PropTypes.element,
        style: PropTypes.object,
        clickAction: PropTypes.func
    }

    getStyles( ) {
        return {
            listItem: {
                padding: styleGlobals.dimensions.spacing.medium,
                cursor: this.props.clickAction
                    ? 'pointer'
                    : 'normal'
            },

            icon: {
                marginRight: '1em'
            }
        };
    }

    renderIcon( icon, style ) {
        if ( icon ) {
            return React.cloneElement(icon, { style });
        }
        return null;
    }

    render( ) {
        const {
            icon,
            children,
            style,
            clickAction,
            ...rest
        } = this.props;

        const styles = this.getStyles( );

        return (
            <li {...rest} onClick={clickAction} style={[ styles.listItem, style ]}>
                {this.renderIcon( icon, styles.icon )}
                {children}
            </li>
        );
    }
}
