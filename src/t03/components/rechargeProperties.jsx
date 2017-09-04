import { DataTableAction, RechargeRate } from '../../t03/components';
import { Helper, LayoutComponents, WebData } from '../../core';
import React from 'react';
import PropTypes from 'prop-types';

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
class RechargeProperties extends React.Component {
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

    componentWillUnmount() {
        this.props.setBoundary({
            ...this.state.boundary,
            date_time_values: this.rechargeRate.getRows()
        });
    }

    componentWillMount() {
        this.forceUpdate();
    }

    handleInputChange = name => {
        return value => {
            this.setState(function(prevState, props) {
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
    };

    save = () => {
        this.props.onSave({
            ...this.state.boundary,
            date_time_values: this.rechargeRate.getRows()
        });
    };

    render() {
        const {
            mapStyles,
            area,
            editBoundaryOnMap,
            onDelete,
            readOnly,
            updateStatus
        } = this.props;
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
                                disabled={readOnly}
                                id={nameInputId}
                                value={boundary.name}
                                onChange={this.handleInputChange('name')}
                                type="text"
                                placeholder="name"
                            />
                        </LayoutComponents.InputGroup>
                        {!readOnly &&
                        <div style={styles.rightAlign}>
                            <Button
                                style={styles.buttonMarginRight}
                                disabled={readOnly}
                                onClick={editBoundaryOnMap}
                                type="link"
                                icon={<Icon name="marker" />}
                            >
                                Edit on Map
                            </Button>
                            <Button
                                style={styles.buttonMarginRight}
                                disabled={readOnly}
                                onClick={onDelete}
                                type="link"
                                icon={<Icon name="trash" />}
                            >
                                Delete
                            </Button>
                        </div>}

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
                        {!readOnly && <DataTableAction component={this.rechargeRate} />}
                        <RechargeRate
                            readOnly={readOnly}
                            ref={rechargeRate =>
                                (this.rechargeRate = rechargeRate)}
                            rows={rechargeRates}
                        />
                    </LayoutComponents.Column>
                </div>
                {!readOnly &&
                <div style={[styles.saveButtonWrapper]}>
                    <WebData.Component.Loading status={updateStatus}>
                        <Button onClick={this.save}>Save</Button>
                    </WebData.Component.Loading>
                </div>}
            </div>
        );
    }
}

RechargeProperties.propTypes = {
    area: PropTypes.object.isRequired,
    editBoundaryOnMap: PropTypes.func.isRequired,
    mapStyles: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
    boundary: PropTypes.object.isRequired,
    setBoundary: PropTypes.func,
    updateStatus: PropTypes.object
};
export default RechargeProperties;
