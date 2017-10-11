import * as mapHelpers from '../../calculations/map';
import { GeoJSON, Map, Rectangle, TileLayer } from 'react-leaflet';
import React from 'react';
import ConfiguredRadium from 'ConfiguredRadium';
import { geoJSON } from 'leaflet';
import md5 from 'js-md5';
import ActiveCellsLayer from './activeCellsLayer';
import { pure } from 'recompose';

const styles = {
    map: {
        minHeight: 300
    }
};

const RadiumMap = ConfiguredRadium( Map );

const generateKeyFunction = geometry => {
    return md5( JSON.stringify( geometry ) );
};

const getBounds = geometry => {
    if (geometry) {
        return geoJSON( geometry ).getBounds();
    }

    return null;
};

const ModelEditorGeneralMap = ({ model, style }) => {
    const area = model.geometry;
    const boundingBox = model.bounding_box;
    const gridSize = model.grid_size;
    const activeCells = model.active_cells;

    const getStyle = (type, subtype) => {
        const modelStyles = model.styles;

        if (!(type in modelStyles)) {
            return modelStyles.default;
        }

        if (subtype === undefined) {
            return modelStyles[ type ];
        }

        if (!(subtype in modelStyles[ type ])) {
            return modelStyles.default;
        }

        return modelStyles[ type ][ subtype ];
    };

    const bounds = [
        [ boundingBox[ 0 ][ 1 ], boundingBox[ 0 ][ 0 ] ],
        [ boundingBox[ 1 ][ 1 ], boundingBox[ 1 ][ 0 ] ]
    ];

    if (area) {
        return <RadiumMap
            className="crossSectionMap"
            style={[ styles.map, style ]}
            zoomControl={false}
            ref={map => {
                mapHelpers.disableMap( map );
                mapHelpers.invalidateSize( map );
            }}
            bounds={getBounds( area )}
        >
            <TileLayer
                url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> &copy; <a href=&quot;http://cartodb.com/attributions&quot;>CartoDB</a>"
            />
            <GeoJSON
                key={generateKeyFunction( area )}
                data={area}
                style={getStyle( 'area' )}
            />
            <Rectangle
                bounds={bounds}
                {...getStyle( 'bounding_box' )}
            />
            <ActiveCellsLayer boundingBox={boundingBox} gridSize={gridSize} activeCells={activeCells}/>
        </RadiumMap>;
    }

    return (
        <RadiumMap
            className="crossSectionMap"
            style={[ styles.map, style ]}
            zoomControl={false}
            ref={map => {
                mapHelpers.disableMap( map );
                mapHelpers.invalidateSize( map );
            }}
            center={[ 20, 140 ]}
            zoom={1}
        >
            <TileLayer
                url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> &copy; <a href=&quot;http://cartodb.com/attributions&quot;>CartoDB</a>"
            />
        </RadiumMap>
    );
};

export default pure( ModelEditorGeneralMap );
