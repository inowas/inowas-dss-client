import React from 'react';
import ReactPaginate from 'react-paginate';
import {calcPages} from "../helpers";
import {pure} from 'recompose';

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
