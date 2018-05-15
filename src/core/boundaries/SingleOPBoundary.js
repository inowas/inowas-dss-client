import Boundary from './Boundary';

export default class SingleOPBoundary extends Boundary {

    _dateTimeValues = [];

    setDefaultStartValues(utcIsoStartDateTime) {
        this._dateTimeValues = [
            {date_time: utcIsoStartDateTime, values: this.defaultValues}
        ];
    }

    getDateTimeValues() {
        return this._dateTimeValues;
    }

    setDateTimeValues(dateTimeValues) {
        this._dateTimeValues = dateTimeValues;
    }

    getIndexedDateTimeValues() {
        return this._dateTimeValues.map((value, index) => {
            return {...value, id: index};
        });
    }
}
