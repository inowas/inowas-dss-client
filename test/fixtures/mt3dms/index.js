import mtPackage from './mt';
import btnPackage from './btn';
import advPackage from './adv';
import dspPackage from './dsp';
import ssmPackage from './ssm';
import gcgPackage from './gcg';

const mt = {
    run_model: true,
    write_input: true,
    packages: [
        'mt',
        'btn',
        'adv',
        'dsp',
        'gcg',
        'ssm'
    ],
    mt: mtPackage,
    btn: btnPackage,
    adv: advPackage,
    dsp: dspPackage,
    ssm: ssmPackage,
    gcg: gcgPackage,
};

export default mt;
