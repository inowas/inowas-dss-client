import React from "react";
import Icon from "../primitive/Icon";

export default class ScenarioListItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: props.scenario.name,
            description: props.scenario.description,
            editH3: false,
            editDIV: false
        }
    }

    onClickDuplicateHandler(e){
        this.props.duplicateScenario(this.props.scenario.id);
    }

    onClickDeleteHandler(e){
        this.props.deleteScenario(this.props.scenario.id);
    }

    onClickEditHandler(e){
        console.log({['edit'+e.target.nodeName]: true});
        this.setState({['edit'+e.target.nodeName]: true});
    }

    onChangeHandler(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onBlurHandler(e){
        this.setState({editH3: false, editDIV: false});
        this.props.updateNameAndDescription(this.props.scenario.id, this.state.name, this.state.description);
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

    renderName(){
        if (this.state.editH3){
            return (
                <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChangeHandler.bind(this)}
                    onBlur={this.onBlurHandler.bind(this)} />
            )
        }

        return(
            <h3
                onClick={this.onClickEditHandler.bind(this)}
                className="item-heading"
            >
                {this.state.name}
            </h3>
        )
    }

    renderDescription(){
        const description = this.state.description;

        if (this.state.editDIV) {
            return(
                <textarea
                    rows="4"
                    cols="20"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChangeHandler.bind(this)}
                    onBlur={this.onBlurHandler.bind(this)} />
            )
        }

        return(
            <div
                onClick={this.onClickEditHandler.bind(this)}
                className="item-description"
            >
                {description}
            </div>
        )
    }

    render(){

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

                {this.renderName()}
                {this.renderDescription()}
            </li>
        )
    }
}
