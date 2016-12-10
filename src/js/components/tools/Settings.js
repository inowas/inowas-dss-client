import React from "react";

export default class Settings extends React.Component {

    render() {
        return (
            <div>
                <h2>Settings</h2>
                <div className="center-vertical center-horizontal">
                    <div className="radio-group">
                        <div>
                            <input name="radio-group-1" type="radio" value="" id="radio1"/>
                            <label htmlFor="radio1">Confined Aquifer</label>
                        </div>
                        <div>
                            <input name="radio-group-1" type="radio" value="" id="radio2"/>
                            <label htmlFor="radio2">Unconfined Aquifer</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
