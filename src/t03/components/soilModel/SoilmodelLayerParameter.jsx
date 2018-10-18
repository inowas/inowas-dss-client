import PropTypes from "prop-types";
import ConfiguredRadium from 'ConfiguredRadium';
import {SoilmodelLayer, SoilmodelZone} from "../../../core/soilmodel";
import {pure} from "recompose";
import React from "react";
import {Accordion, Button, Dropdown, Form, Grid, Header, Icon, Modal, Segment} from "semantic-ui-react";
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
import RasterData from "../../../core/rasterData/components/rasterData";

const styles = {
    inputFix: {
        padding: '0'
    },
    buttonFix: {
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
            activeIndex: 0,
            layer: props.layer.toObject,
            selectedZone: null,
            smoothParams: {
                cycles: 1,
                distance: 1
            },
            showOverlay: false,
            mode: 'zones',
            parameter: props.parameter
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState(() => ({
            layer: nextProps.layer.toObject,
            parameter: nextProps.parameter
        }));
    }

    handleClickAccordion = (e, titleProps) => {
        const {index} = titleProps;
        const {activeIndex} = this.state;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({activeIndex: newIndex});
    };

    handleSelectMode = (e, {name, value}) => {
        this.setState({
            mode: value
        });
    };

    onAddZone = () => {
        const zone = new SoilmodelZone();
        zone.priority = this.state.layer._meta.zones.length;
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

    onChangeSmoothParams = (e, {name, value}) => {
        return this.setState({
            smoothParams: {
                ...this.state.smoothParams,
                [name]: parseInt(value, 10)
            }
        })
    };

    onRemoveZone = () => {
        const layer = SoilmodelLayer.fromObject(this.state.layer).removeZone(this.state.selectedZone);
        this.setState({
            selectedZone: null,
            showOverlay: false
        });
        this.props.onChange(layer);
    };

    onChange = e => {
        const layer = SoilmodelLayer.fromObject(this.state.layer);

        e.map(row => {
            const zone = layer.zones.filter(z => z.id === row.id)[0];
            if (zone && zone[this.state.parameter.name] !== row.value) {
                zone[this.state.parameter.name] = row.value;
                layer.updateZone(zone);
            }
        });

        this.props.onChange(layer);
    };

    onOrderZones = (id, order) => {
        const layer = SoilmodelLayer.fromObject(this.state.layer);
        const zone = layer.zones.filter(z => z.id === id)[0];
        if (zone) {
            this.props.onChange(layer.changeOrder(zone, order));
        }
    };

    smoothMap = () => {
        const layer = SoilmodelLayer.fromObject(this.state.layer);
        layer.smoothParameter(this.props.gridSize, this.state.parameter.name, this.state.smoothParams.cycles, this.state.smoothParams.distance);

        return this.props.onChange(layer);
    };

    recalculateMap = () => {
        const layer = SoilmodelLayer.fromObject(this.state.layer);
        layer.zonesToParameters(this.props.gridSize, this.state.parameter.name);
        this.props.onChange(layer);

        this.setState({
            layer: layer.toObject
        });
    };

    onRemoveFromTable = id => {
        const layer = SoilmodelLayer.fromObject(this.state.layer);
        const zone = layer.zones.filter(z => z.id === id)[0];
        zone[this.state.parameter.name] = null;

        layer.updateZone(zone);

        this.props.onChange(layer);
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

    onCreatePath = e => {
        const geoJson = e.layer.toGeoJSON();
        const zone = this.state.selectedZone;

        zone.geometry = geoJson.geometry;
        zone.activeCells = calculateActiveCells(zone.geometry, this.props.bbox, this.props.gridSize);

        return this.setState({
            selectedZone: zone
        });
    };

    onEditPath = e => {
        const layers = e.layers;

        layers.eachLayer(layer => {
            const geoJson = layer.toGeoJSON();
            const zone = this.state.selectedZone;

            zone.geometry = geoJson.geometry;
            zone.activeCells = calculateActiveCells(zone.geometry, this.props.bbox, this.props.gridSize);

            return this.setState({
                selectedZone: zone
            });
        });
    };

    printMap() {
        let options = {
            edit: {
                remove: false
            },
            draw: {
                polyline: false,
                polygon: Object.keys(this.state.selectedZone.geometry).length === 0,
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
                    color='grey'
                />
                <FullscreenControl position="topright"/>
                {this.state.layer._meta.zones.filter(z => z.id !== this.state.selectedZone.id).length > 0 ?
                    <FeatureGroup>
                        {this.state.layer._meta.zones.filter(z => z.id !== this.state.selectedZone.id).map(z => {

                            return (
                                <Polygon
                                    key={z.id}
                                    id={z.id}
                                    positions={geoTools.getLatLngFromXY(
                                        z.geometry.coordinates[0]
                                    )}
                                    color='grey'
                                    weight={0.1}
                                />
                            );
                        })
                        })}
                    </FeatureGroup>
                    :
                    <div/>
                }
                <FeatureGroup>
                    <EditControl
                        position="bottomright"
                        onCreated={this.onCreatePath}
                        onEdited={this.onEditPath}
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
        const {area, bbox, readOnly, gridSize} = this.props;
        const {layer, parameter, mode, showOverlay, selectedZone} = this.state;

        const tableConfig = [
            {property: 'value', label: 'Value'}
        ];

        const zonesRows = layer._meta.zones.map(zone => {
            return {
                id: zone.id,
                zone: zone.name,
                priority: zone.priority,
                zones: layer._meta.zones.length,
                value: zone[parameter.name],
                action: zone.name !== 'Default'
            }
        });

        return (
            <div>
                <Form.Field>
                    <label>Method of parameter definition</label>
                    <Form.Select
                        name="mode"
                        value={mode}
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
                {this.state.mode === 'import' &&
                <Segment>
                    <RasterData
                        area={area}
                        boundingBox={bbox}
                        gridSize={gridSize}
                        name={parameter.name}
                        unit={parameter.unit}
                        data={layer[parameter.name]}
                        readOnly={readOnly}
                        onChange={this.props.handleInputChange}
                    />
                </Segment>
                }
                {mode !== 'import' &&
                <Segment>
                    <Header as="h4"
                            style={styles.header}>{parameter.description}, {parameter.name} [{parameter.unit}]</Header>
                    <Grid divided>
                        <Grid.Column width={8}>
                            <RasterDataMap area={area} boundingBox={bbox}
                                           data={layer[parameter.name]}
                                           gridSize={gridSize} unit={null}/>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Accordion fluid>
                                <Accordion.Title active={this.state.activeIndex === 0} index={0}
                                                 onClick={this.handleClickAccordion}>
                                    <Icon name="dropdown"/>
                                    Calculation
                                </Accordion.Title>
                                <Accordion.Content active={this.state.activeIndex === 0}>
                                    <Button
                                        style={styles.buttonFix}
                                        icon
                                        primary
                                        fluid
                                        onClick={this.recalculateMap}
                                    >
                                        <Icon name="map"/> Recalculate Map
                                    </Button>
                                </Accordion.Content>
                                <Accordion.Title active={this.state.activeIndex === 1} index={1}
                                                 onClick={this.handleClickAccordion}>
                                    <Icon name="dropdown"/>
                                    Smoothing
                                </Accordion.Title>
                                <Accordion.Content active={this.state.activeIndex === 1}>
                                    <Form.Field>
                                        <label>Cycles</label>
                                        <Form.Input
                                            type="number"
                                            name="cycles"
                                            value={this.state.smoothParams.cycles}
                                            placeholder="cycles ="
                                            style={styles.inputFix}
                                            onChange={this.onChangeSmoothParams}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Distance</label>
                                        <Form.Input
                                            type="number"
                                            name="distance"
                                            value={this.state.smoothParams.distance}
                                            placeholder="distance ="
                                            style={styles.inputFix}
                                            onChange={this.onChangeSmoothParams}
                                        />
                                    </Form.Field>
                                    <Button
                                        style={styles.buttonFix}
                                        icon
                                        fluid
                                        onClick={this.smoothMap}
                                    >
                                        <Icon name="tint"/> Start Smoothing
                                    </Button>
                                </Accordion.Content>
                            </Accordion>
                        </Grid.Column>
                    </Grid>
                </Segment>
                }
                {mode === 'zones' &&
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
                    </Form.Group>
                    <ParameterDataTable
                        config={tableConfig}
                        edit={id => this.onEditZone(id)}
                        onChange={this.onChange}
                        onOrderZones={(id, order) => this.onOrderZones(id, order)}
                        readOnly={false}
                        remove={id => this.onRemoveFromTable(id)}
                        rows={zonesRows}
                    />
                </Segment>
                }
                {showOverlay &&
                <Modal size={'large'} open onClose={this.onCancelModal} dimmer={'inverted'}>
                    <Modal.Header>Edit Location</Modal.Header>
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
                                            value={selectedZone.name}
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
                                            value={selectedZone.hk || ''}
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
                                            value={selectedZone.hani || ''}
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
                                            value={selectedZone.vka || ''}
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
                                            value={selectedZone.ss || ''}
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
                                            value={selectedZone.sy || ''}
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
                        <Button onClick={this.onCancelModal}>Cancel</Button>
                        <Button
                            positive
                            onClick={this.onSaveModal}
                        >
                            Save
                        </Button>
                        <Button
                            negative
                            onClick={this.onRemoveZone}
                        >
                            Delete Zone
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
    parameter: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    layer: PropTypes.instanceOf(SoilmodelLayer)
};

export default pure(ConfiguredRadium(SoilmodelLayerParameter));
