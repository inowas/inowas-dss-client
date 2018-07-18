import SsmPackage from '../../../../src/core/modflow/mt3d/ssmPackage';
import SsmSubstance from '../../../../src/core/modflow/mt3d/SsmSubstance';

test('Get SsmPackage from Default', () => {
    const ssm = SsmPackage.fromDefault();
    expect(ssm).toBeInstanceOf(SsmPackage);
    expect(ssm.packageName).toEqual('ssm');
    expect(ssm.crch).toEqual(null);
    expect(ssm.cevt).toEqual(null);
    expect(ssm.mxss).toEqual(null);
    expect(ssm.stressPeriodData).toEqual(null);
    expect(ssm.dtype).toEqual(null);
    expect(ssm.extension).toEqual('ssm');
    expect(ssm.unitnumber).toEqual(null);
    expect(ssm.filenames).toEqual(null);
});

test('Get SsmPackage from Object', () => {
    const ssmObj = {
        _meta: {package_name: 'ssm'},
        crch: null,
        cevt: null,
        mxss: null,
        stress_period_data: null,
        dtype: null,
        extension: 'ssm',
        unitnumber: null,
        filenames: null
    };
    const ssm = SsmPackage.fromObject(ssmObj);
    expect(ssm.toObject).toEqual(ssmObj);
});

test('Can add and remove substances', () => {
    const ssm = SsmPackage.fromDefault();
    ssm.addSubstance('bId123', SsmSubstance.create('testSubstance_1', 5));
    ssm.addSubstance('bId123', SsmSubstance.create('testSubstance_2', 5));
    expect(ssm.substances).toEqual([
        {boundaryId: 'bId123', substance: {name: 'testSubstance_1', values: [0, 0, 0, 0, 0]}},
        {boundaryId: 'bId123', substance: {name: 'testSubstance_2', values: [0, 0, 0, 0, 0]}},
    ]);
    ssm.removeSubstance('bId123', 'testSubstance_1');
    expect(ssm.substances).toEqual([{
        boundaryId: 'bId123',
        substance: {name: 'testSubstance_2', values: [0, 0, 0, 0, 0]}
    }]);

    ssm.removeSubstance('bId123', 'testSubstance_5');
    expect(ssm.substances).toEqual([{
        boundaryId: 'bId123',
        substance: {name: 'testSubstance_2', values: [0, 0, 0, 0, 0]}
    }]);
});

test('Add substance not from type SsmSubstance throws error', () => {
    const ssm = SsmPackage.fromDefault();
    expect(() => {
        ssm.addSubstance('bId123', 'testSubstance_1', 5);
    }).toThrow();
});
