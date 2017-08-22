import * as React from 'react';
import {pure} from 'recompose';

// TODO make it beautiful

const ProcessingError = ( { message, ...props } ) => {
    return (
        <p>Error while processing ... ({message})</p>
    );
};

export default pure(ProcessingError);
