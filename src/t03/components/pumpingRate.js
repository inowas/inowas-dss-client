import React from 'react';
import PropTypes from 'prop-types';
import * as Table from 'reactabular-table';
import * as Sticky from 'reactabular-sticky';
import * as Virtualized from 'reactabular-virtualized';
import * as edit from 'react-edit';
import {DataTable, Paginator, Formatter} from '../../core';
import Icon from '../../components/primitive/Icon';

import orderBy from 'lodash/orderBy';
import { cloneDeep, findIndex } from 'lodash';
import * as resolve from 'table-resolver';
import * as sort from 'sortabular';
import {compose} from 'redux';


class PumpingRate extends React.Component {
    constructor ( props ) {
        super( props );

        const getSortingColumns = () => this.state.sortingColumns || {};
        const sortable = sort.sort( {
            // Point the transform to your rows. React state can work for this purpose
            // but you can use a state manager as well.
            getSortingColumns,

            // The user requested sorting, adjust the sorting state accordingly.
            // This is a good chance to pass the request through a sorter.
            onSort: selectedColumn => {
                this.setState( function( prevState, props ) {
                    return {
                        sortingColumns: sort.byColumn( { // sort.byColumn would work too
                            sortingColumns: this.state.sortingColumns,
                            selectedColumn
                        } )
                    }
                } );
            },

            // Use property strategy over index one given we have nested data
            strategy: sort.strategies.byProperty
        } );
        const resetable = sort.reset( {
            event: 'onDoubleClick',
            getSortingColumns,
            onReset: ( { sortingColumns } ) => this.setState( function( prevState, props ) {
                return { sortingColumns }
            } ),
            strategy: sort.strategies.byProperty
        } );

        const editable = edit.edit({
            isEditing: ({ columnIndex, rowData }) => columnIndex === rowData.editing,
            onActivate: ({ columnIndex, rowData }) => {
                const index = findIndex(this.state.rows, { id: rowData.id });
                const rows = cloneDeep(this.state.rows);

                rows[index].editing = columnIndex;

                this.setState({ rows });
            },
            onValue: ({ value, rowData, property }) => {
                const index = findIndex(this.state.rows, { id: rowData.id });
                const rows = cloneDeep(this.state.rows);

                rows[index][property] = value;
                rows[index].editing = false;

                this.setState({ rows });
            }
        });

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
                        transforms: [ resetable ],
                        formatters: [
                            sort.header( {
                                sortable,
                                getSortingColumns,
                                strategy: sort.strategies.byProperty
                            } )
                        ],
                    },
                    cell: {
                        transforms: [editable(edit.input())],
                        formatters: [
                            ( value, { rowData } ) => (
                                <span>{Formatter.toDate(value)}</span>
                            )
                        ]
                    }
                },
                {
                    property: 'values',
                    header: {
                        label: 'Rate',
                    },
                    cell: {
                        transforms: [editable(edit.input({ props: { type: 'number' } }))],
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

    componentDidMount () {
        // We have refs now. Force update to get those to Header/Body.
        this.forceUpdate();
    }

    componentWillReceiveProps ( newProps ) {
        this.setState( function( prevState, props ) {
            return { ...prevState, rows: newProps.rows };
        } );
    }

    getRows = () => {
        return this.state.rows.map((data) => {return {date_time: data.date_time, values: data.values}});
    };

    render () {
        const { rows, sortingColumns, columns, perPage, page } = this.state;

        const resolvedColumns = resolve.columnChildren( { columns } );
        const sortedRows = compose(
            DataTable.Selector.getRows( page, perPage ),
            sort.sorter( {
                columns: resolvedColumns,
                sortingColumns,
                sort: orderBy,
                strategy: sort.strategies.byProperty
            } ),
            resolve.resolve( {
                columns: resolvedColumns,
                method: resolve.nested
            } )
        )( rows );

        return (
            <div>
                <Table.Provider
                    className="table"
                    columns={resolvedColumns}
                    components={{
                        body: {
                            wrapper: Virtualized.BodyWrapper,
                            row: Virtualized.BodyRow
                        }
                    }}
                >
                    <Sticky.Header
                        ref={tableHeader => {
                            this.tableHeader = tableHeader && tableHeader.getRef();
                        }}
                        tableBody={this.tableBody}
                    />
                    <Virtualized.Body
                        rows={sortedRows}
                        rowKey="id"
                        onRow={DataTable.Action.Callback.onRow( this )}
                        style={{
                            maxHeight: 1000
                        }}
                        ref={tableBody => {
                            this.tableBody = tableBody && tableBody.getRef();
                        }}
                        tableHeader={this.tableHeader}
                    />
                </Table.Provider>

                <div className="controls">
                    <Paginator.Paginator perPage={perPage} length={rows.length}
                               onSelect={( page ) => Paginator.Action.Callback.onSelectPage( this )( page.selected + 1, perPage, rows.length )}/>
                </div>
            </div>
        );
    }
}

PumpingRate.propTypes = {
    perPage: PropTypes.number,
};

export default PumpingRate;
