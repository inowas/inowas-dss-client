import { DataTableAction, RechargeRate } from '../../t03/components';
import { Helper, LayoutComponents } from '../../core';
import React, { Component, PropTypes } from 'react';

import BoundaryMap from './boundaryMap';
import Button from '../../components/primitive/Button';
import ConfiguredRadium from 'ConfiguredRadium';
import Icon from '../../components/primitive/Icon';
import Input from '../../components/primitive/Input';
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

    rightAlign: {
        textAlign: 'right'
    },

    buttonMarginRight: {
        marginRight: 10
    },

    saveButtonWrapper: {
        textAlign: 'right',
        marginTop: styleGlobals.dimensions.spacing.medium
    }
};

@ConfiguredRadium
export default class RechargeProperties extends Component {
    static propTypes = {
        area: PropTypes.object.isRequired,
        boundary: PropTypes.object.isRequired,
        editBoundaryOnMap: PropTypes.func.isRequired,
        mapStyles: PropTypes.object.isRequired,
        readOnly: PropTypes.bool
    };

    constructor(props) {
        super(props);

        this.state = {
            nameInputId: uniqueId('nameInput-'),
            boundary: this.props.boundary || {}
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            boundary: nextProps.boundary
        });
    }

    handleInputChange = (value, name, key) => {
        this.setState(function(prevState, props) {
            if (key) {
                return {
                    ...prevState,
                    boundary: {
                        ...prevState.boundary,
                        [key]: {
                            ...prevState.boundary[key],
                            [name]: value
                        },
                        date_time_values: this.rechargeRate.getRows()
                    }
                };
            }

            return {
                ...prevState,
                boundary: {
                    ...prevState.boundary,
                    [name]: value,
                    date_time_values: this.rechargeRate.getRows()
                }
            };
        });
    };

    save = () => {
        this.props.onSave({
            ...this.state.boundary,
            date_time_values: this.rechargeRate.getRows()
        });
    };

    render() {
        const { mapStyles, area, editBoundaryOnMap } = this.props;
        const { nameInputId, boundary } = this.state;
        const rechargeRates = Helper.addIdFromIndex(
            boundary.date_time_values || []
        );

        return (
            <div>
                <div style={styles.columns}>
                    <LayoutComponents.Column
                        heading="Properties"
                        style={[styles.columnNotLast]}
                    >
                        <LayoutComponents.InputGroup label="Name">
                            <Input
                                name="name"
                                id={nameInputId}
                                value={boundary.name}
                                onChange={(value, name) =>
                                    this.handleInputChange(value, name)}
                                type="text"
                                placeholder="name"
                            />
                        </LayoutComponents.InputGroup>

                        <div style={styles.rightAlign}>
                            <Button
                                style={styles.buttonMarginRight}
                                onClick={editBoundaryOnMap}
                                type="link"
                                icon={<Icon name="marker" />}
                            >
                                Edit on Map
                            </Button>
                            <Button
                                style={styles.buttonMarginRight}
                                disabled
                                type="link"
                                icon={<Icon name="trash" />}
                            >
                                Delete
                            </Button>
                        </div>

                        <BoundaryMap
                            area={area}
                            boundary={boundary}
                            styles={mapStyles}
                        />
                    </LayoutComponents.Column>

                    <LayoutComponents.Column
                        heading="Recharge Rates m/d"
                        style={[styles.columnFlex2]}
                    >
                        <DataTableAction component={this.rechargeRate} />
                        <RechargeRate
                            ref={rechargeRate =>
                                (this.rechargeRate = rechargeRate)}
                            rows={rechargeRates}
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
