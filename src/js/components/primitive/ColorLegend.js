import React, { PropTypes, Component } from 'react';

import '../../../less/colorLegend.less';

export default class ColorLegend extends Component {

    static propTypes = {
        legend: PropTypes.array
    }

    renderLabels( legend ) {
        return legend.map((l, index) => {
            return (
                <div className="label" key={index}>{l.value}m</div>
            );
        });
    }

    render( ) {
        const { legend } = this.props;

        let gradient = 'linear-gradient(to bottom';

        legend.forEach(( l, index ) => {
            gradient += ', ' + l.color + ' ' + ( (index + 1) / legend.length * 100 ) + '%';
        });

        gradient += ')';
        // console.log('gradient: ', gradient );

        return (
            <div className="colorLegend">
                <div className="stripe" style={{
                    backgroundImage: gradient,
                    height: (legend.length - 1) * 20
                }}/>
                <div className="labels">
                    {this.renderLabels( legend )}
                </div>
            </div>
        );
    }

}
