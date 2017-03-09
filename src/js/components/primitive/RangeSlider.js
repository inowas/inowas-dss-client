import React, { PropTypes, Component } from 'react';
import dateFormat from 'dateformat';

import '../../../less/rangeSlider.less';

export default class RangeSlider extends Component {

    static propTypes = {
        // min: PropTypes.number.isRequired,
        // max: PropTypes.number.isRequired,
        data: PropTypes.array.isRequired,
        step: PropTypes.number,
        value: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
        startDate: PropTypes.object.isRequired
    }

    updateValue = e => {
        this.props.onChange(Number(e.target.value));
    }

    render( ) {
        // const {min, max, step, value} = this.props;
        const {data, step, value, startDate} = this.props;
        const min = 0;
        const max = data.length - 1;
        const percentage = (value - min) / (max - min) * 100;

        return(
            <div className="rangeSlider">
                <input className="slider" type="range" min={min} max={max} step={step} value={value} onChange={this.updateValue} />
                <output className="min">{dateFormat(startDate.addDays(data[min]), 'mm/dd/yyyy')}</output>
                <output className="max">{dateFormat(startDate.addDays(data[max]), 'mm/dd/yyyy')}</output>
                <output className="output"><span style={{flex: percentage}} />{dateFormat(startDate.addDays(data[value]), 'mm/dd/yyyy')}<span style={{flex: 100 - percentage}} /></output>
            </div>
        );
    }

}
