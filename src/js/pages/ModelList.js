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
                    <Link key={model.id} to={'/modflow/' + model.id}>{model.id}</Link>
                )
            });

            return (
                <div>{models}</div>
            )
        }

        return (
            <span>LOADING</span>
        );
    }
}
