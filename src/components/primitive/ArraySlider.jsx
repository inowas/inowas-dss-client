import React, { PropTypes, Component } from 'react';

import '../../less/arraySlider.less';

export default class ArraySlider extends Component {

    static propTypes = {
        data: PropTypes.array.isRequired,
        value: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
        formatter: PropTypes.func.isRequired
    }

    updateValue = e => {
        this.props.onChange(Number(e.target.value));
    }

    render( ) {
        const {data, value, formatter } = this.props;
        const min = 0;
        const max = data.length - 1;
        const percentage = (value - min) / (max - min) * 100;

        return(
            <div className="arraySlider">
                <input className="slider" type="range" min={min} max={max} step={1} value={value} onChange={this.updateValue} />
                <output className="min">{formatter(data[min])}</output>
                <output className="max">{formatter(data[max])}</output>
                <output className="output"><span style={{flex: percentage}} />{formatter(data[value])}<span style={{flex: 100 - percentage}} /></output>
            </div>
        );
    }

}
