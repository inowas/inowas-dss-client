import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query, Command, Action } from '../actions/index';
import { model as modelSelector, general } from '../selectors/index';
import ConfiguredRadium from 'ConfiguredRadium';
import Icon from '../../components/primitive/Icon';
import { connect } from 'react-redux';
import styleGlobals from 'styleGlobals';
import { browserHistory, withRouter } from 'react-router';
import {
    getErrorMessage,
    getRequestStatus,
    hasError,
    isLoading
} from '../../core/webData/selectors/webData';
import uuid from 'uuid';
// import * as filters from '../../calculations/filter';
import { GeneralMap } from '../components';
import * as lodash from 'lodash';
import Button from '../../components/primitive/Button';
import Input from '../../components/primitive/Input';
import Select from '../../components/primitive/Select';
import TimeUnit from '../../model/TimeUnit';
import LengthUnit from '../../model/LengthUnit';
import { LayoutComponents } from '../../core';

const styles = {
    columnContainer: {
        display: 'flex'
    },

    columnNotLast: {
        marginRight: styleGlobals.dimensions.gridGutter
    },

    mapActionToolbar: {
        textAlign: 'right',
        marginBottom: styleGlobals.dimensions.spacing.medium
    },

    saveButtonWrapper: {
        textAlign: 'right',
        marginTop: styleGlobals.dimensions.spacing.medium
    },

    expandVerticalContainer: {
        display: 'flex',
        flexDirection: 'column'
    },

    expandVertical: {
        flex: 1
    }
};

const initialState = {
    model: modelSelector.getInitialState()
};

