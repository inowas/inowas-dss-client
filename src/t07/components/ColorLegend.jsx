import PropTypes from 'prop-types';
import React from 'react';

import '../../less/colorLegend.less';

class ColorLegend extends React.Component {

    renderVerticalLabels = () => {
        const legend = this.props.legend;

        return legend.map((l, index) => {
            return (
                <div className="label" key={index}>{l.value}m</div>
            );
        });
    };

    renderVerticalGradients = () => {
        const legend = this.props.legend;

        let gradient = 'linear-gradient(to bottom';
        legend.forEach((l, index) => {
            gradient += ', ' + l.color + ' ' + ( (index + 1) / legend.length * 100 ) + '%';
        });

        gradient += ')';

        return gradient;
    };

    renderVerticalColorLegend = () => {
        const gradient = this.renderVerticalGradients();
        const labels = this.renderVerticalLabels();
        const legend = this.props.legend;

        return (
            <div className="colorLegend">
                <div className="vertical">
                    <div className="stripe" style={{
                        backgroundImage: gradient,
                        height: (legend.length - 1) * 20
                    }}/>
                    <div className="labels">
                        {labels}
                    </div>
                </div>
            </div>
        );
    };

    renderHorizontalColorLegend = () => {
        const legend = this.props.legend;

        const reducedLegend = [];
        reducedLegend.push(legend[legend.length - 1]);
        reducedLegend.push(legend[Math.floor(legend.length / 2)]);
        reducedLegend.push(legend[0]);

        return (
            <div className="colorLegend">
                <div className="horizontal">
                    <ul className="legend">
                        <li><span style={{backgroundColor: reducedLegend[0].color}} /> {reducedLegend[0].value}</li>
                        <li><span style={{backgroundColor: reducedLegend[1].color}} /> {reducedLegend[1].value}</li>
                        <li><span style={{backgroundColor: reducedLegend[2].color}} /> {reducedLegend[2].value}</li>
                    </ul>
                </div>
            </div>
        );
    };

    render() {
        const {orientation} = this.props;

        if (!orientation || orientation === 'vertical') {
            return this.renderVerticalColorLegend();
        }

        return this.renderHorizontalColorLegend();
    }
}

ColorLegend.propTypes = {
    legend: PropTypes.array,
    orientation: PropTypes.string
};

export default ColorLegend;
