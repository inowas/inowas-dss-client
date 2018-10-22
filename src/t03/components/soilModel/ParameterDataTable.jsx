/* eslint-disable react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import * as edit from 'react-edit';
import {DataTable, Formatter} from '../../../core/index';
import {Button, Icon} from "semantic-ui-react";

const styles = {
    buttonFix: {
        width: 'auto',
        height: 'auto',
        padding: '5px'
    }
};

class ParameterDataTable extends DataTable.Component.DataTable {
    constructor(props) {
        super(props);
        this.state = {
            searchColumn: 'all',
            query: {},
            page: 1,
            perPage: this.props.perPage || 20,
            selectedRows: [],
            sortingColumns: {
                'priority': {
                    direction: 'desc',
                    position: 0
                },
            },
            columns: [
                {
                    header: {
                        label: 'Zone',
                    },
                    property: 'zone'
                },
                {
                    header: {
                        label: 'Priority',
                    },
                    property: 'priority',
                    visible: false
                }
            ],
            rows: this.props.rows
        };
        props.config.forEach(item => {
            this.state.columns.push({
                property: item.property,
                header: {label: item.label},
                cell: {
                    transforms: this.props.readOnly ?
                        [] : [this.editable(edit.input({props: {type: 'number'}}))],
                    formatters: [(value) => {
                        if (!value) {
                            return (<span>Default</span>)
                        }
                        return (<span>{Formatter.toNumber(value)}</span>)
                    }]
                }
            });
        });
        this.state.columns.push({
            property: 'action',
            header: {
                label: 'Action'
            },
            cell: {
                formatters: [
                    (value, {rowData}) => (
                        !this.props.readOnly && rowData.action &&
                        <div>
                            <Button
                                style={styles.buttonFix}
                                icon
                                onClick={() => this.props.remove(rowData.id)}
                            >
                                <Icon name={'ban'}/>
                            </Button>
                            <Button
                                style={styles.buttonFix}
                                icon
                                onClick={() => this.props.edit(rowData.id)}
                            >
                                <Icon name="pencil"/>
                            </Button>
                            { rowData.priority < rowData.zones - 1 &&
                                <Button
                                    style={styles.buttonFix}
                                    icon
                                    onClick={() => this.props.onOrderZones(rowData.id, 'up')}
                                >
                                    <Icon name="arrow up"/>
                                </Button>
                            }
                            { rowData.priority > 1 &&
                            <Button
                                style={styles.buttonFix}
                                icon
                                onClick={() => this.props.onOrderZones(rowData.id, 'down')}
                            >
                                <Icon name="arrow down"/>
                            </Button>
                            }
                        </div>
                    )
                ]
            }
        });
    }

    onRowsChange = rows => {
        this.props.onChange(rows);
    };
}

ParameterDataTable.propTypes = {
    config: PropTypes.array.isRequired,
    edit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onOrderZones: PropTypes.func.isRequired,
    readOnly: PropTypes.bool.isRequired,
    remove: PropTypes.func.isRequired,
    rows: PropTypes.array.isRequired,
};

export default ParameterDataTable;