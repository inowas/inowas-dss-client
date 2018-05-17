/* eslint-disable no-unused-vars,camelcase */
import epsg from 'epsg';
import reproject from 'reproject';
import {dateImportFromCSV, removeThousandsSeparatorFromString} from '../../formatter';
import {BoundaryFactory} from '../../boundaries/index';
import MultipleOPBoundary from '../../boundaries/MultipleOPBoundary';
import SingleOPBoundary from '../../boundaries/SingleOPBoundary';
import WellBoundary from '../../boundaries/WellBoundary';

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

function parseObservationPoints({boundaryMetaData, boundaryData}, numberOfValues = 1) {
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
                const values = [];
                for (let i = 0; i < numberOfValues; i++) {
                    values.push(parseFloat(bd[4 + i]));
                }
                op.date_time_values.push({date_time: dateTime, values});
            }
        });
    });

    return observationPoints;
}

function parseDateTimeValues({boundaryData}, numberOfValues = 1) {
    const dateTimeValues = [];
    boundaryData.forEach(
        ds => {
            const values = [];
            for (let i = 0; i < numberOfValues; i++) {
                values.push(parseFloat(ds[3 + i]));
            }

            dateTimeValues.push({
                date_time: dateImportFromCSV(ds[2]),
                values
            });
        }
    );

    return dateTimeValues;
}

function parseAffectedLayersCell(affectedLayersCell) {
    // could be an int (3) or a comma-separated string for multiple layers (3,4)
    // lets split it first
    return affectedLayersCell.split(',').map(value => parseInt(value, 10));
}

export function importBoundary({version, generalMetaData, boundaryMetaData, boundaryData}) {
    if (version === 'v1') {
        const boundaryType = generalMetaData[2];
        const boundary = BoundaryFactory.fromType(boundaryType);
        boundary.name = boundaryMetaData[0][1];
        boundary.geometry = parseGeoJsonFromCSV(boundaryMetaData);

        if (boundary instanceof WellBoundary) {
            boundary.wellType = boundaryMetaData[0][7];
        }

        if (boundary instanceof SingleOPBoundary) {
            boundary.affectedLayers = parseAffectedLayersCell(boundaryMetaData[0][6]);
            boundary.setDateTimeValues(parseDateTimeValues({boundaryData}, boundary.numberOfValues));
        }

        if (boundary instanceof MultipleOPBoundary) {
            boundary.affectedLayers = parseAffectedLayersCell(boundaryMetaData[0][8]);
            boundary.observationPoints = parseObservationPoints({
                boundaryMetaData,
                boundaryData
            }, boundary.numberOfValues);
        }

        return boundary;
    }

    throw new Error('Unknown Version ' + version + '.');
}
