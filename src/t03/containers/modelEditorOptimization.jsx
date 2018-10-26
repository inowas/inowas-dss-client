import React from 'react';
import PropTypes from 'prop-types';
import ConfiguredRadium from 'ConfiguredRadium';
import {connect} from 'react-redux';
import styleGlobals from 'styleGlobals';
import {withRouter} from 'react-router';
import OptimizationObjectsComponent from '../components/optimization/OptimizationObjects';
import OptimizationObjectivesComponent from '../components/optimization/OptimizationObjectives';
import OptimizationParametersComponent from '../components/optimization/OptimizationParameters';
import OptimizationConstraintsComponent from '../components/optimization/OptimizationConstraints';
import OptimizationResultsComponent from '../components/optimization/OptimizationResults';
import {Routing} from '../actions/index';
import Optimization from '../../core/optimization/Optimization';
import Stressperiods from '../../core/modflow/Stressperiods';
import OptimizationInput from "../../core/optimization/OptimizationInput";
import {Button, Icon, List, Menu, Popup, Progress} from 'semantic-ui-react';
import {Action, Command, Query} from '../actions';
import {
    OPTIMIZATION_STATE_CANCELLING,
    OPTIMIZATION_STATE_FINISHED,
    OPTIMIZATION_STATE_STARTED,
    OPTIMIZATION_STATE_CANCELLED,
    getMessage,
    optimizationInProgress,
    optimizationHasError
} from '../selectors/optimization';

const styles = {
    container: {
        display: 'flex',
        maxHeight: '100%'
    },
    left: {
        width: styleGlobals.dimensions.gridColumn,
        marginRight: styleGlobals.dimensions.gridGutter,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%'
    },
    properties: {
        flex: 1
    },
    searchWrapper: {
        marginBottom: 6
    },
    heading: {
        borderBottom: '1px solid ' + styleGlobals.colors.graySemilight,
        fontWeight: 300,
        fontSize: 16,
        textAlign: 'left',
        paddingBottom: 10,
        marginTop: 30
    },
    iconfix: {
        width: 'auto',
        height: 'auto'
    },
    inputfix: {
        padding: '0'
    },
    link: {
        cursor: 'pointer'
    },
    tablewidth: {
        width: '99%'
    }
};

class ModelEditorOptimization extends React.Component {

    constructor(props) {
        super(props);
        const optimization = (props.optimization && props.optimization.input) ?
            Optimization.fromObject(props.optimization).toObject :
            Optimization.fromDefaults().toObject;

        this.state = {
            optimization: optimization,
            activeItem: this.props.params.type ? this.props.params.type : 'parameters',
            errors: [],
            isPolling: false
        };
    }

    componentWillReceiveProps(nextProps) {
        const optimization = (nextProps.optimization && nextProps.optimization.input) ?
            Optimization.fromObject(nextProps.optimization).toObject :
            Optimization.fromDefaults().toObject;

        if (optimizationInProgress(optimization.state) && !this.state.isPolling) {
            this.setState({
                isPolling: true
            });

            this.props.startPolling({
                id: this.props.model.id
            });
        }

        this.setState({
            optimization: optimization
        });
    }

    onApplySolution = (boundaries) => {
        this.props.addBoundary(this.props.model.id, boundaries.map(b => b.toObject));
    };

    onMenuClick = (e, {name}) => {
        const {routes, params} = this.props;
        this.setState({
            activeItem: name
        });

        Routing.modelOptimizationType(routes, params)(name);
    };

    onCancelCalculationClick = () => {
        const optimization = {
            ...this.state.optimization,
            state: OPTIMIZATION_STATE_CANCELLING
        };

        this.setState({
            optimization: optimization
        });

        this.props.cancelOptimizationCalculation(
            this.props.model.id,
            Optimization.fromObject(optimization)
        );
    };

    onCalculationClick = (isInitial) => {
        this.onMenuClick(null, {name: 'results'});

        const optimization = {
            ...this.state.optimization,
            input: {
                ...this.state.optimization.input
            },
            state: OPTIMIZATION_STATE_STARTED
        };

        this.setState({
            optimization: optimization,
            activeItem: 'results'
        });

        return this.props.calculateOptimization(
            this.props.model.id,
            Optimization.fromObject(optimization),
            isInitial
        );
    };

    onChange = (obj) => {
        const opt = Optimization.fromObject(this.state.optimization);

        if (obj.key === 'input') {
            opt.input = OptimizationInput.fromObject(obj.value);
        } else {
            opt.input[obj.key] = obj.value;
        }

        this.setState({
            optimization: opt.toObject
        });

        return this.props.updateOptimizationInput(
            this.props.model.id,
            opt.input.toObject
        );
    };

