import React, { Component, PropTypes } from 'react';

import Boundary from '../../model/Boundary';
import BoundaryMetadata from '../../model/BoundaryMetadata';
import Button from '../primitive/Button';
import ConfiguredRadium from 'ConfiguredRadium';
import Icon from '../primitive/Icon';
import Input from '../primitive/Input';
import Select from '../primitive/Select';
import Table from '../primitive/table/Table';
import Td from '../primitive/table/Td';
import Tr from '../primitive/table/Tr';
import styleGlobals from 'styleGlobals';
import { uniqueId } from 'lodash';

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
        marginTop: 20
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

@ConfiguredRadium
export default class WellProperties extends Component {

    static propTypes = {
        well: PropTypes.object.isRequired,
        updateWell: PropTypes.func.isRequired,
        setEditorState: PropTypes.func.isRequired,
        updatePumpingRate: PropTypes.func.isRequired,
        addPumpingRate: PropTypes.func.isRequired,
        saveWell: PropTypes.func.isRequired
    }

    constructor( props ) {
        super( props );

        this.state = {
            nameInputId: uniqueId( 'nameInput-' ),
            typeInputId: uniqueId( 'typeInput-' ),
            layerInputId: uniqueId( 'layerInput-' )
        };
    }

    updateWell = property => {
        return value => {
            const { well } = this.props;
            const updatedWell = {
                ...well
            };

            if ( property === 'affectedLayers' ) {
                updatedWell[property] = [ value ];
            } else {
                updatedWell[property] = value;
            }

            this.props.updateWell( updatedWell );
        };
    }

    updateWellName = value => {
        const { well, updateWell } = this.props;

        return updateWell(new Boundary( well.id, value, well.type, well.geometry, well.affectedLayers, well.metadata, well.observationPoints ));
    }

    updateWellType = value => {
        const { well, updateWell } = this.props;

        return updateWell(new Boundary( well.id, well.name, well.type, well.geometry, well.affectedLayers, new BoundaryMetadata({ wellType: value }), well.observationPoints ));
    }

    updateLatitude = value => {
        const { well, updateWell } = this.props;

        return updateWell(new Boundary( well.id, well.name, well.type, {
            ...well.geometry,
            coordinates: [ well.geometry.coordinates[0], value ]
        }, well.affectedLayers, well.metadata, well.observationPoints ));
    }

    updateLongitude = value => {
        const { well, updateWell } = this.props;

        return updateWell(new Boundary( well.id, well.name, well.type, {
            ...well.geometry,
            coordinates: [value, well.geometry.coordinates[1]]
        }, well.affectedLayers, well.metadata, well.observationPoints ));
    }

    updateAffectedLayers = value => {
        const { well, updateWell } = this.props;

        return updateWell(new Boundary( well.id, well.name, well.type, well.geometry, [value.value], well.metadata, well.observationPoints ));
    }

    updatePumpingRateTime = index => {
        return datetime => {
            const { updatePumpingRate, well } = this.props;

            const pumpingRate = well.observationPoints[0].values[index][1 ];

            updatePumpingRate( well.id, well.observationPoints[0].id, index, datetime.toISOString( ), pumpingRate );
        };
    }

    updatePumpingRatePumpingRate = index => {
        return pumpingRate => {
            const { updatePumpingRate, well } = this.props;

            const datetime = well.observationPoints[0].values[index][0 ];

            updatePumpingRate( well.id, well.observationPoints[0].id, index, datetime, pumpingRate );
        };
    }

    addPumpingRate = ( ) => {
        const { updatePumpingRate, well } = this.props;

        updatePumpingRate( well.id, well.observationPoints[0].id, well.observationPoints[0].values.length, new Date( ).toISOString( ), 0 );
    }

    saveWell = ( ) => {
        const { saveWell, well } = this.props;
        saveWell( well.id );
    }

