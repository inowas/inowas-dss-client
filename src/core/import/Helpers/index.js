import Ajv from 'ajv/lib/ajv';

export const isJsonValid = (json) => {
    try {
        JSON.parse(json);
    } catch (e) {
        return false;
    }
    return true;
};

export const prettifyJson = (geoJson) => {
    if (!isJsonValid(geoJson)) {
        return geoJson;
    }

    return JSON.stringify(JSON.parse(geoJson), null, 2);
};

export const validateGeoJson = (geoJson) => {
    if (!isJsonValid(geoJson)) {
        return false;
    }

    const ajv = new Ajv({schemaId: 'id'});
    ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));
    const validate = ajv.compile(require('schema/geojson.json'));
    return [validate(JSON.parse(geoJson)), validate.errors];
};