@ConfiguredRadium
class ModelEditorGeneral extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;

        this.handleInputChangeModflow = this.handleInputChangeModflow.bind(
            this
        );
    }

    componentWillMount() {
        const model = this.props.model
            ? this.props.model
            : modelSelector.getInitialState();

        this.setState(function(prevState) {
            return {
                ...prevState,
                model: model
            };
        });
    }

    componentWillReceiveProps(newProps) {
        this.setState(function(prevState) {
            return {
                ...prevState,
                model: newProps.model
            };
        });
    }

    componentWillUpdate() {
        if (this.refs.map) {
            this.refs.map.leafletElement.fitBounds(
                this.getModflowModelState('bounding_box')
            );
        }
    }

    componentWillUnmount() {
        this.props.setModflowModel(this.state.model);
    }

    handleInputChangeModflow(name, key) {
        return value => {
            this.setState(function(prevState) {
                if (key) {
                    return {
                        model: {
                            ...prevState.model,
                            [key]: {
                                ...prevState.model[key],
                                [name]: value
                            }
                        }
                    };
                }

                return {
                    model: {
                        ...prevState.model,
                        [name]: value
                    }
                };
            });
        };
    }

    // TODO refactor to function creator like handleInputChangeModflow
    handleInputChangeModflowBoundingBox(value, event, index, key) {
        this.setState(function(prevState) {
            return {
                model: {
                    ...prevState.model,
                    bounding_box: prevState.model.bounding_box.map(
                        (item, i) => {
                            if (i !== index) {
                                return item;
                            }
                            item[key] = value;
                            return item;
                        }
                    )
                }
            };
        });
    }

    editAreaOnMap = () => {
        browserHistory.push(this.props.location.pathname + '#edit');
    };

    createAreaOnMap = () => {
        browserHistory.push(this.props.location.pathname + '#create');
    };

    save(id) {
        if (id) {
            this.props.updateModflowModel(id, this.state.model);
            return;
        }

        this.props.createModflowModel(uuid.v4(), this.state.model);
    }

    renderEditOnMapIcon = (id, readOnly) => {
        if (id && !readOnly) {
            return (
                <Button
                    onClick={this.editAreaOnMap}
                    type="link"
                    icon={<Icon name="marker" />}
                >
                    Edit on Map
                </Button>
            );
        }

        if (!id) {
            return (
                <Button
                    onClick={this.createAreaOnMap}
                    type="link"
                    icon={<Icon name="marker" />}
                >
                    Draw on Map
                </Button>
            );
        }

        return null;
    };

    renderSaveButton = (id, readOnly, webData, model) => {
        // TODO prevent onClick triggers if disabled and make that css works
        const disabled =
            isLoading(webData[Command.UPDATE_MODFLOW_MODEL]) || !model.geometry;

        if (id && !readOnly) {
            return (
                <Button
                    disabled={disabled}
                    onClick={() => this.save(id)}
                    type="accent"
                >
                    Save
                </Button>
            );
        }

        if (!id) {
            return (
                <Button
                    disabled={disabled}
                    onClick={() => {
                        this.save();
                    }}
                    type="accent"
                >
                    Create Model
                </Button>
            );
        }

        return null;
    };

    render() {
        const { webData, model } = this.props;
        const { id } = this.props.params;
        const { model: stateModel } = this.state;

        const readOnly = !lodash.includes(model.permissions, 'w');

        if (id && isLoading(webData[Query.GET_MODFLOW_MODEL_DETAILS])) {
            // TODO move to dump component
            return <p>Loading ...</p>;
        }
        if (id && hasError(webData[Query.GET_MODFLOW_MODEL_DETAILS])) {
            // TODO move to dump component
            return (
                <p>
                    Error while loading ... ({getErrorMessage(
                        webData[Query.GET_MODFLOW_MODEL_DETAILS]
                    )})
                </p>
            );
        }

        return (
            <div style={[styles.columnContainer]}>
                <LayoutComponents.Column
                    heading="General Properties"
                    style={[styles.columnNotLast]}
                >
                    <form>
                        <LayoutComponents.InputGroup label="Name">
                            <Input
                                disabled={readOnly}
                                value={stateModel.name}
                                onChange={this.handleInputChangeModflow('name')}
                                placeholder="Name"
                            />
                        </LayoutComponents.InputGroup>

                        <LayoutComponents.InputGroup label="Description">
                            <Input
                                type="textarea"
                                disabled={readOnly}
                                name="description"
                                value={stateModel.description}
                                onChange={this.handleInputChangeModflow(
                                    'description'
                                )}
                                placeholder="Description"
                            />
                        </LayoutComponents.InputGroup>

                        <LayoutComponents.InputGroup label="Time Unit">
                            <Select
                                value={stateModel.time_unit}
                                onChange={this.handleInputChangeModflow(
                                    'time_unit'
                                )}
                                options={lodash.map(
                                    TimeUnit.numberCodes,
                                    (value, key) => ({
                                        label: value,
                                        value: key
                                    })
                                )}
                            />
                        </LayoutComponents.InputGroup>

                        <LayoutComponents.InputGroup label="Length Unit">
                            <Select
                                value={stateModel.length_unit}
                                onChange={this.handleInputChangeModflow(
                                    'length_unit'
                                )}
                                options={lodash.map(
                                    LengthUnit.numberCodes,
                                    (value, key) => ({
                                        label: value,
                                        value: key
                                    })
                                )}
                            />
                        </LayoutComponents.InputGroup>

                        <LayoutComponents.InputGroup label="Grid Resolution">
                            <Input
                                disabled={readOnly}
                                type="number"
                                min="1"
                                step="1"
                                value={stateModel.grid_size.n_x}
                                cast={parseInt}
                                onChange={this.handleInputChangeModflow(
                                    'n_x',
                                    'grid_size'
                                )}
                                placeholder="X="
                            />
                            <Input
                                disabled={readOnly}
                                type="number"
                                min="1"
                                step="1"
                                value={stateModel.grid_size.n_y}
                                cast={parseInt}
                                onChange={this.handleInputChangeModflow(
                                    'n_y',
                                    'grid_size'
                                )}
                                placeholder="Y="
                            />
                        </LayoutComponents.InputGroup>

                        <LayoutComponents.InputGroup label="Bounding Box">
                            <Input
                                disabled
                                type="number"
                                name="x_min"
                                cast={parseFloat}
                                value={stateModel.bounding_box[0][0]}
                                onChange={(value, event) =>
                                    this.handleInputChangeModflowBoundingBox(
                                        value,
                                        event,
                                        0,
                                        0
                                    )}
                                placeholder="X="
                            />
                            <Input
                                disabled
                                type="number"
                                name="x_max"
                                cast={parseFloat}
                                value={stateModel.bounding_box[1][0]}
                                onChange={(value, event) =>
                                    this.handleInputChangeModflowBoundingBox(
                                        value,
                                        event,
                                        1,
                                        0
                                    )}
                                placeholder="x_max="
                            />
                        </LayoutComponents.InputGroup>

                        <LayoutComponents.InputGroup>
                            <Input
                                disabled
                                type="number"
                                name="y_min"
                                cast={parseFloat}
                                value={stateModel.bounding_box[0][1]}
                                onChange={(value, event) =>
                                    this.handleInputChangeModflowBoundingBox(
                                        value,
                                        event,
                                        0,
                                        1
                                    )}
                                placeholder="X="
                            />
                            <Input
                                disabled
                                type="number"
                                name="y_max"
                                cast={parseFloat}
                                value={stateModel.bounding_box[1][1]}
                                onChange={(value, event) =>
                                    this.handleInputChangeModflowBoundingBox(
                                        value,
                                        event,
                                        1,
                                        1
                                    )}
                                placeholder="y_max="
                            />
                        </LayoutComponents.InputGroup>
                    </form>
                </LayoutComponents.Column>

                <LayoutComponents.Column
                    heading="Area"
                    style={[styles.expandVerticalContainer]}
                >
                    <div style={[styles.mapActionToolbar]}>
                        {this.renderEditOnMapIcon(id, readOnly)}
                    </div>
                    <GeneralMap style={[styles.expandVertical]} model={model} />
                    <div style={[styles.saveButtonWrapper]}>
                        {this.renderSaveButton(id, readOnly, webData, model)}
                    </div>
                </LayoutComponents.Column>
            </div>
        );
    }
}

const mapStateToProps = (state, { tool }) => {
    return {
        model: general.getModflowModel(state[tool].model),
        webData: getRequestStatus(state)
    };
};

const actions = {
    setModflowModel: Action.setModflowModel,
    createModflowModel: Command.createModflowModel,
    updateModflowModel: Command.updateModflowModel
};

const mapDispatchToProps = (dispatch, { tool }) => {
    const wrappedActions = {};
    for (const key in actions) {
        if (actions.hasOwnProperty(key)) {
            // eslint-disable-next-line no-loop-func
            wrappedActions[key] = function() {
                const args = Array.prototype.slice.call(arguments);
                dispatch(actions[key](tool, ...args));
            };
        }
    }

    return wrappedActions;
};

// eslint-disable-next-line no-class-assign
ModelEditorGeneral = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ModelEditorGeneral)
);

ModelEditorGeneral.propTypes = {
    style: PropTypes.object,
    editModelArea: PropTypes.func,
    setEditorState: PropTypes.func,
    createModel: PropTypes.func,
    createModelArea: PropTypes.func,
    createModflowModel: PropTypes.func,
    updateModflowModel: PropTypes.func,
    setModflowModel: PropTypes.func,
    webData: PropTypes.object,
    model: PropTypes.object,
    location: PropTypes.object,
    params: PropTypes.object
};

export default ModelEditorGeneral;
