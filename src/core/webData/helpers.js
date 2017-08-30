
export const fetchStatusWrapper = ( request, apiKey ) => {
    request.options.headers['X-AUTH-TOKEN'] = apiKey;

    return fetch( request.url, request.options ).then( response => {
        const contentType = response.headers.get( "content-type" );

        if ( contentType && contentType.indexOf( "application/json" ) !== -1 ) {
            return response.json()
                .then( function( json ) {
                    return response.ok ? json : Promise.reject( json );
                } )
                .catch( function( error ) {
                    // if ok then empty response was given e.g. 200
                    return response.ok ? {} : Promise.reject( error );
                } );
        } else {
            return response.ok ? {} : Promise.reject( {} );
        }
    } );
};

export const waitForResponse = ( action, responseAction ) => action.type === responseAction && action.webData.type;
export const isSuccess = ( action ) => action.webData && action.webData.type === 'success';
export const isError = ( action ) => action.webData && action.webData.type === 'error';
export const waitForAction = ( action, responseAction ) => action.type === responseAction && !action.webData;
