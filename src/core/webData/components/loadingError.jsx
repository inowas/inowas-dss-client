import * as React from 'react';
import {pure} from 'recompose';

// TODO make it beautiful

const LoadingError = ( { message, ...props } ) => {
    return (
        <p>Error while loading ... ({message})</p>
    );
};

export default pure(LoadingError);
