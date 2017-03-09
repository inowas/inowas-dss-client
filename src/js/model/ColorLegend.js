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

        const nrOfColors = this._spectrum.length;
        const delta = (this._max - this._min) / 6;

        const legend = [];
        for (let i = 0; i < nrOfColors; i++) {
            const value = this._min + delta * i;
            const color = this._spectrum[i];
            legend.push({
                color: color,
                value: value
            });
        }

        return legend;
    }
}
