import Mt3dStressPeriodData from '../../../../src/core/modflow/mt3d/Mt3dStressPeriodData';
import Mt3dStressPeriodDataSet from '../../../../src/core/modflow/mt3d/Mt3dStressPeriodDataSet';
import AbstractMt3dPackage from '../../../../src/core/modflow/mt3d/AbstractMt3dPackage';

test('Create new Mt3dStressPeriodData', () => {
    const mt3dStressPeriodData = new Mt3dStressPeriodData();
    expect(mt3dStressPeriodData).toBeInstanceOf(Mt3dStressPeriodData);
    expect(mt3dStressPeriodData.toObject).toEqual({});
});

test('Add Data to first Stressperiod', () => {
    const mt3dStressPeriodData = new Mt3dStressPeriodData();
    const dataSet = Mt3dStressPeriodDataSet.fromArray([1, 2, 3, 4.0, 'GHB', 5.0, 100.0]);
    mt3dStressPeriodData.addData(0, dataSet);
    expect(mt3dStressPeriodData.data).toEqual({
        '0': [{
            '_column': 3,
            '_concentrations': [5, 100],
            '_itype': 'GHB',
            '_layer': 1,
            '_row': 2
        }]
    });
    expect(mt3dStressPeriodData.toObject).toEqual({'0': [[1, 2, 3, 5, 'GHB', 5, 100]]});
    expect(mt3dStressPeriodData.toObject).toEqual(mt3dStressPeriodData.toPackageData);
});

test('Add multiple data to different stressperiods', () => {
    const mt3dStressPeriodData = new Mt3dStressPeriodData();
    mt3dStressPeriodData.addData(0, Mt3dStressPeriodDataSet.fromArray([1, 2, 3, 4.0, 'GHB', 5.0, 100.0]));
    mt3dStressPeriodData.addData(0, Mt3dStressPeriodDataSet.fromArray([1, 2, 4, 5.0, 'GHB', 5.0, 200.0]));
    mt3dStressPeriodData.addData(0, Mt3dStressPeriodDataSet.fromArray([1, 2, 5, 5.0, 'GHB', 5.0, 200.0]));
    mt3dStressPeriodData.addData(0, Mt3dStressPeriodDataSet.fromArray([1, 2, 6, 5.0, 'GHB', 5.0, 200.0]));
    mt3dStressPeriodData.addData(1, Mt3dStressPeriodDataSet.fromArray([1, 2, 3, 5.0, 'GHB', 5.0, 100.0]));
    mt3dStressPeriodData.addData(2, Mt3dStressPeriodDataSet.fromArray([1, 2, 3, 6.0, 'GHB', 6.0, 100.0]));
    expect(mt3dStressPeriodData.toPackageData).toEqual(
        {
            '0': [
                [1, 2, 3, 5, 'GHB', 5, 100],
                [1, 2, 4, 5, 'GHB', 5, 200],
                [1, 2, 5, 5, 'GHB', 5, 200],
                [1, 2, 6, 5, 'GHB', 5, 200]
            ],
            '1': [[1, 2, 3, 5, 'GHB', 5, 100]],
            '2': [[1, 2, 3, 6, 'GHB', 6, 100]]
        }
    );
});

test('Create from object and test toObject and toPackageData', () => {
    const obj = {
        '0': [
            [1, 2, 3, 5, 'GHB', 5, 100],
            [1, 2, 4, 5, 'GHB', 5, 200],
            [1, 2, 5, 5, 'GHB', 5, 200],
            [1, 2, 6, 5, 'GHB', 5, 200]
        ],
        '1': [[1, 2, 3, 5, 'GHB', 5, 100]],
        '2': [[1, 2, 3, 6, 'GHB', 6, 100]]
    };

    const mt3dStressPeriodData = Mt3dStressPeriodData.fromObject(obj);
    expect(mt3dStressPeriodData.toObject).toEqual(obj);
    expect(mt3dStressPeriodData.toPackageData).toEqual(obj);
});

test('Add data with invalid data throws error', () => {
    const mt3dStressPeriodData = new Mt3dStressPeriodData();
    expect(() => mt3dStressPeriodData.addData(0, {})).toThrow();
});
