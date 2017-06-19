import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import Icon from '../primitive/Icon';
import styleGlobals from 'styleGlobals';

const styles = {
    wrapper: {
        backgroundColor: styleGlobals.colors.background,
        padding: '16px 20px 20px 20px',
        boxShadow: styleGlobals.boxShadow,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },

    heading: {
        fontSize: 16,
        fontWeight: 600,
        padding: 0,
        margin: 0
    },

    close: {
        textAlign: 'right',
        position: 'absolute',
        right: 16,
        top: 16
    },

    content: {
        flex: 1,
        marginTop: 0,
        marginBottom: 0,
        minHeight: 0
    }
};

@ConfiguredRadium
export default class Tool extends Component {

    static propTypes = {
        children: PropTypes.node,
        close: PropTypes.func.isRequired,
        closeable: PropTypes.bool,
        style: PropTypes.object,
        heading: PropTypes.string
    }

    render( ) {
        const { children, close, closeable, style, heading } = this.props;

        if ( children ) {
            return (
                <div style={[ styles.wrapper, style ]}>
                    <h3 style={[ styles.heading ]}>{heading}</h3>

                    {(( ) => {
                        if ( closeable ) {
                            return (
                                <div style={styles.close}>
                                    <button className="link" onClick={close}><Icon name="close"/></button>
                                </div>
                            );
                        }
                        return null;
                    })( )}

                    <div style={[ styles.content ]}>
                        {children}
                    </div>
                </div>
            );
        }

        return null;
    }

}
