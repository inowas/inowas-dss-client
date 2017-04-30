import { schema } from 'normalizr';

export const number = new schema.Entity('number');
export const arrayOfNumbers = new schema.Array(number);
