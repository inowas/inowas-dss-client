import React from "react"
import { hideBoundaryProperties } from "../../actions/ApplicationActions"

export default class ScenarioMapOverlay extends React.Component {

    enableMap() {
        this.context.map._handlers.forEach(function (handler) {
            handler.enable();
        });
    }

    disableMap() {
        this.context.map._handlers.forEach(function (handler) {
            handler.disable();
        });
    }

    hide() {
        this.enableMap();
        hideBoundaryProperties();
    }


    render() {
        if (this.props.appState.boundaryProperties){
            this.disableMap();
            return (
                <div>
                    <div className="map-overlay-darkner"></div>
                    <div className="map-overlay">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <span className="glyphicon glyphicon-remove" onClick={ this.hide.bind(this) } />
                            </div>

                            <div className="panel-body">
                                {this.props.children}
                            </div>

                        </div>
                    </div>
                </div>
            );
        }

        return null;
    }
}

ScenarioMapOverlay.contextTypes = {
    map: React.PropTypes.object
};
