import md5 from 'js-md5';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as L from 'leaflet';
import {
    FeatureGroup,
    GeoJSON,
    LayersControl,
    Map,
    Polyline,
    Polygon,
    CircleMarker,
    Circle,
    Rectangle,
    TileLayer
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import FloatingToast from '../../components/modflow/FloatingToast';
import { withRouter, browserHistory } from 'react-router';
import Button from '../../components/primitive/Button';
import Icon from '../../components/primitive/Icon';
import ConfiguredRadium from 'ConfiguredRadium';
import styleGlobals from 'styleGlobals';

import { Action } from '../../t03/actions/index';

const styles = {
    centerToBoundsButton: {
        left: styleGlobals.dimensions.spacing.large,
        top: styleGlobals.dimensions.navBarHeight + styleGlobals.dimensions.spacing.large,
        position: 'fixed',
        zIndex: 100001
    }
};

@ConfiguredRadium
class BackgroundMap extends Component {

    static propTypes = {
        model: PropTypes.object,
        setModelArea: PropTypes.func,
        setBoundaryGeometry: PropTypes.func,
        removeGeometryFlags: PropTypes.func,
        location: PropTypes.object
    }

    constructor( props ) {
        super( props );

        this.state = {
            model: props.model
        };
    }

    componentDidMount( ) {
        this.invalidateMap( );
    }

    componentWillReceiveProps( nextProps ) {
        this.setState({ model: nextProps.model });
    }

    componentWillUnmount( ) {
        this.invalidateMap( );
    }

    generateKeyFunction( geometry ) {
        return md5(JSON.stringify( geometry ));
    }

    getBounds = ( geometry ) => {
        if ( geometry ) {
            return L.geoJSON( geometry ).getBounds( );
        }

        return null;
    }

    zoomToBounds = ( ) => {
        if (this.map && this.getBounds( )) {
            const bounds = this.getBounds( );
            console.log('ZOOMTOBOUNDS', this.map, bounds, bounds.isValid( ));
            // this.map.leafletElement.fitBounds(this.getBounds());
        }
    }

    invalidateMap = ( ) => {
        if ( this.map ) {
            console.log( 'INVALIDATEMAP', this.map );
            this.map.leafletElement.invalidateSize( );
        }
    }

    getCenter( ) {
        if ( this.state.model && this.state.model.geometry && this.state.model.geometry.coordinates ) {
            const coordinates = this.state.model.geometry.coordinates[0];
            let xmin = coordinates[0][0 ];
            let xmax = coordinates[0][0 ];
            let ymin = coordinates[0][1 ];
            let ymax = coordinates[0][1 ];

            coordinates.forEach(c => {
                if ( c[0] < xmin ) {
                    xmin = parseFloat(c[0]);
                }

                if ( c[0] > xmax ) {
                    xmax = parseFloat(c[0]);
                }

                if ( c[1] < ymin ) {
                    ymin = parseFloat(c[1]);
                }

                if ( c[1] > ymax ) {
                    ymax = parseFloat(c[1]);
                }
            });

            return [
                ( ymin + ymax ) / 2,
                ( xmax + xmin ) / 2
            ];
        }

        return [ 51.047438, 13.741150 ];
    }

    getStyle( type, subtype ) {
        const styles = this.state.model.styles;

        if (!( type in styles )) {
            return styles.default;
        }

        if ( subtype === undefined ) {
            return styles[type];
        }

        if (!(subtype in styles[type])) {
            return styles.default;
        }

        return styles[type][subtype ];
    }

    renderArea( area ) {
        if ( area && !area.edit && !area.create ) {
            return (
                <LayersControl.Overlay name="Area Geometry" checked>
                    <GeoJSON key={this.generateKeyFunction( area )} data={area} style={this.getStyle( 'area' )}/>
                </LayersControl.Overlay>
            );
        }

        return null;
    }

    renderBoundingBox( bb ) {
        if (!Array.isArray( bb )) {
            return null;
        }

        const bounds = [
            [bb[0][1], bb[0][0 ]
            ],
            [bb[1][1], bb[1][0 ]
            ]
        ];

        return (
            <LayersControl.Overlay name="Bounding Box" checked={false}>
                <Rectangle bounds={bounds} {...this.getStyle('bounding_box')}/>
            </LayersControl.Overlay>
        );
    }

    renderConstantHeads( boundaries ) {
        const constantHeads = boundaries.map(b => ( <GeoJSON key={this.generateKeyFunction( b.geometry )} data={b.geometry} style={this.getStyle( b.type )}/> ));

        if ( constantHeads.length === 0 ) {
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

    renderGeneralHeads( boundaries ) {
        const generalHeads = boundaries.map(b => ( <GeoJSON key={this.generateKeyFunction( b.geometry )} data={b.geometry} style={this.getStyle( b.type )}/> ));

        if ( generalHeads.length === 0 ) {
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

    renderRecharges( boundaries ) {
        const recharges = boundaries.map(b => ( <GeoJSON key={this.generateKeyFunction( b.geometry )} data={b.geometry} style={this.getStyle( b.type )}/> ));

        if ( recharges.length === 0 ) {
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

    renderRivers( boundaries ) {
        const rivers = boundaries.map(b => ( <GeoJSON key={this.generateKeyFunction( b.geometry )} data={b.geometry} style={this.getStyle( b.type )}/> ));

        if ( rivers.length === 0 ) {
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

    renderWells( boundaries ) {
        const wells = boundaries.map(w => ( <CircleMarker key={w.id} center={[w.geometry.coordinates[1], w.geometry.coordinates[0]]} {...this.getStyle(w.type, w.metadata.well_type)}/> ));

        if ( wells.length === 0 ) {
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

    getLatLngFromXY( coordinates ) {
        return coordinates.map(c => ([c[1], c[0]]));
    }

    onCreated = e => {
        if ( this.getCreatable( ) === 'area' ) {
            const polygon = e.layer;
            const geoJSON = polygon.toGeoJSON( );
            this.props.setModelArea(geoJSON.geometry, polygon.getBounds( ));
        }
    }

    onDeleted = e => {
        console.log( 'Deleted !' );
    }

    onEditStop = e => {
        console.log( 'Edit is stopped !' );
    }

    onEditStart = e => {
        console.log( 'Edit is started !' );
    }

    onEditPath = e => {
        const layers = e.layers;
        layers.eachLayer( function( layer ) {
            const id = layer.options.id;
            const geometry = layer.toGeoJSON( ).geometry;

            if ( id === 'area' ) {
                this.props.setModelArea( geometry );
            } else {
                this.props.setBoundaryGeometry( id, geometry );
            }
        }, this);
    }

    getCreatable = ( ) => {
        const area = this.props.model.geometry;

        if ( area && area.create === true ) {
            return 'area';
        }

        return null;
    }

    renderCreateControl( ) {
        if ( this.getCreatable( ) === 'area' ) {
            const drawOptions = {
                polyline: false,
                polygon: true,
                rectangle: false,
                circle: false,
                marker: false
            };

            return (
                <FeatureGroup>
                    <EditControl position="bottomright" onCreated={this.onCreated} onDeleted={this.onDeleted} onEditStart={this.onEditStart} onEditStop={this.onEditStop} onEdited={this.onEditPath} draw={drawOptions}/>
                </FeatureGroup>
            );
        }

        return null;
    }

    renderEditControl( ) {
        const area = this.state.model.geometry;
        const boundaries = this.state.model.boundaries;

        // Get all editable elements
        let editables = [ ];

        if ( area && area.edit === true ) {
            editables.push({ id: 'area', geometry: area });
        }

        if ( boundaries && boundaries.length > 0 ) {
            boundaries.map(b => {
                if ( b.geometry.edit === true ) {
                    editables.push({ id: b.id, geometry: b.geometry });
                }
            });
        }

        editables = editables.map(e => {
            switch (e.geometry.type.toLowerCase( )) {
                case 'polygon':
                    return <Polygon key={e.id} id={e.id} positions={this.getLatLngFromXY(e.geometry.coordinates[0])}/>;
                case 'linestring':
                    return <Polyline key={e.id} id={e.id} positions={this.getLatLngFromXY( e.geometry.coordinates )}/>;
                case 'point':
                    return <Circle key={e.id} id={e.id} center={[e.geometry.coordinates[1], e.geometry.coordinates[0]]} radius={50}/>;
                default:
                    return null;
            }
        });

        if ( editables.length === 0 ) {
            return null;
        }

        const drawOptions = {
            polyline: false,
            polygon: false,
            rectangle: false,
            circle: false,
            marker: false
        };

        return (
            <FeatureGroup>
                <EditControl position="bottomright" onCreated={this.onCreated} onDeleted={this.onDeleted} onEditStart={this.onEditStart} onEditStop={this.onEditStop} onEdited={this.onEditPath} draw={drawOptions}/> {editables}

            </FeatureGroup>
        );
    }

    returnToProperties = ( ) => {
        this.invalidateMap( );
        this.zoomToBounds( );
        this.props.removeGeometryFlags( );
        browserHistory.push( this.props.location.pathname );
    }

    centerToBounds = ( ) => {
        if ( this.map ) {
            const area = this.state.model.geometry;
            this.map.leafletElement.fitBounds(this.getBounds( area ));
        }
    }

    renderCenterToBoundsButton = ( ) => {
        if ( this.props.location.hash === '#edit' ) {
            return <Button onClick={this.centerToBounds} style={[ styles.centerToBoundsButton ]} iconInside><Icon name="marker"/></Button>;
        }

        return null;
    }

    renderToast( ) {
        if ( this.props.location.hash === '#edit' ) {
            return (
                <FloatingToast style={{
                    position: 'absolute',
                    bottom: 50,
                    left: 50,
                    zIndex: 100000
                }} onClick={this.returnToProperties}>{'Return to Editor'}</FloatingToast>
            );
        }

        return null;
    }

    render( ) {
        const area = this.state.model.geometry;
        const boundingBox = this.state.model.bounding_box;
        const boundaries = this.state.model.boundaries || [ ];
        const constantHeads = boundaries.filter(b => ( b.type === 'chd' && b.geometry.edit !== true ));
        const generalHeads = boundaries.filter(b => ( b.type === 'ghb' && b.geometry.edit !== true ));
        const recharges = boundaries.filter(b => ( b.type === 'rch' && b.geometry.edit !== true ));
        const rivers = boundaries.filter(b => ( b.type === 'riv' && b.geometry.edit !== true ));
        const wells = boundaries.filter(b => ( b.type === 'wel' && b.geometry.edit !== true ));

        if ( !area || !area.coordinates ) {
            return null;
        }

        return (
            <div className="map-wrapper">
                <Map id="background-map" ref={map => {
                    this.map = map;
                }} bounds={this.getBounds( area )} zoomControl={false} boundsOptions={{
                    padding: [ 60, 60 ]
                }}>
                    <LayersControl position="topright">
                        <LayersControl.BaseLayer name="OSM" checked>
                            <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'/>
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="OSM.BlackAndWhite">
                            <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"/>
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="OSM.Mapnik">
                            <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"/>
                        </LayersControl.BaseLayer>

                        {this.renderArea( area )}
                        {this.renderBoundingBox( boundingBox )}
                        {this.renderConstantHeads( constantHeads )}
                        {this.renderGeneralHeads( generalHeads )}
                        {this.renderRecharges( recharges )}
                        {this.renderRivers( rivers )}
                        {this.renderWells( wells )}
                    </LayersControl>

                    {this.renderEditControl( )}
                    {this.renderCenterToBoundsButton( )}
                </Map>

                {this.renderToast( )}

            </div>
        );
    }
}

const mapStateToProps = (state, { tool }) => {
    return { model: state[tool].model };
};

const actions = {
    setModelArea: Action.setModelArea,
    setBoundaryGeometry: Action.setBoundaryGeometry,
    removeGeometryFlags: Action.removeGeometryFlags
};

const mapDispatchToProps = (dispatch, { tool }) => {
    const wrappedActions = {};
    for ( const key in actions ) {
        if (actions.hasOwnProperty( key )) {
            // eslint-disable-next-line no-loop-func
            wrappedActions[key] = function( ) {
                const args = Array.prototype.slice.call( arguments );
                dispatch(actions[key]( tool, ...args ));
            };
        }
    }

    return wrappedActions;
};

// eslint-disable-next-line no-class-assign
BackgroundMap = withRouter( connect( mapStateToProps, mapDispatchToProps )( BackgroundMap ));

export default BackgroundMap;
