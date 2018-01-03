import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import '../../less/4TileTool.less';

import image from '../../images/tools/T09D.png';
import {Background, ChartT09D as Chart, Parameters, SettingsT09D as Settings} from '../components';
import {WebData, LayoutComponents} from '../../core';

import Icon from '../../components/primitive/Icon';
import Navbar from '../../containers/Navbar';
import Accordion from '../../components/primitive/Accordion';
import AccordionItem from '../../components/primitive/AccordionItem';
import Input from '../../components/primitive/Input';
import Select from '../../components/primitive/Select';
import Button from '../../components/primitive/Button';
import {Modifier as ToolInstance} from '../../toolInstance';

import {each} from 'lodash';
import {getInitialState} from '../reducers/T09D';
import applyParameterUpdate from '../../core/simpleTools/parameterUpdate';
import styleGlobals from 'styleGlobals';
import uuid from 'uuid';
import {isReadOnly} from '../../core/helpers';

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
        settings: state.settings,
        tool: state.tool
    };
};


const navigation = [{
    name: 'Documentation',
    path: 'https://wiki.inowas.hydro.tu-dresden.de/t09-simple-saltwater-intrusion-equations/',
    icon: <Icon name="file"/>
}];

class T09D extends React.Component {

    constructor() {
        super();
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

    updateSettings(AqType) {
        this.setState(prevState => {
            return {
                ...prevState,
                settings: {
                    ...prevState.settings,
                    AqType: AqType
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
        if (e.target.name === 'settings') {
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

    render() {
        const {settings, parameters, name, description} = this.state;
        const {getToolInstanceStatus, updateToolInstanceStatus, createToolInstanceStatus, toolInstance} = this.props;
        const {id} = this.props.params;
        const readOnly = isReadOnly(toolInstance.permissions);

        const chartParams = {};
        each(parameters, v => {
            chartParams[v.id] = v.value;
        });
        chartParams['AqType'] =settings.AqType;

        const heading = (
            <div className="grid-container">
                <div className="col stretch parameters-wrapper">
                    <Input
                        type="text"
                        disabled={readOnly}
                        name="name"
                        value={name}
                        onChange={this.handleInputChange('name')}
                        placeholder="Name"
                    />
                </div>
                <div className="col col-rel-0-5">
                    <WebData.Component.Loading status={id ? updateToolInstanceStatus : createToolInstanceStatus}>
                        <Button type={'accent'} onClick={this.save} disabled={readOnly}>Save</Button>
                    </WebData.Component.Loading>
                </div>
            </div>
        );

        return (
            <div className="app-width">
                <Navbar links={navigation}/>
                <h3 style={styles.heading}>
                    T09D. Saltwater intrusion // Critical well discharge
                </h3>
                <WebData.Component.Loading status={getToolInstanceStatus}>
                    <div className="grid-container">
                        <div className="tile col stretch">
                            <Accordion firstActive={null}>
                                <AccordionItem heading={heading}>
                                    <LayoutComponents.InputGroup label="Visibility">
                                        <Select
                                            disabled={readOnly}
                                            clearable={false}
                                            value={this.state.public}
                                            onChange={this.handleSelectChange(
                                                'public'
                                            )}
                                            options={[
                                                {label: 'public', value: true},
                                                {label: 'private', value: false}
                                            ]}
                                        />
                                    </LayoutComponents.InputGroup>
                                    <LayoutComponents.InputGroup label="Description">
                                        <Input
                                            type="textarea"
                                            disabled={readOnly}
                                            name="description"
                                            value={description}
                                            onChange={this.handleInputChange('description')}
                                            placeholder="Description"
                                        />
                                    </LayoutComponents.InputGroup>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                    <div className="grid-container">
                        <section className="tile col col-abs-2 stacked">
                            <Background image={image}/>
                        </section>

                        <section className="tile col col-abs-3 stretch" >
                            <Chart {...chartParams}/>
                        </section>
                    </div>

                    <div className="grid-container">
                        <section className="tile col col-abs-2">
                            <Settings value={settings.AqType} handleChange={this.handleChange}/>
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
    createToolInstance: ToolInstance.Command.createToolInstance,
    getToolInstance: ToolInstance.Query.getToolInstance,
    updateToolInstance: ToolInstance.Command.updateToolInstance,
};

const mapStateToProps = (state) => {
    return {
        toolInstance: state.T09D
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

T09D.propTypes = {
    createToolInstance: PropTypes.func,
    createToolInstanceStatus: PropTypes.object,
    getToolInstance: PropTypes.func,
    getToolInstanceStatus: PropTypes.object,
    params: PropTypes.object,
    routes: PropTypes.array,
    toolInstance: PropTypes.object,
    updateToolInstance: PropTypes.func,
    updateToolInstanceStatus: PropTypes.object
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(T09D));
