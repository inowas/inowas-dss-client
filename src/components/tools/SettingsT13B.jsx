import React from 'react';

export default class Settings extends React.Component {

    handleChange(e){
        this
        .props
        .handleChange(e);
    };
    render() {
        const styleupdate = {
            marginLeft: "40px"
        };
        const settings = this.props.data;
        return (
            <div className="padding-30">
                <p>
                    Would you like to proceed with the left or the right side of the flow domain
                </p>
                <div className="center-vertical center-horizontal">
                    <div className="radio-group">
                        <div>
                            <input name="settings" id="radio1" type="radio" value="h0" checked={settings.selected === 'h0'}
                                   onChange={this.handleChange.bind(this)}/>
                            <label htmlFor="radio1">Left</label>
                            <input name="settings" id="radio2" type="radio" value="hL" style={styleupdate} checked={settings.selected === 'hL'}
                                   onChange={this.handleChange.bind(this)}/>
                            <label htmlFor="radio1">Right</label></div>
                    </div>
                </div>
            </div>
/*
this can be used to align up and down
            <div className="padding-30">
                <p>
                    Would you like to proceed with the left or the right side of the flow domain
                </p>
                <div className="center-vertical center-horizontal">
                    <div className="radio-group">
                        <div>
                            <input name="settings" id="radio1" type="radio" value="h0" checked={settings.selected === 'h0'}
                                   onChange={this.handleRadioChange.bind(this)}/>
                            <label htmlFor="radio1">Left</label>
                        </div>
                        <div>
                            <input name="settings" id="radio2" type="radio" value="hL" checked={settings.selected === 'hL'}
                                   onChange={this.handleRadioChange.bind(this)}/>
                            <label htmlFor="radio1">Right</label></div>
                    </div>
                </div>
            </div>

*/
        )
    }
}
