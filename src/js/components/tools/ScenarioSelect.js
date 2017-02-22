import React from 'react';

import ScenarioItem from './ScenarioItem';

import '../../../less/scenarioSelect.less';

export default class ScenarioSelect extends React.Component {

    renderScenarios(scenarios) {
        return scenarios.map(s => {
            return (
                <ScenarioItem key={s.id} scenario={s} toggleSelection={this.props.toggleSelection} />
            );
        });
    }

    render() {
        return (
            <div className="scenarioSelect">
                {this.renderScenarios(this.props.scenarios)}
            </div>
        );
    }

}

ScenarioSelect.propTypes = {
    scenarios: React.PropTypes.array.isRequired,
    toggleSelection: React.PropTypes.func.isRequired
}
