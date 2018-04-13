/* eslint-disable camelcase */
import Uuid from 'uuid';
import epsg from 'epsg';
import reproject from 'reproject';
import {dateToAtomFormat, dateToDateIgnoreTimeZones, removeThousandsSeparatorFromString} from '../formatter';

export const createDefault = ({id = null, name = '', geometry, startDateTime}) => {
    return {
        id: id,
        name: name,
        geometry: geometry,
        type: 'wel',
        affected_layers: [0],
        metadata: {
            well_type: 'puw'
        },
        date_time_values: [{
            date_time: startDateTime,
            values: [0]
        }]
    };
};


export class WellBoundary {
    _id;
    _name;
    _geometry;
    _type = 'wel';
    _affectedLayers = [0];
    _metadata = {well_type: 'puw'};
    _dateTimeValues = [];

    static createDefault({id = null, name = '', geometry, startDateTime}) {
        const self = new this();
        id ? self._id = id : self._id = Uuid.v4();
        self._name = name;
        self._geometry = geometry;
        self._startDateTime = startDateTime;
        return self;
    }

    static createFromCsv({version, generalMetadata, boundaryMetadata, boundaryData}) {
        const boundary = new this();

        if (version === 'v1') {
            let geojson = {
                type: boundaryMetadata[2],
                coordinates: [parseFloat(removeThousandsSeparatorFromString(boundaryMetadata[4])), parseFloat(removeThousandsSeparatorFromString(boundaryMetadata[5]))]
            };

            geojson = reproject.toWgs84(geojson, boundaryMetadata[3], epsg);
            boundary._metadata.well_type = generalMetadata[5];
            boundary._name = boundaryMetadata[1];
            boundary._geometry = geojson;

            boundaryData.filter(bd => boundaryMetadata[1] === bd[1]).forEach(
                ds => {
                    boundary._dateTimeValues.push({
                        date_time: dateToAtomFormat(dateToDateIgnoreTimeZones(ds[2])),
                        values: [parseFloat(ds[3])]
                    });
                }
            );
        }

        return boundary;
    }

    static fromObject = ({id, name, geometry, type, affected_layers, metadata, date_time_values}) => {
        const self = new this();
        self._id = id;
        self._name = name;
        self._geometry = geometry;
        self._type = type;
        self._affectedLayers = affected_layers;
        self._metadata = metadata;
        self._dateTimeValues = date_time_values;
        return self;
    };

    isValid = () => {
        return true;
    };

    toObject = () => ({
        id: this._id,
        name: this._name,
        geometry: this._geometry,
        type: this._type,
        affected_layers: this._affectedLayers,
        metadata: this._metadata,
        date_time_values: this._dateTimeValues
    })
}