    onChangeResult = (obj) => {
        const opt = Optimization.fromObject(this.state.optimization);
        opt[obj.key] = obj.value;
        this.setState({
            optimization: opt.toObject
        });
    };

    onGoToBoundaryClick = () => {
        Routing.goToPropertyType(this.props.routes, this.props.params)('boundaries', 'wel');
    };

    getValidationMessage = (errors) => {
        let log = [];
        let list = [];

        if (errors) {
            errors.map(error => {
                switch (error.schemaPath) {
                    case '#/properties/input/oneOf/1/properties/objects/minItems':
                        list.push('At least one decision variable is required.');
                        break;
                    case '#/properties/input/oneOf/1/properties/objectives/minItems':
                        list.push('At least one objective is required.');
                        break;
                    default:
                        log.push(error.dataPath + ' ' + error.message);
                        break;
                }
            });
        }

        return {list: list, log: log};
    };

    renderProperties() {
        if (!this.props.model) {
            return null;
        }

        const {model} = this.props;
        if (!model.stress_periods) {
            return null;
        }

        const {type} = this.props.params;
        const optimization = Optimization.fromObject(this.state.optimization);
        const stressPeriods = Stressperiods.fromObject(model.stress_periods);

        switch (type) {
            case 'objects':
                return (
                    <OptimizationObjectsComponent objects={optimization.input.objects} model={this.props.model}
                                                  stressPeriods={stressPeriods} onChange={this.onChange}/>
                );
            case 'objectives':
                return (
                    <OptimizationObjectivesComponent objectives={optimization.input.objectives}
                                                     model={this.props.model}
                                                     objects={optimization.input.objects}
                                                     stressPeriods={stressPeriods}
                                                     onChange={this.onChange}/>
                );
            case 'constraints':
                return (
                    <OptimizationConstraintsComponent constraints={optimization.input.constraints}
                                                      model={this.props.model}
                                                      objects={optimization.input.objects}
                                                      stressPeriods={stressPeriods}
                                                      onChange={this.onChange}/>
                );
            case 'results':
                return (
                    <OptimizationResultsComponent optimization={optimization} errors={this.state.errors}
                                                  model={this.props.model}
                                                  stressPeriods={stressPeriods}
                                                  onChangeInput={this.onChange}
                                                  onCalculationClick={() => this.onCalculationClick(false)}
                                                  onChange={this.onChangeResult}
                                                  onApplySolution={this.onApplySolution}
                                                  onGoToBoundaryClick={this.onGoToBoundaryClick}/>
                );
            default:
                return (
                    <OptimizationParametersComponent parameters={optimization.input.parameters}
                                                     objectives={optimization.input.objectives}
                                                     onChange={this.onChange}/>
                );
        }
    }

    renderButton() {
        const optimization = Optimization.fromObject(this.state.optimization);
        const [result, errors] = optimization.validate();

        const errorMsg = this.getValidationMessage(errors);

        let customErrors = false;

        if (this.props.model.dirty || this.props.model.calculation.state === 0) {
            customErrors = true;
            errorMsg.list.push('The model needs to be calculated before running optimization.');
        }

        if ((!result && errors) || (customErrors && errorMsg.list.length > 0)) {
            return (
                <Menu.Item>
                    <Button.Group fluid>
                        <Button primary disabled={true}>
                            Run Optimization
                        </Button>
                        <Popup
                            wide='very'
                            trigger={
                                <Button primary style={styles.iconfix} icon>
                                    <Icon name="exclamation"/>
                                </Button>
                            }
                            header='Validation Failed'
                            content={
                                <List as='ol'>
                                    {errorMsg.list.length > 0
                                        ?
                                        <List.Item>
                                            <b>Mayor Errors</b>
                                            {errorMsg.list.map((element, key) => (
                                                <List.Item as='li' value='*' key={key}>{element}</List.Item>
                                            ))}
                                        </List.Item>
                                        :
                                        <div/>
                                    }
                                    {errorMsg.log.length > 0
                                        ?
                                        <div>
                                            <List.Item>
                                                <hr/>
                                            </List.Item>
                                            <List.Item><b>Minor Errors</b> (may be fixed by resolving the mayor errors)
                                                {errorMsg.log.map((e, key) => (
                                                    <List.Item as='li' value='*'
                                                               key={errorMsg.list.length + key - 1}>{e}</List.Item>
                                                ))}
                                            </List.Item>
                                        </div>
                                        :
                                        <div/>
                                    }
                                </List>
                            }
                            on={['hover', 'click']}
                        />
                    </Button.Group>
                </Menu.Item>
            );
        }

        if (!optimizationInProgress(this.state.optimization.state)) {
            return (
                <Menu.Item>
                    <Button fluid primary onClick={() => this.onCalculationClick(true)}>
                        Run Optimization
                    </Button>
                </Menu.Item>
            );
        }

        return (
            <Menu.Item>
                <Button fluid color="red" onClick={this.onCancelCalculationClick}>
                    Cancel Calculation
                </Button>
            </Menu.Item>
        );
    }

