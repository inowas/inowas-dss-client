import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArraySlider from '../../components/primitive/ArraySlider';
import { Formatter } from '../../core';

export default class TotalTimesSlider extends Component {
    static propTypes = {
        totalTimes: PropTypes.object,
        onChange: PropTypes.func,
        value: PropTypes.number
    };

    state = {
        totalTimesDate: []
    };

    componentDidMount() {
        const { totalTimes } = this.props;
        this.setTotalTimesDate(totalTimes);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.totalTimes !== nextProps.totalTimes) {
            this.setTotalTimesDate(nextProps.totalTimes);
        }
    }

    setTotalTimesDate = totalTimes => {
        const startDate = new Date(totalTimes.start_date_time);
        this.setState({
            totalTimesDate: totalTimes.total_times.map(t => {
                return startDate.addDays(t);
            })
        });
    };

    render() {
        const { totalTimesDate } = this.state;
        const { onChange, value } = this.props;
        return (
            <ArraySlider
                data={totalTimesDate}
                value={value}
                onChange={onChange}
                formatter={Formatter.dateToDate}
            />
        );
    }
}
