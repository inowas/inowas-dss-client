import React from "react";
import {Link} from 'react-router'
import ModelStore from "../../stores/ModelStore"

export default class ModelListItem extends React.Component {

    onClickHandler(e) {
        ModelStore.setActiveModel(e.target.id)
    }

    getClassNames(active) {
        if (!active) {
            return "list-group-item";
        }

        return "list-group-item active";
    }

    render() {
        const model = this.props.model;
        const active = this.props.active;
        return (
            <Link id={model.id} className={this.getClassNames(active)} to={`/mov/${model.id}`}
                  onClick={this.onClickHandler}>
                {model.name}
            </Link>
        );
    }
}
