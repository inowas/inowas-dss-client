import React from 'react';
import PropTypes from 'prop-types';

class Settings extends React.Component {

    handleChange = (e) => {
        this.props.handleChange(e);
    };

    render() {
        const {settings} = this.props;
        return (
            <div>
                <h2>Settings</h2>
                <div className="center-vertical center-horizontal">
                    <div className="radio-group">
                        <div>
                            <input name="variable" type="radio" value="x" checked={settings.variable === 'x'}
                                   onChange={this.handleChange}/>
                            <label htmlFor="radio1">x</label>
                        </div>
                        <div>
                            <input name="variable" type="radio" value="y" checked={settings.variable === 'y'}
                                   onChange={this.handleChange}/>
                            <label htmlFor="radio2">y</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Settings.propTypes = {
    handleChange: PropTypes.func,
    settings: PropTypes.object
};

export default Settings;
