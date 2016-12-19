import React from "react"
import { connect } from "react-redux";
import ModflowMap from "./ModFlowMap";

import * as applicationAction from "../actions/ApplicationActions";
import { fetchScenarios, setBaseModel } from "../actions/ScenarioAnalysisActions"

import ScenarioSelect from "../components/map/ScenarioSelect";

@connect((store) => {
    return {
        modelStore: store.model,
        appState: store.appState,
        scenarioAnalysis: store.scenarioAnalysis
    }
})
export default class ModFlow extends React.Component {

    hasData() {
        return this.props.scenarioAnalysis.fetched;
    }

    componentWillMount() {
        this.props.dispatch(fetchScenarios(this.props.params.modelId));
        this.props.dispatch(setBaseModel(this.props.params.modelId));
    }

    editScenario() {
        applicationAction.switchToScenarioAnalysisEdit();
    }

    selectScenario() {
        applicationAction.switchToScenarioAnalysisSelect();
    }

    render() {
        const model = this.props.modelStore.model;
        const appState = this.props.appState;
        const baseModel= this.props.scenarioAnalysis.baseModel;
        const scenarios = this.props.scenarioAnalysis.scenarios;
        const className = appState.scenarioAnalysisSelect ? "off-canvas-active" : null;

        if (this.hasData()) {
            return (
                <div className={"page-wrapper " + className}>
                    <ScenarioSelect
                        selectScenario={this.selectScenario.bind(this)}
                        editScenario={this.editScenario.bind(this)}
                        appState={appState}
                        scenarios={scenarios}
                        baseModel={baseModel}
                    />
                    <ModflowMap model={model} appState={appState}/>
                </div>
            );
        }

        return null;
    }
}
