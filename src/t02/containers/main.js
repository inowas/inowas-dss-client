import React from 'react';
import image from '../../images/tools/T02.png';
import '../../less/4TileTool.less';
import Background from '../../components/tools/Background';
import { Chart, Settings } from '../components/index';
import Parameters from '../../components/tools/Parameters';
import Icon from '../../components/primitive/Icon';
import Navbar from '../../containers/Navbar';
import { getInitialState } from '../reducers/main';
import styleGlobals from 'styleGlobals';
import applyParameterUpdate from '../../reducers/applyParameterUpdate';
import Accordion from '../../components/primitive/Accordion';
import AccordionItem from '../../components/primitive/AccordionItem';
import Input from '../../components/primitive/Input';
import Button from '../../components/primitive/Button';
import { withRouter } from 'react-router';
import { Modifier as ToolInstance } from '../../toolInstance';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { find, each } from 'lodash';
import { makeMapStateToProps } from '../selectors/mapState';
import { WebData } from '../../core';

const styles = {
    heading: {
        borderBottom: '1px solid ' + styleGlobals.colors.graySemilight,
        fontWeight: 300,
        fontSize: 16,
        textAlign: 'left',
        paddingBottom: 10
    }
};

const buildPayload = (data) => {
    return {
        settings: data.settings,
        parameters: data.parameters.map( v => {
            return {
                id: v.id,
                max: v.max,
                min: v.min,
                value: v.value,
            };
        } )
    };
};

const navigation = [ {
    name: 'Documentation',
    path: 'https://wiki.inowas.hydro.tu-dresden.de/t02-groundwater-mounding-hantush/',
    icon: <Icon name="file"/>
} ];

class T02 extends React.Component {

    constructor() {
        super();
        this.state = getInitialState();
    }

    componentWillReceiveProps(newProps) {
        this.setState( function (prevState) {
            return {
                ...prevState,
                ...newProps.toolInstance,
            };
        } );
    }

    save = () => {
        const { id } = this.props.params;
        const { routes, params } = this.props;
        const { name, description } = this.state;

        if (id) {
            this.props.updateToolInstance( id, name, description, buildPayload( this.state ) );
            return;
        }

        this.props.createToolInstance( uuid.v4(), name, description, buildPayload( this.state ), routes, params );
    };

    updateSettings(value) {
        this.setState( prevState => {
            return {
                ...prevState,
                settings: {
                    ...prevState.settings,
                    variable: value
                }
            };
        } );
    }

    updateParameter(updatedParam) {
        const parameters = this.state.parameters.map( p => {
            if (p.id === updatedParam.id) {
                return applyParameterUpdate( p, updatedParam );
            }

            return p;
        } );

        this.setState( prevState => {
            return {
                ...prevState,
                parameters
            };
        } );
    }

    handleInputChange = name => {
        return value => {
            this.setState( prevState => {
                return {
                    ...prevState,
                    [ name ]: value
                };
            } );
        };
    };

    handleChange = (e) => {
        if (e.target.name === 'variable') {
            this.updateSettings( e.target.value );
        }

        if (e.target.name.startsWith( 'parameter' )) {
            const param = e.target.name.split( '_' );

            const parameter = {};
            parameter.id = param[ 1 ];
            parameter[ param[ 2 ] ] = e.target.value;

            this.updateParameter( parameter );
        }
    };

    handleReset = () => {
        this.setState( prevState => getInitialState() );
    };

    render() {
        const { settings, parameters, name, description } = this.state;
        const { getToolInstanceStatus, updateToolInstanceStatus, createToolInstanceStatus } = this.props;
        const { id } = this.props.params;
        const readOnly = false;

        let chartParams = { settings };
        each( parameters, v => chartParams[ v.id ] = v.value );

        const heading = <div className="grid-container">
            <div className="col stretch parameters-wrapper">
                <Input
                    type="text"
                    disabled={readOnly}
                    name="name"
                    value={name}
                    onChange={this.handleInputChange( 'name' )}
                    placeholder="Name"
                />
            </div>
            <div className="col col-rel-0-5">
                <WebData.Component.Loading status={id ? updateToolInstanceStatus : createToolInstanceStatus}>
                    <Button type={'accent'} onClick={this.save}>
                        Save
                    </Button>
                </WebData.Component.Loading>
            </div>
        </div>;

        return (
            <div className="app-width">
                <Navbar links={navigation}/>
                <h3 style={styles.heading}>
                    T02. Groundwater mounding (Hantush)
                </h3>
                <WebData.Component.Loading status={getToolInstanceStatus}>
                    <div className="grid-container">
                        <div className="tile col stretch">
                            <Accordion firstActive={null}>
                                <AccordionItem heading={heading}>
                                    <Input
                                        type="textarea"
                                        disabled={readOnly}
                                        name="description"
                                        value={description}
                                        onChange={this.handleInputChange( 'description' )}
                                        placeholder="Description"
                                    />
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                    <div className="grid-container">
                        <section className="tile col col-abs-2 stacked">
                            <Background image={image}/>
                        </section>

                        <section className="tile col col-abs-3 stretch">
                            <Chart {...chartParams}/>
                        </section>
                    </div>

                    <div className="grid-container">
                        <section className="tile col col-abs-2">
                            <Settings settings={settings} handleChange={this.handleChange}/>
                        </section>

                        <section className="tile col col-abs-3 stretch">
                            <Parameters parameters={parameters} handleChange={this.handleChange}
                                        handleReset={this.handleReset}/>
                        </section>
                    </div>
                </WebData.Component.Loading>
            </div>
        );
    }
}

const actions = {
    createToolInstance: ToolInstance.Command.createToolInstance,
    updateToolInstance: ToolInstance.Command.updateToolInstance,
};

const mapDispatchToProps = (dispatch, props) => {
    const tool = props.route.tool;
    const wrappedActions = {};
    for (const key in actions) {
        if (actions.hasOwnProperty( key )) {
            // eslint-disable-next-line no-loop-func
            wrappedActions[ key ] = function () {
                const args = Array.prototype.slice.call( arguments );
                dispatch( actions[ key ]( tool, ...args ) );
            };
        }
    }

    return wrappedActions;
};

// eslint-disable-next-line no-class-assign
T02 = withRouter(
    connect( makeMapStateToProps, mapDispatchToProps )( T02 )
);

T02.propTypes = {};

export default T02;
