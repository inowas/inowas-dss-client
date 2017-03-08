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
        this.props.onChange(e.target.value);
    }

    render( ) {
        const {min, max, step, value} = this.props;

        return(
            <div className="rangeSlider">
                <input className="slider" type="range" min={min} max={max} step={step} value={value} onChange={this.updateValue} />
                <output className="min">{min}</output>
                <output className="max">{max}</output>
                <output style={{left: ((value - min) / (max - min) * 100) + '%'  }} className="output">{value}</output>
            </div>
        );
    }

}
