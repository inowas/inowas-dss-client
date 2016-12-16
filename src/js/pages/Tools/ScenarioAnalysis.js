import React from "react"
import { connect } from "react-redux";
import { browserHistory } from 'react-router';

import ModflowMap from "./../ModFlowMap";
import ScaffoldDividedFixed from "../../components/primitive/ScaffoldDividedFixed";
import ScenarioSelect from "../../components/tools/ScenarioSelect";

import * as modflowAction from "../../actions/ModelActions";


@connect((store) => {
    return {
        modelStore: store.model,
        appState: store.appState
    }
})
export default class ScenarioAnalysis extends React.Component {

    hasData(){
        const model = this.props.modelStore.model;
        return (model.hasOwnProperty('id') == true);
    }

    hasError(){
        return this.props.modelStore.error;
    }

    componentWillMount(){
        modflowAction.fetchModelById(this.props.params.modelId);
    }

    render() {
        const model = this.props.modelStore.model;
        const appState = this.props.appState;

        if (this.hasError()) {
            browserHistory.push('/#/modflow/list');
        }

        if (this.hasData()) {
            return (
                <ScaffoldDividedFixed left={<ScenarioSelect />} right={<ModflowMap model={model} appState={appState}/>} />
            );
        }

        return null;
    }
}
