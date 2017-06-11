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
                            <label htmlFor="radio1">Fixed T, variable L</label>
                        </div>
                        <div>
                            <input name="settings" id="radio2" type="radio" value="Case2" checked={settings.case === 'Case2'}
                                   style={styleupdate} onChange={this.handleChange}/>
                            <label htmlFor="radio1">Variable T, fixed L</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
