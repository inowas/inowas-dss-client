/* eslint-disable no-unused-vars,camelcase */
import epsg from 'epsg';
import reproject from 'reproject';
import {dateImportFromCSV, removeThousandsSeparatorFromString} from '../../formatter';
import {BoundaryFactory} from '../../boundaries/index';

function parseGeoJsonFromCSV(boundaryMetaData) {
    // first line of metaData contains projection and geometryType
    const projection = boundaryMetaData[0][3];
    const type = boundaryMetaData[0][2];

    if (type === 'Point') {
        const pointGeojson = {
            type: 'Point',
            coordinates: [
                parseFloat(removeThousandsSeparatorFromString(boundaryMetaData[0][4])),
                parseFloat(removeThousandsSeparatorFromString(boundaryMetaData[0][5]))
            ]
        };

        return reproject.toWgs84(pointGeojson, projection, epsg);
    }

    const coordinates = [];
    boundaryMetaData.forEach(bmd => {
        coordinates.push([
            parseFloat(removeThousandsSeparatorFromString(bmd[4])),
            parseFloat(removeThousandsSeparatorFromString(bmd[5]))
        ]);
    });

    const geojson = {type, coordinates};
    return reproject.toWgs84(geojson, projection, epsg);
}

function parseObservationPoints({boundaryMetaData, boundaryData}) {
    const observationPoints = [];
    const projection = boundaryMetaData[0][3];
    boundaryMetaData.forEach(bmd => {
        if (bmd[6] && bmd[6].length > 0 && bmd[7] && bmd[7].length > 0) {
            const id = bmd[6];
            const name = bmd[7];
            const geojson = {
                type: 'Point',
                coordinates: [
                    parseFloat(removeThousandsSeparatorFromString(bmd[4])),
                    parseFloat(removeThousandsSeparatorFromString(bmd[5]))
                ]
            };

            const geometry = reproject.toWgs84(geojson, projection, epsg);
            const date_time_values = [];
            observationPoints.push({id, name, geometry, date_time_values});
        }
    });

    observationPoints.forEach(op => {
        boundaryData.forEach(bd => {
            const opId = bd[2];
            if (op.id === opId) {
                const dateTime = dateImportFromCSV(bd[3]);
                const sHead = parseFloat(bd[4]);
                const eHead = parseFloat(bd[5]);
                op.date_time_values.push({
                    date_time: dateTime,
                    values: [sHead, eHead]
                });
            }
        });
    });

    return observationPoints;
}

export function importConstantHeadBoundary({version, generalMetaData, boundaryMetaData, boundaryData}) {
    if (version === 'v1') {
        const boundary = BoundaryFactory.fromType('chd');
        boundary.name = boundaryMetaData[1];
        boundary.geometry = parseGeoJsonFromCSV(boundaryMetaData);
        boundary.observationPoints = parseObservationPoints({boundaryMetaData, boundaryData});
        return boundary;
    }

    throw new Error('Unknown Version ' + version + '.');
}

export function importRechargeBoundary({version, generalMetaData, boundaryMetaData, boundaryData}) {
    if (version === 'v1') {
        const boundary = BoundaryFactory.fromType('rch');
        boundary.name = boundaryMetaData[1];
        boundary.geometry = parseGeoJsonFromCSV(boundaryMetaData);

        boundaryData.filter(bd => boundaryMetaData[1] !== bd[1]).forEach(
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

export function importWellBoundary({version, generalMetaData, boundaryMetaData, boundaryData}) {
    if (version === 'v1') {
        const boundary = BoundaryFactory.fromType('wel');
        boundary.wellType = generalMetaData[5];
        boundary.name = boundaryMetaData[0][1];
        boundary.affectedLayers = [parseInt(boundaryMetaData[0][6], 10)];
        boundary.geometry = parseGeoJsonFromCSV(boundaryMetaData);

        boundaryData.filter(bd => boundaryMetaData[1] !== bd[1]).forEach(
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

