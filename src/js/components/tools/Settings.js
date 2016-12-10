import React from "react";

export default class Settings extends React.Component {

    handleChange(e) {
        if (this.props.handleChange){
            this.props.handleChange(e);
        }
    };

    render() {
        console.log(this.props);
        const settings = this.props.data;
        return (
            <div>
                <h2>Settings</h2>
                <div className="center-vertical center-horizontal">
                    <div className="radio-group">
                        <div>
                            <input
                                name="settings"
                                id="radio1"
                                type="radio"
                                value='confined'
                                checked={settings.selected === 'confined'}
                                onChange={this.handleChange.bind(this)}
                            />
                            <label htmlFor="radio1">Confined Aquifer</label>
                        </div>
                        <div>
                            <input
                                name="settings"
                                id="radio2"
                                type="radio"
                                value='unconfined'
                                checked={settings.selected === 'unconfined'}
                                onChange={this.handleChange.bind(this)}
                            />

                            <label htmlFor="radio2">Unconfined Aquifer</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
