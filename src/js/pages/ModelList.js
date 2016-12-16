import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

import * as modflowAction from "../actions/ModelActions"


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
            const models = this.props.models.models.map( model => {
                return (
                    <Link key={model.id} to={'/tools/scenario-analysis/' + model.id}>{model.id}</Link>
                )
            });

            return (
                <div className="page-wrapper">
                    <div>
                        {models}
                    </div>
                </div>
            )
        }

        return (
            <div className="page-wrapper">
                <span>LOADING</span>
            </div>
        );
    }
}
