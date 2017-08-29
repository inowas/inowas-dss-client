import * as React from 'react';
import LoadingError from './loadingError';
import LoadingSpinner from './loadingSpinner';

const withLoadingSpinner = ComposedComponent => {
    return ({ status, errorMessage }) => {
        switch (status) {
            case 'error':
                return <LoadingError message={errorMessage} />;
            case 'loading':
                return <LoadingSpinner />;
            default:
                return ComposedComponent;
        }
    };
};

export default withLoadingSpinner;
