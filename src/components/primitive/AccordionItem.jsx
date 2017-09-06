import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import Icon from './Icon';
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
export default class AccordionItem extends Component {
    static propTypes = {
        icon: PropTypes.element,
        style: PropTypes.object,
        heading: PropTypes.node.isRequired,
        children: PropTypes.node,
        index: PropTypes.number,
        active: PropTypes.bool,
        toggleActive: PropTypes.func,
        last: PropTypes.bool,
        onClick: PropTypes.func
    };

    handleClick = () => {
        const { toggleActive } = this.props;
        if (toggleActive) {
            toggleActive();
        }
    };

    render() {
        const { active, style, children, icon, last, onClick } = this.props;

        return (
            <div>
                <div style={[styles.header, style]}>
                    {icon &&
                        React.cloneElement(icon, {
                            style: [icon.props.style, styles.icon]
                        })}
                    <span style={styles.heading} onClick={onClick}>
                        {this.props.heading}
                    </span>
                    <Icon
                        style={styles.arrow}
                        name={active ? 'arrow_down' : 'arrow_right'}
                        onClick={this.handleClick}
                    />
                </div>

                {active &&
                    <div style={[last || styles.contentNotLast]}>
                        {children || <div style={styles.contentEmpty} />}
                    </div>}
            </div>
        );
    }
}
