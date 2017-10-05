import '../../less/scenarioSelect.less';

import PropTypes from 'prop-types';
import React from 'react';
import ScenarioItem from './ScenarioItem';
import { pure } from 'recompose';

const ScenarioSelect = ({
    scenarios,
    cloneScenario,
    scenarioAnalysisId,
    deleteScenario,
    toggleSelection
}) => (
    <div className="scenarioSelect">
        {scenarios
            .sort((a, b) => (a.isBaseModel ? -1 : a.name.localeCompare(b.name)))
            .map(s => {
                return (
                    <ScenarioItem
                        clone={cloneScenario}
                        deleteScenario={deleteScenario}
                        key={s.id}
                        said={scenarioAnalysisId}
                        scenario={s}
                        toggleSelection={toggleSelection(s.id)}
                    />
                );
            })}
    </div>
);

ScenarioSelect.propTypes = {
    scenarioAnalysisId: PropTypes.string.isRequired,
    scenarios: PropTypes.object.isRequired,
    cloneScenario: PropTypes.func.isRequired,
    deleteScenario: PropTypes.func.isRequired,
    toggleSelection: PropTypes.func.isRequired
};

export default pure(ScenarioSelect);
