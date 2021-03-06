import {LayoutComponents} from '../../../core/index';
import React from 'react';
import PropTypes from 'prop-types';
import {Button as Btn} from 'semantic-ui-react';
import BoundaryMap from './BoundaryMap';
import Button from '../../../components/primitive/Button';
import Icon from '../../../components/primitive/Icon';
import Input from '../../../components/primitive/Input';
import Select from '../../../components/primitive/Select';
import styleGlobals from 'styleGlobals';
import {convertLayersFromSelect, getLayersForInput} from '../../selectors/soilModel';
import BoundaryFactory from '../../../core/boundaries/BoundaryFactory';
import BoundaryGeometryEditor from '../../../core/boundaryEditor/boundaryGeometryEditor';
import ObservationPointEditor from '../../../core/boundaryEditor/observationPointEditor';
import {first} from 'lodash';
import BoundaryData from './BoundaryData';

const styles = {
    columns: {
        display: 'flex'
    },

    columnFlex2: {
        flex: 2
    },

    rightAlign: {
        textAlign: 'right'
    },

    columnNotLast: {
        marginRight: styleGlobals.dimensions.gridGutter
    },

    buttonMarginRight: {
        marginRight: 10
    },

    saveButtonWrapper: {
        textAlign: 'right',
        marginTop: styleGlobals.dimensions.spacing.medium
    },

    observationPointSelection: {
        wrapper: {
            display: 'flex',
            marginBottom: styleGlobals.dimensions.spacing.medium,
            alignItems: 'center'
        },

        input: {
            flex: 1,
            marginRight: styleGlobals.dimensions.spacing.medium
        },

        button: {
            paddingTop: styleGlobals.dimensions.spacing.medium,
            paddingBottom: styleGlobals.dimensions.spacing.medium,
            paddingLeft: styleGlobals.dimensions.spacing.medium,
            paddingRight: styleGlobals.dimensions.spacing.medium,
            marginLeft: styleGlobals.dimensions.spacing.medium
        }
    }
};

