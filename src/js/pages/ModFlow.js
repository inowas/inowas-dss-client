import React from "react"
import { connect } from "react-redux";
import { browserHistory } from 'react-router';

import ModflowMap from "./ModFlowMap";

import * as modflowAction from "../actions/ModelActions"


@connect((store) => {
    return {
        model: store.model.model,
        appState: store.appState
    }
})
export default class ModFlow extends React.Component {

    hasData(){

    }

    hasError(){
        return true;
    }

    componentWillMount(){
        modflowAction.fetchModelById(this.props.appState.modelId);
    }

    render() {

        if (this.hasError()) {
            browserHistory.push('/#/modflow/list');
        }

        if (this.hasData()) {
            return (
                <ModflowMap model={this.props.model} appState={this.props.appState}/>
            );
        }

        if (this.props.model.hasOwnProperty('id') == true) {

        }
        return null;
    }
}
