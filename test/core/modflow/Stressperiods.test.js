import Stressperiods from '../../../src/core/modflow/Stressperiods';

test('Create Stressperiods from Object', () => {
    const spObj = {
        start_date_time: '2015-01-01T00:00:00Z',
        end_date_time: '2015-12-31T00:00:00Z',
        stress_periods: [
            {totim_start: 0, perlen: 30, nstp: 1, tsmult: 1, steady: true},
            {totim_start: 31, perlen: 30, nstp: 1, tsmult: 1, steady: false},
            {totim_start: 59, perlen: 30, nstp: 1, tsmult: 1, steady: false},
            {totim_start: 90, perlen: 30, nstp: 1, tsmult: 1, steady: false},
            {totim_start: 120, perlen: 30, nstp: 1, tsmult: 1, steady: false},
            {totim_start: 151, perlen: 30, nstp: 1, tsmult: 1, steady: false},
            {totim_start: 181, perlen: 30, nstp: 1, tsmult: 1, steady: false},
            {totim_start: 212, perlen: 30, nstp: 1, tsmult: 1, steady: false},
            {totim_start: 243, perlen: 30, nstp: 1, tsmult: 1, steady: false},
            {totim_start: 273, perlen: 30, nstp: 1, tsmult: 1, steady: false},
            {totim_start: 304, perlen: 30, nstp: 1, tsmult: 1, steady: false},
            {totim_start: 365, perlen: 30, nstp: 1, tsmult: 1, steady: false}
        ],
        time_unit: 4
    };

    const stressPeriods = Stressperiods.fromObject(spObj);
    expect(stressPeriods).toBeInstanceOf(Stressperiods);
    expect(stressPeriods.timeUnit).toEqual(4);
    expect(stressPeriods.dateTimes).toEqual([
        '2015-01-01T00:00:00Z',
        '2015-02-01T00:00:00Z',
        '2015-03-01T00:00:00Z',
        '2015-04-01T00:00:00Z',
        '2015-05-01T00:00:00Z',
        '2015-06-01T00:00:00Z',
        '2015-07-01T00:00:00Z',
        '2015-08-01T00:00:00Z',
        '2015-09-01T00:00:00Z',
        '2015-10-01T00:00:00Z',
        '2015-11-01T00:00:00Z',
        '2016-01-01T00:00:00Z',

    ]);
    expect(stressPeriods.toObject).toEqual(spObj);
});
