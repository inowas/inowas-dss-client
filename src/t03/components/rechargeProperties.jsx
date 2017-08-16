import React, { Component, PropTypes } from 'react';
import styleGlobals from 'styleGlobals';
import Input from '../../components/primitive/Input';
import Icon from '../../components/primitive/Icon';
import { uniqueId } from 'lodash';
import BoundaryMap from './boundaryMap';
import Button from '../../components/primitive/Button';
import { RechargeRate, DataTableAction } from '../../t03/components';
import { Helper } from '../../core';
import ConfiguredRadium from 'ConfiguredRadium';

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
export default class RechargeProperties extends Component {

    static propTypes = {
        area: PropTypes.object.isRequired,
        boundary: PropTypes.object.isRequired,
        editBoundaryOnMap: PropTypes.func.isRequired,
        mapStyles: PropTypes.object.isRequired,
        readOnly: PropTypes.bool
    };

    constructor(props) {
        super(props);

        this.state = {
            nameInputId: uniqueId('nameInput-'),
            boundary: this.props.boundary || {}
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            boundary: nextProps.boundary,
        });
    }

    handleInputChange = (value, name, key) => {
        this.setState(function (prevState, props) {
            if (key) {
                return {
                    ...prevState,
                    boundary: {
                        ...prevState.boundary,
                        [key]: {
                            ...prevState.boundary[ key ],
                            [name]: value
                        },
                        date_time_values: this.rechargeRate.getRows()
                    }
                };
            }

            return {
                ...prevState,
                boundary: {
                    ...prevState.boundary,
                    [name]: value,
                    date_time_values: this.rechargeRate.getRows()
                }
            };
        });
    };

    save = () => {
        this.props.onSave(
            {
                ...this.state.boundary,
                date_time_values: this.rechargeRate.getRows()
            }
        );
    };

    render() {
        const { mapStyles, area, editBoundaryOnMap } = this.props;
        const { nameInputId, boundary } = this.state;
        const rechargeRates = Helper.addIdFromIndex(boundary.date_time_values || []);

        return (
            <div style={styles.wrapper}>
                <div style={styles.columns}>
                    <div style={{ ...styles.columnFlex1, ...styles.columnNotLast }}>

                        <h3 style={styles.heading}>Properties</h3>
                        <div style={styles.inputBlock}>
                            <label style={styles.label} htmlFor={nameInputId}>Recharge Name</label>
                            <Input style={styles.input} name="name" id={nameInputId} value={boundary.name}
                                   onChange={(value, name) => this.handleInputChange(value, name)} type="text"
                                   placeholder="name"/>
                        </div>

                        <div style={styles.rightAlign}>
                            <button style={styles.buttonMarginRight} onClick={editBoundaryOnMap} className="link">
                                <Icon name="marker"/>Edit on Map
                            </button>
                            <button style={styles.buttonMarginRight} disabled className="link">
                                <Icon name="trash"/>Delete
                            </button>
                        </div>
                        <BoundaryMap area={area} boundary={boundary} styles={mapStyles}/>
                    </div>

                    <div style={[ styles.columnFlex2 ]}>
                        <h3 style={[ styles.heading ]}>Recharge Rates m/d</h3>
                        <DataTableAction component={this.rechargeRate}/>
                        <RechargeRate ref={rechargeRate => this.rechargeRate = rechargeRate} rows={rechargeRates}/>
                    </div>
                </div>
                <div style={[ styles.saveButtonWrapper ]}>
                    <Button onClick={this.save}>Save</Button>
                </div>
            </div>
        );
    }
}
