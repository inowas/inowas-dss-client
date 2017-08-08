import TimeUnit from '../../model/TimeUnit';
import LengthUnit from '../../model/LengthUnit';

export const getName = state => state.name;
export const getDescription = state => state.description;
export const getTimeUnit = state => TimeUnit.fromNumber( state.time_unit );
export const getLengthUnit = state => LengthUnit.fromNumber( state.length_unit );
export const getGeometry = state => state.geometry;
export const getBoundingBox = state => state.bounding_box;
export const getBoundaries = state => state.boundaries;
export const getGridSize = state => state.grid_size;
export const getModflowModel = state => state;
