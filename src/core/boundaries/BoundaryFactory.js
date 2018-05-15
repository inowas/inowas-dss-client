/* eslint-disable camelcase */
import {ConstantHeadBoundary, GeneralHeadBoundary, RechargeBoundary, RiverBoundary, WellBoundary} from './index';
import Uuid from 'uuid';

export default class BoundaryFactory {
    static fromType = (type) => {
        switch (type) {
            case 'chd':
                return new ConstantHeadBoundary();
            case 'ghb':
                return new GeneralHeadBoundary();
            case 'rch':
                return new RechargeBoundary();
            case 'riv':
                return new RiverBoundary();
            case 'wel':
                return new WellBoundary();
        }

        throw new Error('BoundaryType ' + type + ' not implemented yet.');
    };

    static createByTypeAndStartDate({id = null, name = null, type, geometry, utcIsoStartDateTime}) {
        const boundary = BoundaryFactory.fromType(type);
        id ? boundary.id = id : boundary._id = Uuid.v4();
        name ? boundary.name = name : boundary._name = 'new ' + type + '-boundary';
        boundary.geometry = geometry;
        boundary.setDefaultStartValues(utcIsoStartDateTime);
        return boundary;
    }

    static fromObjectData = (objectData) => {
        const {id, name, geometry, type, affected_layers, metadata, date_time_values, observation_points, active_cells} = objectData;
        const boundary = BoundaryFactory.fromType(type);

        boundary.id = id;
        boundary.name = name;
        boundary.geometry = geometry;
        boundary.affectedLayers = affected_layers;
        boundary.metadata = metadata;
        boundary.activeCells = active_cells;

        if (date_time_values !== null) {
            boundary.dateTimeValues = date_time_values;
        }

        if (observation_points !== null) {
            boundary.observationPoints = observation_points;
        }

        return boundary;
    };
}
