import md5 from 'js-md5';
import React from 'react';
import PropTypes from 'prop-types';
import {pure} from 'recompose';
import {createGridData, min, max, rainbowFactory} from '../helpers';
import {Map, GeoJSON, TileLayer} from 'react-leaflet';
import {disableMap, invalidateSize} from '../../../calculations/map';
import CanvasHeatMapOverlay from '../../../core/leafletCanvasHeatMapOverlay/ReactLeafletHeatMapCanvasOverlay';
import ColorLegend from '../../../t07/components/ColorLegend';

const styles = {
    map: {
        minHeight: 200
    },
    area: {
        weight: 1,
        opacity: 0.7,
        color: 'grey',
        fill: false
    },
};

const generateKeyFunction = geometry => {
    return md5(JSON.stringify(geometry));
};

const renderLegend = (rainbow, unit) => {
    const gradients = rainbow
        .getGradients()
        .slice()
        .reverse();
    const lastGradient = gradients[gradients.length - 1];
    const legend = gradients.map(gradient => ({
        color: '#' + gradient.getEndColour(),
        value: Number(gradient.getMaxNum()).toFixed(2)
    }));

    legend.push({
        color: '#' + lastGradient.getStartColour(),
        value: Number(lastGradient.getMinNum()).toFixed(2)
    });

    return <ColorLegend legend={legend} unit={unit}/>;
};

const RasterDataMap = ({area, boundingBox, data, gridSize, unit}) => {
    const bounds = [
        [boundingBox[0][1], boundingBox[0][0]],
        [boundingBox[1][1], boundingBox[1][0]]
    ];

    const rainbowVis = rainbowFactory({min: min(data), max: max(data)});

    return (
        <Map
            style={styles.map}
            zoomControl={false}
            ref={map => {
                invalidateSize(map);
                disableMap(map);
            }}
            bounds={bounds}
        >
            <TileLayer
                url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                attribution=""
            />
            <GeoJSON
                key={generateKeyFunction(area)}
                data={area}
                style={styles.area}
            />
            <CanvasHeatMapOverlay
                nX={gridSize.n_x}
                nY={gridSize.n_y}
                rainbow={rainbowVis}
                dataArray={createGridData(data, gridSize.n_x, gridSize.n_y)}
                bounds={bounds}
                opacity={0.75}
            />
            {renderLegend(rainbowVis, '')}

        </Map>
    );
};

RasterDataMap.propTypes = {
    area: PropTypes.object.isRequired,
    boundingBox: PropTypes.array.isRequired,
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.number]).isRequired,
    gridSize: PropTypes.object.isRequired,
    unit: PropTypes.string
};


export default pure(RasterDataMap);
