import React from 'react';
import ScenarioListItem from './ScenarioListItem';
import store from '../../store';
import { duplicateScenario, deleteScenario, updateNameAndDescription, setActiveScenario, fetchScenario, getHeadList } from '../../actions/ScenarioAnalysisActions';

export default class ScenarioSelect extends React.Component {

    constructor(props){
        super(props)

        this.state = {

        }
    }

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

    setActiveScenario(scenarioId){
        const modelId = this.props.baseModel;
        store.dispatch(setActiveScenario(scenarioId));
        store.dispatch(fetchScenario(modelId, scenarioId));
        store.dispatch(getHeadList(scenarioId));
    }

    componentWillMount(){
        const modelId = this.props.baseModel;
        const activeScenario = this.props.activeScenario;
        store.dispatch(fetchScenario(modelId, activeScenario));
        store.dispatch(getHeadList(activeScenario));
    }

    render() {
        const activeScenario = this.props.activeScenario;
        const scenarios = this.props.scenarios.sort( (a,b) => {
            return (a.order - b.order)
        }).map( s => {
            return(
                <ScenarioListItem
                    key={s.id}
                    scenario={s}
                    active={activeScenario==s.id}
                    setActiveScenario={this.setActiveScenario.bind(this)}
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
