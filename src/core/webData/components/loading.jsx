import React, { PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import LoadingError from './loadingError';
import LoadingSpinner from './loadingSpinner';
import { pure } from 'recompose';

const styles = {
    wrapper: {
        position: 'relative'
    }
};

const Loading = ({ status, children }) => {
    return (
        <div style={styles.wrapper}>
            {children}

            {(() => {
                if (status) {
                    if (status.type === 'error') {
                        return <LoadingError message={status.errorMessage} />;
                    } else if (status.type === 'loading') {
                        return <LoadingSpinner />;
                    }
                }

                return null;
            })()}
        </div>
    );
};

Loading.propTypes = {
    status: PropTypes.object,
    children: PropTypes.node
};

export default pure(ConfiguredRadium(Loading));
