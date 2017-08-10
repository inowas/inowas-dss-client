import React from 'react';
import '../../less/toolT16.less';

export default class Info extends React.Component {
    handleChange = e => {
        if (this.props.handleChange)            {this.props.handleChange(e);}
    };

    render() {
        const styleupdate = {
            marginTop: "10px",
            marginBottom: "10px"
        };
        const settings = this.props.data;
        return (
            <div className="padding-30">
                <h2>Settings</h2>
                <div className="center-vertical center-horizontal">
                    <div className="radio-group">
                        <div>
                            <input name="settings" id="radio1" type="radio" value="Case1" checked={settings.case === 'Case1'}
                                   style={styleupdate} onChange={this.handleChange}/>
                            <label htmlFor="radio1">Variable time (T), Fixed length (x)</label>
                        </div>
                        <div>
                            <input name="settings" id="radio2" type="radio" value="Case2" checked={settings.case === 'Case2'}
                                   style={styleupdate} onChange={this.handleChange}/>
                            <label htmlFor="radio2">Fixed time (T), Variable length (x)</label>
                        </div>
                    </div>
                </div>
                <h3>Select the type of infiltration</h3>
                <div className="center-vertical center-horizontal">
                    <div className="radio-group">
                        <div>
                            <input name="settings2" id="radio3" type="radio" checked= {true}
                                   style={styleupdate} />
                            <label htmlFor="radio3">Continous infiltration</label>
                        </div>
                        <div>
                            <input name="settings2" id="radio4" type="radio" checked= {false}
                                   style={styleupdate} />
                            <label htmlFor="radio4">One-time infiltration</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
