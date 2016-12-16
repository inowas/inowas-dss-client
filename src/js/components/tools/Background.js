import React from "react";

export default class Background extends React.Component {
    render() {
        return (
            <div>
                <h2>Background</h2>
                <div className="center-horizontal center-vertical">
                    <img src={this.props.image} />
                </div>
            </div>
        )
    }
}
