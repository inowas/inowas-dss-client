import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import {pure} from 'recompose';
import PropTypes from 'prop-types';
import {GeoJSON, Map, Rectangle, TileLayer, FeatureGroup, CircleMarker} from 'react-leaflet';
import FullscreenControl from 'react-leaflet-fullscreen';
import {geoJSON as leafletGeoJSON} from 'leaflet';
import md5 from 'js-md5';
import {uniqueId} from 'lodash';
import EditControl from '../../../core/map/EditControl';
import * as geoTools from '../../../core/geospatial';
import {Button, Dropdown, Form, Grid, Header, Icon, Modal, Segment} from 'semantic-ui-react';
import {SoilmodelLayer, SoilmodelZone} from "../../../core/soilmodel";

const styles = {
    inputFix: {
        padding: '0'
    },
    mapFix: {
        zIndex: '1'
    },
    buttonFix: {
        width: 'auto',
        height: 'auto'
    },
};

class ZonesEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            isEditing: false,
            layer: this.props.layer.toObject,
            selectedZone: null,
            showOverlay: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState(() => {
            return {
                layer: nextProps.layer.toObject
            };
        });
    }

    onAddZone = () => {
        const zone = new SoilmodelZone();

        this.setState({
            selectedZone: zone.toObject,
            showOverlay: true
        });
    };

    onSaveZone = () => {
        const layer = SoilmodelLayer.fromObject(this.state.layer).updateZone(this.state.selectedZone);

        this.setState({
            layer: layer.toObject,
            showOverlay: false
        });
    };

    onRemoveZone = () => {
        const layer = SoilmodelLayer.fromObject(this.state.layer).removeZone(this.state.selectedZone);

        this.setState({
            layer: layer.toObject,
            selectedZone: null
        });
    };

    onSelectZone = (e, {value}) => {
        const zone = this.state.layer._meta.zones.filter(z => z.id === value)[0];

        return this.setState({
            selectedZone: zone
        });
    };

    onUnselectZone = () => {
        return this.setState({
            selectedZone: null
        });
    };

    onSaveModal = () => {
        const zone = SoilmodelZone.fromObject(this.state.selectedZone);
        const layer = SoilmodelLayer.fromObject(this.state.layer).updateZone(zone);

        //this.props.onChange(this.state.layer);
        return this.setState({
            layer: layer.toObject,
            showOverlay: false
        });
    };

    onCancelModal = () => {
        return this.setState({
            showOverlay: false
        });
    };

    handleChange = (e, {name, value}) => this.setState({
        selectedZone: {
            ...this.state.selectedZone,
            [name]: value
        }
    });

    toggleEditingState = () => {
        console.log('Toggle Editing');
        this.setState({
            isEditing: !this.state.isEditing
        });
    };

    getBounds = geometry => {
        return leafletGeoJSON(geometry).getBounds();
    };

    generateKeyFunction = geometry => {
        return md5(JSON.stringify(geometry));
    };

    snapping = test => {
        console.log('TEST', test);
    };

    onEditPath = e => {
        const layers = e.layers;

        layers.eachLayer(layer => {
            const geoJson = layer.toGeoJSON();
            const geometry = geoJson.geometry;

            // Latitude (S/N)
            let ymin = 90;
            let ymax = -90;
            // Longitude (E/W)
            let xmin = 180;
            let xmax = -180;

            geometry.coordinates[0].map(c => {
                if (c[0] <= xmin) {
                    xmin = c[0];
                }
                if (c[0] >= xmax) {
                    xmax = c[0];
                }
                if (c[1] <= ymin) {
                    ymin = c[1];
                }
                if (c[1] >= ymax) {
                    ymax = c[1];
                }
            });

            const cmin = geoTools.getActiveCellFromCoordinate([xmin, ymax], this.props.bbox, this.props.gridSize);
            const cmax = geoTools.getActiveCellFromCoordinate([xmax, ymin], this.props.bbox, this.props.gridSize);

            const p = {
                row: {
                    min: cmin[1],
                    max: cmax[1]
                },
                col: {
                    min: cmin[0],
                    max: cmax[0]
                }
            };

            /*return this.setState({
                location: {
                    ...this.state.location,
                    row: {
                        ...this.state.location.row,
                        min: p.row.min,
                        max: p.row.max
                    },
                    col: {
                        ...this.state.location.col,
                        min: p.col.min,
                        max: p.col.max
                    }
                }
            });*/
        });
    };

    printMap(readOnly = false) {
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

        if(!readOnly) {
            options.draw.polygon = {
                guideLayers: [this.getBounds(this.props.area)],
                snapDistance: 5
            };
        }

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
                {this.state.showOverlay &&
                <div>
                    <FullscreenControl position="topright"/>
                    <FeatureGroup>
                        <EditControl
                            position="bottomright"
                            onEdited={this.onEditPath}
                            onEditStart={this.toggleEditingState}
                            onEditStop={this.toggleEditingState}
                            onEditVertex={this.snapping}
                            onDrawVertex={this.snapping}
                            onEditMove={this.snapping}
                            {...options}
                        />
                    </FeatureGroup>
                </div>
                }
            </Map>
        );
    }

    render() {

        console.log('state', this.state);

        return (
            <div>
                <Form.Group style={styles.dropDownWithButtons}>
                    <Dropdown
                        placeholder="Select Zone"
                        fluid
                        search
                        selection
                        value={this.state.selectedZone ? this.state.selectedZone.id : null}
                        options={
                            this.state.layer._meta.zones.map((z) => {
                                return {key: z.id, text: z.name, value: z.id};
                            })
                        }
                        onChange={this.onSelectZone}
                        disabled={this.state.layer._meta.zones.length === 0}
                    />
                    <Button.Group>
                        <Button
                            style={styles.buttonFix}
                            icon
                            onClick={this.onAddZone}
                        >
                            <Icon name="add circle"/>
                        </Button>

                        <Button
                            style={styles.buttonFix}
                            icon
                            onClick={this.onEditZone}
                            disabled={!this.state.selectedZone}
                        >
                            <Icon name="pencil"/>
                        </Button>

                        <Button
                            style={styles.buttonFix}
                            icon
                            onClick={this.onRemoveZone}
                            disabled={!this.state.selectedZone}
                        >
                            <Icon name="trash"/>
                        </Button>
                    </Button.Group>
                </Form.Group>
                {this.printMap(true)}
                {this.state.showOverlay &&
                <Modal size={'large'} open onClose={this.onCancelModal} dimmer={'inverted'}>
                    <Modal.Header>{ this.props.label ? this.props.label : 'Edit Location' }</Modal.Header>
                    <Modal.Content>
                        <Grid divided={'vertically'}>
                            <Grid.Row columns={2}>
                                <Grid.Column width={6}>
                                    <Form>
                                        <Header as="h3" dividing>Parameters</Header>
                                        <Form.Field>
                                            <label>Name</label>
                                            <Form.Input
                                                type="text"
                                                name="name"
                                                value={this.state.selectedZone.name}
                                                placeholder="name ="
                                                style={styles.inputFix}
                                                onBlur={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Color</label>
                                            <Form.Input
                                                type="text"
                                                name="color"
                                                value={this.state.selectedZone.color}
                                                placeholder="color ="
                                                style={styles.inputFix}
                                                onBlur={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>hk</label>
                                            <Form.Input
                                                type="number"
                                                name="hk"
                                                value={this.state.selectedZone.hk}
                                                placeholder="hk ="
                                                style={styles.inputFix}
                                                onBlur={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>hk</label>
                                            <Form.Input
                                                type="number"
                                                name="hk"
                                                value={this.state.selectedZone.hk}
                                                placeholder="hk ="
                                                style={styles.inputFix}
                                                onBlur={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>hani</label>
                                            <Form.Input
                                                type="number"
                                                name="hani"
                                                value={this.state.selectedZone.hani}
                                                placeholder="hani ="
                                                style={styles.inputFix}
                                                onBlur={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>vka</label>
                                            <Form.Input
                                                type="number"
                                                name="vka"
                                                value={this.state.selectedZone.vka}
                                                placeholder="vka ="
                                                style={styles.inputFix}
                                                onBlur={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>ss</label>
                                            <Form.Input
                                                type="number"
                                                name="ss"
                                                value={this.state.selectedZone.ss}
                                                placeholder="ss ="
                                                style={styles.inputFix}
                                                onBlur={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>sy</label>
                                            <Form.Input
                                                type="numbertest"
                                                name="sy"
                                                value={this.state.selectedZone.sy}
                                                placeholder="sy ="
                                                style={styles.inputFix}
                                                onBlur={this.handleChange}
                                            />
                                        </Form.Field>
                                    </Form>
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <Segment attached="bottom">
                                        {this.printMap()}
                                    </Segment>
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

ZonesEditor.propTypes = {
    area: PropTypes.object.isRequired,
    bbox: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    gridSize: PropTypes.object.isRequired,
    layer: PropTypes.instanceOf(SoilmodelLayer)
};

export default pure(ConfiguredRadium(ZonesEditor));
