import React, { PropTypes, Component } from 'react';

import '../../less/arraySlider.less';

export default class ArraySlider extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        value: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
        formatter: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        };
    }

    componentDidMount() {
        if (this.slider) {
            this.slider.addEventListener('change', this.updateValue);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            this.setState({
                value: nextProps.value
            });
        }
    }

    componentWillUnmount() {
        if (this.slider) {
            this.slider.removeEventListener('change', this.updateValue);
        }
    }

    updateValue = e => {
        this.props.onChange(Number(e.target.value));
    };

    updateStateValue = e => {
        this.setState({
            value: Number(e.target.value)
        });
    };

    render() {
        const { data, formatter } = this.props;
        const { value } = this.state;
        const min = 0;
        const max = data.length - 1;
        const percentage = (value - min) / (max - min) * 100;

        return (
            <div className="arraySlider">
                <input
                    ref={slider => {
                        this.slider = slider;
                    }}
                    className="slider"
                    type="range"
                    min={min}
                    max={max}
                    step={1}
                    value={value}
                    onChange={this.updateStateValue}
                />
                <output className="min">
                    {formatter(data[min])}
                </output>
                <output className="max">
                    {formatter(data[max])}
                </output>
                <output className="output">
                    <span style={{ flex: percentage }} />
                    {formatter(data[value])}
                    <span style={{ flex: 100 - percentage }} />
                </output>
            </div>
        );
    }
}
