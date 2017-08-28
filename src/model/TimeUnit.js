import { findKey } from 'lodash';

export default class TimeUnit {
    _unit;

    static numberCodes = {
        0: 'undefined',
        1: 'seconds',
        2: 'minutes',
        3: 'hours',
        4: 'days',
        5: 'years'
    };

    constructor(unit) {
        if (typeof unit !== 'string') {
            throw new Error(
                'Expected first parameter to be a string, but got ' +
                    typeof unit
            );
        }

        this._unit = unit;
    }

    get unit() {
        return this._unit;
    }

    get toNumber() {
        return Number(findKey(TimeUnit.numberCodes, o => o === this._unit));
    }

    static fromNumber(number) {
        if (typeof number !== 'number') {
            throw new Error(
                'Expected first parameter to be a number, but got ' +
                    typeof number
            );
        }

        return new TimeUnit(TimeUnit.numberCodes[number]);
    }
}
