import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import uuid from 'uuid';

import image from '../images/T02.png';

import {Background, Chart, Parameters, Settings} from '../components';
import {WebData} from '../../core';

import Navbar from '../../containers/Navbar';
import {Modifier as Dashboard} from '../../dashboard';

import {each} from 'lodash';
import {getInitialState} from '../reducers/main';
import applyParameterUpdate from '../../core/simpleTools/parameterUpdate';
import {isReadOnly} from '../../core/helpers';
import {Accordion, Icon, Container, Divider, Grid, Header, Input, Form} from "semantic-ui-react";
import SliderParameter from "../../core/parameterSlider/SliderParameter";

const styles = {
    container: {
        padding: '0 40px 0 40px',
        width: '1280px'
    },
    columnContainer: {
        background: '#fff',
        boxShadow: '0 0 2px 0 rgba(76, 76, 76, 0.3)',
        height: '100%',
        padding: '12px'
    }
};

const buildPayload = (data) => {
    return {
        settings: data.settings,
        parameters: data.parameters.map(v => {
            SliderParameter.fromObject({
                id: v.id,
                max: v.max,
                min: v.min,
                value: v.value,
            }).toObject;
        })
    };
};

const navigation = [{
    name: 'Documentation',
    path: 'https://inowas.hydro.tu-dresden.de/tools/t02-groundwater-mounding-hantush/',
    icon: <Icon name="file"/>
}];

class T02 extends React.Component {

    // TODO: get data from saved instance
    constructor() {
        super();
        this.state = getInitialState();
        this.state.activeIndex = 0;
    }

    componentWillReceiveProps(newProps) {
        this.setState(function (prevState) {
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

    handleInputChange = (e, {name, value}) => this.setState(prevState => {
        return {
            ...prevState,
            [name]: value
        };
    });

    handleChange = parameter => {
        this.updateParameter(parameter.toObject);
    };

    handleReset = () => {
        this.setState(getInitialState());
    };

    handleClickAccordion = (e, titleProps) => {
        const {index} = titleProps;
        const {activeIndex} = this.state;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({activeIndex: newIndex})
    };

    render() {
        const {activeIndex, settings, parameters} = this.state;
        const {getToolInstanceStatus, toolInstance} = this.props;
        const readOnly = isReadOnly(toolInstance.permissions);

        const chartParams = {settings};
        each(parameters, v => {
            chartParams[v.id] = v.value;
        });

        return (
            <Container style={styles.container}>
                <Navbar links={navigation}/>
                <Header as='h3' textAlign='left'>T02. Groundwater mounding (Hantush)</Header>
                <Divider color='grey'/>
                <WebData.Component.Loading status={getToolInstanceStatus}>
                    <Grid padded>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Container fluid style={styles.columnContainer}>
                                    <Accordion>
                                        <Accordion.Title
                                            active={activeIndex === 1} index={1} onClick={this.handleClickAccordion}
                                        >
                                            <Grid>
                                                <Grid.Column floated='left' width={6}>
                                                    <Input
                                                        fluid
                                                        icon={
                                                            <Icon name='save' inverted circular link
                                                                  onClick={this.save}/>
                                                        }
                                                        type="text"
                                                        disabled={readOnly}
                                                        name="name"
                                                        value={this.state.name}
                                                        onChange={this.handleInputChange}
                                                        placeholder="Name"
                                                    />
                                                </Grid.Column>
                                                <Grid.Column floated='right' width={1}>
                                                    <Icon name='dropdown'/>
                                                </Grid.Column>
                                            </Grid>
                                        </Accordion.Title>
                                        <Accordion.Content active={activeIndex === 1}>
                                            <Form>
                                                <Form.Select
                                                    label='Public'
                                                    name='public'
                                                    disabled={readOnly}
                                                    value={this.state.public}
                                                    onChange={this.handleInputChange}
                                                    options={[
                                                        {key: 0, text: 'public', value: true},
                                                        {key: 1, text: 'private', value: false}
                                                    ]}
                                                />
                                                <Form.TextArea
                                                    label="Description"
                                                    disabled={readOnly}
                                                    name="description"
                                                    onChange={this.handleInputChange}
                                                    placeholder="Description"
                                                    value={this.state.description}
                                                />
                                            </Form>
                                        </Accordion.Content>
                                    </Accordion>
                                </Container>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={6}>
                                <Container style={styles.columnContainer}>
                                    <Background image={image}/>
                                </Container>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <Container style={styles.columnContainer}>
                                    <Chart {...chartParams}/>
                                </Container>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={6}>
                                <Container style={styles.columnContainer}>
                                    <Settings settings={settings} handleChange={this.handleChange} {...chartParams} />
                                </Container>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <Container style={styles.columnContainer}>
                                    <Parameters
                                        parameters={parameters.map(p => SliderParameter.fromObject(p))}
                                        handleChange={this.handleChange}
                                        handleReset={this.handleReset}
                                    />
                                </Container>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </WebData.Component.Loading>
            </Container>
        );
    }
}

const actions = {
    createToolInstance: Dashboard.Command.createToolInstance,
    updateToolInstance: Dashboard.Command.updateToolInstance,
};

const mapStateToProps = (state) => {
    return {
        toolInstance: state.T02
    };
};

const mapDispatchToProps = (dispatch, props) => {
    const tool = props.route.tool;
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

T02.propTypes = {
    createToolInstance: PropTypes.func,
    createToolInstanceStatus: PropTypes.object,
    getToolInstanceStatus: PropTypes.object,
    params: PropTypes.object,
    routes: PropTypes.array,
    toolInstance: PropTypes.object,
    updateToolInstance: PropTypes.func,
    updateToolInstanceStatus: PropTypes.object
};

// eslint-disable-next-line no-class-assign
T02 = withRouter(connect(mapStateToProps, mapDispatchToProps)(T02));

export default T02;
