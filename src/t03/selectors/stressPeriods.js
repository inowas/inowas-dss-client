import { Formatter } from '../../core';

export const getInitialState = () => {
    return {
        start_date_time: Formatter.dateToAtomFormat(new Date()),
        end_date_time: Formatter.dateToAtomFormat(new Date()),
        stress_periods: []
    };
};

export const getState = state => state.stress_periods;
