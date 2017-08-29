import { DataTableAction, StressPeriodDataTable } from '../../t03/components';
import { Formatter, Helper, LayoutComponents, WebData } from '../../core';

import Button from '../../components/primitive/Button';
import ConfiguredRadium from 'ConfiguredRadium';
import Input from '../../components/primitive/Input';
import PropTypes from 'prop-types';
import React from 'react';
import { StressPeriods } from '../../t03/selectors';
import styleGlobals from 'styleGlobals';
import { uniqueId } from 'lodash';

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

@ConfiguredRadium
class StressPeriodProperties extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stressPeriods: StressPeriods.getInitialState(),
            initialized: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState(prevState => {
            return {
                stressPeriods: nextProps.stressPeriods
                    ? nextProps.stressPeriods
                    : prevState.stressPeriods,
                initialized: true
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
                    stressPeriods: {
                        ...prevState.stressPeriods,
                        [name]: Formatter.dateToAtomFormat( value ),
                        stress_periods: this.dataTable.getRows()
                    }
                };
            } );
        };
    };

    save = () => {
        this.props.onSave({
            ...this.state.stressPeriods,
            stress_periods: this.dataTable.getRows()
        });
    };

    render() {
        const { stressPeriods, initialized } = this.state;
        const { updateStressPeriodsStatus } = this.props;

        if (!initialized || !stressPeriods) {
            return <p>Loading ...</p>;
        }

        const processing = WebData.Component.Processing(
            <Button onClick={this.save}>Save</Button>
        );

        const data = Helper.addIdFromIndex(
            stressPeriods.stress_periods || []
        ).map(v => {
            return {
                ...v,
                totim_start: Formatter.dateToYmd(
                    Helper.addDays(v.totim_start)(stressPeriods.start_date_time)
                )
            };
        });

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
                            start={stressPeriods.start_date_time}
                            end={stressPeriods.end_date_time}
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
