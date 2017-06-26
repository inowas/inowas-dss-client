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
import dateFormat from 'dateformat';
import styleGlobals from 'styleGlobals';
import { uniqueId } from 'lodash';

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

        return updateWell(new Boundary(
            well.id, value, well.type, well.geometry, well.affectedLayers, well.metadata, well.observationPoints
        ));
    }

    updateWellType = value => {
        const { well, updateWell } = this.props;

        return updateWell(new Boundary(
            well.id, well.name, well.type, well.geometry, well.affectedLayers, new BoundaryMetadata({ wellType: value }), well.observationPoints
        ));
    }

    updateLatitude = value => {
        const { well, updateWell } = this.props;

        return updateWell(new Boundary(
            well.id, well.name, well.type, {
                ...well.geometry,
                coordinates: [ well.geometry.coordinates[0], value ]
            }, well.affectedLayers, well.metadata, well.observationPoints
        ));
    }

    updateLongitude = value => {
        const { well, updateWell } = this.props;

        return updateWell(new Boundary(
            well.id, well.name, well.type, {
                ...well.geometry,
                coordinates: [value, well.geometry.coordinates[1]]
            }, well.affectedLayers, well.metadata, well.observationPoints
        ));
    }

    updateAffectedLayers = value => {
        const { well, updateWell } = this.props;

        return updateWell(new Boundary(
            well.id, well.name, well.type, well.geometry, [value.value], well.metadata, well.observationPoints
        ));
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
                        <Input style={[ styles.input ]} id={nameInputId} onChange={this.updateWellName} value={well.name} type="text" placeholder="name"/>
                    </div>
                    <div style={[ styles.inputBlock ]}>
                        <label style={[ styles.label ]} htmlFor={typeInputId}>Well Type</label>
                        <Select style={[ styles.input ]} id={typeInputId} value={well.metadata.toObject.wellType} onChange={this.updateWellType} options={[
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
                            <button disabled onClick={( ) => setState( 'wells-move' )} className="link"><Icon name="marker"/>Get from Map</button>
                        </label>
                        <Input style={[ styles.input ]} onChange={this.updateLatitude} value={well.geometry.coordinates[1]} type="number" placeholder="Latitude"/>
                        <Input style={[ styles.input ]} onChange={this.updateLongitude} value={well.geometry.coordinates[0]} type="number" placeholder="Longitude"/>
                    </div>
                </div>
                <div style={[ styles.column, styles.columnNotLast ]}>
                    <h3 style={[ styles.heading ]}>Active Layer</h3>
                    <div style={[ styles.inputBlock ]}>
                        <label style={[ styles.label ]} htmlFor={layerInputId}>Select Layer</label>
                        <Select style={[ styles.input ]} id={layerInputId} value={well.affectedLayers ? well.affectedLayers[0] : undefined} onChange={this.updateAffectedLayers} options={[
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
                        {well.observationPoints
                            ? <tbody>
                                    {well.observationPoints[0].values.map(pr => (
                                        <Tr>
                                            <Td>{dateFormat( new Date(pr[0]), 'mm/dd/yyyy HH:MM' )}</Td>
                                            <Td>{pr[1]}</Td>
                                        </Tr>
                                    ))}
                                </tbody>
                            : null}
                    </Table>
                    {well.observationPoints
                        ? null
                        : <div>Loading</div>}
                    <Button type="link" disabled><Icon name="add"/>
                        Add</Button>
                </div>
            </div>

        );
    }

}
