import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import { pure } from 'recompose';
import styleGlobals from 'styleGlobals';
import Table from '../../components/primitive/table/Table';
import Tr from '../../components/primitive/table/Tr';
import Td from '../../components/primitive/table/Td';
import Icon from '../../components/primitive/Icon';
import { get } from 'lodash';

const styles = {
    columnContainer: {
        display: 'flex'
    },

    columnNotLast: {
        marginRight: styleGlobals.dimensions.gridGutter
    },

    columns: {
        display: 'flex'
    },

    columnFlex2: {
        flex: 2
    },

    saveButtonWrapper: {
        textAlign: 'right',
        marginTop: styleGlobals.dimensions.spacing.medium
    },

    expandVertical: {
        flex: 1
    },

    link: {
        cursor: 'pointer',
        textDecoration: 'underline'
    }
};

const runModelValidation = ({ model, route, routeType }) => {
    const boundaryLength = get( model, 'boundaries.length', 0 );
    const layersLength = get( model, 'soilmodel.layers.length', 0 );
    const stressPeriodsLength = get( model, 'stress_periods.stress_periods.length', 0 );
    const activeCellsLength = get( model, 'active_cells.length', 0 );

    return (
        <Table>
            <tbody>
            <Tr>
                <Td><a style={[ styles.link ]} onClick={() => route( 'boundaries' )}>Boundaries</a></Td>
                <Td>{boundaryLength}</Td>
                <Td><Icon name="checked"/></Td>
            </Tr>
            <Tr>
                <Td><a style={[ styles.link ]} onClick={() => route( 'soilmodel' )}>Soilmodel Layers</a></Td>
                <Td>{layersLength}</Td>
                <Td><Icon name={layersLength > 0 ? 'checked' : 'unchecked'}/></Td>
            </Tr>
            <Tr>
                <Td><a style={[ styles.link ]} onClick={() => routeType( 'model-run', 'times' )}>Time Discretization
                    Stress Periods</a></Td>
                <Td>{stressPeriodsLength}</Td>
                <Td><Icon name={stressPeriodsLength > 0 ? 'checked' : 'unchecked'}/></Td>
            </Tr>
            <Tr>
                <Td>Active Cells</Td>
                <Td>{activeCellsLength}</Td>
                <Td><Icon name={activeCellsLength > 0 ? 'checked' : 'unchecked'}/></Td>
            </Tr>
            <Tr>
                <Td>Flow Package</Td>
                <Td>lpf</Td>
                <Td><Icon name="checked"/></Td>
            </Tr>
            <Tr>
                <Td>Solver</Td>
                <Td>pcg</Td>
                <Td><Icon name="checked"/></Td>
            </Tr>
            </tbody>
        </Table>
    );
};

export default pure( ConfiguredRadium( runModelValidation ) );