    renderProgress() {
        const optimization = Optimization.fromObject(this.state.optimization);

        const methodGA = optimization.getMethodByName('GA');
        const methodSimplex = optimization.getMethodByName('Simplex');

        if (!methodGA && !methodSimplex) {
            return false;
        }

        const progress = this.state.optimization.input.parameters.method === 'GA' && methodGA
            ? methodGA.progress : methodSimplex.progress;

        return (
            <Menu.Item>
                <Progress
                    percent={progress.calculate()}
                    progress
                    indicating={!progress.final && optimizationInProgress(optimization.state)}
                    success={progress.final && optimization.state === OPTIMIZATION_STATE_FINISHED}
                    error={!progress.final && optimizationHasError(optimization.state)}
                    warning={!progress.final && optimization.state === OPTIMIZATION_STATE_CANCELLED}
                >
                    {this.state.optimization.input.parameters.method === 'GA'
                        ?
                        <span>Genetic Algorithm:&nbsp;</span>
                        :
                        <span>Simplex:&nbsp;</span>
                    }
                    {getMessage(optimization.state)}
                </Progress>
            </Menu.Item>
        );
    }

    render() {
        if (!this.state.optimization) {
            return null;
        }
        return (
            <div style={[styles.container]}>
                <div style={styles.left}>
                    <Menu fluid vertical tabular>
                        <Menu.Item
                            name="parameters"
                            active={this.state.activeItem === 'parameters'}
                            onClick={this.onMenuClick}/>
                        <Menu.Item
                            name="objects"
                            active={this.state.activeItem === 'objects'}
                            onClick={this.onMenuClick}
                            content="Decision Variables"/>
                        <Menu.Item
                            name="objectives"
                            active={this.state.activeItem === 'objectives'}
                            onClick={this.onMenuClick}
                        />
                        <Menu.Item
                            name="constraints"
                            active={this.state.activeItem === 'constraints'}
                            onClick={this.onMenuClick}
                        />
                        {
                            this.renderButton()
                        }
                        {
                            this.renderProgress()
                        }
                        <Menu.Item
                            name="results"
                            active={this.state.activeItem === 'results'}
                            onClick={this.onMenuClick}
                        />
                    </Menu>
                </div>
                <div style={styles.properties}>
                    <div style={[styles.columnFlex2]}>
                        {this.renderProperties()}
                    </div>
                </div>
            </div>
        );
    }
}

const actions = {
    setOptimization: Action.setOptimization,
    updateOptimizationInput: Command.updateOptimizationInput,
    addBoundary: Command.addBoundary,
    calculateOptimization: Command.calculateOptimization,
    cancelOptimizationCalculation: Command.cancelOptimizationCalculation,
    startPolling: Query.getOptimization
};

const mapDispatchToProps = (dispatch, {tool}) => {
    const wrappedActions = {};
    for (const key in actions) {
        if (actions.hasOwnProperty(key)) {
            // eslint-disable-next-line no-loop-func
            wrappedActions[key] = function () {
                const args = Array.prototype.slice.call(arguments);
                dispatch(actions[key](tool, ...args));
            };
        }
    }

    return wrappedActions;
};

const mapStateToProps = (state, {tool}) => {
    return {
        model: state[tool].model,
        optimization: state[tool].model.optimization
    };
};

ModelEditorOptimization.propTypes = {
    tool: PropTypes.string,
    model: PropTypes.object,
    optimization: PropTypes.object,
    params: PropTypes.object,
    routes: PropTypes.array,
    setOptimization: PropTypes.func.isRequired,
    updateOptimizationInput: PropTypes.func.isRequired,
    calculateOptimization: PropTypes.func.isRequired,
    cancelOptimizationCalculation: PropTypes.func.isRequired,
    startPolling: PropTypes.func.isRequired,
    addBoundary: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfiguredRadium(ModelEditorOptimization)));
