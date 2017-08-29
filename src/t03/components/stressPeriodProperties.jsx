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
            saveable: true,
            initialized: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState( prevState => {
            return {
                ...prevState,
                stressPeriods: nextProps.stressPeriods ? {
                        ...nextProps.stressPeriods,
                        stress_periods: orderBy( nextProps.stressPeriods.stress_periods, [ 'totim_start' ], [ 'asc' ] ).map( (data) => {
                            return {
                                ...data,
                                totim_start: Formatter.dateToYmd(
                                    Helper.addDays( data.totim_start + 1 )( nextProps.stressPeriods.start_date_time )
                                )
                            };
                        } )
                    }
                    : prevState.stressPeriods,
                initialized: true,
            };
        });
    }

    componentWillMount() {
        this.forceUpdate();
    }

    handleInputChange = (name) => {
        return value => {
            // TODO check for date values or use new Input fields with filter
            this.setState( function (prevState, props) {
                return {
                    ...prevState,
                    saveable: this.dataTable.checkDateRange(
                        name === 'start_date_time' ? value : Formatter.dateToYmd(prevState.stressPeriods.start_date_time),
                        name === 'end_date_time' ? value : Formatter.dateToYmd(prevState.stressPeriods.end_date_time)
                    ),
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
        if (false === this.dataTable.checkDateRange(
                Formatter.dateToYmd(this.state.stressPeriods.start_date_time),
                Formatter.dateToYmd(this.state.stressPeriods.end_date_time)
            )
        ) {
            this.dataTable.forceUpdate();
            this.setState( prevState => {
                return {
                    ...prevState,
                    saveable: false,
                    stressPeriods: {
                        ...prevState.stressPeriods,
                        stress_periods: this.dataTable.getRows(),
                    }
                };
            } );
            return;
        }
        this.props.onSave({
            ...this.state.stressPeriods,
            stress_periods: stressPeriodsToFlowPy(
                this.dataTable.getRows(),
                this.state.stressPeriods.start_date_time,
                this.state.stressPeriods.end_date_time,
            )
        });
    };

    onRowChange = ( ) => {
        this.setState( prevState => {
            return {
                ...prevState,
                saveable: this.dataTable.checkDateRange(
                    Formatter.dateToYmd(prevState.stressPeriods.start_date_time),
                    Formatter.dateToYmd(prevState.stressPeriods.end_date_time)
                ),
                stressPeriods: {
                    ...prevState.stressPeriods,
                    stress_periods: this.dataTable.getRows(),
                }
            };
        } );
    };

    render() {
        const { stressPeriods, initialized, saveable} = this.state;
        const { updateStressPeriodsStatus } = this.props;

        if (!initialized || !stressPeriods) {
            return <p>Loading ...</p>;
        }

        const processing = WebData.Component.Processing(
            saveable ? <Button onClick={this.save}>Save</Button> : <Button disabled>Save</Button>
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
                            onRowChange={this.onRowChange}
                        />
                    </LayoutComponents.Column>
                </div>
                <div style={[styles.saveButtonWrapper]}>
                    {processing(updateStressPeriodsStatus)}
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