    render( ) {
        const { well, setEditorState } = this.props;
        const { nameInputId, typeInputId, layerInputId } = this.state;
        return (
            <div style={[ styles.wrapper ]}>
                <div style={[ styles.columns ]}>
                    <div style={[ styles.column, styles.columnNotLast ]}>
                        <h3 style={[ styles.heading ]}>Properties</h3>
                        <div style={[ styles.inputBlock ]}>
                            <label style={[ styles.label ]} htmlFor={nameInputId}>Well Name</label>
                            <Input style={[ styles.input ]} id={nameInputId} onChange={this.updateWellName} value={well.name} type="text" placeholder="name"/>
                        </div>
                        <div style={[ styles.inputBlock ]}>
                            <label style={[ styles.label ]} htmlFor={typeInputId}>Well Type</label>
                            <Select style={[ styles.input ]} id={typeInputId} value={well.metadata ? well.metadata.toObject.wellType : ''} onChange={this.updateWellType} options={[
                                {
                                    label: 'Public Well',
                                    value: 'puw'
                                }, {
                                    label: 'Infiltration Well',
                                    value: 'iw'
                                }, {
                                    label: 'Observation Well',
                                    value: 'ow'
                                }
                            ]}/>
                        </div>
                        <div style={[ styles.inputBlock ]}>
                            <label style={[ styles.label ]}>Coordinates
                                <button disabled onClick={( ) => setEditorState( 'wells-move' )} className="link"><Icon name="marker"/>Get from Map</button>
                            </label>
                            <Input style={[ styles.input ]} onChange={this.updateLatitude} value={well.geometry.coordinates[1]} type="number" placeholder="Latitude"/>
                            <Input style={[ styles.input ]} onChange={this.updateLongitude} value={well.geometry.coordinates[0]} type="number" placeholder="Longitude"/>
                        </div>
                    </div>
                    <div style={[ styles.column, styles.columnNotLast ]}>
                        <h3 style={[ styles.heading ]}>Active Layer</h3>
                        <div style={[ styles.inputBlock ]}>
                            <label style={[ styles.label ]} htmlFor={layerInputId}>Select Layer</label>
                            <Select style={[ styles.input ]} id={layerInputId} value={well.affectedLayers
                                ? well.affectedLayers[0]
                                : undefined} onChange={this.updateAffectedLayers} options={[
                                    {
                                        value: 0,
                                        label: 'Layer 1'
                                    }, {
                                        value: 1,
                                        label: 'Layer 2'
                                    }, {
                                        value: 2,
                                        label: 'Layer 3'
                                    }
                                ]}/>
                        </div>
                    </div>
                    <div style={[ styles.column ]}>
                        <h3 style={[ styles.heading ]}>Pumping Rates</h3>
                        <div style={styles.pumpingRatesActions}>
                            <Button onClick={this.addPumpingRate} type="link"><Icon name="add" style={[ styles.iconInButton ]}/>
                                Add</Button>
                        </div>
                        <div style={[ styles.columnBody ]}>
                            <Table>
                                <thead>
                                    <Tr head>
                                        <Td head>
                                            Start Time
                                        </Td>
                                        <Td head>
                                            Rate (m³/d)
                                        </Td>
                                    </Tr>
                                </thead>
                                {well.observationPoints
                                    ? <tbody>
                                            {well.observationPoints[0].values.map(( pr, index ) => (
                                                <Tr key={index}>
                                                    <Td><Input onChange={this.updatePumpingRateTime( index )} style={[ styles.dateInput ]} type="datetime" appearance="visibleOnFocus" value={new Date(pr[0])}/></Td>
                                                    <Td><Input onChange={this.updatePumpingRatePumpingRate( index )} style={[ styles.rateInput ]} type="number" appearance="visibleOnFocus" value={pr[1]}/></Td>
                                                </Tr>
                                            ))}
                                        </tbody>
                                    : null}
                            </Table>
                            {well.observationPoints
                                ? null
                                : <div>Loading</div>}
                        </div>
                    </div>
                </div>
                <div style={[styles.saveButtonWrapper]}>
                    <Button onClick={this.saveWell}>Save</Button>
                </div>
            </div>

        );
    }

}
