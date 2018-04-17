/* eslint-disable camelcase */
import Uuid from 'uuid';
import epsg from 'epsg';
import reproject from 'reproject';
import {dateImportFromCSV, removeThousandsSeparatorFromString} from '../formatter';
import {Boundary} from './Boundary';

export class WellBoundary extends Boundary {

    _hasObservationPoints = false;
    _metadata = {well_type: 'puw'};
    _type = 'wel';

    static createWithStartDate({id = null, name = null, geometry, utcIsoStartDateTime}) {
        const self = new this();
        id ? self._id = id : self._id = Uuid.v4();
        name ? self._name = name : self._name = 'new well';
        self._geometry = geometry;
        self._dateTimeValues = [
            {date_time: utcIsoStartDateTime, values: [0]}
        ];

        return self;
    }

    static createFromCsv({version, generalMetadata, boundaryMetadata, boundaryData}) {
        const boundary = new WellBoundary();

        if (version === 'v1') {
            let geojson = {
                type: boundaryMetadata[2],
                coordinates: [
                    parseFloat(removeThousandsSeparatorFromString(boundaryMetadata[4])),
                    parseFloat(removeThousandsSeparatorFromString(boundaryMetadata[5]))
                ]
            };

            geojson = reproject.toWgs84(geojson, boundaryMetadata[3], epsg);
            boundary._metadata.well_type = generalMetadata[5];
            boundary._name = boundaryMetadata[1];
            boundary._geometry = geojson;

            boundaryData.filter(bd => boundaryMetadata[1] === bd[1]).forEach(
                ds => {
                    boundary._dateTimeValues.push({
                        date_time: dateImportFromCSV(ds[2]),
                        values: [parseFloat(ds[3])]
                    });
                }
            );
        }

        return boundary;
    }

    static fromObjectData = (objectData) => {
        const {id, name, geometry, type, affected_layers, metadata, date_time_values, active_cells} = objectData;
        const self = new WellBoundary();

        self._id = id;
        self._name = name;
        self._geometry = geometry;
        self._type = type;
        self._affectedLayers = affected_layers;
        self._metadata = metadata;
        self._dateTimeValues = date_time_values;
        self._activeCells = active_cells;

        return self;
    };

    get isValid() {
        let valid = super.isValid;
        this._type === 'wel' ? valid = true : valid = false;
        this.geometry && this.geometry.type === 'Point' ? valid = true : valid = false;
        return valid;
    }

    get dateTimeValues() {
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

    set activeCells(activeCells) {
        this._activeCells = activeCells;
    }

    get objectData() {
        return {
            id: this._id,
            name: this._name,
            geometry: this._geometry,
            type: this._type,
            affected_layers: this._affectedLayers,
            metadata: this._metadata,
            date_time_values: this._dateTimeValues,
            active_cells: this._activeCells
        };
    }
}
