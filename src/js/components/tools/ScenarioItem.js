import React from 'react';

import '../../../less/scenarioSelect.less';

export default class ScenarioItem extends React.Component {

    static propTypes = {
        scenario: React.PropTypes.object.isRequired,
        toggleSelection: React.PropTypes.func.isRequired
    }

    toggleSelection = () => {
        this.props.toggleSelection(this.props.scenario.id);
    }

    render() {
        const {scenario, toggleSelection} = this.props;
        const {name, description, selected, thumbnail} = scenario;
        const image = require('../../../images/' + thumbnail);
        return (
            <div className="scenarioSelect-item" data-selected={selected}>
                  <img className="thumbnail" src={image} />
                  <input  className="name-input input-on-focus" defaultValue={name} />
                  <textarea className="description-input input-on-focus" defaultValue={description} />
                  <button onClick={toggleSelection} className="button">Toggle Selection</button>
            </div>
        );
    }

}
