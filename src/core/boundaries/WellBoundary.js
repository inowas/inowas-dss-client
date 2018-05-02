/* eslint-disable camelcase */
import epsg from 'epsg';
import reproject from 'reproject';
import {dateImportFromCSV, removeThousandsSeparatorFromString} from '../formatter';
import {Boundary} from './Boundary';

export class WellBoundary extends Boundary {

    _hasObservationPoints = false;
    _metadata = {well_type: 'puw'};
    _type = 'wel';

    static createWithStartDate({id = null, name = null, geometry, utcIsoStartDateTime}) {
        return Boundary.createByTypeAndStartDate({id, name, type: 'wel', geometry, utcIsoStartDateTime});
    }

    static createFromCsv({version, generalMetadata, boundaryMetadata, boundaryData}) {
        const well = new WellBoundary();

        if (version === 'v1') {
            let geojson = {
                type: boundaryMetadata[2],
                coordinates: [
                    parseFloat(removeThousandsSeparatorFromString(boundaryMetadata[4])),
                    parseFloat(removeThousandsSeparatorFromString(boundaryMetadata[5]))
                ]
            };

            geojson = reproject.toWgs84(geojson, boundaryMetadata[3], epsg);
            well.wellType = generalMetadata[5];
            well.name = boundaryMetadata[1];
            well.geometry = geojson;

            boundaryData.filter(bd => boundaryMetadata[1] === bd[1]).forEach(
                ds => {
                    well._dateTimeValues.push({
                        date_time: dateImportFromCSV(ds[2]), values: [parseFloat(ds[3])]
                    });
                }
            );
        }

        return well;
    }

    static createFromObject(objectData) {
        objectData.type = 'wel';
        return Boundary.fromObjectData(objectData);
    }

    get isValid() {
        let valid = super.isValid;
        this._type === 'wel' ? valid = true : valid = false;
        this.geometry && this.geometry.type === 'Point' ? valid = true : valid = false;
        return valid;
    }

    get wellType() {
        return (this._metadata && this._metadata.well_type) || 'puw';
    }

    set wellType(type) {
        this._metadata.well_type = type;
    }

    setStartDateTimeValue(utcIsoStartDateTime) {
        this.dateTimeValues = [
            {date_time: utcIsoStartDateTime, values: [0]}
        ];
    }
}
