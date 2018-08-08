import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import {pure} from 'recompose';
import PropTypes from 'prop-types';
import {GeoJSON, Map, Rectangle, TileLayer, FeatureGroup, CircleMarker, Tooltip} from 'react-leaflet';
import FullscreenControl from 'react-leaflet-fullscreen';
import {geoJSON as leafletGeoJSON} from 'leaflet';
import md5 from 'js-md5';
import {uniqueId} from 'lodash';
import EditControl from '../../../core/map/EditControl';
import * as geoTools from '../../../core/geospatial';
import {Button, Form, Grid, Header, Modal, Segment} from 'semantic-ui-react';
import InputRange from './inputRange';

class OptimizationMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            position: this.props.position,
            showOverlay: false,
            hasError: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            position: nextProps.position
        });
    }

    getBounds = geometry => {
        return leafletGeoJSON(geometry).getBounds();
    };

    generateKeyFunction = geometry => {
        return md5(JSON.stringify(geometry));
    };

    handleChangePosition = ({name, from, to}) => {
        return this.setState({
            position: {
                ...this.state.position,
                [name]: {min: from, max: to}
            },
            hasError: from > to ||
            (name !== 'col' && this.state.position.col.min > this.state.position.col.max) ||
            (name !== 'row' && this.state.position.row.min > this.state.position.row.max) ||
            (name !== 'lay' && this.state.position.lay.min > this.state.position.lay.max)
        });
    };

    drawObject = (boundingBox, gridSize, position, color = 'red') => {
        const bbXmin = boundingBox[0][0];
        const bbYmin = boundingBox[0][1];
        const bbXmax = boundingBox[1][0];
        const bbYmax = boundingBox[1][1];

        const styles = {
            line: {
                color: color,
                weight: 0.3
            }
        };

        const dX = (bbXmax - bbXmin) / gridSize.n_x;
        const dY = (bbYmax - bbYmin) / gridSize.n_y;

        const cXmin = bbXmin + position.col.min * dX;
        const cXmax = bbXmin + position.col.max * dX;
        const cYmin = bbYmax - position.row.min * dY;
        const cYmax = bbYmax - position.row.max * dY;

        return (
            <Rectangle
                key={uniqueId()}
                bounds={[
                    {lng: cXmin, lat: cYmin},
                    {lng: cXmin, lat: cYmax},
                    {lng: cXmax, lat: cYmax},
                    {lng: cXmax, lat: cYmin},
                ]}
                {...styles.line}
            />
        );
    };

    drawPoint = (boundingBox, gridSize, position, color = 'blue') => {
        const bbXmin = boundingBox[0][0];
        const bbYmin = boundingBox[0][1];
        const bbXmax = boundingBox[1][0];
        const bbYmax = boundingBox[1][1];

        const styles = {
            line: {
                color: color,
                weight: 0.3
            }
        };

        const dX = (bbXmax - bbXmin) / gridSize.n_x;
        const dY = (bbYmax - bbYmin) / gridSize.n_y;

        const cX = bbXmin + position.col.result * dX;
        const cY = bbYmax - position.row.result * dY;

        return (
            <CircleMarker
                key="resultMarker"
                center={[
                    cY,
                    cX
                ]}
                {...styles.line}
            />
        );
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

            return this.setState({
                position: {
                    ...this.state.position,
                    row: {
                        ...this.state.position.row,
                        min: p.row.min,
                        max: p.row.max
                    },
                    col: {
                        ...this.state.position.col,
                        min: p.col.min,
                        max: p.col.max
                    }
                }
            });
        });
    };

    onSaveModal = () => {
        this.props.onChange(this.state.position);
        return this.setState({
            showOverlay: false
        });
    };

    onCancelModal = () => {
        this.setState({
            showOverlay: false
        });
    };

    onClickToggleMap = () => {
        this.setState({
            showOverlay: true
        });
    };

    printMap(readOnly = false) {
        const options = {
            edit: {
                remove: false
            },
            draw: {
                polyline: false,
                polygon: false,
                rectangle: false,
                circle: false,
                circlemarker: false,
                marker: false
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
                bounds={this.getBounds(this.props.area)}
            >
                <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"/>
                <GeoJSON
                    key={this.generateKeyFunction(area)}
                    data={area}
                />
                {this.state.position.col.result &&
                    this.drawPoint(this.props.bbox, this.props.gridSize, this.state.position)
                }
                {!readOnly
                    ?
                    <div>
                        <FullscreenControl position="topright"/>
                        <FeatureGroup>
                            <EditControl
                                position="bottomright"
                                onEdited={this.onEditPath}
                                {...options}
                            />
                            {this.drawObject(this.props.bbox, this.props.gridSize, this.state.position)}
                        </FeatureGroup>
                    </div>
                    :
                    <FeatureGroup>
                        {this.drawObject(this.props.bbox, this.props.gridSize, this.state.position)}
                    </FeatureGroup>
                }
            </Map>
        );
    }

    render() {
        return (
            <div>
                <Button fluid
                        onClick={this.onClickToggleMap}
                >
                    Edit Position
                </Button>
                {this.printMap(true)}
                {this.state.showOverlay &&
                <Modal size={'large'} open onClose={this.onCancelModal} dimmer={'inverted'}>
                    <Modal.Header>Edit object position</Modal.Header>
                    <Modal.Content>
                        <Grid divided={'vertically'}>
                            <Grid.Row columns={2}>
                                <Grid.Column width={6}>
                                    <Segment color="blue">
                                        <Form>
                                            <Header as="h3" dividing>Position</Header>
                                            <InputRange
                                                name="lay"
                                                from={this.state.position.lay.min}
                                                to={this.state.position.lay.max}
                                                label="Layer"
                                                label_from="min"
                                                label_to="max"
                                                onChange={this.handleChangePosition}
                                            />
                                            <InputRange
                                                name="row"
                                                from={this.state.position.row.min}
                                                to={this.state.position.row.max}
                                                label="Row"
                                                label_from="min"
                                                label_to="max"
                                                onChange={this.handleChangePosition}
                                            />
                                            <InputRange
                                                name="col"
                                                from={this.state.position.col.min}
                                                to={this.state.position.col.max}
                                                label="Column"
                                                label_from="min"
                                                label_to="max"
                                                onChange={this.handleChangePosition}
                                            />
                                        </Form>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <Segment attached="bottom">
                                        {this.printMap(false)}
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

OptimizationMap.propTypes = {
    area: PropTypes.object.isRequired,
    bbox: PropTypes.array.isRequired,
    position: PropTypes.object.isRequired,
    objects: PropTypes.array,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    gridSize: PropTypes.object.isRequired,
};

export default pure(ConfiguredRadium(OptimizationMap));
