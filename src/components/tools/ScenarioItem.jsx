import React from 'react';
import PropTypes from 'prop-types';

import '../../less/scenarioSelect.less';
import Icon from '../primitive/Icon';
import { Link } from 'react-router';
import Button from '../primitive/Button'
import {includes} from 'lodash';

class ScenarioItem extends React.Component {
    toggleSelection = ( ) => {
        this.props.toggleSelection( this.props.scenario.id );
    };

    render( ) {
        const { scenario, toggleSelection, clone, said, deleteScenario } = this.props;
        const { name, description, selected, modelId, isBaseModel, permissions } = scenario;
        const readOnly = !includes(permissions, 'w');

        return (
            <div className="item" data-selected={selected}>
                <button className="toggle" onClick={toggleSelection}><Icon name={selected
                ? 'checked'
                : 'unchecked'}/></button>
                <div className="content">
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <p>
                        {!isBaseModel
                            ? <Link to={'/tools/T07E/' + said + '/' + modelId}>{readOnly ? 'View' : 'Edit'}</Link>
                            : null}
                        {!isBaseModel && !readOnly && <span> | </span>}
                        {!readOnly && <Button type="link" onClick={() => clone(modelId)}>Clone</Button>}
                        {!isBaseModel && !readOnly && <span> | </span>}
                        {!isBaseModel && !readOnly && <Button type="link" onClick={() => deleteScenario(modelId)}>Delete</Button>}
                    </p>
                </div>
            </div>
        );
    }

}

ScenarioItem.PropTypes = {
    said: PropTypes.string.isRequired,
    scenario: PropTypes.object.isRequired,
    clone: PropTypes.func.isRequired,
    deleteScenario: PropTypes.func.isRequired,
    toggleSelection: PropTypes.func.isRequired
};

export default ScenarioItem;
