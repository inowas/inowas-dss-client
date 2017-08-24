import { DataTableAction, RiverObservationPoint } from '../../t03/components';
import { Helper, LayoutComponents } from '../../core';
import React, { Component } from 'react';
import { find, uniqueId } from 'lodash';

import BoundaryMap from './boundaryMap';
import Button from '../../components/primitive/Button';
import ConfiguredRadium from 'ConfiguredRadium';
import Icon from '../../components/primitive/Icon';
import Input from '../../components/primitive/Input';
import PropTypes from 'prop-types';
import Select from '../../components/primitive/Select';
import styleGlobals from 'styleGlobals';

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
class RiverProperties extends Component {
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

    handleInputChange = (value, name, key) => {
        this.setState(function(prevState, props) {
            if (key) {
                return {
                    ...prevState,
                    boundary: {
                        ...prevState.boundary,
                        [key]: {
                            ...prevState.boundary[key],
                            [name]: value
                        },
                        observation_points: mergeObservationPoints(
                            prevState.boundary.observation_points,
                            prevState.selectedObservationPoint,
                            this.observationPoint.getRows()
                        )
                    }
                };
            }

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

    renderObservationPoints = boundary => {
        if (!boundary.observation_points) {
            return null;
        }

        return boundary.observation_points.map(op => {
            return (
                <p
                    key={op.id}
                    onClick={() => this.selectObservationPoint(op.id)}
                >
                    {op.name}
                </p>
            );
        });
    };

    render() {
        const { mapStyles, area, editBoundaryOnMap } = this.props;
        const { nameInputId, layerInputId, boundary } = this.state;
        const observationPoints = Helper.addIdFromIndex(
            this.getDateTimeValue()
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
                                name="name"
                                id={nameInputId}
                                onChange={(value, name) =>
                                    this.handleInputChange(value, name)}
                                value={boundary.name}
                                type="text"
                                placeholder="name"
                            />
                        </LayoutComponents.InputGroup>

                        <LayoutComponents.InputGroup label="Select Layer">
                            <Select
                                name="affected_layers"
                                id={layerInputId}
                                value={
                                    boundary.affected_layers
                                        ? boundary.affected_layers[0]
                                        : undefined
                                }
                                onChange={data =>
                                    this.handleInputChange(
                                        data ? [data.value] : [],
                                        'affected_layers'
                                    )}
                                options={[
                                    {
                                        value: 0,
                                        label: 'Layer 1'
                                    },
                                    {
                                        value: 1,
                                        label: 'Layer 2'
                                    },
                                    {
                                        value: 2,
                                        label: 'Layer 3'
                                    }
                                ]}
                            />
                        </LayoutComponents.InputGroup>

                        <div style={styles.rightAlign}>
                            <Button
                                style={styles.buttonMarginRight}
                                onClick={editBoundaryOnMap}
                                type="link"
                                icon={<Icon name="marker" />}
                            >
                                Edit on Map
                            </Button>
                            <Button
                                style={styles.buttonMarginRight}
                                disabled
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

                        <div>
                            Observation Stations
                            {this.renderObservationPoints(boundary)}
                        </div>
                    </LayoutComponents.Column>

                    <LayoutComponents.Column
                        heading="Flux Boundaries"
                        style={[styles.columnFlex2]}
                    >
                        <DataTableAction component={this.observationPoint} />
                        <RiverObservationPoint
                            ref={observationPoint => {
                                this.observationPoint = observationPoint;
                            }}
                            rows={observationPoints}
                        />
                    </LayoutComponents.Column>
                </div>
                <div style={styles.saveButtonWrapper}>
                    <Button onClick={this.save}>Save</Button>
                </div>
            </div>
        );
    }
}

RiverProperties.propTypes = {
    perPage: PropTypes.number,
    area: PropTypes.object.isRequired,
    boundary: PropTypes.object.isRequired,
    editBoundaryOnMap: PropTypes.func.isRequired,
    mapStyles: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
    selectedObservationPoint: PropTypes.string
};

export default RiverProperties;
