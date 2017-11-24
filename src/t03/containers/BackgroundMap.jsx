import {
    Circle,
    CircleMarker,
    FeatureGroup,
    GeoJSON,
    LayersControl,
    Map,
    Polygon,
    Polyline,
    Popup,
    Rectangle,
    TileLayer
} from 'react-leaflet';
import React, {Component, PropTypes} from 'react';
import {browserHistory, withRouter} from 'react-router';
import {geoJSON, geoJson} from 'leaflet';

import Button from '../../components/primitive/Button';
import ConfiguredRadium from 'ConfiguredRadium';
import styleGlobals from 'styleGlobals';
import {Action, Command, Routing} from '../../t03/actions/index';
import EditControl from '../../core/map/EditControl';
import {getBoundaryDefaultsByType} from '../selectors/boundary';

import FloatingToast from '../../components/modflow/FloatingToast';
import Icon from '../../components/primitive/Icon';
import L from 'leaflet';
import {connect} from 'react-redux';
import md5 from 'js-md5';
import {uniqueId, has} from 'lodash';
import ActiveCellsLayer from '../components/activeCellsLayer';

// see https://github.com/PaulLeCam/react-leaflet/issues/255
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const styles = {
    map: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: styleGlobals.dimensions.navBarHeight,
        bottom: 0,
        overflow: 'hidden'
    },
    centerToBoundsButton: {
        left: styleGlobals.dimensions.spacing.large,
        top:
        styleGlobals.dimensions.navBarHeight +
        styleGlobals.dimensions.spacing.large,
        position: 'fixed',
        zIndex: 100001
    }
};

@ConfiguredRadium
class BackgroundMap extends Component {
    static propTypes = {
        addBoundary: PropTypes.func,
        location: PropTypes.object,
        model: PropTypes.object,
        params: PropTypes.object,
        routes: PropTypes.array,
        setBoundaryGeometry: PropTypes.func,
        setModelArea: PropTypes.func,
        tool: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {
            model: props.model
        };
    }

    componentDidMount() {
        this.invalidateMap();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({model: nextProps.model});
    }

    componentWillUnmount() {
        this.invalidateMap();
    }

