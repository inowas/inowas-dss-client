const intlNumberFormatter = new Intl.NumberFormat([], {minimumFractionDigits: 2, maximumFractionDigits: 3});

export function toDate( date) {
    if (!date) {
        return 'n/a';
    }
    return new Date(date).toLocaleString();
}

export function toNumber(number) {
    return intlNumberFormatter.format(number);
}

