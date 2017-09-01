import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import styleGlobals from 'styleGlobals';

const styles = {
    header: {
        background: 'transparent',
        borderBottom: '1px solid ' + styleGlobals.colors.graySemilight,
        borderRadius: 0,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        userSelect: 'none'
    },

    heading: {
        flex: 1,
        textTransform: 'uppercase',
        fontWeight: 600,
        paddingTop: 8,
        paddingBottom: 8
    },

    icon: {
        marginRight: 16,
        width: 20,
        height: 20
    },

    arrow: {
        marginLeft: 16,
        width: 20,
        height: 20
    },

    contentNotLast: {
        borderBottom: '1px solid ' + styleGlobals.colors.graySemilight
    },

    contentEmpty: {
        height: 20
    }
};

@ConfiguredRadium
export default class MenuItem extends Component {
    static propTypes = {
        icon: PropTypes.element,
        style: PropTypes.object,
        heading: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        children: PropTypes.node,
        index: PropTypes.number,
        active: PropTypes.bool,
        toggleActive: PropTypes.func,
        last: PropTypes.bool,
        disabled: PropTypes.bool
    };

    static defaultProps = {
        disabled: false
    };

    handleClick = () => {
        const { onClick, disabled } = this.props;
        if (!disabled) {
            onClick();
        }
    };

    render() {
        const { style, icon } = this.props;

        return (
            <div>
                <div style={[styles.header, style]} onClick={this.handleClick}>
                    {icon &&
                        React.cloneElement(icon, {
                            style: [icon.props.style, styles.icon]
                        })}

                    <span style={styles.heading}>
                        {this.props.heading}
                    </span>
                </div>
            </div>
        );
    }
}
