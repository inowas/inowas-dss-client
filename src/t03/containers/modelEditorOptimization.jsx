import React from 'react';
import PropTypes from 'prop-types';
import ConfiguredRadium from 'ConfiguredRadium';
import {connect} from 'react-redux';
import styleGlobals from 'styleGlobals';
import {withRouter} from 'react-router';
import OptimizationObjectsComponent from '../components/optimization/optimizationObjects';
import OptimizationObjectivesComponent from '../components/optimization/optimizationObjectives';
import OptimizationParametersComponent from '../components/optimization/optimizationParameters';
import OptimizationConstraintsComponent from '../components/optimization/optimizationConstraints';
import OptimizationResultsComponent from '../components/optimization/optimizationResults';
import {Routing} from '../actions/index';
import Optimization from '../../core/optimization/Optimization';
import Stressperiods from '../../core/modflow/Stressperiods';
import {Button, Menu, Progress} from 'semantic-ui-react';
import {Command} from '../actions';

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
    }
};

class ModelEditorOptimization extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            optimization: null,
            activeItem: this.props.params.type ? this.props.params.type : 'parameters'
        };
    }

    componentWillMount() {
        let opt = Optimization.fromDefaults();
        if (this.props.model.hasOwnProperty('optimization') && this.props.model.optimization !== null) {
            opt = Optimization.fromObject(this.props.model.optimization);
        }

        this.setState({
            optimization: opt.toObject
        });
    }

    onMenuClick = (e, {name}) => {
        const {routes, params} = this.props;
        this.setState({activeItem: name});

        Routing.modelOptimizationType(routes, params)(name);
    };

    onCancelCalculationClick = () => {
        this.onMenuClick(null, {name: 'parameters'});

        return this.setState({
            optimization: {
                ...this.state.optimization,
                isRunning: false
            }
        });
    };

    onCalculationClick = () => {
        return this.setState({
            optimization: {
                ...this.state.optimization,
                isRunning: true
            }
        });
    };

    onChange = (obj) => {
        const opt = Optimization.fromObject(this.state.optimization);
        opt.input[obj.key] = obj.value;
        return this.setState({
            optimization: opt.toObject
        });
        // TODO:
        /* return this.props.updateOptimization(
            this.props.model.id,
            Optimization.fromObject(this.state.optimization)
        );*/
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
                    <OptimizationObjectivesComponent objectives={optimization.input.objectives} model={this.props.model}
                                                     objects={optimization.input.objects} onChange={this.onChange}/>
                );
            case 'constraints':
                return (
                    <OptimizationConstraintsComponent constraints={optimization.input.constraints} model={this.props.model}
                                                      objects={optimization.input.objects} onChange={this.onChange}/>
                );
            case 'results':
                return (
                    <OptimizationResultsComponent optimization={optimization} model={this.props.model}/>
                );
            default:
                return (
                    <OptimizationParametersComponent parameters={optimization.input.parameters}
                                                     objectives={optimization.input.objectives} onChange={this.onChange}/>
                );
        }
    }

    render() {
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
                            onClick={this.onMenuClick}/>
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
                        <Menu.Item>
                            {!this.state.optimization.isRunning
                                ?
                                <Button fluid primary
                                        onClick={this.onCalculationClick}
                                >
                                    Run Optimization
                                </Button>
                                :
                                <Button fluid
                                        color="red"
                                        onClick={this.onCancelCalculationClick}
                                >
                                    Cancel Calculation
                                </Button>
                            }
                        </Menu.Item>
                        {this.state.optimization.isRunning &&
                            <Menu.Item>
                                <Progress percent={40} indicating>
                                    Calculating
                                </Progress>
                            </Menu.Item>
                        }
                        <Menu.Item
                            name="results"
                            active={this.state.activeItem === 'results'}
                            onClick={this.onMenuClick}
                            disabled={!this.state.optimization.isRunning}
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
    updateOptimization: Command.updateOptimization
};

const mapStateToProps = (state, {tool}) => {
    return {
        model: state[tool].model,
    };
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

ModelEditorOptimization.propTypes = {
    tool: PropTypes.string,
    model: PropTypes.object,
    params: PropTypes.object,
    routes: PropTypes.array,
    updateOptimization: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfiguredRadium(ModelEditorOptimization)));
