import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styleGlobals from 'styleGlobals';
import Input from "../../components/primitive/Input";
import Icon from '../../components/primitive/Icon';
import { uniqueId, find } from 'lodash';
import BoundaryMap from "./boundaryMap";
import Button from "../../components/primitive/Button";
import {ObservationPoint} from "../../t03/components";
import {Helper} from "../../core";

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


    iconInButton: {
        marginRight: styleGlobals.dimensions.spacing.small,
        color: styleGlobals.colors.font
    },

    label: {
        fontWeight: 600,
        paddingLeft: 8,
        paddingRight: 8
    },

    input: {
        marginTop: 5
    },

    pumpingRatesActions: {
        textAlign: 'right'
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

const mergeData = (state, id, dateTimeValues) => {
    return {
        ...state.boundary,
        observation_points: state.boundary.observation_points.map(b => {
            if (b.id === id) {
                return {...b, date_time_values: dateTimeValues};
            }
            return b;
        }),
    };
};

class RiverProperties extends Component {

    constructor( props ) {
        super( props );

        this.state = {
            nameInputId: uniqueId( 'nameInput-' ),
            selectedObservationPoint: this.props.selectedObservationPoint || null,
            boundary: this.props.boundary || {}
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState((prevState) => {
            return {
                boundary: nextProps.boundary ? nextProps.boundary : prevState.boundary,
                selectedObservationPoint: prevState.selectedObservationPoint || nextProps.selectedObservationPoint
            }
        });
    }

    getDateTimeValue = () => {
        const key = this.state.selectedObservationPoint;
        const observationPoints = this.state.boundary && this.state.boundary.observation_points
            ? this.state.boundary.observation_points
            : [];

        const observationPoint = find(observationPoints, {id: key});

        if (!observationPoint) {
            return [];
        }

        return Helper.addIdFromIndex(observationPoint['date_time_values']);
    };

    selectObservationPoint = ( key ) => {
        this.setState((prevState) => {
            return {
                selectedObservationPoint: key,
                boundary: mergeData(this.state, prevState.selectedObservationPoint, this.observationPoint.getRows())
            };
        });
    };

    save = () => {
        this.props.onSave(
            {
                ...this.state.boundary,
                ...mergeData(this.state, this.state.selectedObservationPoint, this.observationPoint.getRows())
            }
        );
    };

    renderObservationPoints = boundary => {

        if (! boundary.observation_points) {
            return null;
        }

        return boundary.observation_points.map( (op, key) => {
        return (
            <p key={op.id} style={ styles.rightAlign } onClick={() => this.selectObservationPoint(op.id)}>
                {op.name}
                <button style={{...styles.buttonMarginLeft}} disabled className="link" >
                    <Icon name="trash"/>
                </button>
            </p>
        )
        });
    };

    render( ) {
        const { mapStyles, area, editBoundaryOnMap } = this.props;
        const { nameInputId, boundary } = this.state;
        const observationPoints = Helper.addIdFromIndex(this.getDateTimeValue());

        return (
            <div style={ styles.wrapper }>
                <div style={ styles.columns }>
                    <div style={{ ...styles.columnFlex1, ...styles.columnNotLast }}>

                        <h3 style={ styles.heading }>Properties</h3>

                        <div style={ styles.inputBlock }>
                            <label style={ styles.label } htmlFor={ nameInputId }>River Name</label>
                            <Input style={ styles.input } id={ nameInputId } value={ boundary.name } type="text" placeholder="name"/>
                        </div>

                        <div style={ styles.rightAlign }>
                            <button style={styles.buttonMarginRight} onClick={editBoundaryOnMap} className="link">
                                <Icon name="marker"/>Edit on Map
                            </button>
                            <button style={styles.buttonMarginRight} disabled className="link">
                                <Icon name="trash"/>Delete
                            </button>
                        </div>
                        <BoundaryMap area={area} boundary={boundary} styles={mapStyles}/>

                        <div style={ styles.inputBlock }>
                            <p style={{ ...styles.label, ...styles.rightAlign }} >Observation Stations
                                <button style={{ ...styles.buttonMarginLeft}} disabled className="link">
                                    <Icon name="add"/>
                                </button>
                            </p>
                            {this.renderObservationPoints(boundary)}
                        </div>

                    </div>

                    <div style={{ ...styles.columnFlex2 }}>
                        <h3 style={styles.heading}>Data</h3>
                        <div style={styles.pumpingRatesActions}>
                            <Button onClick={(e) => this.observationPoint.onAdd(e, Helper.addDays(1))} type="link">
                                <Icon name="add" style={[ styles.iconInButton ]}/>Add D
                            </Button>
                            <Button onClick={(e) => this.observationPoint.onAdd(e, Helper.addMonths(1))} type="link">
                                <Icon name="add" style={[ styles.iconInButton ]}/>Add M
                            </Button>
                            <Button onClick={(e) => this.observationPoint.onAdd(e, Helper.addYears(1))} type="link">
                                <Icon name="add" style={[ styles.iconInButton ]}/>Add Y
                            </Button>
                            <Button onClick={(e) => this.observationPoint.onDelete(e)} type="link">
                                <Icon name="trash" style={[ styles.iconInButton ]}/>Delete
                            </Button>
                        </div>
                        <ObservationPoint ref={observationPoint => this.observationPoint = observationPoint }
                                          rows={observationPoints}/>
                    </div>
                    <div style={[ styles.saveButtonWrapper ]}>
                        <Button onClick={this.save}>Save</Button>
                    </div>
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
    selectedObservationPoint: PropTypes.string,
};

export default RiverProperties;
