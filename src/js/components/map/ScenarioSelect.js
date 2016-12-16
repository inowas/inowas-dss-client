import React from "react";
import Icon from "../primitive/Icon";

export default class ScenarioSelect extends React.Component {

    toggle() {
      if(this.props.appState.scenarioAnalysisSelect) {
        this.props.editScenario();
      } else {
        this.props.selectScenario();
      }
    }

    render() {
        return (
            <div className="off-canvas-drawer">
                <button className="toggle" onClick={this.toggle.bind(this)}>umschalten</button>

                <ul className="scenario-select">
                    <li className="scenario-select-item active">
                        <div className="item-img-wrapper">
                            <img src="../images/scenarios_thumb.png"/>
                            <div className="item-buttons">
                                <button onClick={this.props.editScenario} className="item-button"><Icon icon="edit"/></button>
                                <button className="item-button"><Icon icon="duplicate"/></button>
                                <button className="item-button"><Icon icon="trash"/></button>
                            </div>
                        </div>
                        <h3 className="item-heading">Scenario 1</h3>
                        <div className="item-description">
                            Description sfjngjbwrfbwwf wuhq hurg griu ug ur urg rreg!
                        </div>
                    </li>

                    <li className="scenario-select-item">
                        <div className="item-img-wrapper">
                            <img src="../images/scenarios_thumb.png"/>
                            <div className="item-buttons">
                                <button onClick={this.props.editScenario} className="item-button"><Icon icon="edit"/></button>
                                <button className="item-button"><Icon icon="duplicate"/></button>
                                <button className="item-button"><Icon icon="trash"/></button>
                            </div>
                        </div>
                        <h3 className="item-heading">Scenario 2</h3>
                        <div className="item-description">
                            Description sfjngjbwrfbwwf wuhq hurg griu ug ur urg rreg!
                        </div>
                    </li>

                    <li className="scenario-select-item">
                        <div className="item-img-wrapper">
                            <img src="../images/scenarios_thumb.png"/>
                            <div className="item-buttons">
                                <button onClick={this.props.editScenario} className="item-button"><Icon icon="edit"/></button>
                                <button className="item-button"><Icon icon="duplicate"/></button>
                                <button className="item-button"><Icon icon="trash"/></button>
                            </div>
                        </div>
                        <h3 className="item-heading">Scenario 3</h3>
                        <div className="item-description">
                            Description sfjngjbwrfbwwf wuhq hurg griu ug ur urg rreg!
                        </div>
                    </li>
                </ul>
            </div>
        );
    }

}
