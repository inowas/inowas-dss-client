import React from "react";

import path from "path";
import {Link} from "react-router";

export default class BoundarySidebar extends React.Component {

    renderBoundaryLinks() {
        return this.props.boundaries.map(b => {
            return (
                <li key={b.id} role="presentation">
                    <Link to={path.join(this.props.path, b.id)} activeClassName="active">
                        <span className="color-dot color-1"></span>{b.name}
                    </Link>
                </li>);
        });
    }

    render() {
        return (
            <div className="sidebar col-xs-4 col-md-2">
                <div className="form-group">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search for..."/>
                        <span className="input-group-btn">
              <button className="btn btn-default" type="button">
                <span className="glyphicon glyphicon-search"></span>
              </button>
            </span>
                    </div>
                </div>
                <ul className="scroll-vertical stretch nav nav-pills nav-stacked">
                    {this.renderBoundaryLinks()}
                </ul>
                <button className="btn btn-default btn-block" type="button">
                    <span className="glyphicon glyphicon-plus"></span>
                </button>
            </div>
        );
    }

}
