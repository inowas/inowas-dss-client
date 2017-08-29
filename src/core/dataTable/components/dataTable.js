import * as Sticky from 'reactabular-sticky';
import * as Table from 'reactabular-table';
import * as Virtualized from 'reactabular-virtualized';
import * as resolve from 'table-resolver';

import { Action, Helper } from '../';
import React, { Component } from 'react';
import { cloneDeep, includes } from 'lodash';

import { Paginator } from '../../../core';
import PropTypes from 'prop-types';
import ConfiguredRadium from 'ConfiguredRadium';

// TODO use HOC
@ConfiguredRadium
class DataTable extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // We have refs now. Force update to get those to Header/Body.
        this.forceUpdate();
    }

    componentWillReceiveProps(newProps) {
        this.setState(function(prevState, props) {
            return { ...prevState, rows: newProps.rows };
        });
    }

    onDelete = e => {
        e.preventDefault();

        const { selectedRows } = this.state;
        const rows = cloneDeep(this.state.rows).filter(
            data => !includes(selectedRows, data.id)
        );

        this.setState((prevState, props) => {
            if (this.onRowChange) {
                this.onRowChange();
            }
            return { ...prevState, rows, selectedRows: [] };
        });
    };

    render() {
        if (!this.state) {
            return null;
        }

        const { rows, sortingColumns, columns, perPage, page } = this.state;

        if (rows.length === 0 || !columns) {
            return null;
        }

        const resolvedColumns = resolve.columnChildren({ columns });

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

export default DataTable;
