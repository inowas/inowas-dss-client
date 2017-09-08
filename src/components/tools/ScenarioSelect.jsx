import React from 'react';
import PropTypes from 'prop-types';

import ScenarioItem from './ScenarioItem';

import '../../less/scenarioSelect.less';

class ScenarioSelect extends React.Component {

    renderScenarios(scenarios) {
        const { clone, said, deleteScenario, toggleSelection } = this.props;
        return scenarios
            .sort( (a, b) => a.isBaseModel ? -1 : a.name.localeCompare( b.name ) )
            .map( (s, index) => {
                return (<ScenarioItem clone={clone} deleteScenario={deleteScenario} key={index} said={said} scenario={s}
                                      toggleSelection={toggleSelection( s.modelId )}/> );
            } );
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
    deleteScenario: PropTypes.func.isRequired,
    toggleSelection: PropTypes.func.isRequired
};

export default ScenarioSelect;
