import AbstractMt3dPackage from './AbstractMt3dPackage';
import {includes} from 'lodash';

class mt3dms {

    _availablePackages = ['mt', 'btn', 'adv', 'dsp', 'gcg', 'ssm'];

    _packages = {};

    get packages() {
        return this._packages;
    }

    addPackage = (p) => {
        if ((p instanceof AbstractMt3dPackage) && includes(this._availablePackages, p.packageName)) {
            this._packages[p.packageName] = p;
        }
    };

    get toObject() {
        const obj = {
            run_model: true,
            write_input: true,
            packages: Object.keys(this._packages)
        };

        for (const key in this._packages) {
            if( this._packages.hasOwnProperty( key ) ) {
                const p = this._packages[key];
                obj[p.packageName] = p.toObject;
            }
        }

        return obj;
    }
}

export default mt3dms;
