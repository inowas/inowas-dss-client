import React from 'react';
import PropTypes from 'prop-types';
import {DataTable} from '../../core';
import Icon from '../../components/primitive/Icon';
import {Routing} from "../../t03/actions";

class SoilModelLayerDataTable extends DataTable.Component.DataTable {
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
                'description': {
                    direction: 'none',
                    position: 1
                },
                'laytyp': {
                    direction: 'none',
                    position: 2
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
                                !this.props.readOnly && <Icon name={'unchecked'} onClick={DataTable.Action.Callback.onSelectAll( this )}/>
                            )
                        ],
                    },
                    cell: {
                        formatters: [
                            ( value, { rowData } ) =>
                                !this.props.readOnly && <Icon name={rowData.selected ? 'checked' : 'unchecked'} onClick={() => DataTable.Action.Callback.onSelect( this )(rowData)}/>
                        ]
                    }
                },
                {
                    property: 'name',
                    header: {
                        label: 'Layer Name',
                        transforms: [ DataTable.Helper.resetable(this) ],
                        formatters: [
                            DataTable.Helper.header(this)
                        ],
                    },
                    cell: {
                        formatters: [
                            ( value, { rowData } ) => (
                                <a href="#" title="edit" onClick={() => this.props.edit(rowData.id)}>{value}</a>
                            )
                        ]
                    }
                },
                {
                    property: 'description',
                    header: {
                        label: 'Description',
                        transforms: [ DataTable.Helper.resetable(this) ],
                        formatters: [
                            DataTable.Helper.header(this)
                        ]
                    }
                },
                {
                    property: 'laytyp',
                    header: {
                        label: 'Layer Type',
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
                                !this.props.readOnly && <Icon name={'trash'} onClick={() => this.props.remove(rowData.id, this.props.id)}/>
                            )
                        ]
                    }
                }
            ],
            rows: this.props.rows || []
        };
    }
}

SoilModelLayerDataTable.propTypes = {
    id: PropTypes.string.isRequired,
    perPage: PropTypes.number,
    remove: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
    readOnly: PropTypes.bool.isRequired,
};

export default SoilModelLayerDataTable;
