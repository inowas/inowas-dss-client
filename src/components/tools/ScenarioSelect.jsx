import React from 'react';
import PropTypes from 'prop-types';

import ScenarioItem from './ScenarioItem';

import '../../less/scenarioSelect.less';

class ScenarioSelect extends React.Component {

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

ScenarioSelect.PropTypes = {
    said: PropTypes.string.isRequired,
    scenarios: PropTypes.object.isRequired,
    clone: PropTypes.func.isRequired,
    toggleSelection: PropTypes.func.isRequired
};

export default ScenarioSelect;
