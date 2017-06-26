export default class BoundaryType {
    _slug;

    static slugToFullName = {
        chd: 'Time-Variant Specified Head',
        wel: 'Well',
        rch: 'Recharge',
        riv: 'River',
        ghb: 'General Head Coundary',
        evt: 'Evapotranspiration',
        drn: 'Drain',
        lak: 'Lake',
        srf2: 'Streamflow Routing'
    }

    constructor( slug ) {
        if ( typeof slug !== 'string' ) {
            throw new Error( 'Expected first parameter to be a string, but got ' + ( typeof slug ) );
        }

        this._slug = slug;
    }

    get slug() {
        return this._slug;
    }

    get fullName() {
        return BoundaryType.slugToFullName[this._slug];
    }

}
