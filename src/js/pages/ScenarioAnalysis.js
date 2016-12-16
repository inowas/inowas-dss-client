import React from "react"
import {connect} from "react-redux";
import {browserHistory} from 'react-router';

import ModflowMap from "./ModFlowMap";

import * as applicationAction from "../actions/ApplicationActions";
import * as modflowAction from "../actions/ModelActions";

import ScenarioSelect from "../components/map/ScenarioSelect";

@connect((store) => {
    return {modelStore: store.model, appState: store.appState}
})
export default class ModFlow extends React.Component {

    hasData() {
        const model = this.props.modelStore.model;
        return (model.hasOwnProperty('id') == true);
    }

    hasError() {
        return this.props.modelStore.error;
    }

    componentWillMount() {
        modflowAction.fetchModelById(this.props.params.modelId);
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
        const className = appState.scenarioAnalysisSelect ? "off-canvas-active" : null;

        if (this.hasError()) {
            browserHistory.push('/#/modflow/scenario-analysis');
        }

        if (this.hasData()) {
            return (
                <div className={"page-wrapper " + className}>
                    <ScenarioSelect selectScenario={this.selectScenario.bind(this)} editScenario={this.editScenario.bind(this)} appState={appState} />
                    <ModflowMap model={model} appState={appState}/>
                </div>
            );
        }

        return null;
    }
}
