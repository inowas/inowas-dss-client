import MtPackage from './mtPackage';
import BtnPackage from './btnPackage';
import DspPackage from './dspPackage';
import AdvPackage from './advPackage';
import GcgPackage from './gcgPackage';
import SsmPackage from './ssmPackage';

class Mt3dPackageFactory {
    static fromData(data) {
        const packageName = data._meta && data._meta.package_name;
        switch (packageName) {
            case 'adv':
                return AdvPackage.fromObject(data);
            case 'mt':
                return MtPackage.fromObject(data);
            case 'btn':
                return BtnPackage.fromObject(data);
            case 'dsp':
                return DspPackage.fromObject(data);
            case 'gcg':
                return GcgPackage.fromObject(data);
            case 'ssm':
                return SsmPackage.fromObject(data);
            default:
                return null;
        }
    }
}

export default Mt3dPackageFactory;
