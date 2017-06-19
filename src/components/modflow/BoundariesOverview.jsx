import React, { Component, PropTypes } from 'react';
import ConfiguredRadium from 'ConfiguredRadium';

import Table from '../primitive/table/Table';
import Tr from '../primitive/table/Tr';
import Td from '../primitive/table/Td';
import Icon from '../primitive/Icon';
import styleGlobals from 'styleGlobals';

const styles = {
    header: {
        display: 'flex',
        marginTop: 10,
        marginBottom: 10
    },

    type: {
        flex: 1,
        border: '1px solid ' + styleGlobals.colors.graySemilight,
        marginRight: 14,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10
    },

    headerButton: {
        button: {
            marginRight: 14
        },

        icon: {
            marginRight: 6
        }
    }
};

@ConfiguredRadium
export default class BoundariesOverview extends Component {

    static propTypes = {
        type: PropTypes.string,
        boundaries: PropTypes.array,
        setState: PropTypes.func
    }

    render( ) {
        const { boundaries, type, setState } = this.props;

        return (
            <div>
                <div style={[ styles.header ]}>
                    <span style={[ styles.type ]}>{type}
                        ({boundaries.length})</span>
                    <button style={styles.headerButton.button} className="link"><Icon style={styles.headerButton.icon} name="add"/>Add new</button>
                    {type === 'wel' && <button onClick={( ) => setState( 'wells' )} style={styles.headerButton.button} className="link"><Icon style={styles.headerButton.icon} name="marker"/>View on Map</button>}
                </div>

                <Table>
                    <thead>
                        <Tr head>
                            <Td head>Name</Td>
                            <Td head>Type</Td>
                            {type === 'wel' && <Td head>Well Type</Td>}
                            {type === 'wel' && <Td head>Latitude (X)</Td>}
                            {type === 'wel' && <Td head>Longitude (Y)</Td>}
                            {type === 'wel' && <Td head>Layers</Td>}
                        </Tr>
                    </thead>
                    <tbody>
                        {boundaries.map((b, index) => (
                            <Tr key={index}>
                                <Td>{b.name}</Td>
                                <Td>{b.type}</Td>
                                {type === 'wel' && <Td>{b.wellType}</Td>}
                                {type === 'wel' && <Td>{b.lat}</Td>}
                                {type === 'wel' && <Td>{b.lng}</Td>}
                                {type === 'wel' && <Td>{b.affectedLayers}</Td>}
                            </Tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}
