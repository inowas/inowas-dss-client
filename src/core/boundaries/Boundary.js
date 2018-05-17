/* eslint-disable camelcase */

export default class Boundary {
    _id;
    _name;
    _geometry;
    _affectedLayers = [0];
    _metadata = {};
    _activeCells = null;
    _defaultValues = [];

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get geometry() {
        return this._geometry;
    }

    set geometry(geometry) {
        this._geometry = geometry;
    }

    get affectedLayers() {
        return this._affectedLayers;
    }

    set affectedLayers(affectedLayers) {
        this._affectedLayers = affectedLayers;
    }

    get metadata() {
        return this._metadata;
    }

    set metadata(metadata) {
        this._metadata = metadata;
    }

    get activeCells() {
        return this._activeCells;
    }

    set activeCells(activeCells) {
        this._activeCells = activeCells;
    }

    get type() {
        return this._type;
    }

    get isValid() {
        if (!this._id) {
            return false;
        }
        if (!this._name) {
            return false;
        }
        if (!this._geometry) {
            return false;
        }
        if (!(Array.isArray(this._affectedLayers) && (this._affectedLayers.length > 0))) {
            return false;
        }
        if (typeof this._metadata !== 'object') {
            return false;
        }

        // noinspection RedundantIfStatementJS
        if (!(Array.isArray(this._activeCells) && (this._activeCells.length > 0))) {
            return false;
        }

        return true;
    }

    get toObject() {
        return {
            id: this.id,
            name: this.name,
            geometry: this.geometry,
            type: this.type,
            affected_layers: this.affectedLayers,
            metadata: this.metadata,
            active_cells: this.activeCells
        };
    }

    get defaultValues() {
        return this._defaultValues;
    }

    get numberOfValues() {
        return this.defaultValues.length;
    }
}
