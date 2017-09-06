import BoundingBox from './BoundingBox';
import Coordinate from './Coordinate';
import GridCell from './GridCell';

export default class Grid {
    _nX;
    _nY;
    _boundingBox;

    constructor(boundingBox, nX, nY) {
        if (!(boundingBox instanceof BoundingBox)) {
            throw new Error(
                'Expected first parameter to be a BoundingBox, but got ' +
                    typeof boundingBox
            );
        }

        if (typeof nX !== 'number') {
            throw new Error(
                'Expected second parameter to be a number, but got ' + typeof nX
            );
        }

        if (typeof nY !== 'number') {
            throw new Error(
                'Expected third parameter to be a number, but got ' + typeof nY
            );
        }

        this._boundingBox = boundingBox;
        this._nX = nX;
        this._nY = nY;
    }

    get boundingBox() {
        return this._boundingBox;
    }

    get nX() {
        return this._nX;
    }

    get nY() {
        return this._nY;
    }

    get dLng() {
        return (
            (this.boundingBox.northEast.lng - this.boundingBox.southWest.lng) /
            this.nX
        );
    }

    get dLat() {
        return (
            (this.boundingBox.northEast.lat - this.boundingBox.southWest.lat) /
            this.nY
        );
    }

    coordinateToGridCell(coordinate) {
        if (!(coordinate instanceof Coordinate)) {
            throw new Error(
                'Expected first parameter to be a Coordinate, but got ' +
                    typeof coordinate
            );
        }

        const x = Math.floor(
            (coordinate.lng - this.boundingBox.southWest.lng) / this.dLng
        );
        const y =
            this.nY -
            1 -
            Math.floor(
                (coordinate.lat - this.boundingBox.southWest.lat) / this.dLat
            );

        const gridCell = new GridCell(x, y);

        if (this.isGridCellInGrid(gridCell)) {
            return gridCell;
        }
        return null;
    }

    gridCellToBoundingBox(gridCell) {
        if (!(gridCell instanceof GridCell)) {
            throw new Error(
                'Expected first parameter to be a GridCell, but got ' +
                    typeof gridCell
            );
        }

        const southWest = new Coordinate(
            this.boundingBox.southWest.lat +
                this.dLat * (this.nY - gridCell.y - 1),
            this.boundingBox.southWest.lng + this.dLng * gridCell.x
        );
        const northEast = new Coordinate(
            this.boundingBox.southWest.lat + this.dLat * (this.nY - gridCell.y),
            this.boundingBox.southWest.lng + this.dLng * (gridCell.x + 1)
        );

        return new BoundingBox(southWest, northEast);
    }

    gridCellToXCrossectionBoundingBox(gridCell) {
        if (!(gridCell instanceof GridCell)) {
            throw new Error(
                'Expected first parameter to be a GridCell, but got ' +
                    typeof gridCell
            );
        }

        const southWest = new Coordinate(
            this.boundingBox.southWest.lat +
                this.dLat * (this.nY - gridCell.y - 1),
            this.boundingBox.southWest.lng
        );
        const northEast = new Coordinate(
            this.boundingBox.southWest.lat + this.dLat * (this.nY - gridCell.y),
            this.boundingBox.northEast.lng
        );

        return new BoundingBox(southWest, northEast);
    }

    isGridCellInGrid(gridCell) {
        if (!(gridCell instanceof GridCell)) {
            throw new Error(
                'Expected first parameter to be a GridCell, but got ' +
                    typeof gridCell
            );
        }

        return (
            gridCell.y >= 0 &&
            gridCell.y < this.nY &&
            gridCell.x >= 0 &&
            gridCell.x < this.nX
        );
    }

    lngOfCellCenter(x) {
        const xMin = this.boundingBox.southWest.lng;
        const xMax = this.boundingBox.northEast.lng;
        const dX = (xMax - xMin) / this.nX;

        return xMin + (x + 0.5) * dX;
    }

    latOfCellCenter(y) {
        const yMin = this.boundingBox.southWest.lat;
        const yMax = this.boundingBox.northEast.lat;
        const dY = (yMax - yMin) / this.nY;

        return yMin + (y + 0.5) * dY;
    }

    get lngOfCellCenters() {
        const xMin = this.boundingBox.southWest.lng;
        const xMax = this.boundingBox.northEast.lng;
        const dX = (xMax - xMin) / this.nX;

        const column = [];
        for (let i = 0; i < this.nX; i++) {
            column.push(xMin + (i + 0.5) * dX);
        }

        return column;
    }
}
