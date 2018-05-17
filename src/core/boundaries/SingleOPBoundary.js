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

    addDateTimeValue(dateTimeValue) {
        this._dateTimeValues.push(dateTimeValue);
    }

    setDateTimeValues(dateTimeValues) {
        this._dateTimeValues = dateTimeValues;
    }

    getIndexedDateTimeValues() {
        return this._dateTimeValues.map((value, index) => {
            return {...value, id: index};
        });
    }

    isValid() {
        if (!super.isValid) {
            return false;
        }

        // noinspection RedundantIfStatementJS
        if (!(Array.isArray(this._dateTimeValues) && (this._dateTimeValues.length > 0))) {
            return false;
        }

        return true;
    }

    get toObject() {
        return {
            ...super.toObject,
            date_time_values: this.dateTimeValues
        };
    }
}
