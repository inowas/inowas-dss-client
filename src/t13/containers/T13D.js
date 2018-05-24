import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import '../../less/4TileTool.less';

import {SettingsT13D as Settings, Parameters} from '../components';
import {WebData} from '../../core';

import Navbar from '../../containers/Navbar';
import {Modifier as Dashboard} from '../../dashboard';

import {each} from 'lodash';
import {getInitialState} from '../reducers/T13D';
import applyParameterUpdate from '../../core/simpleTools/parameterUpdate';
import styleGlobals from 'styleGlobals';
import uuid from 'uuid';

import {navigation} from './T13';

const styles = {
    heading: {
        borderBottom: '1px solid ' + styleGlobals.colors.graySemilight,
        fontWeight: 300,
        fontSize: 16,
        textAlign: 'left',
        paddingBottom: 10
    }
};

const buildPayload = (state) => {
    return {
        parameters: state.parameters.map(v => {
            return {
                id: v.id,
                max: v.max,
                min: v.min,
                value: v.value,
            };
        }),
        tool: state.tool
    };
};

class T13C extends React.Component {

    constructor(props) {
        super(props);
        this.state = getInitialState(this.constructor.name);
    }

    componentWillMount() {
        if (this.props.params.id) {
            this.props.getToolInstance(this.props.params.id);
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState(function(prevState) {
            return {
                ...prevState,
                ...newProps.toolInstance,
            };
        });
    }

    save = () => {
        const {id} = this.props.params;
        const {routes, params} = this.props;
        const {name, description} = this.state;

        if (id) {
            this.props.updateToolInstance(id, name, description, this.state.public, buildPayload(this.state));
            return;
        }

        this.props.createToolInstance(uuid.v4(), name, description, this.state.public, buildPayload(this.state), routes, params);
    };

    updateSettings(value) {
        this.setState(prevState => {
            return {
                ...prevState,
                settings: {
                    ...prevState.settings,
                    variable: value
                }
            };
        });
    }

    updateParameter(updatedParam) {
        const parameters = this.state.parameters.map(p => {
            if (p.id === updatedParam.id) {
                return applyParameterUpdate(p, updatedParam);
            }

            return p;
        });

        this.setState(prevState => {
            return {
                ...prevState,
                parameters
            };
        });
    }

    handleInputChange = name => {
        return value => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    [name]: value
                };
            });
        };
    };

    handleSelectChange = name => {
        return data => {
            this.handleInputChange(name)(data ? data.value : undefined);
        };
    };

    handleChange = (e) => {
        if (e.target.name === 'variable') {
            this.updateSettings(e.target.value);
        }

        if (e.target.name.startsWith('parameter')) {
            const param = e.target.name.split('_');

            const parameter = {};
            parameter.id = param[1];
            parameter[param[2]] = e.target.value;

            this.updateParameter(parameter);
        }
    };

    handleReset = () => {
        this.setState(getInitialState());
    };

    redirectTo = tool => {
        return this.props.router.push('/tools/' + tool);
    };

    render() {
        const {parameters} = this.state;
        const {getToolInstanceStatus} = this.props;
        const chartParams = {};
        each(parameters, v => {
            chartParams[v.id] = v.value;
        });

        const infoParams = {};
        each(parameters, v => {
            infoParams[v.id] = v.value;
        });


        return (
            <div className="app-width">
                <Navbar links={navigation}/>
                <h3 style={styles.heading}>
                    T13D. Find position of flow divide: within or outside of the system
                </h3>
                <WebData.Component.Loading status={getToolInstanceStatus}>
                    <div className="grid-container">
                        <section className="tile col col-abs-2">
                            <Settings {...infoParams} redirectTo={this.redirectTo}/>
                        </section>

                        <section className="tile col col-abs-3 stretch">
                            <Parameters
                                parameters={parameters}
                                handleChange={this.handleChange}
                                handleReset={this.handleReset}
                            />
                        </section>
                    </div>
                </WebData.Component.Loading>
            </div>
        );
    }
}

const actions = {
    createToolInstance: Dashboard.Command.createToolInstance,
    getToolInstance: Dashboard.Query.getToolInstance,
    updateToolInstance: Dashboard.Command.updateToolInstance,
};

const mapStateToProps = (state) => {
    return {
        toolInstance: state.T13C
    };
};

const mapDispatchToProps = (dispatch, props) => {
    const tool = props.route.tool;
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

T13C.propTypes = {
    createToolInstance: PropTypes.func,
    createToolInstanceStatus: PropTypes.object,
    getToolInstance: PropTypes.func,
    getToolInstanceStatus: PropTypes.object,
    params: PropTypes.object,
    router: PropTypes.object.isRequired,
    routes: PropTypes.array,
    updateToolInstance: PropTypes.func,
    updateToolInstanceStatus: PropTypes.object,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(T13C));
