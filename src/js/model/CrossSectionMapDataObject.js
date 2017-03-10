/**
 * CrossSectionMapDataObject Base Class
 */
export default class CrossSectionMapDataObject {

    _area;
    _boundingBox;
    _gridSize;
    _boundaries = [];
    _legend;
    _imgUrl;

    static fromProps(area, boundingBox, gridSize, boundaries, legend=null, imgUrl=null) {
        const self = new CrossSectionMapDataObject();
        self._area = area;
        self._boundingBox = boundingBox;
        self._gridSize = gridSize;
        self._boundaries = boundaries;
        self._legend = legend;
        self._imgUrl = imgUrl;
        return self;
    }

    area = () => {
        return this._area;
    };

    boundingBox = () => {
        return this._boundingBox;
    };

    gridSize = () => {
        return this._gridSize;
    };

    boundaries = () => {
        return this._boundaries;
    };

    legend = () => {
        return this._legend;
    };

    imgUrl = () => {
        return this._imgUrl;
    };
}
