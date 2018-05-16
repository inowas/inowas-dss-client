import Papa from 'papaparse';
import * as Importer from './Importer';
import {uniq} from 'lodash';

const validBoundaryTypes = ['chd', 'ghb', 'rch', 'riv', 'wel'];
const validLengthUnits = ['m'];
const validTimeUnits = ['d'];
const validVersions = ['v1'];

const assertArrayContains = (needle, haystack, errorMessage) => {
    if (haystack.indexOf(needle) === -1) {
        throw new Error(errorMessage);
    }
};

const parseCSV = csv => {
    const generalMetaDataArray = csv.filter(d => Number(d[0]) === 0);

    if (!Array.isArray(generalMetaDataArray) || generalMetaDataArray.length === 0) {
        throw new Error('No valid generalMetadata found');
    }

    const generalMetaData = generalMetaDataArray[0];

    if (!Array.isArray(generalMetaData) || generalMetaData.length === 0) {
        throw new Error('No valid generalMetadata found');
    }

    const version = generalMetaData[1];
    assertArrayContains(version, validVersions, 'Invalid protocol version ' + version + '. Valid versions are: ' + validVersions.toString());

    const boundaryType = generalMetaData[2].toLowerCase();
    assertArrayContains(boundaryType, validBoundaryTypes, 'Invalid boundaryType ' + boundaryType + '. Valid boundaryTypes are: ' + validBoundaryTypes.toString());

    const lengthUnit = generalMetaData[3];
    assertArrayContains(lengthUnit, validLengthUnits, 'Invalid lengthUnit ' + lengthUnit + '. Valid lengthUnits are: ' + validLengthUnits.toString());

    const timeUnit = generalMetaData[4];
    assertArrayContains(timeUnit, validTimeUnits, 'Invalid timeUnit ' + timeUnit + '. Valid timeUnit are: ' + validTimeUnits.toString());

    const boundaryMetaData = csv.filter(d => Number(d[0]) === 1);
    const boundaryData = csv.filter(d => Number(d[0]) === 2);

    return {version, boundaryType, generalMetaData, boundaryMetaData, boundaryData};
};

export const importBoundariesFromCsv = (inputString) => {
    const rawData = Papa.parse(inputString).data;
    const {version, boundaryType, generalMetaData, boundaryMetaData, boundaryData} = parseCSV(rawData);
    const boundaries = [];
    const boundaryIds = uniq(boundaryMetaData.map(bmd => bmd[1]));

    switch (boundaryType) {
        case 'chd':
            boundaryIds.forEach(id => {
                const boundary = Importer.importConstantHeadBoundary({
                    version,
                    generalMetaData,
                    boundaryMetaData: boundaryMetaData.filter(bmd => bmd[1] === id),
                    boundaryData: boundaryData.filter(bd => bd[1] === id)
                });
                if (boundary.isValid) {
                    boundaries.push(boundary);
                }
            });
            break;
        case 'rch':
            boundaryIds.forEach(id => {
                const boundary = Importer.importRechargeBoundary({
                    version,
                    generalMetaData,
                    boundaryMetaData: boundaryMetaData.filter(bmd => bmd[1] === id),
                    boundaryData: boundaryData.filter(bd => bd[1] === id)
                });
                if (boundary.isValid) {
                    boundaries.push(boundary);
                }
            });
            break;
        case 'wel':
            boundaryIds.forEach(id => {
                const boundary = Importer.importWellBoundary({
                    version,
                    generalMetaData,
                    boundaryMetaData: boundaryMetaData.filter(bmd => bmd[1] === id),
                    boundaryData: boundaryData.filter(bd => bd[1] === id)
                });
                if(boundary.isValid) {
                    boundaries.push(boundary);
                }
            });
            break;
    }

    return boundaries;
};

export const validateCsv = (inputString) => {
    const validate = Papa.parse(inputString);
    const isValid = validate.errors.length === 0;
    return [isValid, validate.errors];
};
