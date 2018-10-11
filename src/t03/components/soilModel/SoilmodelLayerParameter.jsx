import PropTypes from "prop-types";
import ConfiguredRadium from 'ConfiguredRadium';
import {SoilmodelLayer, SoilmodelZone} from "../../../core/soilmodel";
import {pure} from "recompose";
import React from "react";
import {Button, Dropdown, Form, Grid, Header, Icon, Modal, Segment} from "semantic-ui-react";
import RasterDataMap from '../../../core/rasterData/components/rasterDataMap';
import ParameterDataTable from "./ParameterDataTable";
import {FeatureGroup, GeoJSON, Map, Polygon, TileLayer} from "react-leaflet";
import FullscreenControl from 'react-leaflet-fullscreen';
import EditControl from '../../../core/map/EditControl';
import md5 from "js-md5";
import {geoJSON as leafletGeoJSON} from 'leaflet';
import {calculateActiveCells} from "../../../core/geospatial";
import * as geoTools from "../../../core/geospatial";
import {uniqueId} from "lodash";

const styles = {
    inputFix: {
        padding: '0'
    },
    buttonFix: {
        width: 'auto',
        height: 'auto'
    },
    mapFix: {
        zIndex: '1'
    },
    header: {
        textAlign: 'left'
    },
};

