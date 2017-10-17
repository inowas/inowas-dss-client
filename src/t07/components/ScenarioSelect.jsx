import '../../less/scenarioSelect.less';

import PropTypes from 'prop-types';
import React from 'react';
import ScenarioItem from './ScenarioItem';
import { pure } from 'recompose';

const ScenarioSelect = ({
    scenarioModels,
    cloneScenario,
    scenarioAnalysisId,
    deleteScenario,
    toggleSelection,
    permissions
}) => (
    <div className="scenarioSelect">
        {scenarioModels
            .sort((a, b) => (a.isBaseModel ? -1 : a.name.localeCompare(b.name)))
            .map(s => {
                return (
                    <ScenarioItem
                        clone={cloneScenario}
                        deleteScenario={deleteScenario}
                        key={s.id}
                        scenarioAnalysisId={scenarioAnalysisId}
                        scenarioModel={s}
                        toggleSelection={toggleSelection(s.id)}
                        permissions={permissions}
                    />
                );
            })}
    </div>
);

ScenarioSelect.propTypes = {
    scenarioAnalysisId: PropTypes.string.isRequired,
    scenarioModels: PropTypes.array.isRequired,
    cloneScenario: PropTypes.func.isRequired,
    deleteScenario: PropTypes.func.isRequired,
    toggleSelection: PropTypes.func.isRequired,
    permissions: PropTypes.string
};

export default pure(ScenarioSelect);
