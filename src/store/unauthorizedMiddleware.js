export default function unauthorizedMiddleware() {
    return ref => {
        const { dispatch } = ref;

        return next => action => {
            if ( action.payload && action.payload instanceof Error && action.payload.response && action.payload.response.status === 401 ) {
                dispatch( {
                    type: 'UNAUTHORIZED'
                } );
            }

            next( action );
        };
    };
}
