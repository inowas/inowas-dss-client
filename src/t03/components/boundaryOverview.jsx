import React from 'react';
import PropTypes from 'prop-types';
import {DataTable} from '../../core';
import Icon from '../../components/primitive/Icon';
import {editBoundary} from "../../routes";

class BoundaryOverview extends DataTable.Component.DataTable {
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
                    property: 'name',
                    header: {
                        label: 'Name',
                        transforms: [ DataTable.Helper.resetable(this) ],
                        formatters: [
                            DataTable.Helper.header(this)
                        ],
                    },
                    cell: {
                        formatters: [
                            ( value, { rowData } ) => (
                                <a href="#" title="edit" onClick={() => this.onBoundaryClick(rowData.id, rowData.type)}>{value}</a>
                            )
                        ]
                    }
                },
                {
                    property: 'type',
                    header: {
                        label: 'Type',
                        transforms: [ DataTable.Helper.resetable(this) ],
                        formatters: [
                            DataTable.Helper.header(this)
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
                        transforms: [ DataTable.Helper.resetable(this) ],
                        formatters: [
                            DataTable.Helper.header(this)
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
                                <Icon name={'trash'} onClick={() => this.props.removeBoundary(rowData.id, this.props.id)}/>
                            )
                        ]
                    }
                }
            ],
            rows: this.props.rows || []
        };
    }

    onBoundaryClick = (boundaryId, type) => {
        const {tool,id, property } = this.props;
        editBoundary(tool, id, property, type, boundaryId);
    };
}

BoundaryOverview.propTypes = {
    id: PropTypes.string.isRequired,
    tool: PropTypes.string.isRequired,
    perPage: PropTypes.number,
    removeBoundary: PropTypes.func.isRequired,
};

export default BoundaryOverview;
