import '../../less/scenarioSelect.less';

import Button from '../../components/primitive/Button';
import Icon from '../../components/primitive/Icon';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';
import { includes } from 'lodash';

class ScenarioItem extends React.Component {
    toggleSelection = () => {
        this.props.toggleSelection(this.props.scenario.id);
    };

    render() {
        const {
            scenario,
            toggleSelection,
            clone,
            said,
            deleteScenario
        } = this.props;
        const {
            name,
            description,
            selected,
            modelId,
            isBaseModel,
            permissions
        } = scenario;
        const readOnly = !includes(permissions, 'w');

        return (
            <div className="item" data-selected={selected}>
                <button className="toggle" onClick={toggleSelection}>
                    <Icon name={selected ? 'checked' : 'unchecked'} />
                </button>
                <div className="content">
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <p>
                        {!isBaseModel ? (
                            <Link to={'/tools/T07E/' + said + '/' + modelId}>
                                {readOnly ? 'View' : 'Edit'}
                            </Link>
                        ) : null}
                        {!isBaseModel && !readOnly && <span> | </span>}
                        {!readOnly && (
                            <Button type="link" onClick={() => clone(modelId)}>
                                Clone
                            </Button>
                        )}
                        {!readOnly && isBaseModel && <span> | </span>}
                        {!readOnly &&
                            isBaseModel && (
                                <Link
                                    to={'/tools/T07E/' + said + '/' + modelId}
                                >
                                    Edit
                                </Link>
                            )}
                        {!isBaseModel && !readOnly && <span> | </span>}
                        {!isBaseModel &&
                            !readOnly && (
                                <Button
                                    type="link"
                                    onClick={() => deleteScenario(modelId)}
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
    said: PropTypes.string.isRequired,
    scenario: PropTypes.object.isRequired,
    clone: PropTypes.func.isRequired,
    deleteScenario: PropTypes.func.isRequired,
    toggleSelection: PropTypes.func.isRequired
};

export default ScenarioItem;
