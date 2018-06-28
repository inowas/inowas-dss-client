import Mt3dStressPeriodDataSet from './Mt3dStressPeriodDataSet';

class Mt3dStressPeriodData {
    // SET stress_period_data
    // ssm_data[0] = [
    // [4, 4, 4, 1.0, itype['GHB'], 1.0, 100.0)]

    _data = {};

    static fromObject = (obj) => {
        const spData = Mt3dStressPeriodData();
        Object.keys(obj).forEach((key) => {
            const sp = obj[key];
            sp.forEach(spItems => {
                spItems.forEach(
                    item => spData.addData(sp, Mt3dStressPeriodDataSet.fromArray(item))
                );
            });
        });
    };

    get data() {
        return this._data;
    }

    addData = (stressPeriod, data) => {
        if (!(data instanceof Mt3dStressPeriodDataSet)) {
            throw new Error('Data has to be instance of Mt3dStressPeriodDataSet');
        }

        const sp = parseInt(Number(stressPeriod), 10);

        if (!Array.isArray(this.data[sp])) {
            this._data[sp] = [];
        }

        this._data[sp].push(data);
    };

    get toObject() {
        const obj = this.data;
        const keys = Object.keys(obj);
        keys.forEach((key) => {
            obj[key] = obj[key].map(
                spItem => spItem.toArray
            );
        });
        return obj;
    }
}

export default Mt3dStressPeriodData;
