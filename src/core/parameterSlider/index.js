import React from 'react';
import PropTypes from 'prop-types';
import HtmlLabel from '../../components/primitive/HtmlLabel';

class ParameterSlider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            param: props.param,
            localChange: false
        };
    }

    componentWillReceiveProps(nextProps) {
        const param = {
            ...nextProps.param,
            value: Number(nextProps.param.value).toFixed(nextProps.param.decimals)
        };

        this.setState({
            ...this.state,
            param,
            localChange: false
        });
    }

    handleLocalChange = ({target}) => {
        const {value, name} = target;

        let param;
        if (name.endsWith('value')) {
            param = {...this.state.param, value};
        }

        if (name.endsWith('min')) {
            param = {...this.state.param, min: value};
        }

        if (name.endsWith('max')) {
            param = {...this.state.param, max: value};
        }

        this.setState({param, localChange: false});
    };

    render() {
        const {handleChange} = this.props;
        const {param} = this.state;

        // Should do some refactoring
        if (!param.label && param.name) {
            param.label = param.name;
        }

        let disable = false;
        if (param.disable) {
            disable = param.disable;
        }

        return (
            <tr className="parameter">
                <td className="parameter-label">
                    <HtmlLabel html={param.label}/>
                </td>
                <td>
                    <input disabled={disable} name={'parameter_' + param.id + '_min'}
                           className="parameter-min input-max input-xs" type="number" step={param.stepSize}
                           value={param.min} onBlur={handleChange} onChange={this.handleLocalChange}
                    />

                    <input disabled={disable} name={'parameter_' + param.id + '_max'}
                           className="parameter-max input-max input-xs" type="number" step={param.stepSize}
                           value={param.max} onBlur={handleChange} onChange={this.handleLocalChange}
                    />

                    <input disabled={disable} id={param.id + '_range'} name={'parameter_' + param.id + '_value'}
                           className="parameter-input" type="range" min={param.min} max={param.max}
                           step={param.stepSize} value={param.value} onChange={handleChange}
                    />
                </td>
                <td>
                    <input disabled={disable} name={'parameter_' + param.id + '_value'}
                           className="parameter-max input input-xs"
                           type="number" step={param.stepSize} min={param.min} max={param.max}
                           value={param.value} onChange={this.handleLocalChange}
                           onBlur={handleChange}
                    />
                </td>
            </tr>
        );
    }
}

ParameterSlider.propTypes = {
    param: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default ParameterSlider;
