import Mt3dStressPeriodData from '../../../../src/core/modflow/mt3d/Mt3dStressPeriodData';
import Mt3dStressPeriodDataSet from '../../../../src/core/modflow/mt3d/Mt3dStressPeriodDataSet';

test('Create new Mt3dStressPeriodData', () => {
    const mt3dStressPeriodData = new Mt3dStressPeriodData();
    expect(mt3dStressPeriodData).toBeInstanceOf(Mt3dStressPeriodData);
    expect(mt3dStressPeriodData.toObject).toEqual({});
});

test('Add Data to first Stressperiod', () => {
    const mt3dStressPeriodData = new Mt3dStressPeriodData();
    const dataSet = Mt3dStressPeriodDataSet.fromArray([1, 2, 3, 4.0, 'GHB', 5.0, 100.0]);
    mt3dStressPeriodData.addData(4, dataSet);
    expect(mt3dStressPeriodData.data).toEqual({'4': [{'_column': 3, '_concentrations': [5, 100], '_itype': 'GHB', '_layer': 1, '_row': 2}]});
    expect(mt3dStressPeriodData.toObject).toEqual({'4': [[1, 2, 3, 5, 'GHB', 5, 100]]});
});
