import React from 'react';
import PropTypes from 'prop-types';
import * as edit from 'react-edit';
import { DataTable, Formatter, Helper } from '../../core';
import Icon from '../../components/primitive/Icon';

import { cloneDeep, sortBy, last } from 'lodash';
import uuid from 'uuid';

class StressPeriodDataTable extends DataTable.Component.DataTable {
    constructor(props) {
        super(props);

        this.state = {
            searchColumn: 'all',
            query: {}, // Search query
            page: 1,
            perPage: this.props.perPage || 20,
            selectedRows: [],
            // Sort the first column in a descending way by default.
            // "asc" would work too and you can set multiple if you want.
            sortingColumns: {
                totim_start: {
                    direction: 'asc',
                    position: 0
                }
            },
            columns: [
                {
                    props: {
                        style: {
                            width: 30
                        }
                    },
                    header: {
                        label: '',
                        formatters: [
                            (value, { rowData }) =>
                                !this.props.readOnly && <Icon
                                    name={'unchecked'}
                                    onClick={DataTable.Action.Callback.onSelectAll(
                                        this
                                    )}
                                />
                        ]
                    },
                    cell: {
                        formatters: [
                            (value, { rowData }) =>
                                !this.props.readOnly && <Icon
                                    name={
                                        rowData.selected
                                            ? 'checked'
                                            : 'unchecked'
                                    }
                                    onClick={() =>
                                        DataTable.Action.Callback.onSelect(
                                            this
                                        )(rowData)}
                                />
                        ]
                    }
                },
                {
                    property: 'totim_start',
                    header: {
                        label: 'Start Time',
                        transforms: [DataTable.Helper.resetable(this)],
                        formatters: [DataTable.Helper.header(this)]
                    },
                    cell: {
                        transforms: !this.props.readOnly ? [
                            DataTable.Helper.editableDate(this)(
                                edit.input({ props: { type: 'date' } })
                            )
                        ] : [],
                        formatters: [
                            (value, { rowData }) =>
                                <span>
                                    {Formatter.toDate(value)}
                                </span>
                        ]
                    }
                },
                {
                    property: 'nstp',
                    header: {
                        label: 'number of timesteps'
                    },
                    cell: {
                        transforms: !this.props.readOnly ? [
                            DataTable.Helper.editable(this)(
                                edit.input({
                                    props: { type: 'number', step: 1 }
                                })
                            )
                        ] : []
                    }
                },
                {
                    property: 'tsmult',
                    header: {
                        label: 'timestep multiplier'
                    },
                    cell: {
                        transforms: !this.props.readOnly ? [
                            DataTable.Helper.editable(this)(
                                edit.input({ props: { type: 'number' } })
                            )
                        ] : [],
                        formatters: [
                            (value, { rowData }) =>
                                <span>
                                    {Formatter.toNumber(value)}
                                </span>
                        ]
                    }
                },
                {
                    property: 'steady',
                    header: {
                        label: 'steady state'
                    },
                    cell: {
                        transforms: !this.props.readOnly ? [
                            DataTable.Helper.editableCheckbox(this)(
                                DataTable.Component.Checkbox()
                            )
                        ] : [],
                        formatters: [
                            (value, { rowData }) =>
                                <Icon name={value ? 'checked' : 'unchecked'} />
                        ]
                    }
                }
            ],
            rows: this.props.rows || []
        };
    }

    getRows = () => cloneDeep(this.state.rows);

    onRowChange = () => {
        this.props.onRowChange();
    };

    checkDateRange = (start, end) => {
        let success = true;

        this.state.rows.map(data => {
            data.error = !Helper.isBetweenDate(data.totim_start, start, end);
            success &= !data.error;

            return data;
        });
        // ensure boolean
        return !!success;
    };

    onAdd = (e, increment) => {
        e.preventDefault();

        const rows = sortBy(cloneDeep(this.state.rows), 'totim_start');

        const lastRow = last(rows);
        const totim_start =
            lastRow && lastRow.totim_start
                ? new Date(lastRow.totim_start)
                : this.props.startDate;
        const nstp = lastRow && lastRow.nstp ? lastRow.nstp : 1;
        const tsmult = lastRow && lastRow.tsmult ? lastRow.tsmult : 1;
        const steady = lastRow && lastRow.steady ? lastRow.steady : false;

        const row = {
            id: uuid.v4(),
            totim_start: Formatter.dateToYmd(increment(totim_start)),
            nstp,
            tsmult,
            steady
        };

        rows.push(row);

        this.setState((prevState, props) => {
            this.props.onRowChange();

            return { ...prevState, rows };
        });
    };
}

StressPeriodDataTable.propTypes = {
    perPage: PropTypes.number,
    onRowChange: PropTypes.func.isRequired,
    startDate: PropTypes.string,
};

export default StressPeriodDataTable;
