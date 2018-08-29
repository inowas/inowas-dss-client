import {Button, Icon, Form, Tab, Dropdown} from 'semantic-ui-react';
import {WebData} from '../../../core/index';
import ConfiguredRadium from 'ConfiguredRadium';
import PropTypes from 'prop-types';
import React from 'react';
import styleGlobals from 'styleGlobals';
import RasterData from '../../../core/rasterData/components/rasterData';
import ZonesMap from './SoilmodelZonesMap';
import {SoilmodelLayer, SoilmodelZone} from "../../../core/soilmodel";

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
    inputfix: {
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
            layer: (new SoilmodelLayer()).toObject,
            zones: [],
            selectedZone: null,
            activeIndex: 0
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState(prevState => {
            return {
                layer: SoilmodelLayer.fromObject(nextProps.layer
                    ? {...prevState.layer, ...nextProps.layer}
                    : prevState.layer).toObject
            };
        });
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

    handleSelectChange = name => {
        return (e, data) =>
            this.handleInputChange(name)(e, data ? data.value : undefined);
    };

    onAddZone = () => {
        const zone = new SoilmodelZone();

        this.setState({
            selectedZone: zone
        });
    };

    onSaveZone = () => {
        const layer = SoilmodelLayer.fromObject(this.state.layer).updateZone(this.state.selectedZone)

        this.setState({
            layer: layer.toObject,
            selectedZone: null
        });
    };

    onRemoveZone = () => {
        const layer = SoilmodelLayer.fromObject(this.state.layer).removeZone(this.state.selectedZone)

        this.setState({
            layer: layer.toObject,
            selectedZone: null
        });
    };

    save = () => {
        this.props.onSave(this.state.layer);
    };

    render() {
        const {area, boundingBox, gridSize, isLoading, readOnly, updateLayerStatus} = this.props;
        const {layer} = this.state;

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
            },
            {
                menuItem: 'Elevation', render: () =>
                    <Tab.Pane attached={false}>
                        <RasterData
                            area={area}
                            boundingBox={boundingBox}
                            gridSize={gridSize}
                            name={'Top elevation'}
                            unit={'m'}
                            data={layer.top}
                            readOnly={readOnly}
                            onChange={this.handleInputChange('top')
                            }
                        />
                        <RasterData
                            area={area}
                            boundingBox={boundingBox}
                            gridSize={gridSize}
                            name={'Bottom elevation'}
                            unit={'m'}
                            data={layer.botm}
                            readOnly={readOnly}
                            onChange={this.handleInputChange('botm')}
                        />
                    </Tab.Pane>
            },
            {
                menuItem: 'Soil Parameters', render: () =>
                    <Tab.Pane attached={false}>
                        <Form.Group style={styles.dropDownWithButtons}>
                            <Dropdown
                                placeholder="Select Zone"
                                fluid
                                search
                                selection
                                options={
                                    this.state.zones.map((z) => {
                                        return {key: z.id, text: z.name, value: z.id};
                                    })
                                }
                            />
                            <Button.Group>
                                <Button
                                    style={styles.buttonFix}
                                    icon
                                    onClick={this.onAddZone}
                                >
                                    <Icon name="add circle"/>
                                </Button>

                                <Button
                                    style={styles.buttonFix}
                                    icon
                                    onClick={this.onRemoveZone}
                                    disabled={!this.state.selectedZone}
                                >
                                    <Icon name="trash"/>
                                </Button>
                            </Button.Group>
                        </Form.Group>
                        <ZonesMap
                            area={this.props.area}
                            bbox={this.props.boundingBox}
                            gridSize={this.props.gridSize}
                            onChange={this.handleInputChange('test')}
                            layer={this.state.layer}
                            zone={this.state.selectedZone}
                            readOnly
                        />
                    </Tab.Pane>
            },
        ];

        return (
            <div>
                <Form loading={isLoading}>
                    <Tab panes={panes}/>
                </Form>
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
