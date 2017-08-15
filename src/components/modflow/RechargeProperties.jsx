import React, { Component, PropTypes } from 'react';
import styleGlobals from 'styleGlobals';
import Input from "../primitive/Input";
import Icon from '../primitive/Icon';
import { uniqueId } from 'lodash';
import ModelEditorBoundaryMap from "./ModelEditorBoundaryMap";
import Button from "../primitive/Button";

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

export default class RechargeProperties extends Component {

    static propTypes = {
        area: PropTypes.object.isRequired,
        boundary: PropTypes.object.isRequired,
        editBoundaryOnMap: PropTypes.func.isRequired,
        mapStyles: PropTypes.object.isRequired,
        readOnly: PropTypes.bool
    };

    constructor( props ) {
        super( props );

        this.state = {
            nameInputId: uniqueId( 'nameInput-' ),
            boundary: {}
        };
    }

    render( ) {
        const { boundary, mapStyles, area, editBoundaryOnMap } = this.props;
        const { nameInputId } = this.state;

        return (
            <div style={ styles.wrapper }>
                <div style={ styles.columns }>
                    <div style={{ ...styles.columnFlex1, ...styles.columnNotLast }}>

                        <h3 style={ styles.heading }>Properties</h3>
                        <div style={ styles.inputBlock }>
                            <label style={ styles.label } htmlFor={ nameInputId }>Recharge Name</label>
                            <Input style={ styles.input } id={ nameInputId } value={ boundary.name } type="text" placeholder="name"/>
                        </div>

                        <div style={ styles.rightAlign }>
                            <button style={styles.buttonMarginRight} onClick={editBoundaryOnMap} className="link">
                                <Icon name="marker"/>Edit on Map
                            </button>
                            <button style={styles.buttonMarginRight} disabled className="link">
                                <Icon name="trash"/>Delete
                            </button>
                        </div>
                        <ModelEditorBoundaryMap area={area} boundary={boundary} styles={mapStyles}/>
                    </div>

                    <div style={{ ...styles.columnFlex2 }}>
                        <h3 style={ styles.heading }>Data</h3>
                    </div>
                </div>
                <div style={[ styles.saveButtonWrapper ]}>
                    <Button onClick={this.saveBoundary}>Save</Button>
                </div>
            </div>
        );
    }
}
