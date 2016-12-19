import React from "react"
import { connect } from "react-redux";

import ModflowMap from "./ModFlowMap";

import { fetchModelById } from "../actions/ModelActions";

@connect((store) => {
    return {
        modelStore: store.model,
        appState: store.appState,
        store: store
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

    handleClick(e, data){
        return(alert('test'))
    }

    componentWillMount() {
        this.props.dispatch(fetchModelById(this.props.params.modelId));
    }

    render() {
        const styles = this.props.modelStore.styles;
        const model = this.props.modelStore.model;
        const appState = this.props.appState;
        const store = this.props.store;

        if (this.hasData()) {
            return (
                <div className="page-wrapper">
                    <ModflowMap onMoveend={this.handleClick} model={model} styles={styles} appState={appState} store={store} />
                </div>
            );
        }

        return null;
    }
}
