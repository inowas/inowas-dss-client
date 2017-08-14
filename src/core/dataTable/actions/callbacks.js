import * as select from 'selectabular';
import classnames from 'classnames';
import { includes, cloneDeep, remove } from 'lodash';

export const onSelectAll = ( component = {} ) => () => {
    component.setState( function( prevState, props ) {
        const rows = select.toggle( row => true )( prevState.rows );

        return {
            rows,
            selectedRows: rows.filter(data => data.selected === true).map(data => data.id)
        }
    } );
};

export const onRow = ( component = {} ) => ( row, { rowIndex, rowKey } ) => {
    return {
        className: classnames(
            rowIndex % 2 ? 'odd-row' : 'even-row',
            row.selected && 'selected-row'
        ),
        onClick: () => onSelectRow( component )( rowIndex )
    };
};

export const onSelectRow = ( component = {} ) => ( selectedRowIndex ) => {
    component.setState( function( prevState, props ) {
        const selectedRowId = prevState.rows[ selectedRowIndex ].id;
        const selectedRows = cloneDeep(prevState.selectedRows);

        if (prevState.rows[ selectedRowIndex ].selected) {
            selectedRows.splice(selectedRows.indexOf(selectedRowId), 1);
        } else {
            selectedRows.push(selectedRowId);
        }

        return {
            rows: select.toggle( row => row.id === selectedRowId )( prevState.rows ),
            selectedRows
        }
    } );
};
