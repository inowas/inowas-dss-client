import React, { PropTypes } from 'react';

import Color from 'color';
import Icon from '../../../components/primitive/Icon';
import ReactPaginate from 'react-paginate';
import { Style } from 'radium';
import { calcPages } from '../helpers';
import { pure } from 'recompose';
import styleGlobals from 'styleGlobals';

const Paginator = ({ perPage, length, onSelect }) => {
    return (
        <div className="paginate">
            <Style
                scopeSelector=".paginate"
                rules={{
                    ['.pagination']: {
                        padding: styleGlobals.dimensions.spacing.medium,
                        margin: 0,
                        textAlign: 'center'
                    },

                    ['.pagination li']: {
                        display: 'inline-block'
                    },

                    ['.pagination li a']: {
                        padding: styleGlobals.dimensions.spacing.small,
                        display: 'block',
                        cursor: 'default'
                    },

                    ['.pagination li:not(.active):not(.disabled) a']: {
                        color: styleGlobals.colors.primary,
                        cursor: 'pointer'
                    },

                    ['.pagination li:not(.active):not(.disabled) a:hover']: {
                        color: Color(styleGlobals.colors.font)
                            .darken(0.9)
                            .string()
                    }
                }}
            />
            <ReactPaginate
                previousLabel={<Icon name="arrow_left" />}
                nextLabel={<Icon name="arrow_right" />}
                breakLabel="..."
                breakClassName={'break-me'}
                pageCount={calcPages(perPage, length)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={onSelect}
                containerClassName={'pagination'}
                subContainerClassName={'pages'}
                activeClassName={'active'}
            />
        </div>
    );
};

Paginator.propTypes = {
    perPage: PropTypes.number,
    length: PropTypes.number,
    onSelect: PropTypes.func
};

export default pure(Paginator);
