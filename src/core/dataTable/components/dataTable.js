import React from 'react';
import PropTypes from 'prop-types';
import * as Table from 'reactabular-table';
import * as Sticky from 'reactabular-sticky';
import * as Virtualized from 'reactabular-virtualized';
import {getRows} from '../selectors';
import {Callback} from '../actions';
import {Paginator} from '../../../core';
import Icon from '../../../components/primitive/Icon';

import orderBy from 'lodash/orderBy';
import * as resolve from 'table-resolver';
import * as sort from 'sortabular';
import {compose} from 'redux';

class DataTable extends React.Component {
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

        this.state = {
            searchColumn: 'all',
            query: {}, // Search query
            page: 1,
            perPage: this.props.perPage || 20,
            selectedRows: [],
            // Sort the first column in a descending way by default.
            // "asc" would work too and you can set multiple if you want.
            sortingColumns: {
                'name': {
                    direction: 'asc',
                    position: 0
                },
                'type': {
                    direction: 'asc',
                    position: 0
                },
                'layers': {
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
                            (value, { rowData }) => (
                                <Icon name={'unchecked'} onClick={Callback.onSelectAll(this)}/>
                            )
                        ],
                    },
                    cell: {
                        formatters: [
                            (value, { rowData }) => (
                                <Icon name={rowData.selected ? 'checked' : 'unchecked'}/>
                            )
                        ]
                    }
                },
                {
                    property: 'name',
                    header: {
                        label: 'Name',
                        transforms: [ resetable ],
                        formatters: [
                            sort.header( {
                                sortable,
                                getSortingColumns,
                                strategy: sort.strategies.byProperty
                            } )
                        ],
                    }
                },
                {
                    property: 'type',
                    header: {
                        label: 'Type',
                        transforms: [ resetable ],
                        formatters: [
                            sort.header( {
                                sortable,
                                getSortingColumns,
                                strategy: sort.strategies.byProperty
                            } )
                        ]
                    }
                },
                {
                    property: 'geometry.coordinates.0',
                    header: {
                        label: 'Latitude (X)',
                    }
                },
                {
                    property: 'geometry.coordinates.1',
                    header: {
                        label: 'Longitude (Y)',
                    }
                },
                {
                    property: 'affected_layers',
                    header: {
                        label: 'Layers',
                        transforms: [ resetable ],
                        formatters: [
                            sort.header( {
                                sortable,
                                getSortingColumns,
                                strategy: sort.strategies.byProperty
                            } )
                        ]
                    }
                },
                {
                    props: {
                        style: {
                            width: 50
                        }
                    },
                    cell: {
                        formatters: [
                            (value, { rowData }) => (
                                <span
                                    className="remove"
                                    onClick={() => this.props.removeBoundary(rowData.id, this.props.id)} style={{ cursor: 'pointer' }}
                                >&#10007;</span>
                            )
                        ]
                    }
                }
            ],
            rows: this.props.rows || []
        };
    }

    componentDidMount() {
        // We have refs now. Force update to get those to Header/Body.
        this.forceUpdate();
    }

    componentWillReceiveProps(newProps){
        this.setState(function(prevState, props){
            return { ...prevState, rows: newProps.rows };
        } );
    }

    render () {
        const { rows, sortingColumns, columns, perPage, page } = this.state;

        const resolvedColumns = resolve.columnChildren({ columns });
        const sortedRows = compose(
            getRows(page, perPage),
            sort.sorter({
                columns: resolvedColumns,
                sortingColumns,
                sort: orderBy,
                strategy: sort.strategies.byProperty
            }),
            resolve.resolve({
                columns: resolvedColumns,
                method: resolve.nested
            })
        )(rows);

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
                        onRow={Callback.onRow(this)}
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
                               onSelect={( page ) => Paginator.Action.Callback.onSelectPage(this)( page.selected + 1, perPage, rows.length )}/>
                </div>
            </div>
        );
    }
}

DataTable.propTypes = {
    id: PropTypes.string.isRequired,
    tool: PropTypes.string.isRequired,
    perPage: PropTypes.number,
    removeBoundary: PropTypes.func.isRequired,
};

export default DataTable;
