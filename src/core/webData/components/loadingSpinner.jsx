import * as React from 'react';
import {pure} from 'recompose';

// TODO make it beautiful
const LoadingSpinner = ({ ...props }) => {
    return (
        <p {...props}>Loading ...</p>
    );
};

export default pure(LoadingSpinner);
