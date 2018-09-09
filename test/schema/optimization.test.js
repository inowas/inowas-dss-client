import { optimization } from '../fixtures/optimization';
import Ajv from 'ajv';

const schema = require('../../src/core/optimization/optimization');

const validateOptimization = (opt) => {
    const ajv = new Ajv({schemaId: 'id'});
    ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));
    const validate = ajv.compile(schema);
    const valid = validate(JSON.parse(opt));
    if(!valid) {
        console.log('ERRORS', validate.errors);
    }
    return valid;
};

test('Testing Optimization', () => {
    expect(validateOptimization(JSON.stringify(optimization))).toBeTruthy();
});
