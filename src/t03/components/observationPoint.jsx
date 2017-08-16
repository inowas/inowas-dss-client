import React from 'react';
import PropTypes from 'prop-types';
import * as edit from 'react-edit';
import {DataTable, Formatter} from '../../core';
import Icon from '../../components/primitive/Icon';

import { cloneDeep, sortBy, last } from 'lodash';
import * as sort from 'sortabular';
import uuid from 'uuid';

class ObservationPoint extends DataTable.Component.DataTable {
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
                'date_time': {
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
                    property: 'date_time',
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
                    property: 'values.0',
                    header: {
                        label: 'River Stage (m)',
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
                    property: 'values.1',
                    header: {
                        label: 'River Bottom (m)',
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
                    property: 'values.2',
                    header: {
                        label: 'Hydraulic Conductance (m2/d)',
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
            ],
            rows: this.props.rows || []
        };
    }

    getRows = () => {
        return this.state.rows.map((data) => {
            return {date_time: Formatter.dateToAtomFormat(data.date_time), values: data.values.map(v => parseFloat(v))}
        });
    };

    onAdd = (e, increment) => {
        e.preventDefault();

        const rows = sortBy(cloneDeep(this.state.rows), 'date_time');

        const lastRow = last(rows);

        let date = lastRow && lastRow.date_time ? new Date(lastRow.date_time) : new Date();
        const values = lastRow && lastRow.values ? lastRow.values : [0, 0, 0];

        rows.push({
            id: uuid.v4(),
            date_time: Formatter.dateToAtomFormat(increment(date)),
            values
        });

        this.setState((prevState, props) => {return { ...prevState, rows };});
    };
}

ObservationPoint.propTypes = {
    perPage: PropTypes.number,
};

export default ObservationPoint;
