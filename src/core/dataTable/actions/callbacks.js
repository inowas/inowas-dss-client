import * as select from 'selectabular';
import classnames from 'classnames';
import { cloneDeep, findIndex, set } from 'lodash';
import * as sort from 'sortabular';
import { getSortingColumns } from '../selectors';

export const onSelectAll = (component = {}) => () => {
    component.setState(function (prevState, props) {
        const rows = select.toggle(row => true)(prevState.rows);

        return {
            rows,
            selectedRows: rows.filter(data => data.selected === true).map(data => data.id)
        };
    });
};

export const onSelect = (component = {}) => (rowData) => {
    component.setState(function (prevState, props) {
        const index = findIndex(component.state.rows, {id: rowData.id});;
        const selectedRowId = prevState.rows[index].id;
        const selectedRows = cloneDeep(prevState.selectedRows);

        if (prevState.rows[index].selected) {
            selectedRows.splice(selectedRows.indexOf(selectedRowId), 1);
        } else {
            selectedRows.push(selectedRowId);
        }

        return {
            rows: select.toggle(row => row.id === selectedRowId)(prevState.rows),
            selectedRows
        };
    });
};

export const onRow = (component = {}) => (row, {rowIndex, rowKey}) => {
    return {
        className: classnames(
            rowIndex % 2 ? 'odd-row' : 'even-row',
            row.selected && 'selected-row',
            row.error && 'error-row',
        ),
    };
};

export const onSelectRow = (component = {}) => (selectedRowIndex) => {
    component.setState(function (prevState, props) {
        const selectedRowId = prevState.rows[selectedRowIndex].id;
        const selectedRows = cloneDeep(prevState.selectedRows);

        if (prevState.rows[selectedRowIndex].selected) {
            selectedRows.splice(selectedRows.indexOf(selectedRowId), 1);
        } else {
            selectedRows.push(selectedRowId);
        }

        return {
            rows: select.toggle(row => row.id === selectedRowId)(prevState.rows),
            selectedRows
        };
    });
};

export const resetable = (component = {}) => () => sort.reset({
    event: 'onDoubleClick',
    getSortingColumns: getSortingColumns(component),
    onReset: ({sortingColumns}) => component.setState(function (prevState, props) {
        return {sortingColumns};
    }),
    strategy: sort.strategies.byProperty
});

export const isEditing = ({columnIndex, rowData}) => columnIndex === rowData.editing;

export const onActivate = (component = {}) => ({columnIndex, rowData}) => {
    const index = findIndex(component.state.rows, {id: rowData.id});
    const rows = cloneDeep(component.state.rows);

    rows[index].editing = columnIndex;

    component.setState((prevState, props) => { return {rows: rows};});
};

export const onActivateCheckbox = (component = {}) => ({columnIndex, rowData, property}) => {
    const index = findIndex(component.state.rows, {id: rowData.id});
    const rows = cloneDeep(component.state.rows);

    rows[index].editing = columnIndex;
    // toggle checkbox state to avoid double click
    rows[index][property] = !rows[index][property];

    component.setState((prevState, props) => { return {rows: rows};});
};

export const onValue = (component = {}) => ({value, rowData, property}) => {
    const index = findIndex(component.state.rows, {id: rowData.id});
    const rows = cloneDeep(component.state.rows);
    const row = cloneDeep(rows[index]);

    row.editing = false;

    set(row, property, value);
    rows[index] = row;

    component.setState((prevState, props) => {
        if (component.onRowChange) {
            component.onRowChange();
        }

        return {rows: rows};
    });
};
