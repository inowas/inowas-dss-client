import Papa from 'papaparse';
import {WellBoundary} from '../../boundaries/WellBoundary';

const validBoundaryTypes = ['chd', 'ghb', 'rch', 'riv', 'wel'];
const validLengthUnits = ['m'];
const validTimeUnits = ['d'];
const validVersions = ['v1'];

const readBoundariesFromData = ({version, boundaryType, generalMetadata, boundaryMetaData, boundaryData}) => {

    const boundaries = [];
    switch (boundaryType) {
        case 'wel':
            boundaryMetaData.forEach(bmd => {
                const boundary = WellBoundary.createFromCsv({version, generalMetadata, boundaryMetadata: bmd, boundaryData});
                if (boundary.isValid()) {
                    boundaries.push(boundary);
                }
            });
            break;
    }

    return boundaries;
};

const assertArrayContains = (needle, haystack, errorMessage) => {
    if (haystack.indexOf(needle) === -1) {
        throw new Error(errorMessage);
    }
};

const readBoundariesFromRawData = rawData => {
    const generalMetadataArray = rawData.filter(d => Number(d[0]) === 0);

    if (!Array.isArray(generalMetadataArray) || generalMetadataArray.length === 0) {
        throw new Error('No valid generalMetadata found');
    }

    const generalMetadata = generalMetadataArray[0];

    if (!Array.isArray(generalMetadata) || generalMetadata.length === 0) {
        throw new Error('No valid generalMetadata found');
    }

    const version = generalMetadata[1];
    assertArrayContains(version, validVersions, 'Invalid protocol version ' + version + '. Valid versions are: ' + validVersions.toString());

    const boundaryType = generalMetadata[2].toLowerCase();
    assertArrayContains(boundaryType, validBoundaryTypes, 'Invalid boundaryType ' + boundaryType + '. Valid boundaryTypes are: ' + validBoundaryTypes.toString());

    const lengthUnit = generalMetadata[3];
    assertArrayContains(lengthUnit, validLengthUnits, 'Invalid lengthUnit ' + lengthUnit + '. Valid lengthUnits are: ' + validLengthUnits.toString());

    const timeUnit = generalMetadata[4];
    assertArrayContains(timeUnit, validTimeUnits, 'Invalid timeUnit ' + timeUnit + '. Valid timeUnit are: ' + validTimeUnits.toString());

    const boundaryMetaData = rawData.filter(d => Number(d[0]) === 1);
    const boundaryData = rawData.filter(d => Number(d[0]) === 2);

    return readBoundariesFromData({version, boundaryType, generalMetadata, boundaryMetaData, boundaryData});
};

export const importBoundariesFromCsv = (inputString) => {
    const rawData = Papa.parse(inputString).data;
    return readBoundariesFromRawData(rawData);
};

export const validateCsv = (inputString) => {
    const validate = Papa.parse(inputString);
    const isValid = validate.errors.length === 0;
    return [isValid, validate.errors];
};
