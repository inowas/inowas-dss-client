export default class BoundaryMetadata {
    _metadata = {}

    constructor({ wellType }) {
        if ( typeof wellType !== 'string' ) {
            throw new Error( 'Expected first parameter to be a string, but got ' + ( typeof wellType ) );
        }

        this._metadata.wellType = wellType;
    }

    get toObject() {
        return this._metadata;
    }
}
