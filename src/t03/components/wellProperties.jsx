import React, { Component, PropTypes } from 'react';

import Button from '../../components/primitive/Button';
import ConfiguredRadium from 'ConfiguredRadium';
import Icon from '../../components/primitive/Icon';
import Input from '../../components/primitive/Input';
import Select from '../../components/primitive/Select';
import styleGlobals from 'styleGlobals';
import { Column } from '../../core/layout/components';
import { uniqueId } from 'lodash';
import BoundaryMap from './boundaryMap';
import { PumpingRate, DataTableAction } from '../../t03/components';
import { Helper } from '../../core';

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

    columnFlex2: {
        flex: 2
    },

    columnLeft: {
        marginRight: 0.5 * styleGlobals.dimensions.spacing.large
    },

    columnRight: {
        marginLeft: 0.5 * styleGlobals.dimensions.spacing.large
    },

    columnBody: {
        flex: 1,
        minHeight: 0,
        overflow: 'auto'
    },

    inputBlock: {
        marginTop: 20
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

@ConfiguredRadium
export default class WellProperties extends Component {

    static propTypes = {
        area: PropTypes.object.isRequired,
        editBoundaryOnMap: PropTypes.func.isRequired,
        mapStyles: PropTypes.object.isRequired,
        onSave: PropTypes.func.isRequired,
        readOnly: PropTypes.bool,
        boundary: PropTypes.object.isRequired
    };

    constructor( props ) {
        super( props );

        this.state = {
            nameInputId: uniqueId( 'nameInput-' ),
            typeInputId: uniqueId( 'typeInput-' ),
            layerInputId: uniqueId( 'layerInput-' ),
            boundary: this.props.boundary || {}
        };
    }

    componentWillReceiveProps( nextProps ) {
        this.setState({ boundary: nextProps.boundary });
    }

    handleInputChange = ( value, name, key ) => {
        this.setState( function( prevState, props ) {
            if ( key ) {
                return {
                    ...prevState,
                    boundary: {
                        ...prevState.boundary,
                        [ key ]: {
                            ...prevState.boundary[key],
                            [ name ]: value
                        },
                        date_time_values: this.pumpingRate.getRows( )
                    }
                };
            }

            return {
                ...prevState,
                boundary: {
                    ...prevState.boundary,
                    [ name ]: value,
                    date_time_values: this.pumpingRate.getRows( )
                }
            };
        });
    };

    save = ( ) => {
        this.props.onSave({
            ...this.state.boundary,
            date_time_values: this.pumpingRate.getRows( )
        });
    };

    render( ) {
        const { mapStyles, area, editBoundaryOnMap } = this.props;
        const { nameInputId, typeInputId, layerInputId, boundary } = this.state;
        const pumpingRates = Helper.addIdFromIndex(boundary.date_time_values || [ ]);

        return (
            <div style={[ styles.wrapper ]}>
                <div style={[ styles.columns ]}>
                    <Column heading="Properties" style={[ styles.columnLeft ]}>
                        <div style={[ styles.inputBlock ]}>
                            <label style={[ styles.label ]} htmlFor={nameInputId}>Well Name</label>
                            <Input style={[ styles.input ]} name="name" id={nameInputId} onChange={( value, name ) => this.handleInputChange( value, name )} value={boundary.name} type="text" placeholder="name"/>
                        </div>

                        <div style={[ styles.inputBlock ]}>
                            <label style={[ styles.label ]} htmlFor={typeInputId}>Well Type</label>
                            <Select style={[ styles.input ]} name="type" id={typeInputId} value={boundary.metadata
                                ? boundary.metadata.boundary_type
                                : ''} onChange={( data ) => this.handleInputChange( data
                                ? data.value
                                : '', 'boundary_type', 'metadata' )} options={[
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
                            <label style={[ styles.label ]} htmlFor={layerInputId}>Select Layer</label>
                            <Select style={[ styles.input ]} name="affected_layers" id={layerInputId} value={boundary.affected_layers
                                ? boundary.affected_layers[0]
                                : undefined} onChange={( data ) => this.handleInputChange( data
                                ? [ data.value ]
                                : [], 'affected_layers' )} options={[
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

                        <div style={[ styles.inputBlock ]}>
                            <label style={[ styles.label ]}>Coordinates
                                <button className="link" onClick={editBoundaryOnMap}><Icon name="marker"/>Edit on Map
                                </button>
                            </label>
                            <Input style={[ styles.input ]} onChange={this.handleInputChange} value={boundary.geometry.coordinates[1]} type="number" placeholder="Latitude"/>
                            <Input style={[ styles.input ]} onChange={this.handleInputChange} value={boundary.geometry.coordinates[0]} type="number" placeholder="Longitude"/>
                            <BoundaryMap styles={mapStyles} area={area} boundary={boundary}/>
                        </div>
                    </Column>
                    <Column heading="Pumping Rates" style={[ styles.columnRight, styles.columnFlex2 ]}>
                        <DataTableAction component={this.pumpingRate}/>
                        <PumpingRate ref={pumpingRate => {
                            this.pumpingRate = pumpingRate;
                        }} rows={pumpingRates}/>
                    </Column>
                </div>
                <div style={[ styles.saveButtonWrapper ]}>
                    <Button onClick={this.save}>Save</Button>
                </div>
            </div>

        );
    }
}
