import React from "react";
import ScenarioListItem from "../map/ScenarioListItem"
import store from "../../store"
import { duplicateScenario, deleteScenario, updateNameAndDescription } from "../../actions/ScenarioAnalysisActions"

export default class ScenarioSelect extends React.Component {

    toggle() {
      if(this.props.appState.scenarioAnalysisSelect) {
        this.props.editScenario();
      } else {
        this.props.selectScenario();
      }
    }

    updateNameAndDescription(scenarioId, name, description){
        const modelId = this.props.baseModel;
        store.dispatch(updateNameAndDescription(modelId, scenarioId, name, description));
    }

    duplicateScenario(scenarioId){
        const modelId = this.props.baseModel;
        store.dispatch(duplicateScenario(modelId, scenarioId));
    }

    deleteScenario(scenarioId){
        const modelId = this.props.baseModel;
        store.dispatch(deleteScenario(modelId, scenarioId));
    }

    render() {
        const scenarios = this.props.scenarios.sort( (a,b) => {
            return (a.order - b.order)
        }).map( s => {
            return(
                <ScenarioListItem
                    key={s.id}
                    scenario={s}
                    deleteScenario={this.deleteScenario.bind(this)}
                    duplicateScenario={this.duplicateScenario.bind(this)}
                    updateNameAndDescription={this.updateNameAndDescription.bind(this)}
                />
            )
        });

        return (
            <div className="off-canvas-drawer">
                <button className="toggle" onClick={this.toggle.bind(this)}>umschalten</button>
                <ul className="scenario-select">
                    {scenarios}
                </ul>
            </div>
        );
    }
}
