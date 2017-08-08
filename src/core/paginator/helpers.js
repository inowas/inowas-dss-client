export const calcPage = ( selectedPage, perPage, length ) => {
    return Math.min( Math.max( selectedPage, 1 ), calcPages( perPage, length ) );
};

export const calcPages = ( perPage, length ) => {
    return Math.ceil( length / perPage );
};
