import React from 'react';
import Icon from '../../../components/primitive/Icon';
import styleGlobals from 'styleGlobals';
import {pure} from 'recompose';

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

const closeableWindow = ( { children, close, closeable, style, heading } ) => {
    return (
        <div style={{ ...styles.wrapper, ...style }}>
            <h3 style={styles.heading}>{heading}</h3>

            {closeable &&
                <div style={styles.close}>
                    <button className="link" onClick={close}><Icon name="close"/></button>
                </div>
            }

            <div style={styles.content}>
                {children}
            </div>
        </div>
    );
};

export default pure( closeableWindow );
