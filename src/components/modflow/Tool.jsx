import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import Icon from '../primitive/Icon';
import styleGlobals from 'styleGlobals';

const styles = {
    wrapper: {
        backgroundColor: styleGlobals.colors.background,
        padding: '16px 20px 20px 20px',
        boxShadow: styleGlobals.boxShadow,
        position: 'relative'
    },

    close: {
        textAlign: 'right',
        position: 'absolute',
        right: 16,
        top: 16
    }
};

@ConfiguredRadium
export default class Tool extends Component {

    static propTypes = {
        children: PropTypes.node,
        close: PropTypes.func.isRequired,
        closeable: PropTypes.bool,
        style: PropTypes.object
    }

    render( ) {
        const { children, close, closeable, style } = this.props;

        if ( children ) {
            return (
                <div style={[ styles.wrapper, style ]}>
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

                    {children}
                </div>
            );
        }

        return null;
    }

}
