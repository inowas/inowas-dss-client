import React, { Component, PropTypes } from 'react';
import styleGlobals from 'styleGlobals';
import Input from "../primitive/Input";
import Icon from '../primitive/Icon';
import { uniqueId } from 'lodash';
import Select from "../primitive/Select";
import ModelEditorBoundaryMap from "./ModelEditorBoundaryMap";

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

export default class RiverProperties extends Component {

    static propTypes = {
        area: PropTypes.object.isRequired,
        mapStyles: PropTypes.object.isRequired,
        river: PropTypes.object.isRequired,
        editBoundaryOnMap: PropTypes.func.isRequired
    };

    constructor( props ) {
        super( props );

        this.state = {
            selectedObservationPoint: 0
        };
    }

    selectObservationPoint = ( key ) => {
        this.setState({ selectedObservationPoint: key });
    };

    renderObservationPoints = boundary => {

        if (! boundary.observation_points) {
            return null;
        }

        return boundary.observation_points.map( (op, key) => {
        return (
            <p key={op.id} style={ styles.rightAlign } onClick={() => this.selectObservationPoint(key)}>
                {op.name}
                <button style={{...styles.buttonMarginLeft}} disabled className="link" >
                    <Icon name="trash"/>
                </button>
            </p>
        )
        });
    };

    render( ) {
        const { river, mapStyles, area, editBoundaryOnMap } = this.props;
        const { nameInputId, typeInputId, layerInputId } = this.state;

        return (
            <div style={ styles.wrapper }>
                <div style={ styles.columns }>
                    <div style={{ ...styles.columnFlex1, ...styles.columnNotLast }}>

                        <h3 style={ styles.heading }>Properties</h3>

                        <div style={ styles.inputBlock }>
                            <label style={ styles.label } htmlFor={ nameInputId }>River Name</label>
                            <Input style={ styles.input } id={ nameInputId } value={ river.name } type="text" placeholder="name"/>
                        </div>

                        <div style={ styles.rightAlign }>
                            <button style={styles.buttonMarginRight} onClick={editBoundaryOnMap} className="link">
                                <Icon name="marker"/>Edit on Map
                            </button>
                            <button style={styles.buttonMarginRight} disabled className="link">
                                <Icon name="trash"/>Delete
                            </button>
                        </div>
                        <ModelEditorBoundaryMap area={area} boundary={river} styles={mapStyles}/>

                        <div style={ styles.inputBlock }>
                            <p style={{ ...styles.label, ...styles.rightAlign }} >Observation Stations
                                <button style={{ ...styles.buttonMarginLeft}} disabled className="link">
                                    <Icon name="add"/>
                                </button>
                            </p>
                            {this.renderObservationPoints(river)}
                        </div>

                    </div>

                    <div style={{ ...styles.columnFlex2 }}>
                        <h3 style={ styles.heading }>Data</h3>
                    </div>
                </div>
            </div>
        );
    }
}
