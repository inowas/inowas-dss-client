import React from "react";

import '../../less/toolSketch.less';

export default class Background extends React.Component {
    render() {
        return (
            <div>
                <h2>Background</h2>
                <div className="center-horizontal center-vertical">
                    <img className="sketch-image" src={this.props.image} />
                </div>
            </div>
        )
    }
}
