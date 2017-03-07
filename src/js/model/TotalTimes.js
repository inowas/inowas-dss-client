export default class TotalTimes {

    _id;
    _type;
    _layer;
    _start;
    _end;
    _totalTimes = [];

    constructor(id, type, layer, start, end, totalTimes){
        this._id = id;
        this._type = type;
        this._layer = layer;
        this._start = new Date(start);
        this._end = new Date(end);
        this._totalTimes = totalTimes;
    };

    id() {
        return this._id;
    }

    type() {
        return this._type;
    }

    layer() {
        return this._layer;
    }

    start() {
        return this._start;
    }

    end() {
        return this._end;
    }

    totalTimes() {
        return this._totalTimes;
    }
}
