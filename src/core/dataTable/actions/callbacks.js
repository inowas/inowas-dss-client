import * as select from 'selectabular';
import classnames from 'classnames';

export const onSelectAll = ( component = {} ) => () => {
    component.setState( function( prevState, props ) {
        return {
            rows: select.toggle( row => true )( prevState.rows )
        }
    } );
};

export const onRow = ( component = {} ) => ( row, { rowIndex } ) => {
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
        return {
            rows: select.toggle( row => row.id === selectedRowId )( prevState.rows )
        }
    } );
};
