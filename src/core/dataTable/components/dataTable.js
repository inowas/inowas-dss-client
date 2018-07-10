import * as Sticky from 'reactabular-sticky';
import * as Table from 'reactabular-table';
import * as Virtualized from 'reactabular-virtualized';
import * as resolve from 'table-resolver';

import {Action, Helper} from '../';
import React, {Component} from 'react';
import {cloneDeep, findIndex, includes, set} from 'lodash';

import {Paginator} from '../../../core';
import PropTypes from 'prop-types';
import ConfiguredRadium from 'ConfiguredRadium';

import * as select from 'selectabular/dist/index';
import * as sort from 'sortabular/dist/index';
import * as edit from 'react-edit/dist/index';

import {Formatter} from '../../index';

class DataTable extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // We have refs now. Force update to get those to Header/Body.
        this.forceUpdate();
    }

    componentWillReceiveProps(newProps) {
        this.setState((prevState) => (
            {...prevState, rows: newProps.rows}
        ));
    }

    onDelete = e => {
        e.preventDefault();

        const {selectedRows} = this.state;
        const rows = cloneDeep(this.state.rows).filter(
            data => !includes(selectedRows, data.id)
        );

        this.setState((prevState) => {
            if (this.onRowChange) {
                this.onRowChange();
            }
            return {...prevState, rows, selectedRows: []};
        });
    };

    getSortingColumns = () => this.state.sortingColumns || {};

    onSelect = (rowData) => {
        this.setState((prevState) => {
            const index = findIndex(prevState.rows, {id: rowData.id});
            const selectedRowId = prevState.rows[index].id;
            const selectedRows = cloneDeep(prevState.selectedRows);

            if (prevState.rows[index].selected) {
                selectedRows.splice(selectedRows.indexOf(selectedRowId), 1);
            } else {
                selectedRows.push(selectedRowId);
            }

            const rows = select.toggle(row => row.id === selectedRowId)(prevState.rows);

            if (this.onRowsChange) {
                this.onRowsChange(rows);
            }

            return {rows};
        });
    };

    onSelectAll = () => {
        this.setState((prevState) => {
            const rows = select.toggle(row => true)(prevState.rows);
            if (this.onRowsChange) {
                this.onRowsChange(rows);
            }
            return {rows};
        });
    };

    resetable = () => sort.reset({
        event: 'onDoubleClick',
        getSortingColumns: this.getSortingColumns,
        onReset: ({sortingColumns}) => this.setState(() => ({sortingColumns})),
        strategy: sort.strategies.byProperty
    });

    sortable = () => sort.sort({
        getSortingColumns: this.getSortingColumns,
        onSort: selectedColumn => {
            this.setState(() => ({
                sortingColumns: sort.byColumn({
                    sortingColumns: this.state.sortingColumns,
                    selectedColumn
                })
            }));
        },
        strategy: sort.strategies.byProperty
    });

    isEditing = ({columnIndex, rowData}) => columnIndex === rowData.editing;

    onActivate = ({columnIndex, rowData}) => {
        const index = findIndex(this.state.rows, {id: rowData.id});
        const rows = cloneDeep(this.state.rows);
        rows[index].editing = columnIndex;

        this.setState(() => {
            return {rows: rows};
        });
    };

    onValue = ({value, rowData, property}) => {
        const index = findIndex(this.state.rows, {id: rowData.id});
        const rows = cloneDeep(this.state.rows);
        const row = cloneDeep(rows[index]);
        row.editing = false;

        set(row, property, value);
        rows[index] = row;

        this.setState(() => {
            if (this.onRowChange) {
                this.onRowChange();
            }
            if (this.onRowsChange) {
                this.onRowsChange(rows);
            }
            return {rows: rows};
        });
    };

    editableDate = edit.edit({
        isEditing: this.isEditing,
        onActivate: this.onActivate,
        onValue: this.onValue,
        getEditedValue: v => Formatter.dateToYmd(v)
    });

    editable = edit.edit({
        isEditing: this.isEditing,
        onActivate: this.onActivate,
        onValue: this.onValue,
    });


    header = sort.header({
        sortable: this.sortable,
        getSortingColumns: this.getSortingColumns,
        strategy: sort.strategies.byProperty
    });

    render() {
        if (!this.state) {
            return null;
        }

        const {rows, sortingColumns, columns, perPage, page} = this.state;

        if (rows.length === 0 || !columns) {
            return null;
        }

        const resolvedColumns = resolve.columnChildren({columns});

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
                            this.tableHeader =
                                tableHeader && tableHeader.getRef();
                        }}
                        tableBody={this.tableBody}
                    />
                    <Virtualized.Body
                        rows={Helper.sortedRows(
                            rows,
                            sortingColumns,
                            resolvedColumns,
                            page,
                            perPage
                        )}
                        rowKey="id"
                        onRow={Action.Callback.onRow(this)}
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
                    <Paginator.Paginator
                        perPage={perPage}
                        length={rows.length}
                        onSelect={page =>
                            Paginator.Action.Callback.onSelectPage(this)(
                                page.selected + 1,
                                perPage,
                                rows.length
                            )}
                    />
                </div>
            </div>
        );
    }
}

DataTable.propTypes = {
    perPage: PropTypes.number
};

export default ConfiguredRadium(DataTable);
