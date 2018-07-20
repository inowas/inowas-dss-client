import { optimization } from '../fixtures/optimization';
import Ajv from 'ajv';

const schema = require('../../src/schema/optimization');

const validateGeoJson = (geoJson) => {
    const ajv = new Ajv({schemaId: 'id'});
    ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));
    const validate = ajv.compile(schema);
    return validate(JSON.parse(geoJson));
};

test('Testing Optimization', () => {
    expect(validateGeoJson(JSON.stringify(optimization))).toBeTruthy();
});
