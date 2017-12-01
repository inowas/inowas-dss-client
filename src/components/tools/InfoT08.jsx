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
        const settings = this.props.settings;
        const x = this.props.x.value;
        const t = this.props.t.value;
        const c0 = this.props.c0.value;
        const info = this.props.info;
        const c = (c0*info.C).toFixed(2);
        if (settings.case === 'Case2') {
            var text = <p>After fixed <strong>{t} days</strong> since introduction of constant point source the
                concentration is <strong>{c} mg/l</strong> at a distance of <strong>{x} m</strong> from constant point source.'</p>
        }
        if (settings.case === 'Case1') {
            var text = <p>At a fixed distance of <strong>{x} m</strong> from constant point source the
                concentration is <strong>{c} mg/l</strong> after <strong>{t} days</strong> since introduction of
                constant point source.</p>
        }
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
                            <input name="Infilt" id="radio3" type="radio" value="Continuous" checked= {settings.infiltration === 'Continuous'}
                                   style={styleupdate} onChange={this.handleChange}/>
                            <label htmlFor="radio3">Continuous infiltration</label>
                        </div>
                        <div>
                            <input name="Infilt" id="radio4" type="radio" value="OneTime" checked= {settings.infiltration === 'OneTime'}
                                   style={styleupdate} onChange={this.handleChange} />
                            <label htmlFor="radio4">One-time infiltration</label>
                        </div>
                    </div>
                </div>
                <p><br/><br/>
                    {text}</p>
            </div>
        )
    }
}
