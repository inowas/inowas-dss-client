import BtnPackage from '../../../../src/core/modflow/mt3d/btnPackage';

test('Get BtnPackage from Default', () => {
    const btn = BtnPackage.fromDefault();
    expect(btn).toBeInstanceOf(BtnPackage);
    expect(btn.MFStyleArr).toEqual(false);
    expect(btn.DRYCell).toEqual(false);
    expect(btn.Legacy99Stor).toEqual(false);
    expect(btn.FTLPrint).toEqual(false);
    expect(btn.NoWetDryPrint).toEqual(false);
    expect(btn.OmitDryBud).toEqual(false);
    expect(btn.AltWTSorb).toEqual(false);
    expect(btn.nlay).toEqual(null);
    expect(btn.nrow).toEqual(null);
    expect(btn.ncol).toEqual(null);
    expect(btn.nper).toEqual(null);
    expect(btn.ncomp).toEqual(1);
    expect(btn.mcomp).toEqual(1);
    expect(btn.tunit).toEqual('D');
    expect(btn.lunit).toEqual('M');
    expect(btn.munit).toEqual('KG');
    expect(btn.laycon).toEqual(null);
    expect(btn.delr).toEqual(null);
    expect(btn.delc).toEqual(null);
    expect(btn.htop).toEqual(null);
    expect(btn.dz).toEqual(null);
    expect(btn.prsity).toEqual(0.3);
    expect(btn.icbund).toEqual(1);
    expect(btn.sconc).toEqual(0.0);
    expect(btn.cinact).toEqual(1e+30);
    expect(btn.thkmin).toEqual(0.01);
    expect(btn.ifmtcn).toEqual(0);
    expect(btn.ifmtnp).toEqual(0);
    expect(btn.ifmtrf).toEqual(0);
    expect(btn.ifmtdp).toEqual(0);
    expect(btn.savucn).toEqual(true);
    expect(btn.nprs).toEqual(0);
    expect(btn.timprs).toEqual(null);
    expect(btn.obs).toEqual(null);
    expect(btn.nprobs).toEqual(1);
    expect(btn.chkmas).toEqual(true);
    expect(btn.nprmas).toEqual(1);
    expect(btn.perlen).toEqual(null);
    expect(btn.nstp).toEqual(null);
    expect(btn.tsmult).toEqual(null);
    expect(btn.ssflag).toEqual(null);
    expect(btn.dt0).toEqual(0);
    expect(btn.mxstrn).toEqual(50000);
    expect(btn.ttsmult).toEqual(1.0);
    expect(btn.ttsmax).toEqual(0);
    expect(btn.speciesNames).toEqual(null);
    expect(btn.extension).toEqual('btn');
    expect(btn.unitnumber).toEqual(null);
    expect(btn.filenames).toEqual(null);
});

test('Get BtnPackage from Object', () => {
    const btnObj = {
        MFStyleArr: true,
        DRYCell: true,
        Legacy99Stor: true,
        FTLPrint: true,
        NoWetDryPrint: true,
        OmitDryBud: true,
        AltWTSorb: true,
        nlay: 2,
        nrow: 10,
        ncol: 11,
        nper: 10,
        ncomp: 1,
        mcomp: 1,
        tunit: 'K',
        lunit: 'P',
        munit: 'G',
        laycon: 1,
        delr: 2,
        delc: 3,
        htop: 4,
        dz: 5,
        prsity: 0.1,
        icbund: 2,
        sconc: 0.1,
        cinact: 2e+30,
        thkmin: 0.02,
        ifmtcn: 6,
        ifmtnp: 7,
        ifmtrf: 8,
        ifmtdp: 9,
        savucn: false,
        nprs: 10,
        timprs: 11,
        obs: 12,
        nprobs: 13,
        chkmas: true,
        nprmas: 14,
        perlen: 15,
        nstp: 16,
        tsmult: 17,
        ssflag: 18,
        dt0: 19,
        mxstrn: 20,
        ttsmult: 21.0,
        ttsmax: 22,
        species_names: 23,
        extension: 'btn',
        unitnumber: 24,
        filenames: 25
    };
    const btn = BtnPackage.fromObject(btnObj);
    expect(btn).toBeInstanceOf(BtnPackage);
    expect(btn.toObject).toEqual(btnObj);
});
