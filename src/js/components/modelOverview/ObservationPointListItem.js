import React from "react";
import ModelStore from "../../stores/ModelStore"

export default class ObservationPointListItem extends React.Component {

    onClickHandler(e) {
        ModelStore.setActiveObservationPoint(e.target.id)
    }

    getClassNames(active) {
        if (active) {
            return "active";
        }
    }

    render() {
        const observationPoint = this.props.observationPoint;
        const active = this.props.active;

        return (
            <li role="presentation" className={this.getClassNames(active)}>
                <a
                    id={observationPoint.id}
                    onClick={this.onClickHandler}
                    className={this.getClassNames(active)}
                    role="tab">
                    OS1
                </a>
            </li>
        );
    }
}
