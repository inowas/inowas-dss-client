import { LayoutComponents, WebData } from '../../core';
import { first, last } from 'lodash';
import * as SUI from 'semantic-ui-react';

import Button from '../../components/primitive/Button';
import ConfiguredRadium from 'ConfiguredRadium';
import Input from '../../components/primitive/Input';
import PropTypes from 'prop-types';
import React from 'react';
import Select from '../../components/primitive/Select';
import { getInitialLayerState } from '../selectors/model';
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
            layer: getInitialLayerState(),
            activeIndex: 1
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
        return (e, data) => {
            let value = data;
            if (e.target.value) {
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
        const { index } = titleProps;
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({ activeIndex: newIndex });
    };

    handleSelectChange = name => {
        return (e, data) =>
            this.handleInputChange(name)(e, data ? data.value : undefined);
    };

    save = () => {
        this.props.onSave(this.state.layer);
    };

    render() {
        const { gridSize, readOnly, updateLayerStatus } = this.props;
        const { activeIndex, layer } = this.state;

        return (
            <div>
                <SUI.Form>
                    <SUI.Accordion>
                        <SUI.Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleAccordionClick}>
                            <SUI.Header size={'medium'}>
                                <SUI.Icon name="dropdown" />
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
                                <SUI.Icon name="dropdown" />
                                Elevation
                            </SUI.Header>
                        </SUI.Accordion.Title>
                        <SUI.Accordion.Content active={activeIndex === 1}>
                            <SUI.Form.Group widths={2}>
                                <RasterData gridSize={gridSize} name={'Top elevation'} data={layer.top} readOnly={readOnly}/>
                            </SUI.Form.Group>
                        </SUI.Accordion.Content>

                        <SUI.Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleAccordionClick}>
                            <SUI.Header size={'medium'}>
                                <SUI.Icon name="dropdown" />
                                Conductivity parameters
                            </SUI.Header>
                        </SUI.Accordion.Title>
                        <SUI.Accordion.Content active={activeIndex === 2}>
                            <p>
                                There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of
                                {' '}dog that they find to be compatible with their own lifestyle and desires from a companion.
                            </p>
                        </SUI.Accordion.Content>

                        <SUI.Accordion.Title active={activeIndex === 3} index={3} onClick={this.handleAccordionClick}>
                            <SUI.Header size={'medium'}>
                                <SUI.Icon name="dropdown" />
                                Storage parameters
                            </SUI.Header>
                        </SUI.Accordion.Title>
                        <SUI.Accordion.Content active={activeIndex === 3}>
                            <p>
                                There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of
                                {' '}dog that they find to be compatible with their own lifestyle and desires from a companion.
                            </p>
                        </SUI.Accordion.Content>

                    </SUI.Accordion>
                </SUI.Form>

                {/*
                <SUI.Segment>
                    <SUI.Form>
                        <SUI.Grid style={styles.grid} divided="vertically">
                            <SUI.Header size={'medium'}>Metadata</SUI.Header>
                            <SUI.Grid.Row columns={2}>
                                <SUI.Grid.Column width={5}>
                                    <SUI.Form.Group widths={2}>
                                        <SUI.Form.Input
                                            label={'Layer Name'}
                                            style={styles.input}
                                            value={layer.name}
                                            onChange={this.handleInputChange('name')}
                                            disabled={readOnly}
                                        />
                                    </SUI.Form.Group>
                                </SUI.Grid.Column>
                                <SUI.Grid.Column width={11}>
                                    <SUI.Label pointing="below">Layer description</SUI.Label>
                                    <SUI.TextArea
                                        label="Description"
                                        value={layer.description}
                                        onChange={this.handleInputChange('description')}
                                        disabled={readOnly}
                                    />
                                </SUI.Grid.Column>
                            </SUI.Grid.Row>

                            <SUI.Header size={'medium'}>Elevations</SUI.Header>
                            <SUI.Grid.Row columns={2}>
                                <SUI.Grid.Column>
                                    <SUI.Form.Field>
                                        <SUI.Label pointing="below">Top Elevation</SUI.Label>
                                        <SUI.Input
                                            style={styles.input}
                                            value={layer.top}
                                            onChange={this.handleInputChange('top')}
                                            disabled={readOnly}
                                        />
                                    </SUI.Form.Field>
                                </SUI.Grid.Column>
                                <SUI.Grid.Column>
                                    <SUI.Form.Field>
                                        <SUI.Label pointing="below">Bottom Elevation</SUI.Label>
                                        <SUI.Input
                                            style={styles.input}
                                            value={layer.botm}
                                            onChange={this.handleInputChange('botm')}
                                            disabled={readOnly}
                                        />
                                    </SUI.Form.Field>
                                </SUI.Grid.Column>
                            </SUI.Grid.Row>
                        </SUI.Grid>
                    </SUI.Form>
                </SUI.Segment>
                */}
                {/*
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
                */}

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
    gridSize: PropTypes.object.isRequired,
    layer: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    readOnly: PropTypes.bool.isRequired,
    updateLayerStatus: PropTypes.object
};

export default SoilmodelLayer;
