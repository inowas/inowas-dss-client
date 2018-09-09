import {DataTableActions, StressPeriodDataTable} from '../index';
import {Formatter, Helper, LayoutComponents, WebData} from '../../../core/index';

import Button from '../../../components/primitive/Button';
import ConfiguredRadium from 'ConfiguredRadium';
import Input from '../../../components/primitive/Input';
import PropTypes from 'prop-types';
import React from 'react';
import * as Selectors from '../../selectors/index';
import styleGlobals from 'styleGlobals';
import {orderBy} from 'lodash';

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

const stressPeriodsToFloPy = (rows, start, end) => {
    let sp = orderBy(rows, ['totim_start'], ['asc']).map(data => {
        return {
            totim_start: Helper.diffInDays(start, data.totim_start),
            nstp: parseInt(data.nstp, 10),
            tsmult: parseFloat(data.tsmult),
            steady: data.steady
        };
    });

    if (sp.length === 0) {
        return [];
    }

    let perlen = 0;

    sp = orderBy(sp, ['totim_start'], ['desc']).map(
        data => {
            const obj = {
                ...data,
                perlen: perlen - data.totim_start
            };

            perlen = data.totim_start;
            return obj;
        });

    sp[0].perlen = Helper.diffInDays(start, end) - sp[0].totim_start;

    return orderBy(sp, ['totim_start'], ['asc']);
};

class StressPeriodProperties extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stressPeriods: Selectors.stressPeriods.getInitialState(),
            saveable: true,
            initialized: false
        };
    }

    componentWillMount() {
        this.forceUpdate();
    }

    componentWillReceiveProps(nextProps) {
        this.setState(prevState => {
            return {
                ...prevState,
                stressPeriods: nextProps.stressPeriods
                    ? {
                        ...nextProps.stressPeriods,
                        stress_periods: orderBy(
                            nextProps.stressPeriods.stress_periods,
                            ['totim_start'],
                            ['asc']
                        ).map(data => {
                            return {
                                ...data,
                                totim_start: Formatter.dateToYmd(
                                    Helper.addDays(
                                        data.totim_start /* + 1 */
                                    )(nextProps.stressPeriods.start_date_time)
                                )
                            };
                        })
                    }
                    : prevState.stressPeriods,
                initialized: true
            };
        });
    }

    handleInputChange = name => {
        return value => {
            // TODO check for date values or use new Input fields with filter
            this.setState(function(prevState) {
                return {
                    ...prevState,
                    saveable: this.dataTable.checkDateRange(
                        name === 'start_date_time'
                            ? value
                            : Formatter.dateToYmd(
                            prevState.stressPeriods.start_date_time
                            ),
                        name === 'end_date_time'
                            ? value
                            : Formatter.dateToYmd(
                            prevState.stressPeriods.end_date_time
                            )
                    ) && this.dataTable.getRows().length > 0,
                    stressPeriods: {
                        ...prevState.stressPeriods,
                        [name]: Formatter.dateToAtomFormat(value),
                        stress_periods: this.dataTable.getRows()
                    }
                };
            });
        };
    };

    save = () => {
        if (
            this.dataTable.checkDateRange(
                Formatter.dateToYmd(this.state.stressPeriods.start_date_time),
                Formatter.dateToYmd(this.state.stressPeriods.end_date_time)
            ) === false
        ) {
            this.dataTable.forceUpdate();
            this.setState(prevState => {
                return {
                    ...prevState,
                    saveable: false,
                    stressPeriods: {
                        ...prevState.stressPeriods,
                        stress_periods: this.dataTable.getRows()
                    }
                };
            });
            return;
        }
        this.props.onSave({
            ...this.state.stressPeriods,
            stress_periods: stressPeriodsToFloPy(
                this.dataTable.getRows(),
                this.state.stressPeriods.start_date_time,
                this.state.stressPeriods.end_date_time
            )
        });
    };

    calculate = () => {
        this.props.onCalculate(
            this.state.stressPeriods.start_date_time,
            this.state.stressPeriods.end_date_time,
            4
        );
    };

    onRowChange = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                saveable: this.dataTable.checkDateRange(
                    Formatter.dateToYmd(
                        prevState.stressPeriods.start_date_time
                    ),
                    Formatter.dateToYmd(prevState.stressPeriods.end_date_time)
                ) && this.dataTable.getRows().length > 0,
                stressPeriods: {
                    ...prevState.stressPeriods,
                    stress_periods: this.dataTable.getRows()
                }
            };
        });
    };

    render() {
        const {stressPeriods, initialized, saveable} = this.state;
        const {updateStressPeriodsStatus, readOnly, calculateStressPeriodsStatus} = this.props;

        if (!initialized || !stressPeriods) {
            return <p>Loading ...</p>;
        }

        const data = Helper.addIdFromIndex(stressPeriods.stress_periods || []);

        return (
            <div>
                <div style={[styles.columns]}>
                    <LayoutComponents.Column
                        heading="Properties"
                        style={[styles.columnNotLast]}
                    >
                        <LayoutComponents.InputGroup label="Start Date">
                            <Input
                                readOnly={readOnly}
                                name="start_date_time"
                                onChange={this.handleInputChange(
                                    'start_date_time'
                                )}
                                value={Formatter.dateToYmd(
                                    stressPeriods.start_date_time
                                )}
                                type="date"
                                placeholder="Start date"
                            />
                        </LayoutComponents.InputGroup>

                        <LayoutComponents.InputGroup label="End Date">
                            <Input
                                readOnly={readOnly}
                                name="end_date_time"
                                onChange={this.handleInputChange(
                                    'end_date_time'
                                )}
                                value={Formatter.dateToYmd(
                                    stressPeriods.end_date_time
                                )}
                                type="date"
                                placeholder="End date"
                            />
                        </LayoutComponents.InputGroup>

                        {!readOnly &&
                        <WebData.Component.Loading status={calculateStressPeriodsStatus}>
                            <Button onClick={this.calculate} readOnly={readOnly}>
                                Calculate
                            </Button>
                        </WebData.Component.Loading>}
                    </LayoutComponents.Column>

                    <LayoutComponents.Column
                        heading="Time Discretization"
                        style={[styles.columnFlex2]}
                    >
                        {!readOnly && <DataTableActions component={this.dataTable}/>}
                        <StressPeriodDataTable
                            startDate={stressPeriods.start_date_time}
                            readOnly={readOnly}
                            ref={dataTable => (this.dataTable = dataTable)}
                            rows={data}
                            onRowChange={this.onRowChange}
                        />
                    </LayoutComponents.Column>
                </div>
                {!readOnly &&
                <div style={[styles.saveButtonWrapper]}>
                    <WebData.Component.Loading
                        status={updateStressPeriodsStatus}
                    >
                        <Button onClick={this.save} disabled={!saveable}>
                            Save
                        </Button>
                    </WebData.Component.Loading>
                </div>}
            </div>
        );
    }
}

StressPeriodProperties.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCalculate: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
    stressPeriods: PropTypes.object,
    updateStressPeriodsStatus: PropTypes.object,
    calculateStressPeriodsStatus: PropTypes.object,
};

export default ConfiguredRadium(StressPeriodProperties);
