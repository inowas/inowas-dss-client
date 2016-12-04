import React from "react";
import ModelListItem from "./ModelListItem";

export default class ModelList extends React.Component {

    render() {
        const models = this.props.models;
        const activeModel = this.props.activeModel;

        let modelListItems = "";
        if (models.length > 0) {

            modelListItems = models.map(function (model) {
                return (
                    <ModelListItem key={model.id} model={model} active={model.id == activeModel}/>
                )
            });
        }

        return (
            <div className="list-group">
                {modelListItems}
            </div>
        );
    }

}
