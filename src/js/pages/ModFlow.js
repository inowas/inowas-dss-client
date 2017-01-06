import React from "react"
import { connect } from "react-redux";

import ModflowMap from "./ModFlowMap";

import { fetchModelById } from "../actions/ModelActions";
import { setCurrentTool } from "../actions/ApplicationActions";

@connect((store) => {
    return {
        modelStore: store.model,
        appState: store.appState
    }
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
        this.props.dispatch(fetchModelById(this.props.params.modelId));
        this.props.dispatch(setCurrentTool('modflow'));
    }

    render() {
        const styles = this.props.modelStore.styles;
        const model = this.props.modelStore.model;
        const appState = this.props.appState;

        if (this.hasData()) {
            return (
                <div className="page-wrapper">
                    <ModflowMap model={model} styles={styles} appState={appState} />
                </div>
            );
        }

        return null;
    }
}
