import React, { PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import Icon from '../../../components/primitive/Icon';
import color from 'color';
import { pure } from 'recompose';
import styleGlobals from 'styleGlobals';

const styles = {
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: color(styleGlobals.colors.background).fade(0.3),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

const LoadingSpinner = ({ style }) => {
    return (
        <div style={[styles.wrapper, style]}>
            <Icon name="loading" />
        </div>
    );
};

LoadingSpinner.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default pure(ConfiguredRadium(LoadingSpinner));
