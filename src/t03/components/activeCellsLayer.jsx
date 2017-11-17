import { Polyline, FeatureGroup } from 'react-leaflet';
import React from 'react';
import { pure } from 'recompose';

const styles = {
    line: {
        color: 'grey',
        weight: 0.3
    }
};

const renderGridCell = (key, xMin, xMax, yMin, yMax) => {
    return (<Polyline key={key} positions={[
        { lng: xMin, lat: yMin },
        { lng: xMin, lat: yMax },
        { lng: xMax, lat: yMax },
        { lng: xMax, lat: yMin },
        { lng: xMin, lat: yMin }
    ]} {...styles.line}/>);
};

const calculateActiveCells = (boundingBox, gridSize, activeCells) => {
    const bbXmin = boundingBox[ 0 ][ 0 ];
    const bbYmin = boundingBox[ 0 ][ 1 ];
    const bbXmax = boundingBox[ 1 ][ 0 ];
    const bbYmax = boundingBox[ 1 ][ 1 ];

    const dX = (bbXmax - bbXmin) / gridSize.n_x;
    const dY = (bbYmax - bbYmin) / gridSize.n_y;

    const gridCells = [];

    activeCells.forEach( a => {
        const x = a[ 0 ];
        const y = a[ 1 ];

        const cXmin = bbXmin + x * dX;
        const cXmax = bbXmin + (x + 1) * dX;
        const cYmin = bbYmax - y * dY;
        const cYmax = bbYmax - (y + 1) * dY;

        gridCells.push( [ cXmin, cXmax, cYmin, cYmax ] );
    } );

    return gridCells;
};

export default pure( ({ boundingBox, gridSize, activeCells }) => {
    if (!activeCells) {
        return null;
    }

    const gridCells = calculateActiveCells( boundingBox, gridSize, activeCells );

    return (
        <FeatureGroup>
            {gridCells.map( (c, k) => renderGridCell( k, c[ 0 ], c[ 1 ], c[ 2 ], c[ 3 ] ) )};
        </FeatureGroup>
    );
} );
