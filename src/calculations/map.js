export const disableMap = ( map ) => {
    if ( map ) {
        map.leafletElement._handlers.forEach( function( handler ) {
            handler.disable();
        } );
    }
};

export const enableMap = ( map ) => {
    if ( map ) {
        map.leafletElement._handlers.forEach( function( handler ) {
            handler.enable();
        } );
    }
};

export const invalidateSize = ( map ) => {
    if ( map ) {
        map.leafletElement.invalidateSize();
    }
};
