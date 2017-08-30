import React, { PropTypes, Component } from 'react';

import ScenarioItem from './ScenarioItem';

import '../../less/scenarioSelect.less';

export default class ScenarioSelect extends Component {

    static propTypes = {
        said: PropTypes.string.isRequired,
        scenarios: PropTypes.array.isRequired,
        clone: PropTypes.func.isRequired,
        toggleSelection: PropTypes.func.isRequired
    }

    renderScenarios( scenarios ) {
        const { clone, said } = this.props;
        return scenarios.map((s, index) => {
            return ( <ScenarioItem clone={clone} key={index} said={said} scenario={s} toggleSelection={this.props.toggleSelection(s.modelId)}/> );
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
