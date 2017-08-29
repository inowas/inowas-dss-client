import * as filters from '../../calculations/filter';

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

    handleInputChange = (name) => {
        return value => {
            this.setState( prevState => {
                return {
                    ...prevState,
                    layer: {
                        ...prevState.layer,
                        [name]: value
                    }
                };
            } );
        }
    };

    handleSelectChange = (name) => {
        return data => this.handleInputChange(name)(data ? data.value : undefined);
    };

    save = () => {
        this.props.onSave(this.state.layer);
    };

    render() {
        const { readOnly, updateLayerStatus } = this.props;
        const { layer } = this.state;

        const processing = WebData.Component.Processing(
            <Button onClick={this.save}>Save</Button>
        );

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
                        <LayoutComponents.InputGroup label="Top">
                            <Input
                                disabled={readOnly}
                                type="number"
                                name="top"
                                value={layer.top}
                                cast={parseFloat}
                                onChange={this.handleInputChange('top')}
                                placeholder="top"
                            />
                        </LayoutComponents.InputGroup>}

                    <LayoutComponents.InputGroup label="Bottom">
                        <Input
                            disabled={readOnly}
                            type={getTypeForInput(layer.botm)}
                            name="botm"
                            value={getValueForInput(layer.botm)}
                            cast={parseFloat}
                            onChange={this.handleInputChange('botm')}
                            placeholder="botm"
                        />
                    </LayoutComponents.InputGroup>

                    <LayoutComponents.InputGroup label="HK">
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

                    <LayoutComponents.InputGroup label="Hani">
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

                    <LayoutComponents.InputGroup label="VKA">
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

                    <LayoutComponents.InputGroup label="Layer Average">
                        <Select
                            name="layavg"
                            disabled={readOnly}
                            value={layer.layavg}
                            onChange={this.handleSelectChange('layavg')}
                            options={[
                                {
                                    value: 0,
                                    label: 'Layer AVG 1'
                                },
                                {
                                    value: 1,
                                    label: 'Layer AVG 2'
                                },
                                {
                                    value: 2,
                                    label: 'Layer AVG 3'
                                }
                            ]}
                        />
                    </LayoutComponents.InputGroup>

                    <LayoutComponents.InputGroup label="laywet">
                        <Input
                            disabled={readOnly}
                            type={getTypeForInput(layer.laywet)}
                            name="laywet"
                            value={getValueForInput(layer.laywet)}
                            cast={parseFloat}
                            onChange={this.handleInputChange('laywet')}
                            placeholder="laywet"
                        />
                    </LayoutComponents.InputGroup>

                    <LayoutComponents.InputGroup label="ss">
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

                    <LayoutComponents.InputGroup label="sy">
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

                <div style={styles.saveButtonWrapper}>
                    {processing(updateLayerStatus)}
                </div>
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
