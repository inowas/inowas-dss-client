import React, { PropTypes } from 'react';

import Color from 'color';
import ConfiguredRadium from 'ConfiguredRadium';
import styleGlobals from 'styleGlobals';

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

    disabled: {
        opacity: 0.5,
        cursor: 'not-allowed'
    },

    types: {
        default: {
            background: styleGlobals.colors.grayDark,
            color: styleGlobals.colors.grayLight,
            ':hover': {
                background: Color(styleGlobals.colors.grayDark)
                    .darken(0.15)
                    .string()
            }
        },

        primary: {
            background: styleGlobals.colors.primary,
            color: styleGlobals.colors.grayLight,
            ':hover': {
                background: Color(styleGlobals.colors.primary)
                    .darken(0.15)
                    .string()
            }
        },

        accent: {
            background: styleGlobals.colors.accent,
            color: styleGlobals.colors.grayLight,
            ':hover': {
                background: Color(styleGlobals.colors.accent)
                    .darken(0.15)
                    .string()
            }
        },

        full: {
            width: "100%",
            background: styleGlobals.colors.accent,
            color: styleGlobals.colors.grayLight,
            ':hover': {
                background: Color(styleGlobals.colors.accent)
                    .darken(0.15)
                    .string()
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
            color: styleGlobals.colors.primary,
            textAlign: 'left',

            ':hover': {
                color: Color(styleGlobals.colors.font).darken(0.9).string()
            }
        }
    },

    icon: {
        notOnlyIcon: {
            marginRight: '0.5em'
        },
        type: {
            default: {
                color: styleGlobals.colors.grayLight
            },

            primary: {
                color: styleGlobals.colors.grayLight
            },

            accent: {
                color: styleGlobals.colors.grayLight
            },

            link: {
                color: styleGlobals.colors.font
            }
        }
    }
};

const Button = ConfiguredRadium(function(props) {
    const {
        children,
        type,
        iconInside,
        icon,
        disabled,
        style,
        ...rest
    } = props;

    return (
        <button
            style={[
                styles.base,
                iconInside && styles.iconInside,
                disabled && styles.disabled,
                styles.types[type],
                style
            ]}
            disabled={disabled}
            {...rest}
        >
            {icon &&
                React.cloneElement(icon, {
                    style: [
                        iconInside || styles.icon.notOnlyIcon,
                        styles.icon.type[type],
                        icon.props.style
                    ]
                })}
            {children}
        </button>
    );
});

Button.propTypes = {
    children: PropTypes.node,
    type: PropTypes.oneOf(['default', 'primary', 'accent', 'link', 'full']),
    iconInside: PropTypes.bool,
    disabled: PropTypes.bool,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    icon: PropTypes.element
};

Button.defaultProps = {
    type: 'default',
    iconInside: false,
    disabled: false
};

export default Button;
