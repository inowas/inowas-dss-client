/* eslint-disable camelcase */
import {WellBoundary} from './WellBoundary';
import Uuid from 'uuid';

export class Boundary {
    _id;
    _name;
    _geometry;
    _hasObservationPoints;
    _affectedLayers = [0];
    _metadata = {};
    _dateTimeValues = [];
    _activeCells = null;

    static fromType = (type) => {
        switch (type) {
            case 'wel':
                return new WellBoundary();
        }

        throw new Error('BoundaryType ' + type + ' not implemented yet.');
    };

    static createByTypeAndStartDate({id = null, name = null, type, geometry, utcIsoStartDateTime}) {
        const boundary = Boundary.fromType(type);
        id ? boundary.id = id : boundary._id = Uuid.v4();
        name ? boundary.name = name : boundary._name = 'new ' + type + '-boundary';
        boundary.geometry = geometry;
        boundary.setStartDateTimeValue(utcIsoStartDateTime);
        return boundary;
    }

    static fromObjectData = (objectData) => {
        const {id, name, geometry, type, affected_layers, metadata, date_time_values, active_cells} = objectData;
        const boundary = Boundary.fromType(type);

        boundary.id = id;
        boundary.name = name;
        boundary.geometry = geometry;
        boundary.affectedLayers = affected_layers;
        boundary.metadata = metadata;
        boundary.dateTimeValues = date_time_values;
        boundary.activeCells = active_cells;

        return boundary;
    };

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

    get dateTimeValues() {
        if (this.hasObservationPoints) {
            return null;
        }
        return this._dateTimeValues;
    }

    set dateTimeValues(dateTimeValues) {
        this._dateTimeValues = dateTimeValues;
    }

    get indexedDateTimeValues() {
        return this._dateTimeValues.map((value, index) => {
            return {...value, id: index};
        });
    }

    get isValid() {
        let valid = true;

        this._id ? valid = true : valid = false;
        this._name ? valid = true : valid = false;
        this._geometry ? valid = true : valid = false;
        Array.isArray(this._affectedLayers) && (this._affectedLayers.length > 0) ? valid = true : valid = false;
        typeof this._metadata === 'object' ? valid = true : valid = false;
        Array.isArray(this._dateTimeValues) && (this._dateTimeValues.length > 0) ? valid = true : valid = false;
        Array.isArray(this._activeCells) && (this._activeCells.length > 0) ? valid = true : valid = false;

        return valid;
    }

    get hasObservationPoints() {
        return this._hasObservationPoints;
    }

    get objectData() {
        return {
            id: this.id,
            name: this.name,
            geometry: this.geometry,
            type: this.type,
            affected_layers: this.affectedLayers,
            metadata: this.metadata,
            date_time_values: this.dateTimeValues,
            active_cells: this.activeCells
        };
    }
}
