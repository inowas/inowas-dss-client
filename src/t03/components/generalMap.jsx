/* eslint-disable no-return-assign */
import PropTypes from 'prop-types';
import React from 'react';
import * as mapHelpers from '../../core/geospatial';
import {GeoJSON, Map, Rectangle} from 'react-leaflet';
import ConfiguredRadium from 'ConfiguredRadium';
import {geoJSON, geoJson} from 'leaflet';
import md5 from 'js-md5';
import ActiveCellsLayer from './activeCellsLayer';
import Button from '../../components/primitive/Button';
import Icon from '../../components/primitive/Icon';
import styleGlobals from 'styleGlobals';
import ModelAreaImport from '../../core/import/ModelAreaImport';


const styles = {
    map: {
        minHeight: 400
    },
    mapActionToolbar: {
        textAlign: 'right',
        marginBottom: styleGlobals.dimensions.spacing.medium
    }
};

const RadiumMap = ConfiguredRadium(Map);

class ModelEditorGeneralMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            import: null,
            mapInteraction: null,
        };
    }

    generateKeyFunction = geometry => {
        return md5(JSON.stringify(geometry));
    };

    getBounds = geometry => {
        if (geometry) {
            return geoJSON(geometry).getBounds();
        }

        return null;
    };

    getStyle = (type, subtype) => {
        const modelStyles = this.props.model.styles;

        if (!(type in modelStyles)) {
            return modelStyles.default;
        }

        if (subtype === undefined) {
            return modelStyles[type];
        }

        if (!(subtype in modelStyles[type])) {
            return modelStyles.default;
        }

        return modelStyles[type][subtype];
    };

    toggleImport = (value) => this.setState({import: value});

    handleMapInteractionClick = value => this.setState({mapInteraction: value});

    onAreaHasBeenCreated = e => {
        const polygon = e.layer;
        const json = polygon.toGeoJSON();
        this.props.onAreaUpdate(json.geometry, polygon.getBounds());
        this.setState({
            mapInteraction: false
        });
    };

    onAreaHasBeenEdited = e => {
        const layers = e.layers;
        layers.eachLayer(layer => {
            const json = layer.toGeoJSON();
            const bounds = geoJson(json).getBounds();
            this.props.onAreaUpdate(json.geometry, bounds);
            this.setState({
                mapInteraction: false
            });
        });
    };

    updateArea = (feature) => {
        const bounds = geoJson(feature).getBounds();
        this.props.onAreaUpdate(feature.geometry, bounds);
    };

    renderImportGeoJsonModal = () => {
        if (this.state.import) {
            return (
                <ModelAreaImport
                    onClose={() => this.toggleImport(false)}
                    header={'Import Area Geometry'}
                    onChange={this.updateArea}
                />
            );
        }
        return null;
    };

    render() {
        const {model, readOnly, style} = this.props;
        const area = model.geometry;
        const boundingBox = model.bounding_box;
        const gridSize = model.grid_size;
        const activeCells = model.active_cells;

        const isNew = !area;
        const isView = !isNew;
        const mapInteraction = this.state.mapInteraction;

        const bounds = [
            [boundingBox[0][1], boundingBox[0][0]],
            [boundingBox[1][1], boundingBox[1][0]]
        ];

        if (isNew) {
            if (!mapInteraction) {
                mapHelpers.disableMap(this.map);
                mapHelpers.invalidateSize(this.map);
                return (
                    <div>
                        {this.renderImportGeoJsonModal()}
                        <div style={styles.mapActionToolbar}>
                            <Button
                                type="link"
                                icon={<Icon name="import"/>}
                                onClick={() => this.toggleImport(true)}
                                style={{marginRight: 10}}
                            >
                                Import
                            </Button>
                            <Button
                                type="link"
                                icon={<Icon name="marker"/>}
                                onClick={() => this.handleMapInteractionClick(true)}
                            >
                                Draw on Map
                            </Button>
                        </div>
                        <RadiumMap
                            className="crossSectionMap"
                            style={[styles.map, style]}
                            zoomControl={false}
                            ref={map => this.map = map}
                            center={[20, 140]}
                            zoom={1}
                        >
                            {mapHelpers.getDefaultTileLayer()}
                        </RadiumMap>
                    </div>
                );
            }

            return (
                <div>
                    {this.renderImportGeoJsonModal()}
                    <RadiumMap
                        className="crossSectionMap"
                        style={[styles.map, style]}
                        ref={map => this.map = map}
                        center={[20, 140]}
                        zoom={1}
                    >
                        {mapHelpers.getDefaultTileLayer()}
                        {mapHelpers.renderCreateControl('area', this.onAreaHasBeenCreated)}
                        {mapHelpers.renderFullScreenControl()}
                    </RadiumMap>
                </div>
            );
        }

        if (isView) {
            if (!mapInteraction) {
                return (
                    <div>
                        {this.renderImportGeoJsonModal()}
                        {!readOnly &&
                        <div style={styles.mapActionToolbar}>
                            <Button
                                type="link"
                                icon={<Icon name="import"/>}
                                onClick={() => this.toggleImport(true)}
                                style={{marginRight: 10}}
                            >
                                Import
                            </Button>
                            <Button
                                type="link"
                                icon={<Icon name="marker"/>}
                                onClick={() => this.handleMapInteractionClick(true)}
                            >
                                Edit on Map
                            </Button>
                        </div>
                        }
                        <RadiumMap
                            className="crossSectionMap"
                            style={[styles.map, style]}
                            zoomControl={false}
                            ref={map => {
                                mapHelpers.disableMap(map);
                                mapHelpers.invalidateSize(map);
                            }}
                            bounds={this.getBounds(area)}
                        >
                            {mapHelpers.getDefaultTileLayer()}
                            <GeoJSON
                                key={this.generateKeyFunction(area)}
                                data={area}
                                style={this.getStyle('area')}
                            />
                            <Rectangle
                                bounds={bounds}
                                {...this.getStyle('bounding_box')}
                            />
                            <ActiveCellsLayer
                                boundingBox={boundingBox}
                                gridSize={gridSize}
                                activeCells={activeCells}
                            />
                        </RadiumMap>
                    </div>
                );
            }

            return (
                <div>
                    {this.renderImportGeoJsonModal()}
                    <RadiumMap
                        className="crossSectionMap"
                        style={[styles.map, style]}
                        zoomControl={false}
                        bounds={this.getBounds(area)}
                    >
                        {mapHelpers.getDefaultTileLayer()}
                        <Rectangle
                            bounds={bounds}
                            {...this.getStyle('bounding_box')}
                        />

                        {mapHelpers.renderEditControl('area', area, this.onAreaHasBeenEdited)}
                        {mapHelpers.renderFullScreenControl()}
                        <ActiveCellsLayer boundingBox={boundingBox} gridSize={gridSize} activeCells={activeCells}/>
                    </RadiumMap>
                </div>
            );
        }

        return null;
    }
}

ModelEditorGeneralMap.propTypes = {
    model: PropTypes.object.isRequired,
    onAreaUpdate: PropTypes.func.isRequired,
    readOnly: PropTypes.bool.isRequired,
    style: PropTypes.object
};

export default ModelEditorGeneralMap;
