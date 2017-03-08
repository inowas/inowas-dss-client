import React, { PropTypes, Component } from 'react';

import '../../../less/rangeSlider.less';

export default class RangeSlider extends Component {

    static propTypes = {
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        step: PropTypes.number,
        value: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired
    }

    updateValue = e => {
        this.props.onChange(Number(e.target.value));
    }

    render( ) {
        const {min, max, step, value} = this.props;
        const percentage = (value - min) / (max - min) * 100;

        return(
            <div className="rangeSlider">
                <input className="slider" type="range" min={min} max={max} step={step} value={value} onChange={this.updateValue} />
                <output className="min">{min}</output>
                <output className="max">{max}</output>
                <output className="output"><span style={{flex: percentage}} />{value}<span style={{flex: 100 - percentage}} /></output>
            </div>
        );
    }

}
