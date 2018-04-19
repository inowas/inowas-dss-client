/* eslint-disable camelcase */
import Uuid from 'uuid';
import epsg from 'epsg';
import reproject from 'reproject';
import {dateImportFromCSV, removeThousandsSeparatorFromString} from '../formatter';
import {Boundary} from './Boundary';

export class RechargeBoundary extends Boundary {

    _hasObservationPoints = false;
    _type = 'rch';

    static createWithStartDate({id = null, name = null, geometry, utcIsoStartDateTime}) {
        return Boundary.createByTypeAndStartDate({id, name, type: 'rch', geometry, utcIsoStartDateTime});
    }

    // Todo
    static createFromCsv({version, generalMetadata, boundaryMetadata, boundaryData}) {
        const boundary = new RechargeBoundary();

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

    get isValid() {
        let valid = super.isValid;
        this._type === 'rch' ? valid = true : valid = false;
        this.geometry && this.geometry.type === 'Polygon' ? valid = true : valid = false;
        return valid;
    }

    setStartDateTimeValue(utcIsoStartDateTime) {
        this.dateTimeValues = [
            {date_time: utcIsoStartDateTime, values: [0]}
        ];
    }
}
