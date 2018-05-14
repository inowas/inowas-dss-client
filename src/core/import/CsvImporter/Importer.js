/* eslint-disable no-unused-vars */
import epsg from 'epsg';
import {RechargeBoundary} from '../../boundaries';
import {WellBoundary} from '../../boundaries';
import reproject from 'reproject';
import {dateImportFromCSV, removeThousandsSeparatorFromString} from '../../formatter';

function parseGeoJsonFromCSV(boundaryMetaData) {
    // first line of metaData contains projection and geometryType
    const projection = boundaryMetaData[0][3];
    const type = boundaryMetaData[0][2];

    const coordinates = [];
    boundaryMetaData.forEach( bmd => {
        coordinates.push([
            parseFloat(removeThousandsSeparatorFromString(bmd[4])),
            parseFloat(removeThousandsSeparatorFromString(bmd[5]))
        ]);
    });

    const geojson = {type, coordinates};
    return reproject.toWgs84(geojson, projection, epsg);
}

export function importWellBoundary({version, generalMetaData, boundaryMetaData, boundaryData}) {
    if (version === 'v1') {
        const boundary = new WellBoundary();

        boundary.wellType = generalMetaData[5];
        boundary.name = boundaryMetaData[1];
        boundary.geometry = parseGeoJsonFromCSV(boundaryMetaData);

        boundaryData.filter(bd => boundaryMetaData[1] === bd[1]).forEach(
            ds => {
                boundary._dateTimeValues.push({
                    date_time: dateImportFromCSV(ds[2]), values: [parseFloat(ds[3])]
                });
            }
        );

        return boundary;
    }

    throw new Error('Unknown Version ' + version + '.');
}

export function importRechargeBoundary({version, generalMetaData, boundaryMetaData, boundaryData}) {
    if (version === 'v1') {
        const boundary = new RechargeBoundary();

        boundary.name = boundaryMetaData[1];
        boundary.geometry = parseGeoJsonFromCSV(boundaryMetaData);

        boundaryData.filter(bd => boundaryMetaData[1] === bd[1]).forEach(
            ds => {
                boundary._dateTimeValues.push({
                    date_time: dateImportFromCSV(ds[2]), values: [parseFloat(ds[3])]
                });
            }
        );
        return boundary;
    }

    throw new Error('Unknown Version ' + version + '.');
}
