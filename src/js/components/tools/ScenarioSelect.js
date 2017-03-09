import React, { PropTypes, Component } from 'react';

import ScenarioItem from './ScenarioItem';

import '../../../less/scenarioSelect.less';

export default class ScenarioSelect extends Component {

    static propTypes = {
        scenarios: PropTypes.array.isRequired,
        toggleSelection: PropTypes.func.isRequired
    }

    renderScenarios( scenarios ) {
        return scenarios.map(s => {
            return ( <ScenarioItem key={s.modelId} scenario={s} toggleSelection={this.props.toggleSelection(s.modelId)}/> );
        });
    }

    render( ) {
        return (
            <div className="scenarioSelect">
                {this.renderScenarios( this.props.scenarios )}
            </div>
        );
    }

}
