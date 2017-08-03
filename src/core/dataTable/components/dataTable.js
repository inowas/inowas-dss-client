import React from 'react';
import PropTypes from 'prop-types';
import * as Table from 'reactabular-table';
import {getRows, mapBoundaries} from "../selectors";
import {applyNewPage} from "./paginator";
import Paginator from "./paginator";

import { connect } from 'react-redux';
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
            perPage: this.props.perPage || 10,
            // Sort the first column in a descending way by default.
            // "asc" would work too and you can set multiple if you want.
            sortingColumns: {
                'name': {
                    direction: 'asc',
                    position: 0
                },
                'well_ype': {
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
                        label: 'Type',
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
                    property: 'well_ype',
                    header: {
                        label: 'Well Type',
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
            ],
            rows: this.props.rows || []
        }
    }

    componentWillReceiveProps(newProps){
        console.log('componentWillReceiveProps', newProps);
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

            console.log(rows);

        return (
            <div>
                <div className="search-container">
                    <span>Search</span>
                </div>

                <Table.Provider className="table" columns={resolvedColumns}>
                    <Table.Header
                        headerRows={resolve.headerRows({ columns })}
                    />

                    <Table.Body rows={sortedRows} rowKey="id" />
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
    tool: PropTypes.string.isRequired,
    perPage: PropTypes.number,
};

const mapStateToProps = (state, ownProps) => {
    return {
        rows: mapBoundaries(state[ownProps.tool].model.boundaries),
    };
};

// eslint-disable-next-line no-class-assign
const DataTableContainer = connect( mapStateToProps )( DataTable );

export default DataTableContainer;
