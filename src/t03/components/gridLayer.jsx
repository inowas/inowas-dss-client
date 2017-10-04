import { Polyline, FeatureGroup } from 'react-leaflet';
import React, { Component, PropTypes } from 'react';

const styles = {
    line: {
        color: 'grey',
        weight: 1
    }
};

export default class GridLayer extends Component {

    static propTypes = {
        boundingBox: PropTypes.array,
        gridSize: PropTypes.object
    };

    renderLine = ( key, xMin, xMax, yMin, yMax ) => {
        return ( <Polyline key={key} positions={[
            {
                lng: xMin,
                lat: yMin
            },
            {
                lng: xMax,
                lat: yMax
            }
        ]} {...styles.line}/> );
    };

    calculateLineCoordinates = (boundingBox, gridSize ) => {
        const bbXmin = boundingBox[0][0];
        const bbYmin = boundingBox[0][1];
        const bbXmax = boundingBox[1][0];
        const bbYmax = boundingBox[1][1];

        const dX = (bbXmax - bbXmin) / gridSize.n_x;
        const dY = (bbYmax - bbYmin) / gridSize.n_y;

        const lineCoordinates = [];

        for (let x = 0; x <= (gridSize.n_x); x++) {
            const cXmin = bbXmin + x * dX;
            const cXmax = cXmin;
            const cYmin = bbYmin;
            const cYmax = bbYmax;

            lineCoordinates.push([cXmin, cXmax, cYmin, cYmax]);
        }

        for (let y = 0; y <= (gridSize.n_y); y++) {
            const cXmin = bbXmin;
            const cXmax = bbXmax;
            const cYmin = bbYmin + y * dY;
            const cYmax = cYmin;

            lineCoordinates.push([cXmin, cXmax, cYmin, cYmax]);
        }

        return lineCoordinates;
    };

    render( ) {
        const { boundingBox, gridSize } = this.props;
        const lineCoordinates = this.calculateLineCoordinates(boundingBox, gridSize);

        return (
            <FeatureGroup>
                {lineCoordinates.map( (c, k) => {
                    return this.renderLine(k, c[0], c[1], c[2], c[3]);
                })}
            </FeatureGroup>
        );
    }
}
