import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import Icon from '../primitive/Icon';
import Input from '../primitive/Input';
import Select from '../primitive/Select';
import Table from '../primitive/table/Table';
import Td from '../primitive/table/Td';
import Tr from '../primitive/table/Tr';
import dateFormat from 'dateformat';
import styleGlobals from 'styleGlobals';
import { uniqueId } from 'lodash';
import Button from '../primitive/Button';

const styles = {
    wrapper: {
        display: 'flex'
    },

    column: {
        flex: 1
    },

    columnNotLast: {
        marginRight: styleGlobals.dimensions.gridGutter
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

    label: {
        fontWeight: 600,
        paddingLeft: 8,
        paddingRight: 8
    },

    input: {
        marginTop: 5
    }
};

@ConfiguredRadium
export default class WellProperties extends Component {

    static propTypes = {
        well: PropTypes.object.isRequired,
        updateWell: PropTypes.func.isRequired,
        setState: PropTypes.func.isRequired
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

            if ( value instanceof Array ) {
                updatedWell[property] = value.map( v => v.value );
            } else {
                updatedWell[property] = value;
            }

            this.props.updateWell( updatedWell );
        };
    }

    render( ) {
        const { well, setState } = this.props;
        const { nameInputId, typeInputId, layerInputId } = this.state;
        return (
            <div style={[ styles.wrapper ]}>
                <div style={[ styles.column, styles.columnNotLast ]}>
                    <h3 style={[ styles.heading ]}>Properties</h3>
                    <div style={[ styles.inputBlock ]}>
                        <label style={[ styles.label ]} htmlFor={nameInputId}>Well Name</label>
                        <Input style={[ styles.input ]} id={nameInputId} onChange={this.updateWell( 'name' )} value={well.name} type="text" placeholder="name"/>
                    </div>
                    <div style={[ styles.inputBlock ]}>
                        <label style={[ styles.label ]} htmlFor={typeInputId}>Well Type</label>
                        <Select style={[ styles.input ]} id={typeInputId} value={well.wellType} onChange={this.updateWell( 'wellType' )} options={[
                            {
                                value: 'iw',
                                label: 'Irrigation Well'
                            }, {
                                value: 'puw',
                                label: 'Public Well'
                            }
                        ]}/>
                    </div>
                    <div style={[ styles.inputBlock ]}>
                        <label style={[ styles.label ]}>Coordinates
                            <button disabled onClick={( ) => setState( 'wells-move' )} className="link"><Icon name="marker"/>Get from Map</button>
                        </label>
                        <Input style={[ styles.input ]} onChange={this.updateWell( 'lat' )} value={well.lat} type="number" placeholder="Latitude"/>
                        <Input style={[ styles.input ]} onChange={this.updateWell( 'lng' )} value={well.lng} type="number" placeholder="Longitude"/>
                    </div>
                </div>
                <div style={[ styles.column, styles.columnNotLast ]}>
                    <h3 style={[ styles.heading ]}>Active Layer</h3>
                    <div style={[ styles.inputBlock ]}>
                        <label style={[ styles.label ]} htmlFor={layerInputId}>Select Layer</label>
                        <Select style={[ styles.input ]} id={layerInputId} value={well.affectedLayers} multi onChange={this.updateWell( 'affectedLayers' )} options={[
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
                        <tbody>
                            {well.pumpingRates.map(pr => (
                                <Tr>
                                    <Td>{dateFormat( new Date( pr.start ), 'mm/dd/yyyy HH:MM' )}</Td>
                                    <Td>{pr.rate}</Td>
                                </Tr>
                            ))}
                        </tbody>
                    </Table>
                    <Button type="link" disabled><Icon name="add" /> Add</Button>
                </div>
            </div>

        );
    }

}
