import React from "react"
import { connect } from "react-redux";

import ModflowMap from "./ModFlowMap";

import * as modflowAction from "../actions/ModelActions"
import * as appAction from "../actions/ApplicationActions"


@connect((store) => {
    return {
        model: store.model.model,
        models: store.models.models,
        appState: store.appState
    }
})
export default class ModFlow extends React.Component {

    loadModels(){
        if (this.props.model.hasOwnProperty('id') == true){
            return 1;
        }

        if (this.props.appState.modelId == null){
            if (this.props.models.length > 0) {
                appAction.setActiveModel(this.props.models[0].id);
                return 1;
            }

            modflowAction.fetchAllModels();
            return 1;
        }

        modflowAction.fetchModelById(this.props.appState.modelId);
    }

    componentWillMount(){
        this.loadModels();
    }

    componentDidUpdate(){
        this.loadModels();
    }

    render() {
        if (this.props.model.hasOwnProperty('id') == true) {
            return (
                <ModflowMap model={this.props.model} appState={this.props.appState}/>
            );
        }

        return null;
    }
}
