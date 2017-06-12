import React, { PropTypes } from 'react';
import ConfiguredRadium from 'ConfiguredRadium';
import styleGlobals from 'styleGlobals';
import Color from 'color';

const styles = {
    base: {
        paddingTop: styleGlobals.dimensions.spacing.small,
        paddingBottom: styleGlobals.dimensions.spacing.small,
        paddingLeft: styleGlobals.dimensions.spacing.medium,
        paddingRight: styleGlobals.dimensions.spacing.medium,

        border: 0,
        borderRadius: styleGlobals.dimensions.borderRadius,
        cursor: 'pointer'
    },

    iconInside: {
        paddingLeft: styleGlobals.dimensions.spacing.small,
        paddingRight: styleGlobals.dimensions.spacing.small
    },

    types: {
        default: {
            background: styleGlobals.colors.grayDark,
            color: styleGlobals.colors.grayLight,
            ':hover': {
                background: Color( styleGlobals.colors.grayDark ).darken( 0.15 ).string( )
            }
        },

        primary: {
            background: styleGlobals.colors.primary,
            color: styleGlobals.colors.grayLight,
            ':hover': {
                background: Color( styleGlobals.colors.primary ).darken( 0.15 ).string( )
            }
        },

        accent: {
            background: styleGlobals.colors.accent,
            color: styleGlobals.colors.grayLight,
            ':hover': {
                background: Color( styleGlobals.colors.accent ).darken( 0.15 ).string( )
            }
        },

        link: {
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            background: 'transparent',
            // textDecoration: 'none',
            display: 'inline-block',
            fontWeight: 300,
            color: styleGlobals.colors.font,

            ':hover': {
                color: Color( styleGlobals.colors.font ).darken( 0.9 ).string( )
            }
        }
    }
};

const Button = ConfiguredRadium( function( props ) {
    const {
        children,
        type,
        iconInside,
        style,
        ...rest
    } = props;
    return (
        <button style={[
            styles.base, iconInside
                ? styles.iconInside
                : null,
            styles.types[type],
            style
        ]} {...rest}>{children}</button>
    );
});

Button.propTypes = {
    children: PropTypes.node,
    type: PropTypes.oneOf([ 'default', 'primary', 'accent', 'link' ]),
    iconInside: PropTypes.bool,
    style: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ])
};

Button.defaultProps = {
    type: 'default',
    iconInside: false
};

export default Button;
