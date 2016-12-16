import React from "react";
import BoundaryListItem from "./BoundaryListItem";

export default class BoundariesList extends React.Component {

    render() {
        const boundaries = this.props.boundaries;
        const activeBoundary = this.props.activeBoundary;

        let items = "";
        if (boundaries.length > 0) {
            items = boundaries.map(function (boundary) {
                return (
                    <BoundaryListItem key={boundary.id} boundary={boundary} active={boundary.id == activeBoundary}/>
                );
            });
        }

        return (
            <div className="list-group">
                {items}
            </div>
        );
    }
}
