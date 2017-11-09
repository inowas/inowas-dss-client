import {WebData} from '../../core';
import * as SUI from 'semantic-ui-react';

import Button from '../../components/primitive/Button';
import ConfiguredRadium from 'ConfiguredRadium';
import PropTypes from 'prop-types';
import React from 'react';
import {getInitialLayerState} from '../selectors/model';
import styleGlobals from 'styleGlobals';
import RasterData from '../../core/rasterData/components/rasterData';

const styles = {
    saveButtonWrapper: {
        textAlign: 'right',
        marginTop: styleGlobals.dimensions.spacing.medium
    },

    input: {
        backgroundColor: 'transparent',
        padding: 0
    },

    grid: {
        marginTop: 0
    },

    accordion: {
        marginTop: 1
    }
};

@ConfiguredRadium
class SoilmodelLayer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            layer: getInitialLayerState(),
            activeIndex: 0
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState(prevState => {
            return {
                layer: nextProps.layer
                    ? {...prevState.layer, ...nextProps.layer}
                    : prevState.layer
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

    handleAccordionClick = (e, titleProps) => {
        const {index} = titleProps;
        const {activeIndex} = this.state;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({activeIndex: newIndex});
    };

    handleSelectChange = name => {
        return (e, data) =>
            this.handleInputChange(name)(e, data ? data.value : undefined);
    };

    save = () => {
        this.props.onSave(this.state.layer);
    };

    render() {
        const {area, boundingBox, gridSize, isLoading, readOnly, updateLayerStatus} = this.props;
        const {activeIndex, layer} = this.state;

        return (
            <div>
                <SUI.Form loading={isLoading}>
                    <SUI.Accordion style={styles.accordion} styled>
                        <SUI.Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleAccordionClick}>
                            <SUI.Header size={'medium'}>
                                <SUI.Icon name="dropdown"/>
                                Name and Type
                            </SUI.Header>
                        </SUI.Accordion.Title>
                        <SUI.Accordion.Content active={activeIndex === 0}>
                            <SUI.Form.Group widths={2}>
                                <SUI.Form.Input
                                    disabled={readOnly}
                                    style={styles.input}
                                    value={layer.name}
                                    label={'Layer name'}
                                    onChange={this.handleInputChange('name')}
                                />
                                <SUI.Form.TextArea
                                    disabled={readOnly}
                                    style={styles.input}
                                    value={layer.description}
                                    label={'Layer description'}
                                    onChange={this.handleInputChange('description')}
                                />
                            </SUI.Form.Group>
                            <SUI.Form.Group widths={3}>
                                <SUI.Form.Select
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
                                <SUI.Form.Select
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
                                <SUI.Form.Select
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
                            </SUI.Form.Group>
                        </SUI.Accordion.Content>

                        <SUI.Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleAccordionClick}>
                            <SUI.Header size={'medium'}>
                                <SUI.Icon name="dropdown"/>
                                Elevation
                            </SUI.Header>
                        </SUI.Accordion.Title>
                        <SUI.Accordion.Content active={activeIndex === 1}>
                            {
                                activeIndex === 1 && <RasterData
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
                            }

                        </SUI.Accordion.Content>

                        <SUI.Accordion.Content active={activeIndex === 1}>
                            {
                                activeIndex === 1 && <RasterData
                                    area={area}
                                    boundingBox={boundingBox}
                                    gridSize={gridSize}
                                    name={'Bottom elevation'}
                                    unit={'m'} data={layer.botm}
                                    readOnly={readOnly}
                                    onChange={this.handleInputChange('botm')}
                                />
                            }
                        </SUI.Accordion.Content>

                        <SUI.Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleAccordionClick}>
                            <SUI.Header size={'medium'}>
                                <SUI.Icon name="dropdown"/>
                                Conductivity parameters
                            </SUI.Header>
                        </SUI.Accordion.Title>

                        <SUI.Accordion.Content active={activeIndex === 2}>
                            {
                                activeIndex === 2 && <RasterData
                                    area={area}
                                    boundingBox={boundingBox}
                                    gridSize={gridSize}
                                    name={'Horizontal conductivity along rows'}
                                    unit={'m/day'}
                                    data={layer.hk}
                                    readOnly={readOnly}
                                    onChange={this.handleInputChange('hk')}
                                />
                            }
                        </SUI.Accordion.Content>

                        <SUI.Accordion.Content active={activeIndex === 2}>
                            {
                                activeIndex === 2 && <RasterData
                                    area={area}
                                    boundingBox={boundingBox}
                                    gridSize={gridSize}
                                    name={'Horizontal hydraulic anisotropy'}
                                    unit={''}
                                    data={layer.hani}
                                    readOnly={readOnly}
                                    onChange={this.handleInputChange('hani')}
                                />
                            }
                        </SUI.Accordion.Content>

                        <SUI.Accordion.Content active={activeIndex === 2}>
                            {
                                activeIndex === 2 && <RasterData
                                    area={area}
                                    boundingBox={boundingBox}
                                    gridSize={gridSize}
                                    name={'Vertical hydraulic conductivity'}
                                    unit={'m/day'}
                                    data={layer.vka}
                                    readOnly={readOnly}
                                    onChange={this.handleInputChange('vka')}
                                />
                            }
                        </SUI.Accordion.Content>

                        <SUI.Accordion.Title active={activeIndex === 3} index={3} onClick={this.handleAccordionClick}>
                            <SUI.Header size={'medium'}>
                                <SUI.Icon name="dropdown"/>
                                Storage parameters
                            </SUI.Header>
                        </SUI.Accordion.Title>

                        <SUI.Accordion.Content active={activeIndex === 3}>
                            {
                                activeIndex === 3 && <RasterData
                                    area={area}
                                    boundingBox={boundingBox}
                                    gridSize={gridSize}
                                    name={'Specific storage Ss'}
                                    unit={''}
                                    data={layer.ss}
                                    readOnly={readOnly}
                                    onChange={this.handleInputChange('ss')}
                                />
                            }
                        </SUI.Accordion.Content>

                        <SUI.Accordion.Content active={activeIndex === 3}>
                            {
                                activeIndex === 3 && <RasterData
                                    area={area}
                                    boundingBox={boundingBox}
                                    gridSize={gridSize}
                                    name={'Specific yield Sy'}
                                    unit={'1/m'}
                                    data={layer.sy}
                                    readOnly={readOnly}
                                    onChange={this.handleInputChange('sy')}
                                />
                            }
                        </SUI.Accordion.Content>

                    </SUI.Accordion>
                </SUI.Form>

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
    area: PropTypes.object.isRequired,
    boundingBox: PropTypes.array.isRequired,
    gridSize: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    layer: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    readOnly: PropTypes.bool.isRequired,
    updateLayerStatus: PropTypes.object
};

export default SoilmodelLayer;
