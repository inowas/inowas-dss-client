import React from "react"
import { connect } from "react-redux";
import ScenarioAnalysisMap from "./ScenarioAnalysisMap";

import { switchToScenarioAnalysisEdit, switchToScenarioAnalysisSelect, setCurrentTool } from "../actions/ApplicationActions";
import { fetchScenarios, setBaseModel, calculateScenario } from "../actions/ScenarioAnalysisActions"

import ScenarioSelect from "../components/map/ScenarioSelect";
import ScenarioMapToolBox from "../components/map/ScenarioMapToolBox";
import ScenarioMapOverlay from "../components/map/ScenarioMapOverlay";
import ScenarioBoundaryProperties from "../components/boundaries/ScenarioBoundaryProperties";

@connect((store) => {
    return {
        modelStore: store.model,
        appState: store.appState,
        scenarioAnalysis: store.scenarioAnalysis,
        store: store
    }
})
export default class ScenarioAnalysis extends React.Component {

    onCalculateHandler(){
        const scenarioId = this.props.scenarioAnalysis.activeScenario;
        this.props.dispatch(calculateScenario(scenarioId));
    }

    canRenderSidebar() {
        return this.props.scenarioAnalysis.fetched;
    }

    canRenderMap() {
        return this.props.scenarioAnalysis.scenario;
    }

    componentWillMount() {
        this.props.dispatch(fetchScenarios(this.props.params.modelId));
        this.props.dispatch(setBaseModel(this.props.params.modelId));
        this.props.dispatch(setCurrentTool('scenarioanalysis'));
    }

    editScenario() {
        this.props.dispatch(switchToScenarioAnalysisEdit());

    }

    selectScenario() {
        this.props.dispatch(switchToScenarioAnalysisSelect());
    }

    renderScenarioSidebar(){
        if (this.canRenderSidebar()) {
            return (
                <ScenarioSelect
                    selectScenario={this.selectScenario.bind(this)}
                    editScenario={this.editScenario.bind(this)}
                    appState={this.props.appState}
                    scenarios={this.props.scenarioAnalysis.scenarios}
                    baseModel={this.props.scenarioAnalysis.baseModel}
                    activeScenario={this.props.scenarioAnalysis.activeScenario}
                />
            )
        }
    }

    renderMap(){
        if (this.canRenderMap()) {
            const scenario = this.props.scenarioAnalysis.scenario;
            const appState = this.props.appState;
            const styles = this.props.modelStore.styles;
            const store = this.props.store;

            return (
                <div>
                    <ScenarioAnalysisMap model={scenario} styles={styles} appState={appState} store={store} />
                    <ScenarioMapToolBox model={scenario} appState={appState} onCalculate={::this.onCalculateHandler} />
                    <ScenarioMapOverlay appState={appState}>
                        <ScenarioBoundaryProperties appState={appState} model={scenario} />
                    </ScenarioMapOverlay>
                </div>
            )}
    }

    render() {
        const className = this.props.appState.scenarioAnalysisSelect ? "off-canvas-active" : null;
        return (
            <div className={"page-wrapper " + className}>
                {this.renderScenarioSidebar()}
                {this.renderMap()}
            </div>
        )
    }
}
