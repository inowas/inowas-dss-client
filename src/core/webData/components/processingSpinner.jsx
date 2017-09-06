import * as React from 'react';
import {pure} from 'recompose';

// TODO make it beautiful
const ProcessingSpinner = ({ ...props }) => {
    return (
        <p {...props}>Processing ...</p>
    );
};

export default pure(ProcessingSpinner);
