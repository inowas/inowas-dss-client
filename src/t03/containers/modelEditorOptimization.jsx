import React from 'react';
import PropTypes from 'prop-types';
import ConfiguredRadium from 'ConfiguredRadium';
import {connect} from 'react-redux';
import styleGlobals from 'styleGlobals';
import {withRouter} from 'react-router';
import OptimizationObjects from '../components/optimizationObjects';
import OptimizationObjectivesComponent from '../components/optimizationObjectives';
import OptimizationParametersComponent from '../components/optimizationParameters';
import FilterableList from '../../components/primitive/FilterableList';
import {Routing} from '../actions/index';
import Optimization from '../../core/optimization/Optimization';

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


const menu = [
    {
        id: '',
        name: 'Parameters'
    },
    {
        id: 'objects',
        name: 'Objects'
    },
    {
        id: 'objectives',
        name: 'Objectives'
    },
    {
        id: 'constrains',
        name: 'Constrains'
    }
];

class ModelEditorOptimization extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            optimization: null
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

    onMenuClick = (type) => {
        const {routes, params} = this.props;

        Routing.modelOptimizationType(routes, params)(type);
    };

    onChangeParameters = (parameters) => {
        const opt = Optimization.fromObject(this.state.optimization);
        opt.parameters = parameters;
        return this.setState({
            optimization: opt.toObject
        });
    };

    onChangeObjectives = (objectives) => {
        const opt = Optimization.fromObject(this.state.optimization);
        opt.objectives = objectives;
        return this.setState({
            optimization: opt.toObject
        });
    };

    renderProperties() {
        const {type} = this.props.params;
        const optimization = Optimization.fromObject(this.state.optimization);

        switch (type) {
            case 'objects':
                return (
                    <p>Objectives</p>
                );
            case 'objectives':
                return (
                    <OptimizationObjectivesComponent objectives={optimization.objectives} onChange={this.onChangeObjectives}/>
                );
            case 'constrains':
                return (
                    <p>Constrains</p>
                );
            default:
                return (
                    <OptimizationParametersComponent parameters={optimization.parameters} objectives={optimization.objectives} onChange={this.onChangeParameters}/>
                );
        }
    }

    render() {
        return (
            <div style={[styles.container]}>
                <div style={styles.left}>
                    <FilterableList
                        itemClickAction={this.onMenuClick}
                        list={menu}
                    />
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

const actions = {};

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
    getFile: PropTypes.func,
    calculateStressPeriods: PropTypes.func,
    calculateStressPeriodsStatus: PropTypes.func,
    calculateModflowModel: PropTypes.func,
    calculateModflowModelStatus: PropTypes.func,
    calculation: PropTypes.object,
    getFileStatus: PropTypes.func,
    model: PropTypes.object,
    params: PropTypes.object,
    routes: PropTypes.array,
    stopPolling: PropTypes.func,
    stressPeriods: PropTypes.object,
    updateStressPeriods: PropTypes.func,
    updateStressPeriodsStatus: PropTypes.func
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfiguredRadium(ModelEditorOptimization)));
