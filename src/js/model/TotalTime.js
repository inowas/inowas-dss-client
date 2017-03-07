export default class TotalTime {

    _totim;

    constructor(totalTime){
        this._totim = parseInt(totalTime);
    };

    toString() {
        return this._totim.toString();
    }

    toInt() {
        return this._totim;
    }
}
