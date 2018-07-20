class Cell {
    _z;
    _y;
    _x;

    static fromTuple(tuple) {
        const cell = new Cell();
        cell._x = tuple[0];
        cell._y = tuple[1];
        cell._z = tuple[2];
        return cell;
    }

    toTuple() {
        return [this._x, this._y, this._z];
    }
}

class AffectedCells {
    _cells = [];

    static fromObject(obj) {
        const affectedCells = new AffectedCells();
        obj.forEach(c => affectedCells.addCell(c));
        return affectedCells;
    }

    static fromLayersAndCells(layers, cells) {
        const affectedCells = new AffectedCells();
        if (!Array.isArray(layers) || !Array.isArray(cells)) {
            return affectedCells;
        }

        layers.forEach(l => {
            cells.forEach(c => {
                affectedCells.addCell([c[0], c[1], l]);
            });
        });

        return affectedCells;
    }

    addCell(cell) {
        if (cell instanceof Cell) {
            this._cells.push(cell.toTuple());
            return;
        }

        if (Array.isArray(cell) && cell.length === 3) {
            this._cells.push(cell);
            return;
        }

        throw new Error('Unexpected value for Cell.');
    }

    get toObject() {
        return this._cells;
    }
}

export default AffectedCells;
