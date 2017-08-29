import { DataTableAction, PumpingRate } from '../../t03/components';
import { Helper, LayoutComponents } from '../../core';
import React, { Component, PropTypes } from 'react';

import BoundaryMap from './boundaryMap';
import Button from '../../components/primitive/Button';
import ConfiguredRadium from 'ConfiguredRadium';
import Icon from '../../components/primitive/Icon';
import Input from '../../components/primitive/Input';
import Select from '../../components/primitive/Select';
import styleGlobals from 'styleGlobals';
import { uniqueId } from 'lodash';

const styles = {
    columns: {
        display: 'flex'
    },

    columnFlex2: {
        flex: 2
    },

    columnNotLast: {
        marginRight: styleGlobals.dimensions.gridGutter
    },

    dateInput: {
        maxWidth: 125
    },

    rateInput: {
        maxWidth: 70
    },

    saveButtonWrapper: {
        textAlign: 'right',
        marginTop: styleGlobals.dimensions.spacing.medium
    },

    coordinatesLabel: {
        label: {
            display: 'block'
        },

        outerSpan: {
            width: '100%',
            display: 'flex'
        },

        innerSpan: {
            flex: 1
        }
    }
};

@ConfiguredRadium
export default class WellProperties extends Component {
    static propTypes = {
        area: PropTypes.object.isRequired,
        editBoundaryOnMap: PropTypes.func.isRequired,
        mapStyles: PropTypes.object.isRequired,
        onSave: PropTypes.func.isRequired,
        readOnly: PropTypes.bool,
        boundary: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            nameInputId: uniqueId('nameInput-'),
            typeInputId: uniqueId('typeInput-'),
            layerInputId: uniqueId('layerInput-'),
            boundary: this.props.boundary || {}
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ boundary: nextProps.boundary });
    }

    componentWillMount() {
        this.forceUpdate();
    }

    handleInputChange = (name, key) => {
        return value => {
            this.setState( function (prevState, props) {
                if (key) {
                    return {
                        ...prevState,
                        boundary: {
                            ...prevState.boundary,
                            [key]: {
                                ...prevState.boundary[ key ],
                                [name]: value
                            },
                            date_time_values: this.pumpingRate.getRows()
                        }
                    };
                }

                return {
                    ...prevState,
                    boundary: {
                        ...prevState.boundary,
                        [name]: value,
                        date_time_values: this.pumpingRate.getRows()
                    }
                };
            } );
        };
    };

    handleCoordinatesChange = (name) => {
        return value => {
            this.setState( function (prevState, props) {
                if (name === 'lat') {
                    value = [prevState.boundary.geometry.coordinates[0], value];
                } else {
                    value = [value, prevState.boundary.geometry.coordinates[1]];
                }

                return {
                    ...prevState,
                    boundary: {
                        ...prevState.boundary,
                        geometry: {
                            ...prevState.boundary.geometry,
                            coordinates: value
                        },
                        date_time_values: this.pumpingRate.getRows()
                    }
                };
            })
        }
    };

    handleSelectChange = (name, key, useArray) => {
        if (useArray) {
            return data => this.handleInputChange(name, key)(data ? [data.value] : []);
        }

        return data => this.handleInputChange(name, key)(data ? data.value : undefined);
    };

    save = () => {
        this.props.onSave({
            ...this.state.boundary,
            date_time_values: this.pumpingRate.getRows()
        });
    };

    render() {
        const { mapStyles, area, editBoundaryOnMap } = this.props;
        const { nameInputId, typeInputId, layerInputId, boundary } = this.state;
        const pumpingRates = Helper.addIdFromIndex(
            boundary.date_time_values || []
        );

        return (
            <div style={[styles.wrapper]}>
                <div style={[styles.columns]}>
                    <LayoutComponents.Column
                        heading="Properties"
                        style={[styles.columnNotLast]}
                    >
                        <LayoutComponents.InputGroup label="Well Name">
                            <Input
                                name="name"
                                id={nameInputId}
                                onChange={this.handleInputChange('name')}
                                value={boundary.name}
                                type="text"
                                placeholder="name"
                            />
                        </LayoutComponents.InputGroup>

                        <LayoutComponents.InputGroup label="Well Type">
                            <Select
                                name="type"
                                id={typeInputId}
                                value={
                                    boundary.metadata
                                        ? boundary.metadata.boundary_type
                                        : ''
                                }
                                onChange={this.handleSelectChange('boundary_type', 'metadata')}
                                options={[
                                    {
                                        label: 'Public Well',
                                        value: 'puw'
                                    },
                                    {
                                        label: 'Infiltration Well',
                                        value: 'iw'
                                    },
                                    {
                                        label: 'Observation Well',
                                        value: 'ow'
                                    }
                                ]}
                            />
                        </LayoutComponents.InputGroup>

                        <LayoutComponents.InputGroup label="Select Layer">
                            <Select
                                name="affected_layers"
                                id={layerInputId}
                                value={
                                    boundary.affected_layers
                                        ? boundary.affected_layers[0]
                                        : undefined
                                }
                                onChange={this.handleSelectChange('affected_layers', null, true)}
                                options={[
                                    {
                                        value: 0,
                                        label: 'Layer 1'
                                    },
                                    {
                                        value: 1,
                                        label: 'Layer 2'
                                    },
                                    {
                                        value: 2,
                                        label: 'Layer 3'
                                    }
                                ]}
                            />
                        </LayoutComponents.InputGroup>

                        <LayoutComponents.InputGroup
                            labelProps={{
                                style: [styles.coordinatesLabel.label]
                            }}
                            label={
                                <span
                                    style={[styles.coordinatesLabel.outerSpan]}
                                >
                                    <span
                                        style={[
                                            styles.coordinatesLabel.innerSpan
                                        ]}
                                    >
                                        Coordinates
                                    </span>
                                    <Button
                                        type="link"
                                        icon={<Icon name="marker" />}
                                        onClick={editBoundaryOnMap}
                                    >
                                        Edit on Map
                                    </Button>
                                </span>
                            }
                        >
                            <Input
                                onChange={this.handleCoordinatesChange('lat')}
                                value={boundary.geometry.coordinates[1]}
                                type="number"
                                placeholder="Latitude"
                            />
                            <Input
                                onChange={this.handleCoordinatesChange('lng')}
                                value={boundary.geometry.coordinates[0]}
                                type="number"
                                placeholder="Longitude"
                            />
                        </LayoutComponents.InputGroup>
                        <BoundaryMap
                            styles={mapStyles}
                            area={area}
                            boundary={boundary}
                        />
                    </LayoutComponents.Column>
                    <LayoutComponents.Column
                        heading="Pumping Rates"
                        style={[styles.columnFlex2]}
                    >
                        {this.pumpingRate && <DataTableAction component={this.pumpingRate} />}
                        <PumpingRate
                            ref={pumpingRate => {
                                this.pumpingRate = pumpingRate;
                            }}
                            rows={pumpingRates}
                        />
                    </LayoutComponents.Column>
                </div>
                <div style={[styles.saveButtonWrapper]}>
                    <Button onClick={this.save}>Save</Button>
                </div>
            </div>
        );
    }
}
