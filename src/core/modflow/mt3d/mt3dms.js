import AbstractMt3dPackage from './AbstractMt3dPackage';
import AdvPackage from './advPackage';
import BtnPackage from './btnPackage';
import DspPackage from './dspPackage';
import GcgPackage from './gcgPackage';
import Mt3dPackageFactory from './Mt3dPackageFactory';
import MtPackage from './mtPackage';
import SsmPackage from './ssmPackage';
import {includes} from 'lodash';

class mt3dms {

    _enabled = false;

    _availablePackages = ['mt', 'btn', 'adv', 'dsp', 'gcg', 'ssm'];

    _packages = {
        'mt': MtPackage.fromDefault(),
        'btn': BtnPackage.fromDefault(),
        'adv': AdvPackage.fromDefault(),
        'dsp': DspPackage.fromDefault(),
        'gcg': GcgPackage.fromDefault(),
        'ssm': SsmPackage.fromDefault()
    };

    static fromDefaults() {
        return new mt3dms();
    }

    static fromObject(obj) {
        const mt = new mt3dms();
        mt.enabled = obj.enabled;
        obj.packages.forEach(packageName => {
            const mt3dPackage = Mt3dPackageFactory.fromData(packageName, obj[packageName]);
            if (mt3dPackage) {
                mt.addPackage(mt3dPackage);
            }
        });

        return mt;
    }

    constructor() {}

    get enabled() {
        return this._enabled;
    }

    set enabled(value) {
        this._enabled = value;
    }

    get packages() {
        return this._packages;
    }

    get availablePackages() {
        return this._availablePackages;
    }

    addPackage = (p) => {
        if (!(p instanceof AbstractMt3dPackage)) {
            throw new Error('Package is not from type AbstractMt3dPackage');
        }

        if (!includes(this.availablePackages, p.packageName)) {
            throw new Error('Package is not in list of available Packages');
        }

        this.packages[p.packageName] = p;
    };

    get toObject() {
        const obj = {
            enabled: this.enabled,
            run_model: true,
            write_input: true,
            packages: Object.keys(this.packages)
        };

        for (const key in this.packages) {
            if (this.packages.hasOwnProperty(key)) {
                const p = this.packages[key];
                obj[p.packageName] = p.toObject;
            }
        }

        return obj;
    }
}

export default mt3dms;
