import DspPackage from '../../../../src/core/modflow/mt3d/dspPackage';

test('Get DspPackage from Default', () => {
    const dsp = DspPackage.fromDefault();
    expect(dsp).toBeInstanceOf(DspPackage);
    expect(dsp.packageName).toEqual('dsp');
    expect(dsp.al).toEqual(0.01);
    expect(dsp.trpt).toEqual(0.1);
    expect(dsp.trpv).toEqual(0.01);
    expect(dsp.dmcoef).toEqual(1e-9);
    expect(dsp.extension).toEqual('dsp');
    expect(dsp.multiDiff).toEqual(false);
    expect(dsp.unitnumber).toEqual(null);
    expect(dsp.filenames).toEqual(null);
});

test('Get DspPackage from Object', () => {
    const dspObj = {
        al: 0.01,
        trpt: 0.1,
        trpv: 0.01,
        dmcoef: 1e-9,
        extension: 'dsp',
        multiDiff: false,
        unitnumber: null,
        filenames: null
    };
    const dsp = DspPackage.fromObject(dspObj);
    expect(dsp.toObject).toEqual(dspObj);
});
