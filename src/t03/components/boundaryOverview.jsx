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
                layers: {
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
                                <Icon
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
                                <Icon name={rowData.selected ? 'checked' : 'unchecked'} onClick={() => DataTable.Action.Callback.onSelect( this )(rowData)}/>
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
                        transforms: [DataTable.Helper.resetable(this)],
                        formatters: [DataTable.Helper.header(this)]
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
                        transforms: [DataTable.Helper.resetable(this)],
                        formatters: [DataTable.Helper.header(this)]
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
                                <Icon
                                    name={'trash'}
                                    onClick={() =>
                                        this.props.removeBoundary(
                                            rowData.id,
                                            this.props.id
                                        )}
                                />
                        ]
                    }
                }
            ],
            rows: this.props.rows || []
        };
    }

    onBoundaryClick = (boundaryId, type) => {
        const { tool, id, property } = this.props;
        Routing.editBoundary(tool, id, property, type, boundaryId);
    };

    onBoundaryMapClick = (type, boundaryId) => {
        return () => {
            const { tool, id, property } = this.props;
            console.warn('kgberrg');
            Routing.editBoundaryOnMap(tool, id, property, type, boundaryId);
        };
    };
}

BoundaryOverview.propTypes = {
    id: PropTypes.string.isRequired,
    tool: PropTypes.string.isRequired,
    perPage: PropTypes.number,
    removeBoundary: PropTypes.func.isRequired
};

export default BoundaryOverview;
