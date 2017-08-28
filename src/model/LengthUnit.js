import { findKey } from 'lodash';

export default class LengthUnit {
    _unit;

    static numberCodes = {
        0: 'undefined',
        1: 'feet',
        2: 'meters',
        3: 'centimeters'
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
        return Number(findKey(LengthUnit.numberCodes, o => o === this._unit));
    }

    static fromNumber(number) {
        if (typeof number !== 'number') {
            throw new Error(
                'Expected first parameter to be a number, but got ' +
                    typeof number
            );
        }

        return new LengthUnit(LengthUnit.numberCodes[number]);
    }
}
