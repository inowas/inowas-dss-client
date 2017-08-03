import BoundaryType from './BoundaryType';
import BoundaryMetadata from './BoundaryMetadata';

export default class Boundary {
    _id;
    _name;
    _type;
    _geometry;
    _affectedLayers; // array
    _metadata;
    _observationPoints; // array

    constructor(id, name, type, geometry, affectedLayers = [], metadata = null, observationPoints = null) {
        if ( typeof id !== 'string' ) {
            throw new Error( 'Expected first parameter to be a string, but got ' + ( typeof id ) );
        }
        this._id = id;

        if ( typeof name !== 'string' ) {
            throw new Error( 'Expected second parameter to be a string, but got ' + ( typeof name ) );
        }
        this._name = name;

        if ( !( type instanceof BoundaryType ) ) {
            throw new Error( 'Expected third parameter to be a BoundaryType, but got ' + ( typeof type ) );
        }
        this._type = type;

        if ( typeof geometry !== 'object' ) {
            throw new Error( 'Expected fourth parameter to be an object, but got ' + ( typeof geometry ) );
        }
        this._geometry = geometry;

        if ( !( affectedLayers instanceof Array ) ) {
            throw new Error( 'Expected fifth parameter to be an array, but got ' + ( typeof affectedLayers ) );
        }
        this._affectedLayers = affectedLayers;

        // optional
        // if ( !( metadata instanceof BoundaryMetadata ) && metadata !== null ) {
        //     throw new Error( 'Expected sixth parameter to be a BoundaryMetadata, but got ' + ( typeof metadata ) );
        // }
        this._metadata = metadata;

        // optional
        if ( !( observationPoints instanceof Array ) && observationPoints !== null ) {
            throw new Error( 'Expected seventh parameter to be an array, but got ' + ( typeof observationPoints ) );
        }
        this._observationPoints = observationPoints;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get type() {
        return this._type;
    }

    get geometry() {
        return this._geometry;
    }

    get affectedLayers() {
        return this._affectedLayers;
    }

    get metadata() {
        return this._metadata;
    }

    get observationPoints() {
        return this._observationPoints;
    }

    get toObject() {
        return {
            id: this._id,
            name: this._name,
            type: this._type ? this._type.slug : '',
            geometry: this._geometry,
            affectedLayers: this._affectedLayers,
            metadata: this._metadata ? this._metadata.toObject : undefined,
            observationPoints: this._observationPoints
        };
    }
}
