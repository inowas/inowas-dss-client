import React from 'react';
import PropTypes from 'prop-types';

import Boundary from '../../../core/boundaries/Boundary';
import BoundaryDataTable from './BoundaryDataTable';
import BoundaryFactory from '../../../core/boundaries/BoundaryFactory';
import {Formatter} from '../../../core';
import {LayoutComponents} from '../../../core/index';
import DataTableActions from './DataTableActions';

import {cloneDeep, last, sortBy} from 'lodash';

class BoundaryData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boundary: props.boundary.toObject,
            opId: props.opId,
            selectedRows: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            boundary: nextProps.boundary.toObject,
            opId: nextProps.opId
        });
    }

    onAddWithIncrement = (e, increment) => {
        e.preventDefault();

        const boundary = BoundaryFactory.fromObjectData(this.state.boundary);
        const dateTimeValues = sortBy(cloneDeep(boundary.getDateTimeValues(this.props.opId)), 'date_time');
        const lastDateTimeValue = last(dateTimeValues);
        const date = lastDateTimeValue && lastDateTimeValue.date_time ? new Date(lastDateTimeValue.date_time) : new Date();
        const values = lastDateTimeValue && lastDateTimeValue.values ? lastDateTimeValue.values : boundary.defaultValues;

        dateTimeValues.push({
            date_time: Formatter.dateToAtomFormat(increment(date)),
            values
        });

        boundary.setDateTimeValues(dateTimeValues, this.props.opId);
        this.setState({boundary: boundary.toObject});
        this.props.onChange(boundary);
    };

    onDelete = () => {
        const selectedRows = this.state.selectedRows;
        const boundary = BoundaryFactory.fromObjectData(this.state.boundary);
        const dateTimeValues = boundary.getIndexedDateTimeValues(this.props.opId).filter(dtv => !selectedRows.includes(dtv.id));
        boundary.setDateTimeValues(dateTimeValues, this.props.opId);

        this.setState({
            boundary: boundary.toObject
        });

        this.props.onChange(boundary);
    };

    onRowsChange = (rows) => {
        const selectedRows = [];
        rows.forEach(r => {
            r.selected && selectedRows.push(r.id);
        });

        const boundary = BoundaryFactory.fromObjectData(this.state.boundary);
        boundary.setDateTimeValues(rows, this.props.opId);

        this.setState({
            boundary: boundary.toObject,
            selectedRows
        });

        this.props.onChange(boundary);
    };

    getDataTableConfig = boundary => {
        const config = [];
        switch (boundary.type) {
            case 'chd':
                config.push({property: 'values.0', label: 'sHead'});
                config.push({property: 'values.1', label: 'eHead'});
                return config;
            case 'ghb':
                config.push({property: 'values.0', label: 'Head'});
                config.push({property: 'values.1', label: 'Conductance'});
                return config;
            case 'hob':
                config.push({property: 'values.0', label: 'Observed Head'});
                return config;
            case 'rch':
                config.push({property: 'values.0', label: 'Recharge Rate'});
                return config;
            case 'riv':
                config.push({property: 'values.0', label: 'River Stage'});
                config.push({property: 'values.1', label: 'River Bottom'});
                config.push({property: 'values.2', label: 'Hydraulic Conductance'});
                return config;
            case 'wel':
                config.push({property: 'values.0', label: 'Pumping Rate'});
                return config;
            default:
                return config;
        }
    };

    render() {
        const boundary = BoundaryFactory.fromObjectData(this.state.boundary);

        if (!(boundary instanceof Boundary)) {
            return null;
        }

        return (
            <LayoutComponents.Column heading="Data">
                {!this.props.readOnly &&
                <DataTableActions
                    onAddWithIncrement={this.onAddWithIncrement}
                    onDelete={this.onDelete}
                />}

                <BoundaryDataTable
                    config={this.getDataTableConfig(boundary)}
                    readOnly={this.props.readOnly}
                    rows={boundary.getIndexedDateTimeValues(this.props.opId)}
                    onChange={this.onRowsChange}
                />
            </LayoutComponents.Column>
        );
    }
}

BoundaryData.propTypes = {
    boundary: PropTypes.instanceOf(Boundary),
    opId: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    readOnly: PropTypes.bool.isRequired
};

export default BoundaryData;
