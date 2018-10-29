import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import PropTypes from 'prop-types';
import {pure} from 'recompose';
import {LayoutComponents} from '../../../core/index';
import OptimizationParameters from '../../../core/optimization/OptimizationParameters';
import {Segment, Form, Grid, Button, Icon, Message, Transition} from 'semantic-ui-react';

const EDITSTATE_NOCHANGES = 0;
const EDITSTATE_UNSAVED = 1;
const EDITSTATE_SAVED = 2;

class OptimizationParametersComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            parameters: props.parameters.toObject,
            editState: EDITSTATE_NOCHANGES
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            parameters: nextProps.parameters.toObject
        });
    }

    handleSubmit = () => {
        this.setState({
            editState: EDITSTATE_SAVED
        });

        return this.props.onChange({
            key: 'parameters',
            value: OptimizationParameters.fromObject(this.state.parameters)
        });
    };

    handleChange = (e, {name, value}) => this.setState({
        parameters: {...this.state.parameters, [name]: value},
        editState: EDITSTATE_UNSAVED
    });

    render() {
        const styles = {
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
                width: '99%',
                marginBottom: '0'
            },
            formfix: {
                marginRight: '15px',
                marginLeft: '15px',
                width: '100%'
            },
            msgfix: {
                paddingTop: '6.929px',
                paddingBottom: '6.929px',
                fontSize: '1rem',
                textAlign: 'center'
            }
        };

        const boolOptions = [
            {
                key: 'true',
                value: true,
                text: 'True'
            },
            {
                key: 'false',
                value: false,
                text: 'False'
            }
        ];
        const {parameters} = this.state;

        return (
            <LayoutComponents.Column>
                <Grid style={styles.tablewidth}>
                    <Grid.Row columns={3}>
                        <Grid.Column/>
                        <Grid.Column>
                            {this.state.editState === EDITSTATE_UNSAVED &&
                            <Message warning style={styles.msgfix}>Changes not saved!</Message>
                            }
                            <Transition visible={this.state.editState === EDITSTATE_SAVED} animation="drop" duration={500}>
                                <Message positive style={styles.msgfix}>Changes saved!</Message>
                            </Transition>
                        </Grid.Column>
                        <Grid.Column textAlign="right">
                            <Button icon positive
                                    style={styles.iconfix}
                                    onClick={this.handleSubmit}
                                    labelPosition="left">
                                <Icon name="save"/>
                                Save
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Form style={styles.formfix}>
                            <Form.Field>
                                <label>Method of optimization</label>
                                <Form.Select
                                    name="method"
                                    value={parameters.method}
                                    placeholder="method ="
                                    onChange={this.handleChange}
                                    options={[
                                        {
                                            key: 'ga',
                                            value: 'GA',
                                            text: 'Genetic Algorithm'
                                        },
                                        {
                                            key: 'simplex',
                                            value: 'Simplex',
                                            text: 'Simplex'
                                        }
                                    ]}
                                />
                            </Form.Field>
                            {(parameters.method === 'GA' &&
                                <div>
                                    <Form.Group widths="equal">
                                        <Form.Field>
                                            <label>Number of generations of genetic algorithm</label>
                                            <Form.Input
                                                type="number"
                                                name="ngen"
                                                value={parameters.ngen}
                                                placeholder="ngen ="
                                                onChange={this.handleChange}
                                                style={styles.inputfix}
                                                disabled={(parameters.method !== 'GA')}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Population size of genetic algorithm</label>
                                            <Form.Input
                                                type="number"
                                                name="pop_size"
                                                value={parameters.pop_size}
                                                placeholder="pop_size ="
                                                onChange={this.handleChange}
                                                style={styles.inputfix}
                                            />
                                        </Form.Field>
                                    </Form.Group>
                                    <Form.Group widths="equal">
                                        <Form.Field>
                                            <label>Probability of individual to be produced by mutation</label>
                                            <Form.Input
                                                type="number"
                                                name="mutpb"
                                                value={parameters.mutpb}
                                                placeholder="mutpb ="
                                                onChange={this.handleChange}
                                                style={styles.inputfix}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Probability of individual to be produced by cross-over</label>
                                            <Form.Input
                                                type="number"
                                                name="cxpb"
                                                value={parameters.cxpb}
                                                placeholder="cxpb ="
                                                onChange={this.handleChange}
                                                style={styles.inputfix}
                                            />
                                        </Form.Field>
                                    </Form.Group>
                                    <Form.Field>
                                        <label>ETA crowding factor</label>
                                        <Form.Input
                                            type="number"
                                            name="eta"
                                            value={parameters.eta}
                                            placeholder="eta ="
                                            onChange={this.handleChange}
                                            style={styles.inputfix}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Probability of mutation of a single value of an individual</label>
                                        <Form.Input
                                            name="indpb"
                                            type="number"
                                            value={parameters.indpb}
                                            placeholder="indpb ="
                                            onChange={this.handleChange}
                                            style={styles.inputfix}
                                        />
                                    </Form.Field>
                                    <Segment>
                                        <Form.Field>
                                            <label>Flag defining whether or not Diversity preserving module will be
                                                included</label>
                                            <Form.Select
                                                name="diversity_flg"
                                                value={parameters.diversity_flg}
                                                placeholder="diversity_flg ="
                                                onChange={this.handleChange}
                                                options={boolOptions}
                                            />
                                        </Form.Field>
                                        <Form.Group widths="equal">
                                            <Form.Field>
                                                <label>Boundary value of the Q diversity index.</label>
                                                <Form.Input
                                                    type="number"
                                                    name="qbound"
                                                    value={parameters.qbound}
                                                    placeholder="qbound ="
                                                    onChange={this.handleChange}
                                                    style={styles.inputfix}
                                                    disabled={(parameters.diversity_flg === false)}
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Number of classes to be used in the clustering module.</label>
                                                <Form.Input
                                                    type="number"
                                                    name="ncls"
                                                    value={parameters.ncls}
                                                    placeholder="ncls ="
                                                    onChange={this.handleChange}
                                                    style={styles.inputfix}
                                                    disabled={(parameters.diversity_flg === false)}
                                                />
                                            </Form.Field>
                                        </Form.Group>
                                    </Segment>
                                </div>
                            )}
                            {(parameters.method === 'Simplex' &&
                                <div>
                                    <Form.Field>
                                        <label>Maximum number of function evaluations during the local
                                            optimization.</label>
                                        <Form.Input
                                            type="number"
                                            name="maxf"
                                            value={parameters.maxf}
                                            placeholder="maxf ="
                                            onChange={this.handleChange}
                                            style={styles.inputfix}
                                            disabled={(parameters.method !== 'Simplex')}
                                        />
                                    </Form.Field>
                                    <Form.Group widths="equal">
                                        <Form.Field>
                                            <label>xtol</label>
                                            <Form.Input
                                                type="number"
                                                name="xtol"
                                                value={parameters.xtol}
                                                placeholder="xtol ="
                                                onChange={this.handleChange}
                                                style={styles.inputfix}
                                                disabled={(parameters.method !== 'Simplex')}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>ftol</label>
                                            <Form.Input
                                                type="number"
                                                name="ftol"
                                                value={parameters.ftol}
                                                placeholder="ftol ="
                                                onChange={this.handleChange}
                                                style={styles.inputfix}
                                                disabled={(parameters.method !== 'Simplex')}
                                            />
                                        </Form.Field>
                                    </Form.Group>
                                </div>
                            )}
                            <Form.Field>
                                <label>Report frequency</label>
                                <Form.Input
                                    type="number"
                                    name="report_frequency"
                                    value={parameters.report_frequency}
                                    placeholder="report frequency ="
                                    onChange={this.handleChange}
                                    style={styles.inputfix}
                                />
                            </Form.Field>
                        </Form>
                    </Grid.Row>
                </Grid>
            </LayoutComponents.Column>
        );
    }
}

OptimizationParametersComponent.propTypes = {
    parameters: PropTypes.instanceOf(OptimizationParameters),
    onChange: PropTypes.func.isRequired
};

export default pure(ConfiguredRadium(OptimizationParametersComponent));
