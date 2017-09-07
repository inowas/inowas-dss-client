import { LayoutComponents, WebData } from '../../core';
import { first, last } from 'lodash';

import Button from '../../components/primitive/Button';
import ConfiguredRadium from 'ConfiguredRadium';
import Input from '../../components/primitive/Input';
import PropTypes from 'prop-types';
import React from 'react';
import Select from '../../components/primitive/Select';
import { getInitialLayerState } from '../selectors/model';
import styleGlobals from 'styleGlobals';

const styles = {
    saveButtonWrapper: {
        textAlign: 'right',
        marginTop: styleGlobals.dimensions.spacing.medium
    }
};

const getValueForInput = value =>
    value instanceof Array ? first(value)[0] + '...' + last(value)[1] : value;
const getTypeForInput = value => (value instanceof Array ? 'text' : 'number');

@ConfiguredRadium
class SoilmodelLayer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            layer: getInitialLayerState()
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState(prevState => {
            return {
                layer: nextProps.layer
                    ? { ...prevState.layer, ...nextProps.layer }
                    : prevState.layer
            };
        });
    }

    handleInputChange = name => {
        return value => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    layer: {
                        ...prevState.layer,
                        [name]: value
                    }
                };
            });
        };
    };

    handleSelectChange = name => {
        return data =>
            this.handleInputChange(name)(data ? data.value : undefined);
    };

    save = () => {
        this.props.onSave(this.state.layer);
    };

    render() {
        const { readOnly, updateLayerStatus } = this.props;
        const { layer } = this.state;

        return (
            <div>
                <section>
                    <LayoutComponents.InputGroup label="Name">
                        <Input
                            disabled={readOnly}
                            name="name"
                            onChange={this.handleInputChange('name')}
                            value={layer.name}
                            placeholder="Name"
                        />
                    </LayoutComponents.InputGroup>

                    <LayoutComponents.InputGroup label="Description">
                        <Input
                            type="textarea"
                            disabled={readOnly}
                            name="description"
                            onChange={this.handleInputChange('description')}
                            value={layer.description}
                            placeholder="Description"
                        />
                    </LayoutComponents.InputGroup>

                    {layer.top !== 'undefined' &&
                        <LayoutComponents.InputGroup label="Top elevation (m asl.)">
                            <Input
                                disabled={readOnly}
                                type={getTypeForInput(layer.botm)}
                                name="top"
                                value={getValueForInput(layer.top)}
                                cast={layer.top instanceof Array ? null : parseFloat}
                                onChange={this.handleInputChange('top')}
                                placeholder="top"
                            />
                        </LayoutComponents.InputGroup>}

                    <LayoutComponents.InputGroup label="Bottom elevation (m asl.)">
                        <Input
                            disabled={readOnly}
                            type={getTypeForInput(layer.botm)}
                            name="botm"
                            value={getValueForInput(layer.botm)}
                            cast={layer.botm instanceof Array ? null : parseFloat}
                            onChange={this.handleInputChange('botm')}
                            placeholder="botm"
                        />
                    </LayoutComponents.InputGroup>

                    <LayoutComponents.InputGroup label="Horizontal hydraulic conductivity kx (m/day)">
                        <Input
                            disabled={readOnly}
                            type={getTypeForInput(layer.hk)}
                            name="hk"
                            value={getValueForInput(layer.hk)}
                            cast={parseFloat}
                            onChange={this.handleInputChange('hk')}
                            placeholder="hk"
                        />
                    </LayoutComponents.InputGroup>

                    <LayoutComponents.InputGroup label="Horizontal hydraulic anisotropy (-)">
                        <Input
                            disabled={readOnly}
                            type={getTypeForInput(layer.hani)}
                            name="hani"
                            value={getValueForInput(layer.hani)}
                            cast={parseFloat}
                            onChange={this.handleInputChange('hani')}
                            placeholder="hani"
                        />
                    </LayoutComponents.InputGroup>

                    <LayoutComponents.InputGroup label="Vertical hydraulic conductivity kz (m/day)">
                        <Input
                            disabled={readOnly}
                            type={getTypeForInput(layer.vka)}
                            name="vka"
                            value={getValueForInput(layer.vka)}
                            cast={parseFloat}
                            onChange={this.handleInputChange('vka')}
                            placeholder="vka"
                        />
                    </LayoutComponents.InputGroup>

                    <LayoutComponents.InputGroup label="Layer Type">
                        <Select
                            clearable={false}
                            name="laytyp"
                            disabled={readOnly}
                            value={layer.laytyp}
                            onChange={this.handleSelectChange('laytyp')}
                            options={[
                                {
                                    value: 0,
                                    label: 'confined'
                                },
                                {
                                    value: 1,
                                    label: 'convertible'
                                },
                                {
                                    value: -1,
                                    label: 'convertible (unless THICKSTRT)'
                                }
                            ]}
                        />
                    </LayoutComponents.InputGroup>

                    <LayoutComponents.InputGroup label="Layer average calculation">
                        <Select
                            clearable={false}
                            name="layavg"
                            disabled={readOnly}
                            value={layer.layavg}
                            onChange={this.handleSelectChange('layavg')}
                            options={[
                                {
                                    value: 0,
                                    label: 'harmonic mean'
                                },
                                {
                                    value: 1,
                                    label: 'logarithmic mean'
                                },
                                {
                                    value: 2,
                                    label: 'arithmetic mean (of saturated thickness and logarithmic mean of hydraulic conductivity)'
                                }
                            ]}
                        />
                    </LayoutComponents.InputGroup>

                    <LayoutComponents.InputGroup label="Rewetting">
                        <Select
                            clearable={false}
                            name="laywet"
                            disabled={readOnly}
                            value={layer.laywet}
                            onChange={this.handleSelectChange('laywet')}
                            options={[
                                {
                                    value: 0,
                                    label: 'No'
                                },
                                {
                                    value: 1,
                                    label: 'Yes'
                                },
                            ]}
                        />
                    </LayoutComponents.InputGroup>

                    <LayoutComponents.InputGroup label="Specific storage Ss">
                        <Input
                            disabled={readOnly}
                            type={getTypeForInput(layer.ss)}
                            name="ss"
                            value={getValueForInput(layer.ss)}
                            cast={parseFloat}
                            onChange={this.handleInputChange('ss')}
                            placeholder="ss"
                        />
                    </LayoutComponents.InputGroup>

                    <LayoutComponents.InputGroup label="Specific yield Sy (1/m)">
                        <Input
                            disabled={readOnly}
                            type={getTypeForInput(layer.sy)}
                            name="sy"
                            value={getValueForInput(layer.sy)}
                            cast={parseFloat}
                            onChange={this.handleInputChange('sy')}
                            placeholder="sy"
                        />
                    </LayoutComponents.InputGroup>
                </section>

                {!readOnly &&
                <div style={styles.saveButtonWrapper}>
                    <WebData.Component.Loading status={updateLayerStatus}>
                        <Button onClick={this.save}>Save</Button>
                    </WebData.Component.Loading>
                </div>
                }
            </div>
        );
    }
}

SoilmodelLayer.propTypes = {
    layer: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    readOnly: PropTypes.bool.isRequired,
    updateLayerStatus: PropTypes.object
};

export default SoilmodelLayer;
