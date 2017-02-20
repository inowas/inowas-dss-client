import React from 'react';

import StressPeriods from './StressPeriods';

export default class ObservationPoint extends React.Component {

    render() {
        return (
            <div>
                <StressPeriods data={this.props.data.stress_periods} bType={this.props.bType} />
            </div>
        );
    }
}
