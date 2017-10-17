import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from '../../components/primitive/Select';
import ConfiguredRadium from 'ConfiguredRadium';

const styles = {
    width: '100%'
};

@ConfiguredRadium
export default class LayerSelect extends Component {
    static propTypes = {
        layerScheme: PropTypes.array,
        onChange: PropTypes.func.isRequired,
        selectedLayer: PropTypes.number,
        selectedResultType: PropTypes.string
    };

    componentDidMount() {
        const { layerScheme, selectedLayer, selectedResultType } = this.props;
        this.setSelectOptions(layerScheme);
        this.setSelectValue(selectedLayer, selectedResultType);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.layerScheme !== nextProps.layerScheme) {
            this.setSelectOptions(nextProps.layerScheme);
        }

        if (
            this.props.selectedLayer !== nextProps.selectedLayer ||
            this.props.selectedResultType !== nextProps.selectedResultType
        ) {
            this.setSelectValue(
                nextProps.selectedLayer,
                nextProps.selectedResultType
            );
        }
    }

    setSelectOptions(layerScheme) {
        this.setState({
            options: layerScheme.map((l, index) => ({
                label: `Layer ${index}`,
                options: l
                    ? l.map(v => ({
                        label: `Layer ${index} ${v}`,
                        value: `${index}_${v}`
                    }))
                    : []
            }))
        });
    }

    setSelectValue(selectedLayer, selectedResultType) {
        this.setState({
            value: `${selectedLayer}_${selectedResultType}`
        });
    }

    onChange = ({ value }) => {
        const { onChange } = this.props;
        const splittedValue = value.split('_');
        const selectedLayer = Number(splittedValue[0]);
        const selectedResultType = splittedValue[1];
        onChange(selectedLayer, selectedResultType);
    };

    render() {
        const { options, value } = this.state;
        return (
            <Select
                value={value}
                style={styles}
                options={options}
                onChange={this.onChange}
            />
        );
    }
}
