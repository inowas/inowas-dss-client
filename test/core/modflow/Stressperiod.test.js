import Stressperiod from '../../../src/core/modflow/Stressperiod';


test('Create Stressperiod from Object', () => {
    const spObj = {
        totim_start: 0,
        perlen: 30,
        nstp: 1,
        tsmult: 1.1,
        steady: true
    };

    const stressPeriod = Stressperiod.fromObject(spObj);
    expect(stressPeriod).toBeInstanceOf(Stressperiod);
    expect(stressPeriod.totimStart).toEqual(0);
    expect(stressPeriod.perlen).toEqual(30);
    expect(stressPeriod.nstp).toEqual(1);
    expect(stressPeriod.tsmult).toEqual(1.1);
    expect(stressPeriod.steady).toEqual(true);
    expect(stressPeriod.toObject).toEqual(spObj);
});
