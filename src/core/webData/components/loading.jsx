import React, { PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import LoadingError from './loadingError';
import LoadingSpinner from './loadingSpinner';
import { pure } from 'recompose';

const styles = {
    wrapper: {
        position: 'relative',
        display: 'inline-block',
    }
};

const Loading = ({ status, children, style }) =>
    <div style={[styles.wrapper, style]}>
        {children}

        {(() => {
            if (status) {
                if (status.type === 'error' ||
                    status.status === 'error'
                ) {
                    return <LoadingError message={status.errorMessage} />;
                } else if (
                    status.type === 'loading' ||
                    status.status === 'loading'
                ) {
                    return <LoadingSpinner />;
                }
            }

            return null;
        })()}
    </div>;

Loading.propTypes = {
    status: PropTypes.object,
    children: PropTypes.node
};

export default pure(ConfiguredRadium(Loading));
