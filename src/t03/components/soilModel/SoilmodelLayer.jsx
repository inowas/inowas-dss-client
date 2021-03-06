import {Button, Form, Tab} from 'semantic-ui-react';
import {WebData} from '../../../core/index';
import ConfiguredRadium from 'ConfiguredRadium';
import PropTypes from 'prop-types';
import React from 'react';
import styleGlobals from 'styleGlobals';
import {SoilmodelLayer} from "../../../core/soilmodel";
import SoilmodelLayerParameter from "./SoilmodelLayerParameter";

const styles = {
    saveButtonWrapper: {
        textAlign: 'right',
        marginTop: styleGlobals.dimensions.spacing.medium,
        selectedZone: null
    },
    input: {
        backgroundColor: 'transparent',
        padding: 0
    },
    accordion: {
        marginTop: 1
    },
    iconfix: {
        width: 'auto',
        height: 'auto'
    },
    inputFix: {
        padding: '0'
    },
    buttonFix: {
        width: 'auto',
        height: 'auto'
    },
};

class SoilmodelLayerComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            layer: props.layer.toObject
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState(() => ({
            layer: nextProps.layer.toObject
        }));
    }

    handleInputChange = name => {
        return (e, data) => {
            let value = data;

            if (e && e.target && e.target.value) {
                value = e.target.value;
            }

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

    handleZonesChange = layer => {
        this.props.onSave(layer.toObject);
    };

    handleSelectChange = name => {
        return (e, data) =>
            this.handleInputChange(name)(e, data ? data.value : undefined);
    };

    save = () => {
        this.props.onSave(this.state.layer);
    };

    recalculateMap = () => {
        const layer = SoilmodelLayer.fromObject(this.state.layer);
        layer.zonesToParameters(this.props.gridSize);
        this.props.onSave(layer.toObject);
    };

    render() {
        const {isLoading, readOnly, updateLayerStatus} = this.props;
        const {layer} = this.state;

        if (!layer) {
            return false;
        }

        const panes = [
            {
                menuItem: 'Name and Type', render: () =>
                    <Tab.Pane attached={false}>
                        <Form.Group widths={2}>
                            <Form.Input
                                disabled={readOnly}
                                style={styles.input}
                                value={layer.name}
                                label={'Layer name'}
                                onChange={this.handleInputChange('name')}
                            />
                            <Form.TextArea
                                disabled={readOnly}
                                style={styles.input}
                                value={layer.description}
                                label={'Layer description'}
                                onChange={this.handleInputChange('description')}
                            />
                        </Form.Group>
                        <Form.Group widths={3}>
                            <Form.Select
                                disabled={readOnly}
                                label={'Layer type'}
                                value={layer.laytyp}
                                onChange={this.handleSelectChange('laytyp')}
                                options={[
                                    {
                                        value: 0,
                                        text: 'confined',
                                    },
                                    {
                                        value: 1,
                                        text: 'convertible',
                                    },
                                    {
                                        value: -1,
                                        text: 'convertible (unless THICKSTRT)',
                                    }
                                ]}
                            />
                            <Form.Select
                                disabled={readOnly}
                                label={'Layer average calculation'}
                                value={layer.layavg}
                                onChange={this.handleSelectChange('layavg')}
                                options={[
                                    {
                                        value: 0,
                                        text: 'harmonic mean'
                                    },
                                    {
                                        value: 1,
                                        text: 'logarithmic mean'
                                    },
                                    {
                                        value: 2,
                                        text: 'arithmetic mean (saturated thickness) and logarithmic mean (hydraulic conductivity)'
                                    }
                                ]}
                            />
                            <Form.Select
                                disabled={readOnly}
                                label={'Rewetting capability'}
                                value={layer.laywet}
                                onChange={this.handleSelectChange('laywet')}
                                options={[
                                    {
                                        value: 0,
                                        text: 'No'
                                    },
                                    {
                                        value: 1,
                                        text: 'Yes'
                                    },
                                ]}
                            />
                        </Form.Group>
                    </Tab.Pane>
            }
        ];

        const parameters = [
            {
                name: 'top',
                description: 'Top elevation',
                unit: 'm'
            },
            {
                name: 'botm',
                description: 'Bottom elevation',
                unit: 'm'
            },
            {
                name: 'hk',
                description: 'Horizontal conductivity along rows',
                unit: 'm/day'
            },
            {
                name: 'hani',
                description: 'Horizontal hydraulic anisotropy',
                unit: '-'
            },
            {
                name: 'vka',
                description: 'Vertical hydraulic conductivity',
                unit: 'm/day'
            },
            {
                name: 'ss',
                description: 'Specific storage',
                unit: '-'
            },
            {
                name: 'sy',
                description: 'Specific yield',
                unit: '1/m'
            }
        ];

        parameters.forEach(p => {
            panes.push({
                menuItem: p.name, render: () =>
                    <Tab.Pane attached={false}>
                        <SoilmodelLayerParameter
                            area={this.props.area}
                            bbox={this.props.boundingBox}
                            gridSize={this.props.gridSize}
                            onChange={this.handleZonesChange}
                            handleInputChange={this.handleInputChange(p.name)}
                            parameter={p}
                            readOnly={readOnly}
                            layer={SoilmodelLayer.fromObject(this.state.layer)}
                        />
                    </Tab.Pane>
            });
        });

        return (
            <div>
                <Form loading={isLoading}>
                    <Tab panes={panes}/>
                </Form>

                {!readOnly &&
                <div style={styles.saveButtonWrapper}>
                    <WebData.Component.Loading status={updateLayerStatus}>
                        <Button positive onClick={this.save}>Save</Button>
                        <Button primary onClick={this.recalculateMap}>Recalculate All Parameters</Button>
                    </WebData.Component.Loading>
                </div>
                }
            </div>
        );
    }
}

SoilmodelLayerComponent.propTypes = {
    area: PropTypes.object.isRequired,
    boundingBox: PropTypes.array.isRequired,
    gridSize: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    layer: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    readOnly: PropTypes.bool.isRequired,
    updateLayerStatus: PropTypes.object
};

export default ConfiguredRadium(SoilmodelLayerComponent);