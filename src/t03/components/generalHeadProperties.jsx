import {
    DataTableAction,
    GeneralHeadObservationPoint
} from '../../t03/components';
import { Helper, LayoutComponents, WebData } from '../../core';
import React  from 'react';
import PropTypes from 'prop-types';
import Select, {
    mapOptionValues
} from '../../components/primitive/Select';
import { find, uniqueId } from 'lodash';

import BoundaryMap from './boundaryMap';
import Button from '../../components/primitive/Button';
import ConfiguredRadium from 'ConfiguredRadium';
import Icon from '../../components/primitive/Icon';
import Input from '../../components/primitive/Input';
import styleGlobals from 'styleGlobals';

const styles = {
    columns: {
        display: 'flex'
    },

    columnFlex2: {
        flex: 2
    },

    columnNotLast: {
        marginRight: styleGlobals.dimensions.gridGutter
    },

    rightAlign: {
        textAlign: 'right'
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
            paddingRight: styleGlobals.dimensions.spacing.medium
        }
    }
};

const mergeBoundary = (state, id, dateTimeValues) => {
    return {
        ...state.boundary,
        observation_points: mergeObservationPoints(
            state.boundary.observation_points,
            id,
            dateTimeValues
        )
    };
};

const mergeObservationPoints = (state, id, dateTimeValues) => {
    return state.map(b => {
        if (b.id === id) {
            return { ...b, date_time_values: dateTimeValues };
        }
        return b;
    });
};

