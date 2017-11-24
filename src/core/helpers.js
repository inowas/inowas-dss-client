import moment from 'moment';

export const addIdFromIndex = values =>
    values.map((value, index) => {
        return {...value, id: index};
    });

export const diffInDays = (start, end) => {
    const diff = Math.round(moment(end).diff(moment(start), 'days', true));
    return diff;
};
export const addDays = (days = {}) => date =>
    moment(date).add(days, 'd').toDate();
export const addMonths = (months = {}) => date =>
    moment(date).add(months, 'M').toDate();
export const addYears = (years = {}) => date =>
    moment(date).add(years, 'Y').toDate();
export const isBetweenDate = (date, start, end) =>
    moment(date).isSameOrAfter(moment(start)) &&
    moment(date).isSameOrBefore(moment(end));

export const getDateTimeValues = (boundary, observationPointId) => {
    if (boundary.hasOwnProperty('date_time_values')) {
        return boundary.date_time_values;
    }
    const observationPoints = boundary && boundary.observation_points ? boundary.observation_points : [];
    const observationPoint = observationPoints.filter(op => op.id === observationPointId)[0];
    if (!observationPoint) {
        return [];
    }
    return observationPoint.date_time_values;
};
