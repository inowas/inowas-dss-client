import React from 'react';
import ReactPaginate from 'react-paginate';
import {calcPage, calcPages} from "../selectors";
import {pure} from 'recompose';

export const applyNewPage = (page, perPage, length) => {
    return function( prevState ) {
        return { ...prevState, page: calcPage(page, perPage, length) };
    }
};

const Paginator = ( { perPage, length, onSelect } ) => {
    return (
        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={calcPages( perPage, length )}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={onSelect}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"}/>
    )
};

export default pure(Paginator);
