import React from "react"
import { connect } from "react-redux";

import ModflowMap from "./ModFlowMap";

import * as modflowAction from "../actions/ModelActions"
import * as appAction from "../actions/ApplicationActions"


@connect((store) => {
    return {
        models: store.models,
    }
})
export default class ModelList extends React.Component {

    hasData(){
        return this.props.models.fetched;
    }

    componentWillMount(){
        modflowAction.fetchAllModels();
    }

    render() {
        if (this.hasData()){
            return (
                <span>HASDATA</span>
            )
        }

        return (
            <span>LOADING</span>
        );
    }
}
