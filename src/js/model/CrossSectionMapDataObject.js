import Grid from './Grid';
import BoundingBox from './BoundingBox';

/**
 * CrossSectionMapDataObject Base Class
 */
export default class CrossSectionMapDataObject {

    _area;
    _grid;
    _boundaries = [];
    _xCrossSection;
    _activeGridCells = [];
    _legend;
    _imgUrl;

    static fromProps(area, grid, boundaries, xCrossSection, activeGridCells, legend = null, imgUrl = null) {
        const self = new CrossSectionMapDataObject();
        self._area = area;

        if ( !( grid instanceof Grid ) ) {
            throw new Error( 'Expected second parameter to be a Grid, but got ' + ( typeof grid ) );
        }
        self._grid = grid;

        self._boundaries = boundaries;

        // null is possible
        if ( !( xCrossSection instanceof BoundingBox ) && xCrossSection !== null ) {
            throw new Error( 'Expected fourth parameter to be a BoundingBox, but got ' + ( typeof xCrossSection ) );
        }
        self._xCrossSection = xCrossSection;

        if ( !( activeGridCells instanceof Array ) ) {
            throw new Error('Expected fifth parameter to be an array, but got ' + (typeof activeGridCells));
        }
        self._activeGridCells = activeGridCells;

        self._legend = legend;
        self._imgUrl = imgUrl;
        return self;
    }

    get area() {
        return this._area;
    }

    get boundingBox() {
        return this._grid.boundingBox;
    }

    // gridSize = () => {
    //     return this._gridSize;
    // };

    get boundaries() {
        return this._boundaries;
    }

    get xCrossSection() {
        return this._xCrossSection;
    }

    get activeGridCells() {
        return this._activeGridCells;
    }

    get legend() {
        return this._legend;
    }

    get imgUrl() {
        return this._imgUrl;
    }
}
