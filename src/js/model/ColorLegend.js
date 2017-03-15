import { uniqBy } from 'lodash';

export default class ColorLegend {

    // 'purple', 'red', 'yellow', 'lime', 'aqua', 'blue'
    _spectrum = ['#800080', '#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF'];
    _min;
    _max;
    _legend;

    constructor(min, max, spectrum = null) {
        this._min = min;
        this._max = max;

        if (spectrum) {
            this._spectrum = spectrum;
        }

        this._legend = this.legend();
    }

    legend(min = null, max = null) {
        if (min) {this._min = min;}
        if (max) {this._max = max;}

        return this.calculateLegend();
    }

    calculateLegend(decimals=0) {

        const factor = Math.pow(10, decimals);

        const nrOfColors = this._spectrum.length;
        const delta = (this._max - this._min) / nrOfColors;

        let legend = [];
        for (let i = 0; i < nrOfColors; i++) {
            const value = this._min + delta * i;
            const color = this._spectrum[i];
            legend.unshift({
                color: color,
                value: Math.round(value*factor)/factor
            });
        }

        if (nrOfColors > uniqBy(legend, 'value').length){
            legend = this.calculateLegend(decimals+1);
        }

        return legend;
    }
}
