import React from "react"

export default class ScenarioSelect extends React.Component {

    render() {
        return (
            <ul className="scenario-select">
              <li className="scenario-select-item active">
                <div className="aspect-ratio-wrapper"><div className="aspect-ratio-element item-figure-placeholder"></div></div>
                <h3>Scenario 1</h3>
                <div className="item-description">
                  Description sfjngjbwrfbwwf wuhq hurg griu ug ur urg rreg!
                </div>
              </li>

              <li className="scenario-select-item">
                <div className="aspect-ratio-wrapper"><div className="aspect-ratio-element item-figure-placeholder"></div></div>
                <h3>Scenario 2</h3>
                <div className="item-description">
                  Description sfjngjbwrfbwwf wuhq hurg griu ug ur urg rreg!
                </div>
              </li>

              <li className="scenario-select-item">
                <h3>Scenario 3</h3>
                <div className="item-description">
                  Description sfjngjbwrfbwwf wuhq hurg griu ug ur urg rreg!
                </div>
              </li>
            </ul>
        );
    }

}
