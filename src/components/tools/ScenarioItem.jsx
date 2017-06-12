import React from 'react';

import '../../less/scenarioSelect.less';
import Icon from '../primitive/Icon';
import { Link } from 'react-router';
import Button from '../primitive/Button'

export default class ScenarioItem extends React.Component {

    static propTypes = {
        scenario: React.PropTypes.object.isRequired,
        clone: React.PropTypes.func.isRequired,
        toggleSelection: React.PropTypes.func.isRequired
    }

    toggleSelection = ( ) => {
        this.props.toggleSelection( this.props.scenario.id );
    }

    render( ) {
        const { scenario, toggleSelection, clone } = this.props;
        const { name, description, selected, modelId, isBaseModel } = scenario;
        return (
            <div className="item" data-selected={selected} onClick={toggleSelection}>
                <button className="toggle"><Icon name={selected
                ? 'checked'
                : 'unchecked'}/></button>
                <div className="content">
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <p>
                        {!isBaseModel
                            ? <Link to={'/tools/T07E/' + modelId}>Edit</Link>
                            : null}
                        <Button type="link" onClick={() => clone(modelId)}>Clone</Button>
                    </p>
                </div>
            </div>
        );
    }

}
