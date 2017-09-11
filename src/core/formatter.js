import moment from 'moment';

const intlNumberFormatter = new Intl.NumberFormat([], {minimumFractionDigits: 2, maximumFractionDigits: 5});

export function toDate( date) {
    if (!date) {
        return 'n/a';
    }
    return new Date(date).toLocaleDateString();
}

export function toNumber(number) {
    return intlNumberFormatter.format(number);
}


export const dateToAtomFormat = (date) => moment(date).format('YYYY-MM-DD[T]00:00:00+00:00');
export const dateToYmd = (date) => moment(date).format('YYYY-MM-DD');
export const dateToTime = (date) => moment(date).format('HH:MM');
export const dateToDate = (date) => moment(date).format('MM/DD/YYYY');
export const dateToDatetime = (date) => moment(date).format('MM/DD/YYYY HH:MM');
