import dateFormat from 'dateformat';

export const addIdFromIndex = ( values ) => values.map((value, index) => {return {...value, id: index}});

export const dateToAtomFormat = (date) => dateFormat(date, "yyyy-mm-dd'T'HH:MM:ss+00:00");
