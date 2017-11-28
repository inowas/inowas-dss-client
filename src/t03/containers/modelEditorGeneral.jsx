import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Query, Command, Action, Routing} from '../actions/index';
import {model as modelSelector, general} from '../selectors/index';
import ConfiguredRadium from 'ConfiguredRadium';
import Icon from '../../components/primitive/Icon';
import {connect} from 'react-redux';
import styleGlobals from 'styleGlobals';
import {browserHistory, withRouter} from 'react-router';
import {
    getErrorMessage,
    hasError,
    isLoading
} from '../../core/webData/selectors/webData';
import {WebData, LayoutComponents} from '../../core';
import uuid from 'uuid';
import {GeneralMap} from '../components';
import * as lodash from 'lodash';
import Button from '../../components/primitive/Button';
import Input from '../../components/primitive/Input';
import Select from '../../components/primitive/Select';
import TimeUnit from '../../model/TimeUnit';
import LengthUnit from '../../model/LengthUnit';

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

let localState = initialState;

@ConfiguredRadium
class ModelEditorGeneral extends Component {
    constructor(props) {
        super(props);
        this.state = localState;
        this.handleInputChangeModflow = this.handleInputChangeModflow.bind(this);
    }

    componentWillMount() {
        this.setState({
            model: this.props.model,
        });
    }

    componentWillReceiveProps(newProps) {
        this.setState(function(prevState) {
            return {
                ...prevState,
                model: newProps.model,
            };
        });
    }

    componentWillUnmount() {
        localState = this.state;
    }

    handleSelectChange = name => {
        return data => {
            this.handleInputChangeModflow(name)(data ? data.value : undefined);
        };
    };

    handleInputChangeModflow(name, key) {
        return value => {
            this.setState(function(prevState) {
                if (key) {
                    return {
                        model: {
                            ...prevState.model,
                            [key]: {
                                ...prevState.model[key],
                                [name]: value.hasOwnProperty('value')
                                    ? value.value
                                    : value // dirty fix for react-select-plus returning an object
                            }
                        }
                    };
                }

                return {
                    model: {
                        ...prevState.model,
                        [name]: value.hasOwnProperty('value')
                            ? value.value
                            : value // dirty fix for react-select-plus returning an object
                    }
                };
            });
        };
    }

    handleInputChangeModflowBoundingBox(index, key) {
        return value => {
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
        };
    }

    editAreaOnMap = () => {
        browserHistory.push(this.props.location.pathname + '#edit');
    };

    createAreaOnMap = () => {
        Routing.createArea(this.props.routes, this.props.params)();
    };

    save(id) {
        const {routes, params} = this.props;

        if (id) {
            this.props.updateModflowModel(id, this.state.model, routes, params);
            return;
        }

        this.props.createModflowModel(uuid.v4(), this.state.model, routes, params);
    }

    renderEditOnMapIcon = (id, readOnly) => {
        if (id && !readOnly) {
            return (
                <Button
                    onClick={this.editAreaOnMap}
                    type="link"
                    icon={<Icon name="marker"/>}
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
                    icon={<Icon name="marker"/>}
                >
                    Draw on Map
                </Button>
            );
        }

        return null;
    };

    render() {
        const {
            getModflowModelDetailsStatus,
            model,
            createModflowModelStatus,
            updateModflowModelStatus
        } = this.props;
        const {id} = this.props.params;
        const {model: stateModel} = this.state;

        const readOnly = model && !lodash.includes(model.permissions, 'w');
        const readOnlyScenario = lodash.includes(model.permissions, 's');
        const hasArea = model && model.geometry;

        // TODO use WebData loading component if ready
        if (id && isLoading(getModflowModelDetailsStatus)) {
            // TODO move to dump component
            return <p>Loading ...</p>;
        }
        if (id && hasError(getModflowModelDetailsStatus)) {
            // TODO move to dump component
            return (
                <p>
                    Error while loading ... ({getErrorMessage(
                    getModflowModelDetailsStatus
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
                            {!readOnlyScenario &&
                            <Select
                                disabled={readOnly}
                                clearable={false}
                                value={stateModel.public}
                                onChange={this.handleSelectChange(
                                    'public'
                                )}
                                options={[
                                    {label: 'public', value: true},
                                    {label: 'private', value: false}
                                ]}
                            />}
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
                                disabled
                                value={String(stateModel.time_unit)}
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
                                disabled
                                value={String(stateModel.length_unit)}
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
                                disabled={!!id || readOnly || readOnlyScenario}
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
                                disabled={!!id || readOnly || readOnlyScenario}
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
                                onChange={this.handleInputChangeModflowBoundingBox(
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
                                onChange={this.handleInputChangeModflowBoundingBox(
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
                                onChange={this.handleInputChangeModflowBoundingBox(
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
                                onChange={this.handleInputChangeModflowBoundingBox(
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
                    <GeneralMap style={styles.expandVertical} model={model}/>
                    <div style={[styles.saveButtonWrapper]}>
                        <WebData.Component.Loading
                            status={
                                id
                                    ? updateModflowModelStatus
                                    : createModflowModelStatus
                            }
                        >
                            <Button
                                disabled={readOnly || !hasArea}
                                onClick={() => {
                                    this.save(id);
                                }}
                                type="accent"
                            >
                                {id ? 'Save' : 'Create Model'}
                            </Button>
                        </WebData.Component.Loading>
                    </div>
                </LayoutComponents.Column>
            </div>
        );
    }
}

const mapStateToProps = (state, {tool}) => {
    return {
        model: general.getModflowModel(state[tool].model),
        getModflowModelDetailsStatus: WebData.Selector.getRequestStatusByType(
            state,
            Query.GET_MODFLOW_MODEL_DETAILS
        ),
        createModflowModelStatus: WebData.Selector.getStatusObject(
            state,
            Command.CREATE_MODFLOW_MODEL
        ),
        updateModflowModelStatus: WebData.Selector.getStatusObject(
            state,
            Command.UPDATE_MODFLOW_MODEL
        )
    };
};

const actions = {
    setModflowModel: Action.setModflowModel,
    createModflowModel: Command.createModflowModel,
    updateModflowModel: Command.updateModflowModel
};

const mapDispatchToProps = (dispatch, {tool}) => {
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
    createModflowModel: PropTypes.func,
    updateModflowModel: PropTypes.func,
    model: PropTypes.object,
    location: PropTypes.object,
    params: PropTypes.object,
    getModflowModelDetailsStatus: PropTypes.object,
    createModflowModelStatus: PropTypes.object,
    updateModflowModelStatus: PropTypes.object,
    routes: PropTypes.array
};

export default ModelEditorGeneral;