    isActive() {
        return (
            this.props.location.hash === '#edit' ||
            this.props.location.hash === '#edit-op' ||
            this.props.location.hash === '#create' ||
            this.props.location.hash === '#view'
        );
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

    invalidateMap = () => {
        if (this.map) {
            this.map.leafletElement.invalidateSize();
        }
    };

    getStyle(type, subtype) {
        const modelStyles = this.state.model.styles;

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
    }

    renderArea(area) {
        if (
            area &&
            !(this.getEditable() && this.getEditable().property === 'area')
        ) {
            return (
                <LayersControl.Overlay name="Area Geometry" checked>
                    <GeoJSON
                        key={this.generateKeyFunction(area)}
                        data={area}
                        style={this.getStyle('area')}
                    />
                </LayersControl.Overlay>
            );
        }

        return null;
    }

    renderBoundingBox(bb) {
        if (!Array.isArray(bb)) {
            return null;
        }

        const bounds = [[bb[0][1], bb[0][0]], [bb[1][1], bb[1][0]]];

        return (
            <LayersControl.Overlay name="Bounding Box" checked={false}>
                <Rectangle bounds={bounds} {...this.getStyle('bounding_box')} />
            </LayersControl.Overlay>
        );
    }

    renderAreaActiveCells = (boundingBox, gridSize, activeCells) => {
        if (!Array.isArray(boundingBox)) {
            return null;
        }

        return (
            <LayersControl.Overlay name="Grid" checked={false}>
                <ActiveCellsLayer boundingBox={boundingBox} gridSize={gridSize} activeCells={activeCells}/>
            </LayersControl.Overlay>
        );
    };

    renderBoundaryPopup = b => {
        return (
            <Popup>
                <div>
                    <div>{b.name}</div>
                    <a href="#" onClick={() => this.returnToBoundariesWithBoundaryId(b.id, b.type, false)}>Edit</a>
                </div>
            </Popup>
        );
    };

    renderConstantHeads(boundaries) {
        const constantHeads = boundaries
            .filter(b => b.type === 'chd')
            .filter(
                b =>
                    !this.getEditable() ||
                    this.getEditable().type !== b.type ||
                    this.getEditable().id !== b.id
            )
            .map(b =>
                <GeoJSON
                    key={this.generateKeyFunction(b.geometry)}
                    data={b.geometry}
                    style={this.getStyle(b.type)}
                >
                    {this.renderBoundaryPopup(b)}
                </GeoJSON>
            );

        if (constantHeads.length === 0) {
            return null;
        }

        return (
            <LayersControl.Overlay name="Constant Head Boundaries" checked>
                <FeatureGroup>
                    {constantHeads}
                </FeatureGroup>
            </LayersControl.Overlay>
        );
    }

    renderGeneralHeads(boundaries) {
        const generalHeads = boundaries
            .filter(b => b.type === 'ghb')
            .filter(
                b =>
                    !this.getEditable() ||
                    this.getEditable().type !== b.type ||
                    this.getEditable().id !== b.id
            )
            .map(b =>
                <GeoJSON
                    key={this.generateKeyFunction(b.geometry)}
                    data={b.geometry}
                    style={this.getStyle(b.type)}
                >
                    {this.renderBoundaryPopup(b)}
                </GeoJSON>
            );

        if (generalHeads.length === 0) {
            return null;
        }

        return (
            <LayersControl.Overlay name="General Head Boundaries" checked>
                <FeatureGroup>
                    {generalHeads}
                </FeatureGroup>
            </LayersControl.Overlay>
        );
    }

    renderRecharges(boundaries) {
        const recharges = boundaries
            .filter(b => b.type === 'rch')
            .filter(
                b =>
                    !this.getEditable() ||
                    this.getEditable().type !== b.type ||
                    this.getEditable().id !== b.id
            )
            .map(b =>
                <GeoJSON
                    key={this.generateKeyFunction(b.geometry)}
                    data={b.geometry}
                    style={this.getStyle(b.type)}
                >
                    {this.renderBoundaryPopup(b)}
                </GeoJSON>
            );

        if (recharges.length === 0) {
            return null;
        }

        return (
            <LayersControl.Overlay name="Recharge Boundaries" checked>
                <FeatureGroup>
                    {recharges}
                </FeatureGroup>
            </LayersControl.Overlay>
        );
    }

    renderRivers(boundaries) {
        const rivers = boundaries
            .filter(b => b.type === 'riv')
            .filter(
                b =>
                    !this.getEditable() ||
                    this.getEditable().type !== b.type ||
                    this.getEditable().id !== b.id
            )
            .map(b =>
                <GeoJSON
                    key={this.generateKeyFunction(b.geometry)}
                    data={b.geometry}
                    style={this.getStyle(b.type)}
                >
                    {this.renderBoundaryPopup(b)}
                </GeoJSON>
            );

        if (rivers.length === 0) {
            return null;
        }

        return (
            <LayersControl.Overlay name="River Boundaries" checked>
                <FeatureGroup>
                    {rivers}
                </FeatureGroup>
            </LayersControl.Overlay>
        );
    }

    renderWells(boundaries) {
        const wells = boundaries
            .filter(b => b.type === 'wel')
            .filter(
                b =>
                    !this.getEditable() ||
                    this.getEditable().type !== b.type ||
                    this.getEditable().id !== b.id
            )
            .map(b =>
                <CircleMarker
                    key={b.id}
                    center={[
                        b.geometry.coordinates[1],
                        b.geometry.coordinates[0]
                    ]}
                    {...this.getStyle(b.type, b.metadata.well_type)}
                >
                    {this.renderBoundaryPopup(b)}
                </CircleMarker>
            );

        if (wells.length === 0) {
            return null;
        }

        return (
            <LayersControl.Overlay name="Wells" checked>
                <FeatureGroup>
                    {wells}
                </FeatureGroup>
            </LayersControl.Overlay>
        );
    }

    getLatLngFromXY = coordinates => coordinates.map(c => [c[1], c[0]]);

    getNewBoundaryNumber = type => {
        let i = 1;
        while (i < 100000) {
            // eslint-disable-next-line no-loop-func
            if (this.props.model.boundaries.filter(b => {
                    return (b.id === (type + '-' + i));
                }).length === 0) {
                return i;
            }
            i++;
        }

        return null;
    };

    getStartDate = () => has(this.state, 'model.stress_periods.start_date_time')
        ? this.state.model.stress_periods.start_date_time
        : '2010-01-01T00:00:00+00:00';

    onCreated = e => {
        const type = this.getCreatable();

        if (type === 'area') {
            const polygon = e.layer;
            const json = polygon.toGeoJSON();
            this.props.setModelArea(json.geometry, polygon.getBounds());
            this.returnToProperties();
        }

        if (type === 'chd') {
            const newBoundaryNumber = this.getNewBoundaryNumber(type);
            const id = type + '-' + newBoundaryNumber;
            const linestring = e.layer;

            const boundary = getBoundaryDefaultsByType(
                type,
                id,
                'Constant Head ' + newBoundaryNumber,
                linestring.toGeoJSON().geometry,
                this.getStartDate()
            );

            this.props.addBoundary(this.props.model.id, boundary);
            this.returnToBoundariesWithBoundaryId(id, type, false);
        }

        if (type === 'ghb') {
            const newBoundaryNumber = this.getNewBoundaryNumber(type);
            const id = type + '-' + newBoundaryNumber;
            const linestring = e.layer;
            const boundary = getBoundaryDefaultsByType(
                type,
                id,
                'General Head ' + newBoundaryNumber,
                linestring.toGeoJSON().geometry,
                this.getStartDate()
            );

            this.props.addBoundary(this.props.model.id, boundary);
            this.returnToBoundariesWithBoundaryId(id, type, false);
        }

        if (type === 'rch') {
            const newBoundaryNumber = this.getNewBoundaryNumber(type);
            const id = type + '-' + newBoundaryNumber;
            const polygon = e.layer;
            const boundary = getBoundaryDefaultsByType(
                type,
                id,
                'Recharge ' + newBoundaryNumber,
                polygon.toGeoJSON().geometry,
                this.getStartDate()
            );

            this.props.addBoundary(this.props.model.id, boundary);
            this.returnToBoundariesWithBoundaryId(id, type, false);
        }

        if (type === 'riv') {
            const newBoundaryNumber = this.getNewBoundaryNumber(type);
            const id = type + '-' + newBoundaryNumber;
            const linestring = e.layer;
            const boundary = getBoundaryDefaultsByType(
                type,
                id,
                'River ' + newBoundaryNumber,
                linestring.toGeoJSON().geometry,
                this.getStartDate()
            );

            this.props.addBoundary(this.props.model.id, boundary);
            this.returnToBoundariesWithBoundaryId(id, type, false);
        }

        if (type === 'wel') {
            const newBoundaryNumber = this.getNewBoundaryNumber(type);
            const id = type + '-' + newBoundaryNumber;
            const point = e.layer;
            const boundary = getBoundaryDefaultsByType(
                type,
                id,
                'Well ' + newBoundaryNumber,
                point.toGeoJSON().geometry,
                this.getStartDate()
            );

            this.props.addBoundary(this.props.model.id, boundary);
            this.returnToBoundariesWithBoundaryId(id, type, false);
        }
    };

    onEditPath = e => {
        const layers = e.layers;
        layers.eachLayer(function(layer) {
            const id = layer.options.id;
            const oId = layer.options.oId;

            const geometry = layer.toGeoJSON().geometry;

            if (id === 'area') {
                const json = layer.toGeoJSON();
                const bounds = geoJson(json).getBounds();
                this.props.setModelArea(json.geometry, bounds);
            } else {
                this.props.setBoundaryGeometry(id, oId, geometry);
            }
        }, this);
    };

    getCreatable = () => {
        const {hash} = this.props.location;
        const {params} = this.props;

        if (hash !== '#create') {
            return null;
        }

        if (!params.id && !params.property && !params.type && !params.pid) {
            return 'area';
        }

        if (
            params.id &&
            params.property === 'boundaries' &&
            params.type &&
            !params.pid
        ) {
            return params.type;
        }

        return null;
    };

    renderCreateControl() {
        const options = {
            area: {
                edit: {
                    edit: false,
                    remove: false
                },
                draw: {
                    polyline: false,
                    polygon: true,
                    rectangle: false,
                    circle: false,
                    marker: false,
                    delete: false
                }
            },
            chd: {
                edit: {
                    edit: true,
                    remove: false
                },
                draw: {
                    polyline: true,
                    polygon: false,
                    rectangle: false,
                    circle: false,
                    marker: false
                }
            },
            ghb: {
                edit: {
                    edit: true,
                    remove: false
                },
                draw: {
                    polyline: true,
                    polygon: false,
                    rectangle: false,
                    circle: false,
                    marker: false
                }
            },
            rch: {
                edit: {
                    edit: true,
                    remove: false
                },
                draw: {
                    polyline: false,
                    polygon: true,
                    rectangle: false,
                    circle: false,
                    marker: false
                }
            },
            riv: {
                edit: {
                    edit: true,
                    remove: false
                },
                draw: {
                    polyline: true,
                    polygon: false,
                    rectangle: false,
                    circle: false,
                    marker: false
                }
            },
            wel: {
                edit: {
                    edit: true,
                    remove: false
                },
                draw: {
                    polyline: false,
                    polygon: false,
                    rectangle: false,
                    circle: false,
                    marker: true
                }
            }
        };

        if (this.getCreatable()) {
            return (
                <FeatureGroup>
                    <EditControl
                        position="bottomright"
                        onCreated={this.onCreated}
                        {...options[this.getCreatable()]}
                    />
                </FeatureGroup>
            );
        }

        return null;
    }

    getEditable = () => {
        const {hash} = this.props.location;
        const {params} = this.props;

        if (hash === '#edit') {
            if (params.id && !params.property && !params.type && !params.pid) {
                return {property: 'area', type: 'area', id: 'area'};
            }

            if (
                params.id &&
                params.property === 'boundaries' &&
                params.type &&
                params.pid
            ) {
                return {
                    property: params.property,
                    type: params.type,
                    id: params.pid
                };
            }
        }

        if (hash === '#edit-op') {
            if (
                params.id &&
                params.property === 'boundaries' &&
                params.type &&
                params.pid
            ) {
                return {
                    property: params.property,
                    type: params.type,
                    id: params.pid,
                    op: true
                };
            }
        }

        return null;
    };

    renderEditControl() {
        const editable = this.getEditable();
        const editables = [];

        if (editable) {
            if (!editable.op) {
                if (editable.property === 'area' && editable.id === 'area') {
                    const area = this.state.model.geometry;
                    editables.push({id: 'area', geometry: area});
                }

                if (editable.property === 'boundaries') {
                    this.state.model.boundaries.forEach(b => {
                        if (b.id === editable.id) {
                            editables.push({id: b.id, geometry: b.geometry, activeCells: b.active_cells});
                        }
                    });
                }
            }

            if (editable.op === true) {
                if (editable.property === 'boundaries') {
                    this.state.model.boundaries.forEach(b => {
                        if (b.id === editable.id) {
                            if (b.observation_points) {
                                b.observation_points.forEach(
                                    op => {
                                        editables.push({id: b.id, oId: op.id, geometry: op.geometry});
                                    }
                                );
                            }
                        }
                    });
                }
            }
        }

        const geometry = editables.map(e => {
            switch (e.geometry.type.toLowerCase()) {
                case 'polygon':
                    return (
                        <Polygon
                            key={uniqueId()}
                            id={e.id}
                            positions={this.getLatLngFromXY(
                                e.geometry.coordinates[0]
                            )}
                        />
                    );
                case 'linestring':
                    return (
                        <Polyline
                            key={uniqueId()}
                            id={e.id}
                            positions={this.getLatLngFromXY(
                                e.geometry.coordinates
                            )}
                        />
                    );
                case 'point':
                    return (
                        <Circle
                            key={uniqueId()}
                            id={e.id}
                            oId={e.oId}
                            center={[
                                e.geometry.coordinates[1],
                                e.geometry.coordinates[0]
                            ]}
                            radius={50}
                        />
                    );
                default:
                    return null;
            }
        });

        const activeCells = editables.map(e => {
            const boundingBox = this.state.model.bounding_box;
            const gridSize = this.state.model.grid_size;

            if (!e.activeCells) {
                return null;
            }

            return (
                <ActiveCellsLayer key={uniqueId()} activeCells={e.activeCells} boundingBox={boundingBox}
                                  gridSize={gridSize}/>
            );
        });

        if (editables.length === 0) {
            return null;
        }

        const options = {
            edit: {
                remove: false
            },
            draw: {
                polyline: false,
                polygon: false,
                rectangle: false,
                circle: false,
                marker: false
            }
        };

        return (
            <FeatureGroup>
                <FeatureGroup>
                    <EditControl
                        position="bottomright"
                        onEdited={this.onEditPath}
                        {...options}
                    />{' '}
                    {geometry}
                </FeatureGroup>
                <FeatureGroup>
                    {activeCells}
                </FeatureGroup>
            </FeatureGroup>
        );
    }

    returnToProperties = () => {
        this.invalidateMap();
        browserHistory.push(this.props.location.pathname);
    };

    returnToBoundariesWithBoundaryId = (id, type, onMap) => {
        this.invalidateMap();
        const {routes, params} = this.props;

        if (onMap) {
            Routing.editBoundaryOnMap(routes, params)('boundaries', type, id);
        } else {
            Routing.editBoundary(routes, params)('boundaries', type, id);
        }
    };

    centerToBounds = () => {
        if (this.map) {
            const area = this.state.model.geometry;
            this.map.leafletElement.fitBounds(this.getBounds(area));
        }
    };

    renderCenterToBoundsButton = () => {
        if (this.props.location.hash) {
            return (
                <Button
                    onClick={this.centerToBounds}
                    style={[styles.centerToBoundsButton]}
                    iconInside
                >
                    <Icon name="marker"/>
                </Button>
            );
        }

        return null;
    };

    renderToast() {
        if (this.isActive()) {
            return (
                <FloatingToast
                    style={{
                        position: 'absolute',
                        bottom: 50,
                        left: 50,
                        zIndex: 100000
                    }}
                    onClick={this.returnToProperties}
                >
                    {'Return to Editor'}
                </FloatingToast>
            );
        }

        return null;
    }

    render() {
        const activeCells = this.state.model.active_cells;
        const area = this.state.model.geometry;
        const boundingBox = this.state.model.bounding_box;
        const gridSize = this.state.model.grid_size;
        const boundaries = this.state.model.boundaries || [];

        if (!area || !area.coordinates) {
            return (
                <div className="map-wrapper">
                    <Map
                        id="background-map"
                        style={styles.map}
                        center={[30, 0]}
                        zoom={3}
                        zoomControl={false}
                    >
                        <LayersControl position="topright">
                            <LayersControl.BaseLayer name="OSM">
                                <TileLayer
                                    url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                                    attribution="&copy; <a href=&quot;http://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> &copy; <a href=&quot;http://cartodb.com/attributions&quot;>CartoDB</a>"
                                />
                            </LayersControl.BaseLayer>
                            <LayersControl.BaseLayer name="OSM.BlackAndWhite">
                                <TileLayer
                                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                    url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                                />
                            </LayersControl.BaseLayer>
                            <LayersControl.BaseLayer name="OSM.Mapnik" checked>
                                <TileLayer
                                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                                />
                            </LayersControl.BaseLayer>
                        </LayersControl>
                        {this.renderCreateControl()}
                    </Map>
                    {this.renderToast()}
                </div>
            );
        }

        return (
            <div className="map-wrapper">
                <Map
                    id="background-map"
                    ref={map => {
                        this.map = map;
                    }}
                    bounds={this.getBounds(area)}
                    zoomControl={false}
                    boundsOptions={{
                        padding: [60, 60]
                    }}
                >
                    <LayersControl position="topright">
                        <LayersControl.BaseLayer name="OSM">
                            <TileLayer
                                url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                                attribution="&copy; <a href=&quot;http://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> &copy; <a href=&quot;http://cartodb.com/attributions&quot;>CartoDB</a>"
                            />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="OSM.BlackAndWhite">
                            <TileLayer
                                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                            />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="OSM.Mapnik" checked>
                            <TileLayer
                                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                            />
                        </LayersControl.BaseLayer>

                        {this.renderArea(area)}
                        {this.renderAreaActiveCells(boundingBox, gridSize, activeCells)}
                        {this.renderBoundingBox(boundingBox)}
                        {this.renderConstantHeads(boundaries)}
                        {this.renderGeneralHeads(boundaries)}
                        {this.renderRecharges(boundaries)}
                        {this.renderRivers(boundaries)}
                        {this.renderWells(boundaries)}
                    </LayersControl>

                    {this.renderCreateControl()}
                    {this.renderEditControl()}
                    {this.renderCenterToBoundsButton()}
                </Map>

                {this.renderToast()}
            </div>
        );
    }
}

const mapStateToProps = (state, {tool}) => {
    return {model: state[tool].model};
};

const actions = {
    setModelArea: Action.setModelArea,
    setBoundaryGeometry: Action.setBoundaryGeometry,
    addBoundary: Command.addBoundary
};

const mapDispatchToProps = (dispatch, {tool}) => {
    const wrappedActions = {};
    for (const key in actions) {
        if (actions.hasOwnProperty(key)) {
            // eslint-disable-next-line no-loop-func
            wrappedActions[key] = function() {
                const args = Array.prototype.slice.call(arguments);
                dispatch(actions[key](tool, ...args));
            };
        }
    }

    return wrappedActions;
};

// eslint-disable-next-line no-class-assign
BackgroundMap = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(BackgroundMap)
);

export default BackgroundMap;
