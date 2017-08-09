import { createSelector } from 'reselect'
import {getGeometry} from "../../t03/selectors/general";

export const getRows = ( page, perPage = {} ) => ( data ) => {
    const offset = (page - 1) * perPage;
    return data.slice( offset, page * perPage );
};
