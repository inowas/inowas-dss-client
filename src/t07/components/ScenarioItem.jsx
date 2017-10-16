import '../../less/scenarioSelect.less';

import Button from '../../components/primitive/Button';
import Icon from '../../components/primitive/Icon';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';
import { includes } from 'lodash';

class ScenarioItem extends React.Component {
    toggleSelection = () => {
        this.props.toggleSelection(this.props.scenarioModel.id);
    };

    render() {
        const {
            scenarioModel,
            toggleSelection,
            clone,
            scenarioAnalysisId,
            deleteScenario,
            permissions
        } = this.props;
        const readOnly = !includes(permissions, 'w');

        return (
            <div className="item" data-selected={scenarioModel.selected}>
                <button className="toggle" onClick={toggleSelection}>
                    <Icon
                        name={scenarioModel.selected ? 'checked' : 'unchecked'}
                    />
                </button>
                <div className="content">
                    <h3>{scenarioModel.name}</h3>
                    <p>{scenarioModel.description}</p>
                    <p>
                        {!scenarioModel.isBaseModel ? (
                            <Link
                                to={`/tools/T07E/${scenarioAnalysisId}/${scenarioModel.id}`}
                            >
                                {readOnly ? 'View' : 'Edit'}
                            </Link>
                        ) : null}
                        {!scenarioModel.isBaseModel &&
                            !readOnly && <span> | </span>}
                        {!readOnly && (
                            <Button
                                type="link"
                                onClick={() => clone(scenarioModel.id)}
                            >
                                Clone
                            </Button>
                        )}
                        {!readOnly &&
                            scenarioModel.isBaseModel && <span> | </span>}
                        {!readOnly &&
                            scenarioModel.isBaseModel && (
                                <Link
                                    to={`/tools/T07E/${scenarioAnalysisId}/${scenarioModel.id}`}
                                >
                                    Edit
                                </Link>
                            )}
                        {!scenarioModel.isBaseModel &&
                            !readOnly && <span> | </span>}
                        {!scenarioModel.isBaseModel &&
                            !readOnly && (
                                <Button
                                    type="link"
                                    onClick={() =>
                                        deleteScenario(scenarioModel.id)}
                                >
                                    Delete
                                </Button>
                            )}
                    </p>
                </div>
            </div>
        );
    }
}

ScenarioItem.propTypes = {
    scenarioAnalysisId: PropTypes.string.isRequired,
    scenarioModel: PropTypes.object.isRequired,
    clone: PropTypes.func.isRequired,
    deleteScenario: PropTypes.func.isRequired,
    toggleSelection: PropTypes.func.isRequired,
    permissions: PropTypes.string.isRequired
};

export default ScenarioItem;
