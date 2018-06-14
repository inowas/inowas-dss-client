import Boundary from './Boundary';

export default class SingleOPBoundary extends Boundary {

    _dateTimeValues = [];

    setDefaultStartValues(utcIsoStartDateTime) {
        this._dateTimeValues = [
            {date_time: utcIsoStartDateTime, values: this.defaultValues}
        ];
    }

    get dateTimeValues() {
        return this.getDateTimeValues();
    }

    set dateTimeValues(dateTimeValues) {
        return this.setDateTimeValues(dateTimeValues);
    }

    getDateTimeValues() {
        return this._dateTimeValues;
    }

    get indexedDateTimeValues() {
        return this.getIndexedDateTimeValues().map((value, index) => {
            return {...value, id: index};
        });
    }

    setDateTimeValues(dateTimeValues) {
        this._dateTimeValues = dateTimeValues;
    }

    getIndexedDateTimeValues() {
        return this._dateTimeValues.map((value, index) => {
            return {...value, id: index};
        });
    }

    get isValid() {
        super.isValid;

        // noinspection RedundantIfStatementJS
        if (!(Array.isArray(this._dateTimeValues) && (this._dateTimeValues.length > 0))) {
            throw new Error('The parameter _dateTimeValues is not not valid.');
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
