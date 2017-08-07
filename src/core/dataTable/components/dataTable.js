import React from 'react';
import PropTypes from 'prop-types';
import * as Table from 'reactabular-table';
import * as Sticky from 'reactabular-sticky';
import * as Virtualized from 'reactabular-virtualized';
import {getRows, makeMapStateToPropsBoundaries} from "../selectors";
import {applyNewPage} from "./paginator";
import Paginator from "./paginator";

import { connect } from 'react-redux';
import orderBy from 'lodash/orderBy';
import * as resolve from 'table-resolver';
import * as sort from 'sortabular';
import {compose} from 'redux';

import {
    Command,
} from '../../../t03/actions/index';

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
                this.setState( {
                    sortingColumns: sort.byColumn( { // sort.byColumn would work too
                        sortingColumns: this.state.sortingColumns,
                        selectedColumn
                    } )
                } );
            },

            // Use property strategy over index one given we have nested data
            strategy: sort.strategies.byProperty
        } );
        const resetable = sort.reset( {
            event: 'onDoubleClick',
            getSortingColumns,
            onReset: ( { sortingColumns } ) => this.setState( { sortingColumns } ),
            strategy: sort.strategies.byProperty
        } );

        this.state = {
            searchColumn: 'all',
            query: {}, // Search query
            page: 1,
            perPage: this.props.perPage || 20,
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
                    property: 'lat',
                    header: {
                        label: 'Latitude (X)',
                    }
                },
                {
                    property: 'lng',
                    header: {
                        label: 'Longitude (Y)',
                    }
                },
                {
                    property: 'layers',
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
        }
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
                <div className="search-container">
                    <span>Search</span>
                </div>

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
                        style={{
                            maxHeight: 800
                        }}
                        ref={tableBody => {
                            this.tableBody = tableBody && tableBody.getRef();
                        }}
                        tableHeader={this.tableHeader}
                    />
                </Table.Provider>

                <div className="controls">
                    <Paginator perPage={perPage} length={rows.length}
                               onSelect={( page ) => this.setState( applyNewPage( page.selected + 1, perPage, rows.length ) )}/>
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

const actions = {
    removeBoundary: Command.removeBoundary,
};

const mapDispatchToProps = (dispatch, { tool }) => {
    const wrappedActions = {};
    for ( const key in actions ) {
        if (actions.hasOwnProperty( key )) {
            // eslint-disable-next-line no-loop-func
            wrappedActions[key] = function( ) {
                const args = Array.prototype.slice.call( arguments );
                dispatch(actions[key]( tool, ...args ));
            };
        }
    }

    return wrappedActions;
};

// eslint-disable-next-line no-class-assign
const DataTableContainer = connect( makeMapStateToPropsBoundaries, mapDispatchToProps )( DataTable );

export default DataTableContainer;
