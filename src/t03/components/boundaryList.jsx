import * as React from 'react';
import {pure} from 'recompose';

import Table from '../../components/primitive/table/Table';
import Tr from '../../components/primitive/table/Tr';
import Td from '../../components/primitive/table/Td';

const BoundaryList = ( { type, boundaries } ) => {
    console.log( type, boundaries );
    return (
        <Table>
            <thead>
            <Tr head>
                <Td head>Name</Td>
                {!type && <Td head>Type</Td>}
                {type === 'wel' && <Td head>Well Type</Td>}
                {type === 'wel' && <Td head>Latitude (X)</Td>}
                {type === 'wel' && <Td head>Longitude (Y)</Td>}
                {type === 'wel' && <Td head>Layers</Td>}
            </Tr>
            </thead>
            <tbody>
            {boundaries.map( ( b, index ) => (
                <Tr key={index}>
                    <Td>{b.name}</Td>
                    {!type && <Td>{b.type.fullName}</Td>}
                    {type === 'wel' && <Td>{b.metadata.well_type}</Td>}
                    {type === 'wel' && <Td>{b.geometry.coordinates[ 1 ]}</Td>}
                    {type === 'wel' && <Td>{b.geometry.coordinates[ 0 ]}</Td>}
                    {type === 'wel' && <Td>{b.affected_layers}</Td>}
                </Tr>
            ) )}
            </tbody>
        </Table>
    );
};

export default pure( BoundaryList );
