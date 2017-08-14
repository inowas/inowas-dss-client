import dateFormat from 'dateformat';

const intlNumberFormatter = new Intl.NumberFormat([], {minimumFractionDigits: 2, maximumFractionDigits: 3});

export function toDate( date) {
    if (!date) {
        return 'n/a';
    }
    return new Date(date).toLocaleDateString();
}

export function toNumber(number) {
    return intlNumberFormatter.format(number);
}

export const dateToAtomFormat = (date) => dateFormat(date, "yyyy-mm-dd'T'HH:MM:ss+00:00");
export const dateToYmd = (date) => dateFormat(date, 'yyyy-mm-dd');
