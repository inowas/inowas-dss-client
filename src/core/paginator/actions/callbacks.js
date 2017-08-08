import {calcPage} from "../helpers";

export const onSelectPage = ( component = {} ) => ( page, perPage, length ) => {
    component.setState( function( prevState ) {
        return { ...prevState, page: calcPage( page, perPage, length ) };
    } );
};
