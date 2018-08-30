import PropTypes from "prop-types";
import ConfiguredRadium from 'ConfiguredRadium';
import {SoilmodelLayer, SoilmodelZone} from "../../../core/soilmodel";
import {pure} from "recompose";
import React from "react";
import {Button, Dropdown, Form, Header, Icon, Modal, Segment} from "semantic-ui-react";
import RasterDataMap from '../../../core/rasterData/components/rasterDataMap';
import ParameterDataTable from "./ParameterDataTable";
import {FeatureGroup, GeoJSON, Map, TileLayer} from "react-leaflet";
import FullscreenControl from 'react-leaflet-fullscreen';
import EditControl from '../../../core/map/EditControl';
import md5 from "js-md5";
import {geoJSON as leafletGeoJSON} from 'leaflet';

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
            layer: this.props.layer.toObject,
            selectedZone: null,
            showOverlay: false,
            mode: 'zones',
            rows: [{
                id: 1,
                zone: 'default',
                value: 5,
                action: null
            },
                {
                    id: 2,
                    zone: 'Zone XYZ',
                    value: 2.1415,
                    action: true
                }
            ]
        };
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

    onEditZone = () => {
        this.setState({
            showOverlay: true
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
        console.log(e);
    };

    onRemoveFromTable = e => {
        console.log(e);
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

    getBounds = geometry => {
        return leafletGeoJSON(geometry).getBounds();
    };

    generateKeyFunction = geometry => {
        return md5(JSON.stringify(geometry));
    };

    onEditPath = e => {
        console.log(e);
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
                        onEdited={this.onEditPath}
                        {...options}
                    />
                </FeatureGroup>
            </Map>
        );
    }

    render() {
        const tableConfig = [
            {property: 'value', label: 'Value'}
        ];

        console.log(this.state.layer);

        return (
            <div>
                <Header as="h4" style={styles.header}>{this.props.name}</Header>
                <Segment>
                    <RasterDataMap area={this.props.area} boundingBox={this.props.bbox} data={this.state.layer.hk}
                                   gridSize={this.props.gridSize} unit={null}/>
                </Segment>
                <Form style={styles.formfix}>
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
                </Form>
                {this.state.mode === 'zones' &&
                <Segment>
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
                    <ParameterDataTable
                        config={tableConfig}
                        onChange={this.onChange}
                        readOnly={false}
                        remove={this.onRemoveFromTable}
                        rows={this.state.rows}
                    />
                </Segment>
                }
                {this.state.mode === 'import' &&
                <Segment>
                    <Button>
                        Upload rasterfile
                    </Button>)
                </Segment>
                }
                {this.state.showOverlay &&
                <Modal size={'large'} open onClose={this.onCancelModal} dimmer={'inverted'}>
                    <Modal.Header>{this.props.label ? this.props.label : 'Edit Location'}</Modal.Header>
                    <Modal.Content>
                        <Segment attached="bottom">
                            {this.printMap()}
                        </Segment>
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