import { Callback } from './actions';
import { getSortingColumns, getRows } from './selectors';
import { Formatter } from '../../core';
import * as edit from 'react-edit';
import * as sort from 'sortabular';
import {compose} from 'redux';
import * as resolve from 'table-resolver';
import orderBy from 'lodash/orderBy';

export const editable = (component = {}) => edit.edit({
    isEditing: Callback.isEditing,
    onActivate: Callback.onActivate(component),
    onValue: Callback.onValue(component),
});

export const editableCheckbox = (component = {}) => edit.edit({
    isEditing: Callback.isEditing,
    onActivate: Callback.onActivateCheckbox(component),
    onValue: Callback.onValue(component),
});

export const editableDate = (component = {}) => edit.edit({
    isEditing: Callback.isEditing,
    onActivate: Callback.onActivate(component),
    onValue: Callback.onValue(component),
    getEditedValue: v => Formatter.dateToYmd(v)
});

export const resetable = (component = {}) => sort.reset({
    event: 'onDoubleClick',
    getSortingColumns: getSortingColumns(component),
    onReset: ({sortingColumns}) => component.setState(function (prevState, props) {
        return {sortingColumns};
    }),
    strategy: sort.strategies.byProperty
});

export const sortable = (component = {}) => sort.sort({
    getSortingColumns: getSortingColumns(component),

    onSort: selectedColumn => {
        component.setState((prevState, props) => {
            return {
                sortingColumns: sort.byColumn({
                    sortingColumns: component.state.sortingColumns,
                    selectedColumn
                })
            };
        });
    },

    strategy: sort.strategies.byProperty
});

export const header = (component = {}) => sort.header({
    sortable: sortable(component),
    getSortingColumns: getSortingColumns(component),
    strategy: sort.strategies.byProperty
});

/**
 *
 * @param rows
 * @param sortingColumns
 * @param resolvedColumns
 * @param page
 * @param perPage
 */
export const sortedRows  = (rows, sortingColumns, resolvedColumns, page, perPage = {}) => compose(
    getRows( page, perPage ),
    sort.sorter( {
        columns: resolvedColumns,
        sortingColumns,
        sort: orderBy,
        strategy: sort.strategies.byProperty
    } ),
    resolve.resolve( {
        columns: resolvedColumns,
        method: resolve.nested
    } )
)( rows );
