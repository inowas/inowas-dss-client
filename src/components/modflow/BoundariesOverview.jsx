import React, { Component, PropTypes } from 'react';
import ConfiguredRadium from 'ConfiguredRadium';

import Table from '../primitive/table/Table';
import Tr from '../primitive/table/Tr';
import Td from '../primitive/table/Td';
import Icon from '../primitive/Icon';
import styleGlobals from 'styleGlobals';

const styles = {
    wrapper: {
        maxHeight: '100%',
        display: 'flex',
        flexDirection: 'column'
    },

    header: {
        display: 'flex',
        flex: 1,
        marginBottom: 10,
        minHeight: 30
    },

    body: {
        minHeight: 0,
        flex: 1,
        overflow: 'auto'
    },

    type: {
        flex: 1,
        border: '1px solid ' + styleGlobals.colors.graySemilight,
        borderRadius: styleGlobals.dimensions.borderRadius,
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
        setEditorState: PropTypes.func
    }

    render( ) {
        const { boundaries, type, setEditorState } = this.props;

        return (
            <div style={[ styles.wrapper ]}>
                <div style={[ styles.header ]}>
                    <span style={[ styles.type ]}>{type}
                        ({boundaries.length})</span>
                    <button style={styles.headerButton.button} className="link"><Icon style={styles.headerButton.icon} name="add"/>Add new</button>
                    {type === 'wel' && <button onClick={( ) => setEditorState( 'wells' )} style={styles.headerButton.button} className="link"><Icon style={styles.headerButton.icon} name="marker"/>View on Map</button>}
                </div>
                <div style={[ styles.body ]}>
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
                            {boundaries.map(( b, index ) => (
                                <Tr key={index}>
                                    <Td>{b.name}</Td>
                                    {!type && <Td>{b.type.fullName}</Td>}
                                    {type === 'wel' && <Td>{b.metadata.well_type}</Td>}
                                    {type === 'wel' && <Td>{b.geometry.coordinates[1]}</Td>}
                                    {type === 'wel' && <Td>{b.geometry.coordinates[0]}</Td>}
                                    {type === 'wel' && <Td>{b.affected_layers}</Td>}
                                </Tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}
