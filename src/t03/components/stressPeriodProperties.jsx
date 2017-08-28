import { DataTableAction, StressPeriodDataTable } from '../../t03/components';
import { Formatter, Helper, LayoutComponents, WebData } from '../../core';

import Button from '../../components/primitive/Button';
import ConfiguredRadium from 'ConfiguredRadium';
import Input from '../../components/primitive/Input';
import PropTypes from 'prop-types';
import React from 'react';
import { StressPeriods } from '../../t03/selectors';
import styleGlobals from 'styleGlobals';
import { orderBy } from 'lodash';

const styles = {
    columns: {
        display: 'flex'
    },

    columnFlex2: {
        flex: 2
    },

    columnNotLast: {
        marginRight: styleGlobals.dimensions.gridGutter
    },

    saveButtonWrapper: {
        textAlign: 'right',
        marginTop: styleGlobals.dimensions.spacing.medium
    }
};

const stressPeriodsToFlowPy = (rows, start, end) => {

    let stressPeriods = orderBy( rows, [ 'totim_start' ], [ 'asc' ] ).map( (data) => {
        return {
            totim_start: Helper.diffInDays( start, data.totim_start ),
            nstp: parseInt( data.nstp ),
            tsmult: parseFloat( data.tsmult ),
            steady: data.steady ? true : false
        };
    } );

    let perlen = 0;

    stressPeriods = orderBy( stressPeriods, [ 'totim_start' ], [ 'desc' ] ).map( (data) => {
        const obj = {
            ...data,
            perlen: perlen - data.totim_start
        };
        perlen = data.totim_start;
        return obj;
    } );
    stressPeriods[ 0 ].perlen = Helper.diffInDays( start, end ) - stressPeriods[ 0 ].totim_start;

    return orderBy( stressPeriods, [ 'totim_start' ], [ 'asc' ] );
};

@ConfiguredRadium
class StressPeriodProperties extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stressPeriods: StressPeriods.getInitialState(),
            startDate: null,
            endDate: null,
            initialized: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState( prevState => {
            return {
                stressPeriods: nextProps.stressPeriods ? {
                        ...nextProps.stressPeriods,
                        stress_periods: orderBy( nextProps.stressPeriods.stress_periods, [ 'totim_start' ], [ 'asc' ] ).map( (data) => {
                            return {
                                ...data,
                                totim_start: Formatter.dateToYmd(
                                    Helper.addDays( data.totim_start )( nextProps.stressPeriods.start_date_time )
                                )
                            };
                        } )
                    }
                    : prevState.stressPeriods,
                initialized: true,
                startDate: nextProps.stressPeriods && !prevState.startDate ? nextProps.stressPeriods.start_date_time : prevState.stressPeriods.startDate,
                endDate: nextProps.stressPeriods && !prevState.endDate ? nextProps.stressPeriods.end_date_time : prevState.stressPeriods.endDate,
            };
        });
    }

    handleInputChange = (name) => {
        return value => {
            // TODO check for date values or use new Input fields with filter
            this.setState( function (prevState, props) {
                return {
                    ...prevState,
                    stressPeriods: {
                        ...prevState.stressPeriods,
                        [name]: Formatter.dateToAtomFormat( value ),
                        stress_periods: this.dataTable.getRows(),
                    }
                };
            } );
        };
    };

    save = () => {
        this.props.onSave({
            ...this.state.stressPeriods,
            stress_periods: stressPeriodsToFlowPy(
                this.dataTable.getRows(),
                this.state.stressPeriods.start_date_time,
                this.state.stressPeriods.end_date_time,
            )
        });
    };

    render() {
        const { stressPeriods, initialized} = this.state;
        const { updateStressPeriodsStatus } = this.props;

        if (!initialized || !stressPeriods) {
            return <p>Loading ...</p>;
        }

        const processingData = {
            status: WebData.Selector.getType(updateStressPeriodsStatus),
            errorMessage: WebData.Selector.getErrorMessage(
                updateStressPeriodsStatus
            )
        };
        const processing = WebData.Component.Processing(
            <Button onClick={this.save}>Save</Button>
        );

        const data = Helper.addIdFromIndex(
            stressPeriods.stress_periods || []
        );

        return (
            <div>
                <div style={[styles.columns]}>
                    <LayoutComponents.Column
                        heading="Properties"
                        style={[styles.columnNotLast]}
                    >
                        <LayoutComponents.InputGroup label="Time Unit">
                            {/* REVIEW use Select component and model/TimeUnit */}
                            <select
                                disabled
                                className="select"
                                name="time_unit"
                                value={stressPeriods.time_unit}
                                data-filter="filterInt"
                            >
                                <option value="1">Second</option>
                                <option value="2">Minute</option>
                                <option value="3">Hour</option>
                                <option value="4">Day</option>
                                <option value="5">Year</option>
                            </select>
                        </LayoutComponents.InputGroup>

                        <LayoutComponents.InputGroup label="Start Date">
                            <Input
                                name="start_date_time"
                                onChange={this.handleInputChange('start_date_time')}
                                value={Formatter.dateToYmd(
                                    stressPeriods.start_date_time
                                )}
                                type="date"
                                placeholder="Start date"
                            />
                        </LayoutComponents.InputGroup>

                        <LayoutComponents.InputGroup label="End Date">
                            <Input
                                name="end_date_time"
                                onChange={this.handleInputChange('end_date_time')}
                                value={Formatter.dateToYmd(
                                    stressPeriods.end_date_time
                                )}
                                type="date"
                                placeholder="End date"
                            />
                        </LayoutComponents.InputGroup>
                    </LayoutComponents.Column>

                    <LayoutComponents.Column
                        heading="Time Discretization"
                        style={[styles.columnFlex2]}
                    >
                        <DataTableAction component={this.dataTable} />
                        <StressPeriodDataTable
                            ref={dataTable => (this.dataTable = dataTable)}
                            rows={data}
                        />
                    </LayoutComponents.Column>
                </div>
                <div style={[styles.saveButtonWrapper]}>
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
    updateStressPeriodsStatus: PropTypes.object
};

export default StressPeriodProperties;
