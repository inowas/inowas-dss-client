export function calcBoundsOfPolygon ( polygon ) {
    let minLat = Infinity;
    let maxLat = -Infinity;
    let minLng = Infinity;
    let maxLng = -Infinity;

    polygon.forEach( c => {
        if ( c[1] < minLat ) {
            minLat = c[1];
        }

        if ( c[1] > maxLat ) {
            maxLat = c[1];
        }

        if ( c[0] < minLng ) {
            minLng = c[0];
        }

        if ( c[0] > maxLng ) {
            maxLng = c[0];
        }
    } );

    return [
        [
            minLng,
            minLat,
        ],[
            maxLng,
            maxLat,
        ]
    ];
}

export function latLngToXY ( c ) {
    return [
        [
            c[0].lng,
            c[0].lat,
        ], [
            c[1].lng,
            c[1].lat,
        ]
    ];
}