class SoilmodelLayerParameter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            layer: props.layer.toObject,
            selectedZone: null,
            showOverlay: false,
            mode: 'zones',
            parameter: props.name
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState(() => ({
            layer: nextProps.layer.toObject
        }));
    }

    handleSelectMode = (e, {name, value}) => {
        this.setState({
            mode: value
        });
    };

    onAddZone = () => {
        const zone = new SoilmodelZone();
        this.setState({
            selectedZone: zone.toObject,
            showOverlay: true
        });
    };

    onEditZone = (id) => {
        const zone = this.state.layer._meta.zones.filter(zone => zone.id === id)[0];

        this.setState({
            selectedZone: zone,
            showOverlay: true
        });
    };

    onChangeZone = (e, {name, value}) => {
        const zone = this.state.selectedZone;
        zone[name] = value;
        this.setState({
            selectedZone: zone
        });
    };

    onRemoveZone = () => {
        const layer = SoilmodelLayer.fromObject(this.state.layer).removeZone(this.state.selectedZone);
        this.setState({
            layer: layer.toObject,
            selectedZone: null
        });
    };

    onChange = e => {
        const layer = SoilmodelLayer.fromObject(this.state.layer);

        e.map(row => {
            const zone = layer.zones.filter(z => z.id === row.id)[0];
            if (zone && zone[this.state.parameter] !== row.value) {
                zone[this.state.parameter] = row.value;
                layer.updateZone(zone);
            }
        });

        this.props.onChange(layer);
    };

    recalculateMap = () => {
        const layer = SoilmodelLayer.fromObject(this.state.layer);
        layer.zonesToParameters(this.props.gridSize, this.state.parameter);
        this.props.onChange(layer);

        this.setState({
            layer: layer.toObject
        });
    };

    onRemoveFromTable = e => {
        console.log(e);
    };

    onSaveModal = () => {
        const zone = SoilmodelZone.fromObject(this.state.selectedZone);
        const layer = SoilmodelLayer.fromObject(this.state.layer).updateZone(zone);

        this.props.onChange(layer);

        return this.setState({
            selectedZone: null,
            showOverlay: false
        });
    };

    onCancelModal = () => {
        return this.setState({
            selectedZone: null,
            showOverlay: false
        });
    };

    getBounds = geometry => {
        return leafletGeoJSON(geometry).getBounds();
    };

    generateKeyFunction = geometry => {
        return md5(JSON.stringify(geometry));
    };

    onEditPath = e => {
        const layers = e.layers;

        layers.eachLayer(layer => {
            const geoJson = layer.toGeoJSON();
            const zone = this.state.selectedZone;

            zone.geometry = geoJson.geometry;
            zone.activeCells = calculateActiveCells(zone.geometry, this.props.bbox, this.props.gridSize);

            console.log('onEditPath', zone);

            return this.setState({
                selectedZone: zone
            });
        });
    };

    printMap() {
        let options = {
            edit: {
                remove: true
            },
            draw: {
                polyline: false,
                polygon: true,
                rectangle: false,
                circle: false,
                circlemarker: false,
                marker: false,
                poly: {
                    allowIntersection: false
                }
            }
        };

        const {area} = this.props;

        if (!this.props.bbox || !area) {
            return null;
        }

        return (
            <Map
                className="boundaryGeometryMap"
                zoomControl={false}
                dragging={this.state.showOverlay}
                boxZoom={this.state.showOverlay}
                touchZoom={this.state.showOverlay}
                doubleClickZoom={this.state.showOverlay}
                scrollWheelZoom={this.state.showOverlay}
                bounds={this.getBounds(this.props.area)}
                style={styles.mapFix}
            >
                <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"/>
                <GeoJSON
                    key={this.generateKeyFunction(area)}
                    data={area}
                />
                <FullscreenControl position="topright"/>
                <FeatureGroup>
                    <EditControl
                        position="bottomright"
                        onCreated={this.onCreated}
                        onEditVertex={this.onEditVertex}
                        onEdited={this.onEditPath}
                        onEditMove={this.onEditMove}
                        {...options}
                    />
                    {this.state.selectedZone.geometry.coordinates ?
                        <Polygon
                            key={this.state.selectedZone.id}
                            id={this.state.selectedZone.id}
                            positions={geoTools.getLatLngFromXY(
                                this.state.selectedZone.geometry.coordinates[0]
                            )}
                        />
                        :
                        <div/>
                    }
                </FeatureGroup>
            </Map>
        );
    }

    render() {
        const tableConfig = [
            {property: 'value', label: 'Value'}
        ];

        const zonesRows = this.state.layer._meta.zones.map(zone => {
            return {
                id: zone.id,
                zone: zone.name,
                value: zone[this.state.parameter],
                action: zone.name !== 'Default'
            }
        });

        return (
            <div>
                <Header as="h4" style={styles.header}>{this.props.name}</Header>
                <Segment>
                    <RasterDataMap area={this.props.area} boundingBox={this.props.bbox} data={this.state.layer.hk}
                                   gridSize={this.props.gridSize} unit={null}/>
                </Segment>
                <Form.Field>
                    <label>Method of optimization</label>
                    <Form.Select
                        name="mode"
                        value={this.state.mode}
                        placeholder="mode ="
                        onChange={this.handleSelectMode}
                        options={[
                            {
                                key: 'zones',
                                value: 'zones',
                                text: 'Set default value and define zones'
                            },
                            {
                                key: 'import',
                                value: 'import',
                                text: 'Import raster file'
                            }
                        ]}
                    />
                </Form.Field>
                {this.state.mode === 'zones' &&
                <Segment>
                    <Form.Group style={styles.dropDownWithButtons}>
                        <Button
                            style={styles.buttonFix}
                            icon
                            fluid
                            onClick={this.onAddZone}
                        >
                            <Icon name="add circle"/> Add new zone
                        </Button>
                        <Button
                            style={styles.buttonFix}
                            icon
                            fluid
                            onClick={this.recalculateMap}
                        >
                            <Icon name="redo"/> Recalculate Map
                        </Button>
                    </Form.Group>
                    <ParameterDataTable
                        config={tableConfig}
                        edit={id => this.onEditZone(id)}
                        onChange={this.onChange}
                        readOnly={false}
                        remove={id => this.onRemoveFromTable(id)}
                        rows={zonesRows}
                    />
                </Segment>
                }
                {this.state.mode === 'import' &&
                <Segment>
                    <Button>
                        Upload rasterfile
                    </Button>
                </Segment>
                }
                {this.state.showOverlay &&
                <Modal size={'large'} open onClose={this.onCancelModal} dimmer={'inverted'}>
                    <Modal.Header>{this.props.label ? this.props.label : 'Edit Location'}</Modal.Header>
                    <Modal.Content>
                        <Grid divided={'vertically'}>
                            <Grid.Row columns={2}>
                                <Grid.Column width={12}>
                                    <Segment attached="bottom">
                                        {this.printMap()}
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Form.Field>
                                        <label>Name</label>
                                        <Form.Input
                                            type="text"
                                            name="name"
                                            value={this.state.selectedZone.name}
                                            placeholder="name ="
                                            style={styles.inputFix}
                                            onChange={this.onChangeZone}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>hk</label>
                                        <Form.Input
                                            type="number"
                                            name="hk"
                                            value={this.state.selectedZone.hk || ''}
                                            placeholder="hk ="
                                            style={styles.inputFix}
                                            onChange={this.onChangeZone}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>hani</label>
                                        <Form.Input
                                            type="number"
                                            name="hani"
                                            value={this.state.selectedZone.hani || ''}
                                            placeholder="hani ="
                                            style={styles.inputFix}
                                            onChange={this.onChangeZone}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>vka</label>
                                        <Form.Input
                                            type="number"
                                            name="vka"
                                            value={this.state.selectedZone.vka || ''}
                                            placeholder="vka ="
                                            style={styles.inputFix}
                                            onChange={this.onChangeZone}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>ss</label>
                                        <Form.Input
                                            type="number"
                                            name="ss"
                                            value={this.state.selectedZone.ss || ''}
                                            placeholder="ss ="
                                            style={styles.inputFix}
                                            onChange={this.onChangeZone}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>sy</label>
                                        <Form.Input
                                            type="number"
                                            name="sy"
                                            value={this.state.selectedZone.sy || ''}
                                            placeholder="sy ="
                                            style={styles.inputFix}
                                            onChange={this.onChangeZone}
                                        />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.onCancelModal}>Cancel</Button>
                        <Button
                            positive
                            onClick={this.onSaveModal}
                            disabled={this.state.hasError}>
                            Save
                        </Button>
                    </Modal.Actions>
                </Modal>
                }
            </div>
        );
    }
}

SoilmodelLayerParameter.propTypes = {
    area: PropTypes.object.isRequired,
    bbox: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    gridSize: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    layer: PropTypes.instanceOf(SoilmodelLayer)
};

export default pure(ConfiguredRadium(SoilmodelLayerParameter));
