import * as React from 'react';
import ProcessingError from './processingError';
import ProcessingSpinner from './processingSpinner';

const withProcessingSpinner = ComposedComponent => {
    return ( { status, errorMessage } ) => {
        switch (status) {
            case 'error':
                return <ProcessingError message={ errorMessage }/>;
            case 'loading':
                return <ProcessingSpinner/>;
            default:
                return ComposedComponent;
        }
    };
};

export default withProcessingSpinner;
