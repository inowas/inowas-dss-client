import React, {Component, PropTypes} from 'react';

import Button from '../primitive/Button';
import ConfiguredRadium from 'ConfiguredRadium';
import Icon from '../primitive/Icon';
import Input from '../primitive/Input';
import Select from '../primitive/Select';
import styleGlobals from 'styleGlobals';
import {uniqueId} from 'lodash';
import ModelEditorBoundaryMap from "./ModelEditorBoundaryMap";
import PumpingRate from "../../t03/components/pumpingRate";
import {addIdFromIndex, addItem} from "../../core/helpers";

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
        area: PropTypes.object.isRequired,
        mapStyles: PropTypes.object.isRequired,
        well: PropTypes.object.isRequired,
        onSaveWell: PropTypes.func.isRequired,
        editBoundaryOnMap: PropTypes.func.isRequired
    };

    constructor ( props ) {
        super( props );

        this.state = {
            nameInputId: uniqueId( 'nameInput-' ),
            typeInputId: uniqueId( 'typeInput-' ),
            layerInputId: uniqueId( 'layerInput-' ),
            well: this.props.well || {},
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            well: nextProps.well,
        });
    }

    handleInputChange = ( value, name, key ) => {

        this.setState( function( prevState, props ) {
            if (key) {
                return {
                    ...prevState,
                    well: {
                        ...prevState.well,
                        [key]: {
                            ...prevState.well[key],
                            [name]: value
                        }
                    }
                };
            }

            return {
                ...prevState,
                well: {
                    ...prevState.well,
                    [name]: value
                }
            };
        } );
    };

    addPumpingRate = () => {
        // Todo: To be implemented
    };

    saveWell = () => {
        this.props.onSaveWell(
            {
                ...this.state.well,
                date_time_values: this.refs.pumpingRate.getRows()
            }
        );
    };

    render () {
        const { mapStyles, area, editBoundaryOnMap } = this.props;
        const { nameInputId, typeInputId, layerInputId, well } = this.state;
        const pumpingRates = addIdFromIndex(well.date_time_values || []);

        return (
            <div style={[ styles.wrapper ]}>
                <div style={[ styles.columns ]}>
                    <div style={[ styles.columnFlex1, styles.columnNotLast ]}>
                        <h3 style={[ styles.heading ]}>Properties</h3>

                        <div style={[ styles.inputBlock ]}>
                            <label style={[ styles.label ]} htmlFor={nameInputId}>Well Name</label>
                            <Input style={[ styles.input ]} name="name" id={nameInputId} onChange={(value, name) => this.handleInputChange(value, name)}
                                   value={well.name} type="text" placeholder="name"/>
                        </div>

                        <div style={[ styles.inputBlock ]}>
                            <label style={[ styles.label ]} htmlFor={typeInputId}>Well Type</label>
                            <Select style={[ styles.input ]} name="type" id={typeInputId}
                                    value={well.metadata ? well.metadata.well_type : ''} onChange={(data) => this.handleInputChange(data.value, 'well_type', 'metadata')}
                                    options={[
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
                            <Select style={[ styles.input ]} name="affected_layers" id={layerInputId} value={well.affected_layers
                                ? well.affected_layers[ 0 ]
                                : undefined} onChange={(data) => this.handleInputChange([data.value], 'affected_layers')} options={[
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
                            <Input style={[ styles.input ]} onChange={this.handleInputChange}
                                   value={well.geometry.coordinates[ 1 ]} type="number" placeholder="Latitude"/>
                            <Input style={[ styles.input ]} onChange={this.handleInputChange}
                                   value={well.geometry.coordinates[ 0 ]} type="number" placeholder="Longitude"/>
                            <ModelEditorBoundaryMap styles={mapStyles} area={area} boundary={well}/>
                        </div>
                    </div>

                    <div style={[ styles.columnFlex2 ]}>
                        <h3 style={[ styles.heading ]}>Pumping Rates</h3>
                        <div style={styles.pumpingRatesActions}>
                            <Button onClick={this.addPumpingRate} type="link">
                                <Icon name="add" style={[ styles.iconInButton ]}/>Add
                            </Button>
                        </div>
                        <PumpingRate ref="pumpingRate" rows={pumpingRates}/>
                    </div>
                </div>
                <div style={[ styles.saveButtonWrapper ]}>
                    <Button onClick={this.saveWell}>Save</Button>
                </div>
            </div>

        );
    }
}
