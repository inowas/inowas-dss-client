import React from 'react';
import PropTypes from 'prop-types';
import { DataTable } from '../../core';
import Icon from '../../components/primitive/Icon';
import Button from '../../components/primitive/Button';
// import { editBoundary, editBoundaryOnMap } from '../../routes';
import { Routing } from '../actions';

class BoundaryOverview extends DataTable.Component.DataTable {
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
                name: {
                    direction: 'asc',
                    position: 0
                },
                type: {
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
                                !this.props.readOnly && <Icon name={rowData.selected ? 'checked' : 'unchecked'} onClick={() => DataTable.Action.Callback.onSelect( this )(rowData)}/>
                        ]
                    }
                },
                {
                    property: 'name',
                    header: {
                        label: 'Name',
                        transforms: [DataTable.Helper.resetable(this)],
                        formatters: [DataTable.Helper.header(this)]
                    },
                    cell: {
                        formatters: [
                            (value, { rowData }) =>
                                <Button
                                    type="link"
                                    onClick={() =>
                                        this.onBoundaryClick(
                                            rowData.id,
                                            rowData.type
                                        )}
                                >
                                    {value}
                                </Button>
                        ]
                    }
                },
                {
                    property: 'type',
                    header: {
                        label: 'Type',
                        transforms: [DataTable.Helper.resetable(this)],
                        formatters: [DataTable.Helper.header(this)]
                    }
                },
                {
                    header: {
                        label: 'Map',
                    },
                    cell: {
                        formatters: [
                            (value, { rowData }) =>
                                <Button
                                    type="link"
                                    onClick={this.onBoundaryMapClick(
                                        rowData.type,
                                        rowData.id
                                    )}
                                    iconInside
                                    icon={<Icon name="marker" />}
                                />
                        ]
                    }
                },
                {
                    property: 'affected_layers',
                    header: {
                        label: 'Layers',
                    },
                    cell: {
                        formatters: [
                            (value, { rowData }) => value.join(', ')
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
                            (value, { rowData }) =>
                                !this.props.readOnly && <Button
                                    type="link"
                                    onClick={() =>
                                        this.props.removeBoundary(
                                            rowData.id,
                                            this.props.id
                                        )}
                                    iconInside
                                    icon={<Icon name="trash" />}
                                />
                        ]
                    }
                }
            ],
            rows: this.props.rows || []
        };
    }

    onBoundaryClick = (pid, type) => {
        const { editBoundary, property } = this.props;
        editBoundary(property, type, pid);
    };

    onBoundaryMapClick = (type, pid) => {
        return () => {
            const { editBoundaryOnMap, property } = this.props;
            editBoundaryOnMap(property, type, pid);
        };
    };
}

BoundaryOverview.propTypes = {
    id: PropTypes.string.isRequired,
    perPage: PropTypes.number,
    removeBoundary: PropTypes.func.isRequired,
    editBoundary: PropTypes.func.isRequired,
    editBoundaryOnMap: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
};

export default BoundaryOverview;
