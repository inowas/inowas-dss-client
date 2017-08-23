import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/primitive/Button';
import ConfiguredRadium from 'ConfiguredRadium';
import styleGlobals from 'styleGlobals';
import { uniqueId } from 'lodash';
import { StressPeriods } from '../../t03/selectors';
import { StressPeriodDataTable, DataTableAction } from '../../t03/components';
import { Helper, Formatter, WebData } from '../../core';
import Input from '../../components/primitive/Input';

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
class StressPeriodProperties extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            stressPeriods: StressPeriods.getInitialState(),
            initialized: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState( (prevState) => {
            return {
                stressPeriods: nextProps.stressPeriods ? nextProps.stressPeriods : prevState.stressPeriods,
                initialized: true
            };
        } );
    }

    handleInputChange = (value, name) => {
        // TODO check for date values or use new Input fields with filter
        this.setState(function (prevState, props) {
            return {
                ...prevState,
                stressPeriods: {
                    ...prevState.stressPeriods,
                    [name]: Formatter.dateToAtomFormat(value),
                    stress_periods: this.dataTable.getRows()
                }
            };
        });
    };

    save = () => {
        this.props.onSave(
            {
                ...this.state.stressPeriods,
                stress_periods: this.dataTable.getRows()
            }
        );
    };

    render() {
        const { stressPeriods, initialized } = this.state;
        const { updateStressPeriodsStatus } = this.props;

        if (!initialized || !stressPeriods) {
            return <p>Loading ...</p>;
        }

        const processingData = {
            status: WebData.Selector.getType( updateStressPeriodsStatus ),
            errorMessage: WebData.Selector.getErrorMessage( updateStressPeriodsStatus )
        };
        const processing = WebData.Component.Processing(
            <Button onClick={this.save}>Save</Button>
        );

        const data = Helper.addIdFromIndex(stressPeriods.stress_periods || []).map(v => {
            return {...v, totim_start: Formatter.dateToYmd(Helper.addDays(v.totim_start)(stressPeriods.start_date_time))}
        });

        return (
            <div style={[ styles.wrapper ]}>
                <div style={[ styles.columns ]}>
                    <div style={[ styles.columnFlex1, styles.columnNotLast ]}>
                        <h3 style={[ styles.heading ]}>Properties</h3>
                        <div style={[ styles.inputBlock ]}>
                            <label style={[ styles.label ]}>Time Unit</label>
                            <select disabled={true}
                                    className="select"
                                    name="time_unit"
                                    value={stressPeriods.time_unit}
                                    data-filter="filterInt">
                                <option value="1">Second</option>
                                <option value="2">Minute</option>
                                <option value="3">Hour</option>
                                <option value="4">Day</option>
                                <option value="5">Year</option>
                            </select>
                        </div>
                        <div style={[ styles.inputBlock ]}>
                            <label style={[ styles.label ]}>Start Date</label>
                            <Input style={[ styles.input ]} name="start_date_time"
                                   onChange={(value, name) => this.handleInputChange( value, name )}
                                   value={Formatter.dateToYmd( stressPeriods.start_date_time )} type="date"
                                   placeholder="Start date"/>
                        </div>
                        <div style={[ styles.inputBlock ]}>
                            <label style={[ styles.label ]}>End Date</label>
                            <Input style={[ styles.input ]} name="end_date_time"
                                   onChange={(value, name) => this.handleInputChange( value, name )}
                                   value={Formatter.dateToYmd( stressPeriods.end_date_time )} type="date"
                                   placeholder="End date"/>
                        </div>
                    </div>

                    <div style={[ styles.columnFlex2 ]}>
                        <h3 style={[ styles.heading ]}>Time Discretization</h3>
                        <DataTableAction component={this.dataTable}/>
                        <StressPeriodDataTable ref={dataTable => this.dataTable = dataTable} rows={data}
                                               start={stressPeriods.start_date_time} end={stressPeriods.end_date_time}/>
                    </div>
                </div>
                <div style={[ styles.saveButtonWrapper ]}>
                    {processing(processingData)}
                </div>
            </div>

        );
    }
}


StressPeriodProperties.propTypes = {
    onSave: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
    stressPeriods: PropTypes.object,
    updateStressPeriodsStatus: PropTypes.object,
};

export default StressPeriodProperties;