class BoundaryProperties extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showOverlay: false,
            editObservationPointId: null,
            boundary: null,
            selectedObservationPointId: null
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            boundary: nextProps.boundary,
            selectedObservationPointId: nextProps.boundary.observation_points ? first(nextProps.boundary.observation_points).id : null
        });
    }

    addObservationPoint = () => {
        this.setState({
            showOverlay: 'observationPoint',
            editObservationPointId: null
        });
    };

    addObservationPointToBoundary = (op) => {
        const updatedObservationPoints = this.state.boundary.observation_points;
        updatedObservationPoints.push(op);

        this.setState({
            boundary: {...this.state.boundary, observation_points: updatedObservationPoints},
            showOverlay: false,
            editObservationPointId: null,
        });
    };

    deleteSelectedObservationPointFromBoundary = () => {
        const {selectedObservationPointId} = this.state;

        const updatedObservationPoints = this.state.boundary.observation_points.filter(op => {
            if (op.id !== selectedObservationPointId) {
                return op;
            }

            return null;
        });

        this.setState({
            boundary: {...this.state.boundary, observation_points: updatedObservationPoints},
            showOverlay: false,
            editObservationPointId: null,
            selectedObservationPointId: first(updatedObservationPoints).id
        });
    };

    editObservationPoint = () => {
        this.setState({
            showOverlay: 'observationPoint',
            editObservationPointId: this.state.selectedObservationPointId
        });
    };

    editOnMap = () => {
        this.setState({
            showOverlay: 'boundaryGeometry',
        });
    };

    handleNameChange = name => {
        this.setState({
            boundary: {...this.state.boundary, name: name}
        });
    };

    handleLayersChange = layers => {
        this.setState({
            boundary: {...this.state.boundary, affected_layers: convertLayersFromSelect(layers)}
        });
    };

    handleWellTypeChange = wellType => {
        if (this.state.boundary && this.state.boundary.type === 'wel') {
            this.setState({
                boundary: {...this.state.boundary, metadata: {well_type: wellType}}
            });
        }
    };

    handleCancel = () => {
        this.setState({
            showOverlay: false,
            editObservationPointId: null,
        });
    };

    observationPointExists = (op) => {
        return this.state.boundary.observation_points.filter(o => o.id === op.id).length > 0;
    };

    updateObservationPoint = (op) => {
        const updatedObservationPoints = this.state.boundary.observation_points.map(o => {
            if (op.id === o.id) {
                return op;
            }
            return o;
        });

        this.setState({
            boundary: {...this.state.boundary, observation_points: updatedObservationPoints},
            showOverlay: false,
            editObservationPointId: null,
        });
    };

    handleSaveObservationPoint = op => {
        /* Update */
        if (this.observationPointExists(op)) {
            this.updateObservationPoint(op);
            return;
        }

        this.addObservationPointToBoundary(op);
    };

    handleSaveBoundary = boundary => {
        this.setState({
            boundary: boundary,
            showOverlay: false
        });

        this.save(boundary);
    };

    handleSelectObservationPoint = id => {
        this.setState({
            selectedObservationPointId: id
        });
    };

    handleChangeData = boundary => {
        this.setState({
            boundary: boundary.toObject
        });
    };

    isLoaded = boundary => {
        if (!boundary) {
            return false;
        }

        return (boundary.hasOwnProperty('date_time_values') || boundary.hasOwnProperty('observation_points'));
    };

    save = (boundary) => {
        this.props.onSave(BoundaryFactory.fromObjectData(boundary).toObject);
    };

    renderObservationPointsSelection = boundary => {
        const observationPoints = boundary.observation_points;
        if (!observationPoints) {
            return null;
        }

        const {selectedObservationPointId} = this.state;
        const {readOnly} = this.props;

        return (
            <LayoutComponents.Column heading="Observation Points">
                <div style={[styles.observationPointSelection.wrapper]}>
                    <Select
                        style={[styles.observationPointSelection.input]}
                        options={observationPoints.map(op => ({
                            value: op.id,
                            label: op.name
                        }))}
                        clearable={false}
                        value={selectedObservationPointId}
                        onChange={op => this.handleSelectObservationPoint(op.value)}
                    />
                    {!readOnly && <Button
                        style={styles.observationPointSelection.button}
                        iconInside
                        onClick={this.addObservationPoint}
                        icon={<Icon name="add"/>}
                    />}
                    {!readOnly && <Button
                        style={styles.observationPointSelection.button}
                        iconInside
                        onClick={this.editObservationPoint}
                        icon={<Icon name="edit"/>}
                    />}
                    {!readOnly && <Button
                        style={styles.observationPointSelection.button}
                        iconInside
                        onClick={this.deleteSelectedObservationPointFromBoundary}
                        disabled={boundary.observation_points.length <= 1}
                        icon={<Icon name="trash"/>}
                    />}
                </div>
            </LayoutComponents.Column>
        );
    };

    renderDataTable = () => {
        const {readOnly} = this.props;
        const {selectedObservationPointId} = this.state;
        const boundary = BoundaryFactory.fromObjectData(this.state.boundary);

        return (
            <BoundaryData
                onChange={this.handleChangeData}
                readOnly={readOnly}
                boundary={boundary}
                opId={selectedObservationPointId}
            />
        );
    };

    renderSaveButton = () => {
        const {readOnly, updateStatus} = this.props;

        if (readOnly) {
            return null;
        }

        return (
            <div style={styles.saveButtonWrapper}>
                <Btn
                    secondary
                    onClick={() => this.save(this.state.boundary)}
                    loading={updateStatus.status === 'loading'}
                >
                    Save
                </Btn>
            </div>
        );
    };

    renderOverlays = showOverlay => {
        if (showOverlay === 'observationPoint') {
            const area = this.props.model.geometry;
            const modelStyles = this.props.model.styles;
            const {boundary, editObservationPointId} = this.state;
            return (
                <ObservationPointEditor
                    area={area}
                    observationPointId={editObservationPointId}
                    boundary={boundary}
                    mapStyles={modelStyles}
                    onSave={this.handleSaveObservationPoint}
                    onCancel={this.handleCancel}
                />
            );
        }

        if (showOverlay === 'boundaryGeometry') {
            const area = this.props.model.geometry;
            const modelStyles = this.props.model.styles;
            const boundaries = this.props.model.boundaries;
            const boundingBox = this.props.model.bounding_box;
            const gridSize = this.props.model.grid_size;
            const readOnly = this.props.readOnly;

            const {boundary} = this.state;

            return (
                <BoundaryGeometryEditor
                    area={area}
                    boundary={boundary}
                    boundaries={boundaries}
                    boundingBox={boundingBox}
                    gridSize={gridSize}
                    mapStyles={modelStyles}
                    onSave={this.handleSaveBoundary}
                    onCancel={this.handleCancel}
                    readOnly={readOnly}
                />
            );
        }

        return null;
    };

    render() {
        const {model, onDelete, readOnly} = this.props;
        const area = model.geometry;

        const {boundary, selectedObservationPointId} = this.state;

        if (!this.isLoaded(boundary)) {
            return null;
        }

        const layers = getLayersForInput(model);
        const mapStyles = model.styles;

        return (
            <div>
                <div style={styles.columns}>
                    <LayoutComponents.Column
                        heading="Properties"
                        style={[styles.columnNotLast]}
                    >
                        <LayoutComponents.InputGroup label="Name">
                            <Input
                                name="name"
                                disabled={readOnly}
                                onChange={this.handleNameChange}
                                value={boundary.name}
                                type="text"
                                placeholder="name"
                            />
                        </LayoutComponents.InputGroup>

                        <LayoutComponents.InputGroup label="Select Layer">
                            <Select
                                name="affected_layers"
                                disabled={readOnly}
                                value={boundary.affected_layers ? boundary.affected_layers[0] : undefined}
                                multi={boundary.type === 'chd' || boundary.type === 'ghb'}
                                onChange={this.handleLayersChange}
                                options={layers}
                            />
                        </LayoutComponents.InputGroup>

                        {boundary.type === 'wel' &&
                        <LayoutComponents.InputGroup label="Well Type">
                            <Select
                                name="type"
                                disabled={readOnly}
                                value={boundary.metadata ? boundary.metadata.well_type : ''}
                                onChange={(data) => this.handleWellTypeChange(data.value)}
                                options={[
                                    {
                                        label: 'Public Well',
                                        value: 'puw'
                                    },
                                    {
                                        label: 'Infiltration Well',
                                        value: 'inw'
                                    },
                                    {
                                        label: 'Industrial Well',
                                        value: 'iw'
                                    },
                                    {
                                        label: 'Irrigation Well',
                                        value: 'irw'
                                    },
                                    {
                                        label: 'Optimized Well',
                                        value: 'opw'
                                    }
                                ]}
                            />
                        </LayoutComponents.InputGroup>
                        }

                        {!readOnly &&
                        <div style={styles.rightAlign}>
                            <Button
                                disabled={readOnly}
                                style={styles.buttonMarginRight}
                                onClick={this.editOnMap}
                                type="link"
                                icon={<Icon name="marker"/>}
                            >
                                Edit on Map
                            </Button>
                            <Button
                                style={styles.buttonMarginRight}
                                disabled={readOnly}
                                onClick={onDelete}
                                type="link"
                                icon={<Icon name="trash"/>}
                            >
                                Delete
                            </Button>
                        </div>}

                        <BoundaryMap
                            area={area}
                            boundary={boundary}
                            selectedObservationPointId={selectedObservationPointId}
                            styles={mapStyles}
                        />
                    </LayoutComponents.Column>
                    <LayoutComponents.Column style={[styles.columnFlex2]}>
                        {this.renderObservationPointsSelection(boundary)}
                        {this.renderDataTable()}
                    </LayoutComponents.Column>
                </div>
                {this.renderSaveButton()}
                {this.renderOverlays(this.state.showOverlay)}
            </div>
        );
    }
}

BoundaryProperties.propTypes = {
    boundary: PropTypes.object.isRequired,
    model: PropTypes.object.isRequired,
    readOnly: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    updateStatus: PropTypes.object.isRequired,
};

export default BoundaryProperties;
