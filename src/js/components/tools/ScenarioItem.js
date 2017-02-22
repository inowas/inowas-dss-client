import React from 'react';

import '../../../less/scenarioSelect.less';

export default class ScenarioItem extends React.Component {

    toggleSelection = () => {
        this.props.toggleSelection(this.props.scenario.id);
    }

    render() {
        const {name, description, selected, thumbnail} = this.props.scenario;
        const image = require('../../../images/' + thumbnail);
        return (
            <div className="scenarioSelect-item" data-selected={selected}>
                  <img className="thumbnail" src={image} />
                  <input  className="name-input input-on-focus" defaultValue={name} />
                  <textarea className="description-input input-on-focus" defaultValue={description} />
                  <button onClick={this.toggleSelection} className="button">Toggle Selection</button>
            </div>
        );
    }

}

ScenarioItem.propTypes = {
    scenario: React.PropTypes.object.isRequired,
    toggleSelection: React.PropTypes.func.isRequired
}
