import React from "react";
import Icon from "../primitive/Icon";

export default class ScenarioListItem extends React.Component{

    onClickDuplicateHandler(e){
        this.props.duplicateScenario(this.props.scenario.id);
    }

    onClickDeleteHandler(e){
        this.props.deleteScenario(this.props.scenario.id);
    }

    renderEditButton(){
        if (this.props.scenario.order != 0) {
            return(
                <button onClick={this.props.editScenario} className="item-button">
                    <Icon icon="edit"/>
                </button>
            )
        }
    }

    renderTrashButton(){
        if (this.props.scenario.order != 0) {
            return(
                <button onClick={this.onClickDeleteHandler.bind(this)} className="item-button">
                    <Icon icon="trash"/>
                </button>
            )
        }
    }

    renderDuplicateButton(){
        return(
            <button onClick={this.onClickDuplicateHandler.bind(this)} className="item-button">
                <Icon icon="duplicate"/>
            </button>
        )
    }

    render(){
        const scenario = this.props.scenario;
        return(
            <li className="scenario-select-item active">
                <div className="item-img-wrapper">
                    <img src="../images/scenarios_thumb.png"/>
                    <div className="item-buttons">
                        {this.renderEditButton()}
                        {this.renderDuplicateButton()}
                        {this.renderTrashButton()}
                    </div>
                </div>
                <h3 className="item-heading">{scenario.name}</h3>
                <div className="item-description">{scenario.description}</div>
            </li>
        )
    }
}
