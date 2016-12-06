import React from "react"
import { connect } from "react-redux";

import ModflowMap from "./ModFlowMap";

import * as modflowAction from "../actions/ModelActions"

@connect((store) => {
    return {
        model: store.model.model,
        appState: store.appState
    }
})
export default class ModFlow extends React.Component {
    render() {
        if (this.props.model.hasOwnProperty('id') == false){
            this.props.dispatch(modflowAction.fetchExampleModel());
        }

        return (
            <ModflowMap model={this.props.model} appState={this.props.appState} />
        );
    }
}
