import React from "react";

export default class BoundarySidebar extends React.Component {

    setActiveBoundary(bType, id){
        this.props.setActiveBoundary(bType, id);
    }

    renderBoundaryList( activeBoundaries ) {
        return this.props.boundaries.map(b => {
            return (
                <li key={b.id} role="presentation">
                    <a className={activeBoundaries[b.type] === b.id ? "active" : ""} onClick={this.setActiveBoundary.bind(this, b.type, b.id)}>
                        <span className="color-dot color-1"/>
                        {b.name}
                    </a>
                </li>
            );
        });
    }

    componentWillMount(){
        if (this.props.boundaries.length > 0){
            this.setActiveBoundary(this.props.boundaries[0].type, this.props.boundaries[0].id)
        }
    }

    render() {
        return (
            <div className="sidebar col-xs-4 col-md-2">
                <div className="form-group">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search for..."/>
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="button">
                                <span className="glyphicon glyphicon-search"/>
                            </button>
                        </span>
                    </div>
                </div>
                <ul className="scroll-vertical stretch nav nav-pills nav-stacked">
                    {this.renderBoundaryList(this.props.appState.activeBoundaries)}
                </ul>
                <button className="btn btn-default btn-block" type="button">
                    <span className="glyphicon glyphicon-plus"/>
                </button>
            </div>
        );
    }
}
