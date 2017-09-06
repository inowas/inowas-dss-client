import React, { PropTypes } from 'react';
import Icon from '../../../components/primitive/Icon';
import Button from '../../../components/primitive/Button';
import styleGlobals from 'styleGlobals';
import { pure } from 'recompose';
import ConfiguredRadium from 'ConfiguredRadium';

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
        fontWeight: 400,
        marginTop: 0,
        marginBottom: styleGlobals.dimensions.spacing.large,
        padding: 0
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
        minHeight: 0,
        overflowY: 'auto'
    }
};

const closeableWindow = ({ children, close, closeable, style, heading }) => {
    return (
        <div style={[styles.wrapper, style]}>
            <h3 style={styles.heading}>
                {heading}
            </h3>

            {closeable &&
                <div style={[styles.close]}>
                    <Button type="link" iconInside onClick={close}>
                        <Icon name="close" />
                    </Button>
                </div>}

            <div style={styles.content}>
                {children}
            </div>
        </div>
    );
};

closeableWindow.propTypes = {
    children: PropTypes.node,
    close: PropTypes.func,
    closeable: PropTypes.bool,
    style: PropTypes.object,
    heading: PropTypes.string
};

export default pure(ConfiguredRadium(closeableWindow));