@ConfiguredRadium
class GeneralHeadProperties extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nameInputId: uniqueId('nameInput-'),
            layerInputId: uniqueId('layerInput-'),
            selectedObservationPoint:
                this.props.selectedObservationPoint || null,
            boundary: this.props.boundary || {}
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState(prevState => {
            return {
                boundary: nextProps.boundary
                    ? nextProps.boundary
                    : prevState.boundary,
                selectedObservationPoint:
                    prevState.selectedObservationPoint ||
                    nextProps.selectedObservationPoint
            };
        });
    }

    componentWillUnmount() {
        this.props.setBoundary({
            ...this.state.boundary,
            ...mergeBoundary(
                this.state,
                this.state.selectedObservationPoint,
                this.observationPoint.getRows()
            )
        });
    }

    componentWillMount() {
        this.forceUpdate();
    }

    handleInputChange = (name, callable) => {
        return value => {
            console.log({value});
            if (callable) {
                value = callable(value);
            }

            this.setState( function (prevState, props) {
                return {
                    ...prevState,
                    boundary: {
                        ...prevState.boundary,
                        [name]: value,
                        observation_points: mergeObservationPoints(
                            prevState.boundary.observation_points,
                            prevState.selectedObservationPoint,
                            this.observationPoint.getRows()
                        )
                    }
                };
            } );
        }
    };

    handleObservationPointNameInputChange = value => {
        this.setState(prevState => {
            const indexOfSelectedObservationPoint = prevState.boundary.observation_points.findIndex(
                op => op.id === prevState.selectedObservationPoint
            );

            return {
                ...prevState,
                boundary: {
                    ...prevState.boundary,
                    observation_points: [
                        ...prevState.boundary.observation_points.slice(
                            0,
                            indexOfSelectedObservationPoint
                        ),
                        {
                            ...prevState.boundary.observation_points[
                                indexOfSelectedObservationPoint
                            ],
                            name: value
                        },
                        ...prevState.boundary.observation_points.slice(
                            indexOfSelectedObservationPoint + 1,
                            prevState.boundary.observation_points.length
                        )
                    ]
                }
            };
        });
    };

    handleObservationPointDelete = () => {
        this.setState(prevState => {
            const indexOfSelectedObservationPoint = prevState.boundary.observation_points.findIndex(
                op => op.id === prevState.selectedObservationPoint
            );

            return {
                ...prevState,
                boundary: {
                    ...prevState.boundary,
                    observation_points: [
                        ...prevState.boundary.observation_points.slice(
                            0,
                            indexOfSelectedObservationPoint
                        ),
                        ...prevState.boundary.observation_points.slice(
                            indexOfSelectedObservationPoint + 1,
                            prevState.boundary.observation_points.length
                        )
                    ]
                },
                selectedObservationPoint: null
            };
        });
    };

    getDateTimeValue = () => {
        const key = this.state.selectedObservationPoint;
        const observationPoints =
            this.state.boundary && this.state.boundary.observation_points
                ? this.state.boundary.observation_points
                : [];

        const observationPoint = find(observationPoints, { id: key });

        if (!observationPoint) {
            return [];
        }

        return Helper.addIdFromIndex(observationPoint.date_time_values);
    };

    selectObservationPoint = key => {
        this.setState(prevState => {
            return {
                selectedObservationPoint: key,
                boundary: mergeBoundary(
                    this.state,
                    prevState.selectedObservationPoint,
                    this.observationPoint.getRows()
                )
            };
        });
    };

    save = () => {
        this.props.onSave({
            ...this.state.boundary,
            ...mergeBoundary(
                this.state,
                this.state.selectedObservationPoint,
                this.observationPoint.getRows()
            )
        });
    };

    renderObservationPointsSelection = boundary => {
        if (!boundary.observation_points) {
            return null;
        }

        const { selectedObservationPoint } = this.state;

        return (
            <div>
                <div style={[styles.observationPointSelection.wrapper]}>
                    <Select
                        style={[styles.observationPointSelection.input]}
                        options={boundary.observation_points.map(op => ({
                            value: op.id,
                            label: op.name
                        }))}
                        value={selectedObservationPoint}
                        onChange={op => this.selectObservationPoint(op.value)}
                    />
                    <Button
                        style={styles.observationPointSelection.button}
                        iconInside
                        disabled
                        icon={<Icon name="add" />}
                    />
                </div>
                {selectedObservationPoint &&
                    <div style={[styles.observationPointSelection.wrapper]}>
                        <LayoutComponents.InputGroup
                            label="Name"
                            style={[styles.observationPointSelection.input]}
                        >
                            <Input
                                type="text"
                                value={
                                    boundary.observation_points.find(
                                        op => op.id === selectedObservationPoint
                                    ).name
                                }
                                onChange={
                                    this.handleObservationPointNameInputChange
                                }
                            />
                        </LayoutComponents.InputGroup>
                        <Button
                            style={styles.observationPointSelection.button}
                            iconInside
                            onClick={this.handleObservationPointDelete}
                            icon={<Icon name="trash" />}
                        />
                    </div>}
            </div>
        );
    };

    render() {
        const { mapStyles, area, editBoundaryOnMap, onDelete, readOnly, updateStatus, layers } = this.props;
        const { nameInputId, layerInputId, boundary } = this.state;
        const observationPoints = Helper.addIdFromIndex(
            this.getDateTimeValue()
        );

        const saveButton = WebData.Component.Processing(
            <Button onClick={this.save}>Save</Button>
        );


        return (
            <div>
                <div style={styles.columns}>
                    <LayoutComponents.Column
                        heading="Properties"
                        style={[styles.columnNotLast]}
                    >
                        <LayoutComponents.InputGroup label="Name">
                            <Input
                                style={styles.input}
                                name="name"
                                disabled={readOnly}
                                id={nameInputId}
                                onChange={this.handleInputChange('name')}
                                value={boundary.name}
                                type="text"
                                placeholder="name"
                            />
                        </LayoutComponents.InputGroup>

                        <LayoutComponents.InputGroup label="Select Layer">
                            <Select
                                style={[styles.input]}
                                disabled={readOnly}
                                name="affected_layers"
                                id={layerInputId}
                                value={
                                    boundary.affected_layers
                                        ? boundary.affected_layers
                                        : undefined
                                }
                                onChange={this.handleInputChange( 'affected_layers', mapOptionValues)}
                                multi
                                options={layers}
                            />
                        </LayoutComponents.InputGroup>

                        <div style={styles.rightAlign}>
                            <Button
                                style={styles.buttonMarginRight}
                                disabled={readOnly}
                                onClick={editBoundaryOnMap}
                                type="link"
                                icon={<Icon name="marker" />}
                            >
                                Edit on Map
                            </Button>
                            <Button
                                style={styles.buttonMarginRight}
                                disabled={readOnly}
                                onClick={onDelete}
                                type="link"
                                icon={<Icon name="trash" />}
                            >
                                Delete
                            </Button>
                        </div>

                        <BoundaryMap
                            area={area}
                            boundary={boundary}
                            styles={mapStyles}
                        />
                    </LayoutComponents.Column>

                    <LayoutComponents.Column
                        heading="Observation Points"
                        style={[styles.columnFlex2]}
                    >
                        {this.renderObservationPointsSelection(boundary)}

                        <LayoutComponents.Column heading="Flux Boundaries">
                            <DataTableAction
                                component={this.observationPoint}
                            />
                            <GeneralHeadObservationPoint
                                ref={observationPoint =>
                                    (this.observationPoint = observationPoint)}
                                rows={observationPoints}
                            />
                        </LayoutComponents.Column>
                    </LayoutComponents.Column>
                </div>

                <div style={styles.saveButtonWrapper}>
                    {saveButton(updateStatus)}
                </div>
            </div>
        );
    }
}

GeneralHeadProperties.propTypes = {
    perPage: PropTypes.number,
    area: PropTypes.object.isRequired,
    boundary: PropTypes.object.isRequired,
    editBoundaryOnMap: PropTypes.func.isRequired,
    mapStyles: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
    selectedObservationPoint: PropTypes.string,
    updateStatus: PropTypes.object,
    layers: PropTypes.array,
};

export default GeneralHeadProperties;
