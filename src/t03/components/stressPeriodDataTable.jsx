import React from 'react';
import PropTypes from 'prop-types';
import * as edit from 'react-edit';
import {DataTable, Formatter, Helper} from '../../core';
import Icon from '../../components/primitive/Icon';

import { cloneDeep, sortBy, last, orderBy } from 'lodash';
import uuid from 'uuid';

class StressPeriodDataTable extends DataTable.Component.DataTable {
    constructor ( props ) {
        super( props );

        this.state = {
            searchColumn: 'all',
            query: {}, // Search query
            page: 1,
            perPage: this.props.perPage || 20,
            selectedRows: [],
            // Sort the first column in a descending way by default.
            // "asc" would work too and you can set multiple if you want.
            sortingColumns: {
                'totim_start': {
                    direction: 'asc',
                    position: 0
                },
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
                            ( value, { rowData } ) => (
                                <Icon name={'unchecked'} onClick={DataTable.Action.Callback.onSelectAll( this )}/>
                            )
                        ],
                    },
                    cell: {
                        formatters: [
                            ( value, { rowData } ) => (
                                <Icon name={rowData.selected ? 'checked' : 'unchecked'}/>
                            )
                        ]
                    }
                },
                {
                    property: 'totim_start',
                    header: {
                        label: 'Start Time',
                        transforms: [ DataTable.Helper.resetable(this) ],
                        formatters: [
                            DataTable.Helper.header(this)
                        ],
                    },
                    cell: {
                        transforms: [
                            DataTable.Helper.editableDate(this)(edit.input({ props: { type: 'date' }}))
                        ],
                        formatters: [
                            ( value, { rowData } ) => (
                                <span>{Formatter.toDate(value)}</span>
                            )
                        ]
                    }
                },
                {
                    property: 'nstp',
                    header: {
                        label: 'number of timesteps',
                    },
                    cell: {
                        transforms: [DataTable.Helper.editable(this)(edit.input({ props: { type: 'number', step: 1 } }))],
                    },
                },
                {
                    property: 'tsmult',
                    header: {
                        label: 'timestep multiplier',
                    },
                    cell: {
                        transforms: [DataTable.Helper.editable(this)(edit.input({ props: { type: 'number' } }))],
                        formatters: [
                            ( value, { rowData } ) => (
                                <span>{Formatter.toNumber(value)}</span>
                            )
                        ]
                    },
                },
                {
                    property: 'steady',
                    header: {
                        label: 'steady state',
                    },
                    cell: {
                        transforms: [DataTable.Helper.editable(this)(edit.boolean())],
                        formatters: [
                            ( value, { rowData } ) => (
                                <span>{Formatter.toNumber(value)}</span>
                            )
                        ]
                    },
                },
            ],
            rows: this.props.rows || []
        };
    }

    getRows = () => {
        const {start, end} = this.props;

        let stressPeriods = orderBy(this.state.rows, ['totim_start'], ['asc']).map((data) => {
            return {
                totim_start: Helper.diffInDays(start, data.totim_start),
                nstp: parseInt(data.nstp),
                tsmult: parseFloat(data.tsmult),
                steady: data.steady ? true : false
            }
        });
        let perlen = 0;

        stressPeriods = orderBy(stressPeriods, [ 'totim_start' ], [ 'desc' ] ).map( (data) => {
            const obj = {
                ...data,
                perlen: perlen - data.totim_start
            };
            perlen = data.totim_start;
            return obj;
        } );
        stressPeriods[0].perlen = Helper.diffInDays(start, end) - stressPeriods[0].totim_start;

        return orderBy(stressPeriods, [ 'totim_start' ], [ 'asc' ] );
    };

    onAdd = (e, increment) => {
        e.preventDefault();

        const rows = sortBy(cloneDeep(this.state.rows), 'totim_start');

        const lastRow = last(rows);
        const totim_start = lastRow && lastRow.totim_start ? Helper.addDays(lastRow.perlen)(lastRow.totim_start) : new Date();
        const nstp = lastRow && lastRow.nstp ? lastRow.nstp : 1;
        const tsmult = lastRow && lastRow.tsmult ? lastRow.tsmult : 1;
        const steady = lastRow && lastRow.steady ? lastRow.steady : false;
        const perlen = lastRow && lastRow.perlen ? lastRow.perlen : 0;

        rows.push({
            id: uuid.v4(),
            totim_start: Formatter.dateToYmd(increment(totim_start)),
            nstp,
            tsmult,
            steady,
            perlen
        });

        this.setState((prevState, props) => {return { ...prevState, rows };});
    };
}

StressPeriodDataTable.propTypes = {
    perPage: PropTypes.number,
    start: PropTypes.string,
    end: PropTypes.string,
};

export default StressPeriodDataTable;
