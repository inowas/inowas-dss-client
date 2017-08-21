import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styleGlobals from 'styleGlobals';
import Input from '../../components/primitive/Input';
import Select, { extractSimpleValues, hydrateSimpleValues } from '../../components/primitive/Select';
import Icon from '../../components/primitive/Icon';
import { uniqueId, find } from 'lodash';
import BoundaryMap from './boundaryMap';
import Button from '../../components/primitive/Button';
import { GeneralHeadObservationPoint, DataTableAction } from '../../t03/components';
import { Helper } from '../../core';
import ConfiguredRadium from 'ConfiguredRadium';

const styles = {
    wrapper: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },

    columns: {
        display: 'flex',
        flex: 1
    },

    column: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%'
    },

    columnFlex1: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%'
    },

    columnFlex2: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%'
    },

    columnNotLast: {
        marginRight: styleGlobals.dimensions.gridGutter
    },

    columnBody: {
        flex: 1,
        minHeight: 0,
        overflow: 'auto'
    },

    heading: {
        borderBottom: '1px solid ' + styleGlobals.colors.graySemilight,
        fontWeight: 300,
        fontSize: 16,
        textAlign: 'left',
        paddingBottom: 10
    },

    inputBlock: {
        marginTop: 10
    },

    rightAlign: {
        textAlign: 'right'
    },

    absoluteRight: {
        position: 'absolute',
        right: 0
    },

    buttonMarginRight: {
        marginRight: 10
    },

    buttonMarginLeft: {
        marginLeft: 10
    },

    label: {
        fontWeight: 600,
        paddingLeft: 8,
        paddingRight: 8
    },

    input: {
        marginTop: 5
    },

    dateInput: {
        maxWidth: 125
    },

    rateInput: {
        maxWidth: 70
    },

    saveButtonWrapper: {
        textAlign: 'right',
        marginTop: styleGlobals.dimensions.spacing.medium
    }
};

const mergeBoundary = (state, id, dateTimeValues) => {
    return {
        ...state.boundary,
        observation_points: mergeObservationPoints(state.boundary.observation_points, id, dateTimeValues)
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
class GeneralHeadProperties extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nameInputId: uniqueId('nameInput-'),
            layerInputId: uniqueId('layerInput-'),
            selectedObservationPoint: this.props.selectedObservationPoint || null,
            boundary: this.props.boundary || {}
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState((prevState) => {
            return {
                boundary: nextProps.boundary ? nextProps.boundary : prevState.boundary,
                selectedObservationPoint: prevState.selectedObservationPoint || nextProps.selectedObservationPoint
            };
        });
    }

    handleInputChange = (value, name, key) => {
        this.setState(function (prevState, props) {
            if (key) {
                return {
                    ...prevState,
                    boundary: {
                        ...prevState.boundary,
                        [key]: {
                            ...prevState.boundary[ key ],
                            [name]: value
                        },
                        observation_points: mergeObservationPoints(
                            prevState.boundary.observation_points, prevState.selectedObservationPoint, this.observationPoint.getRows()
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
                        prevState.boundary.observation_points, prevState.selectedObservationPoint, this.observationPoint.getRows()
                    )
                }
            };
        });
    };

    getDateTimeValue = () => {
        const key = this.state.selectedObservationPoint;
        const observationPoints = this.state.boundary && this.state.boundary.observation_points
            ? this.state.boundary.observation_points
            : [];

        const observationPoint = find(observationPoints, { id: key });

        if (!observationPoint) {
            return [];
        }

        return Helper.addIdFromIndex(observationPoint[ 'date_time_values' ]);
    };

    selectObservationPoint = (key) => {
        this.setState((prevState) => {
            return {
                selectedObservationPoint: key,
                boundary: mergeBoundary(this.state, prevState.selectedObservationPoint, this.observationPoint.getRows())
            };
        });
    };

    save = () => {
        this.props.onSave(
            {
                ...this.state.boundary,
                ...mergeBoundary(this.state, this.state.selectedObservationPoint, this.observationPoint.getRows())
            }
        );
    };

    renderObservationPoints = boundary => {

        if (!boundary.observation_points) {
            return null;
        }

        return boundary.observation_points.map((op, key) => {
            return (
                <p key={op.id} style={styles.rightAlign} onClick={() => this.selectObservationPoint(op.id)}>
                    {op.name}
                </p>
            );
        });
    };

    render() {
        const { mapStyles, area, editBoundaryOnMap } = this.props;
        const { nameInputId, layerInputId, boundary } = this.state;
        const observationPoints = Helper.addIdFromIndex(this.getDateTimeValue());

        return (
            <div style={styles.wrapper}>
                <div style={styles.columns}>
                    <div style={{ ...styles.columnFlex1, ...styles.columnNotLast }}>

                        <h3 style={styles.heading}>Properties</h3>

                        <div style={styles.inputBlock}>
                            <label style={styles.label} htmlFor={nameInputId}>Name</label>
                            <Input style={styles.input} name="name" id={nameInputId}
                                   onChange={(value, name) => this.handleInputChange(value, name)} value={boundary.name}
                                   type="text"
                                   placeholder="name"/>
                        </div>
                        <div style={styles.inputBlock}>
                            <label style={styles.label} htmlFor={nameInputId}>Select Layer</label>
                            <Select style={[ styles.input ]} name="affected_layers" id={layerInputId}
                                    value={boundary.affected_layers
                                        ? hydrateSimpleValues(boundary.affected_layers)
                                        : undefined}
                                    onChange={data => this.handleInputChange(extractSimpleValues(data).map(v => parseInt(v)), 'affected_layers')}
                                    multi={true}
                                    simpleValue={true}
                                    options={[
                                        {
                                            value: '0',
                                            label: 'Layer 1'
                                        }, {
                                            value: '1',
                                            label: 'Layer 2'
                                        }, {
                                            value: '2',
                                            label: 'Layer 3'
                                        }
                                    ]}/>
                        </div>

                        <div style={styles.rightAlign}>
                            <button style={styles.buttonMarginRight} onClick={editBoundaryOnMap} className="link">
                                <Icon name="marker"/>Edit on Map
                            </button>
                            <button style={styles.buttonMarginRight} disabled className="link">
                                <Icon name="trash"/>Delete
                            </button>
                        </div>
                        <BoundaryMap area={area} boundary={boundary} styles={mapStyles}/>

                        <div style={styles.inputBlock}>
                            <p style={{ ...styles.label, ...styles.rightAlign }}>Observation Stations
                            </p>
                            {this.renderObservationPoints(boundary)}
                        </div>
                    </div>

                    <div style={{ ...styles.columnFlex2 }}>
                        <h3 style={styles.heading}>Flux Boundaries</h3>
                        <DataTableAction component={this.observationPoint}/>
                        <GeneralHeadObservationPoint ref={observationPoint => this.observationPoint = observationPoint}
                                                      rows={observationPoints}/>
                    </div>
                </div>
                <div style={styles.saveButtonWrapper}>
                    <Button onClick={this.save}>Save</Button>
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
};

export default GeneralHeadProperties;
