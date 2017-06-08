import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import styleGlobals from 'styleGlobals';

const styles = {
    wrapper: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        zIndex: 1100,
        display: 'flex',
        flexDirection: 'column'
    },

    container: {
        backgroundColor: styleGlobals.colors.background,
        padding: 16,
        boxShadow: styleGlobals.boxShadow,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 6
    },

    action: {
        background: 'transparent',
        border: 0,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: styleGlobals.colors.primary
    },

    actionNotLast: {
        marginBottom: 10
    },

    icon: {
        width: 30,
        height: 30,
        marginBottom: 6,
        color: styleGlobals.colors.font
    },

    title: {
        textAlign: 'center'
    }
};

@ConfiguredRadium
export default class FloatingMapToolBox extends Component {

    static propTypes = {
        actions: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string, icon: PropTypes.element, onClick: PropTypes.func })).isRequired,
        save: PropTypes.func
    }

    render( ) {
        const { actions, save } = this.props;
        return (
            <div style={styles.wrapper}>
                <div style={styles.container}>
                    {actions.map(( a, index ) => {
                        return (
                            <button key={index} onClick={a.onClick} style={[
                                styles.action,
                                ( index + 1 === actions.length ) || styles.actionNotLast
                            ]}>
                                {a.icon && React.cloneElement(a.icon, {
                                    style: [ a.icon.props.style, styles.icon ]
                                })}
                                <span style={[ styles.title ]}>
                                    {a.title}
                                </span>
                            </button>
                        );
                    })}
                </div>
                <button onClick={save} className="button button-primary">Save</button>
            </div>
        );
    }
}
