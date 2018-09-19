import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import PropTypes from 'prop-types';
import OptimizationConstraint from '../../../core/optimization/OptimizationConstraint';
import {pure} from 'recompose';
import {LayoutComponents} from '../../../core/index';
import {Button, Dropdown, Form, Grid, Icon, Message, Segment, Table} from 'semantic-ui-react';
import OptimizationMap from './optimizationMap';
import Slider, {createSliderWithTooltip} from 'rc-slider';
import {Formatter} from "../../../core";

class OptimizationConstraintsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            constraints: props.constraints.map((constraint) => {
                return constraint.toObject;
            }),
            selectedConstraint: null
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            constraints: nextProps.constraints.map((constraint) => {
                return constraint.toObject;
            })
        });
    }

    handleChange = (e, {name, value}) => {
        const constraint = OptimizationConstraint.fromObject(this.state.selectedConstraint);
        constraint[name] = value;
        return this.setState({
            selectedConstraint: constraint.toObject
        });
    };

    handleChangeStressPeriods = (e) => {
        return this.setState({
            selectedConstraint: {
                ...this.state.selectedConstraint,
                location: {
                    ...this.state.selectedConstraint.location,
                    ts: {
                        min: e[0],
                        max: e[1]
                    }
                }
            }
        });
    };

    onClickBack = () => {
        return this.setState({
            selectedConstraint: null
        });
    };

    onClickNew = (e, {name, value}) => {
        const newConstraint = new OptimizationConstraint();
        newConstraint.type = value;
        newConstraint.location.ts.max = this.props.stressPeriods.dateTimes.length - 1;
        return this.setState({
            selectedConstraint: newConstraint.toObject
        });
    };

    onClickConstraint = (constraint) => {
        return this.setState({
            selectedConstraint: constraint
        });
    };

    onClickDelete = (constraint) => {
        const constraints = this.state.constraints;
        this.props.onChange({
            key: 'constraints',
            value: constraints
                .filter(obj => obj.id !== constraint.id)
                .map(obj => {
                    return OptimizationConstraint.fromObject(obj);
                })
        });
    };

    onClickSave = () => {
        const {constraints, selectedConstraint} = this.state;

        if (constraints.length < 1) {
            constraints.push(selectedConstraint);
        }

        if (constraints.length >= 1 && constraints.filter(item => item.id === selectedConstraint.id).length === 0) {
            constraints.push(selectedConstraint);
        }

        this.props.onChange({
            key: 'constraints',
            value: constraints.map((obj) => {
                if (obj.id === selectedConstraint.id) {
                    return OptimizationConstraint.fromObject(selectedConstraint);
                }

                return OptimizationConstraint.fromObject(obj);
            })
        });

        return this.setState({
            selectedConstraint: null
        });
    };

    formatTimestamp = (key) => Formatter.toDate(this.props.stressPeriods.dateTimes[key]);

    sliderMarks = () => {
        let marks = {};
        this.props.stressPeriods.dateTimes.forEach((dt, key) => {
            marks[key] = key;
        });
        return marks;
    };

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
                width: '99%'
            },
            sliderDiv: {
                paddingBottom: 30
            }
        };

        const typeOptions = [
            {key: 'type1', text: 'Concentration', value: 'concentration'},
            {key: 'type2', text: 'Head', value: 'head'},
            {key: 'type3', text: 'Flux', value: 'flux'},
            {key: 'type4', text: 'Distance', value: 'distance'},
            {key: 'type5', text: 'Input Concentration', value: 'inputConc'}
        ];

        const Range = createSliderWithTooltip(Slider.Range);

        return (
            <LayoutComponents.Column>
                <Grid style={styles.tablewidth}>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            {this.state.selectedConstraint &&
                            <Button icon
                                    style={styles.iconfix}
                                    onClick={this.onClickBack}
                                    labelPosition="left">
                                <Icon name="left arrow"/>
                                Back to List
                            </Button>
                            }
                        </Grid.Column>
                        <Grid.Column/>
                        <Grid.Column textAlign="right">
                            {!this.state.selectedConstraint ?
                                <Dropdown button floating labeled
                                          direction="left"
                                          style={styles.iconfix}
                                          name="type"
                                          className="icon"
                                          text="Add New"
                                          icon="plus"
                                          options={typeOptions}
                                          onChange={this.onClickNew}
                                /> :
                                <Button icon positive
                                        style={styles.iconfix}
                                        onClick={this.onClickSave}
                                        labelPosition="left">
                                    <Icon name="save"/>
                                    Save
                                </Button>
                            }
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            {(!this.state.selectedConstraint && (!this.state.constraints || this.state.constraints.length < 1)) &&
                            <Message>
                                <p>No optimization constraints</p>
                            </Message>
                            }
                            {(!this.state.selectedConstraint && this.state.constraints && this.state.constraints.length >= 1) &&
                            <Table celled striped>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Name</Table.HeaderCell>
                                        <Table.HeaderCell>Type</Table.HeaderCell>
                                        <Table.HeaderCell/>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {
                                        this.state.constraints.map((constraint) =>
                                            <Table.Row key={constraint.id}>
                                                <Table.Cell>
                                                    <a style={styles.link}
                                                       onClick={() => this.onClickConstraint(constraint)}>
                                                        {constraint.name}
                                                    </a>
                                                </Table.Cell>
                                                <Table.Cell>{constraint.type}</Table.Cell>
                                                <Table.Cell textAlign="center">
                                                    <Button icon color="red"
                                                            style={styles.iconfix}
                                                            size="small"
                                                            onClick={() => this.onClickDelete(constraint)}>
                                                        <Icon name="trash"/>
                                                    </Button>
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    }
                                </Table.Body>
                            </Table>
                            }
                            {this.state.selectedConstraint &&
                            <Form>
                                <Form.Field>
                                    <label>Name</label>
                                    <Form.Input
                                        type="text"
                                        name="name"
                                        value={this.state.selectedConstraint.name}
                                        placeholder="name ="
                                        style={styles.inputfix}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Group widths="equal">
                                    <Form.Field>
                                        <label>Constraint type</label>
                                        <Form.Select
                                            name="type"
                                            value={this.state.selectedConstraint.type}
                                            placeholder="type ="
                                            options={typeOptions}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Method how each constraint scalar will be calculated.</label>
                                        <Form.Select
                                            name="summaryMethod"
                                            value={this.state.selectedConstraint.summary_method}
                                            placeholder="summary_method ="
                                            options={[
                                                {key: 'min', text: 'Min', value: 'min'},
                                                {key: 'max', text: 'Max', value: 'max'},
                                                {key: 'mean', text: 'Mean', value: 'mean'},
                                            ]}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                </Form.Group>
                                <Form.Field>
                                    <label>Constraint value</label>
                                    <Form.Input
                                        type="number"
                                        name="value"
                                        value={this.state.selectedConstraint.value}
                                        placeholder="value ="
                                        style={styles.inputfix}
                                        onChange={this.handleChange}
                                        defaultChecked
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Operator that compares the observed value with the constraint
                                        value.</label>
                                    <Form.Select
                                        name="operator"
                                        value={this.state.selectedConstraint.operator}
                                        placeholder="operator ="
                                        options={[
                                            {key: 'more', text: 'More', value: 'more'},
                                            {key: 'less', text: 'Less', value: 'less'}
                                        ]}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                {this.state.selectedConstraint.type !== 'distance' &&
                                <div>
                                    <Form.Field>
                                        <label>Stress Periods</label>
                                        <Segment style={styles.sliderDiv}>
                                            <Range
                                                min={0}
                                                max={this.props.stressPeriods.dateTimes.length - 1}
                                                step={1}
                                                marks={this.sliderMarks()}
                                                onChange={this.handleChangeStressPeriods}
                                                defaultValue={[this.state.selectedConstraint.location.ts.min, this.state.selectedConstraint.location.ts.max]}
                                                tipFormatter={value => `${this.formatTimestamp(value)}`}
                                            />
                                        </Segment>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Location</label>
                                        <Segment>
                                            <OptimizationMap
                                                name="location"
                                                area={this.props.model.geometry}
                                                bbox={this.props.model.bounding_box}
                                                location={this.state.selectedConstraint.location}
                                                objects={this.props.objects}
                                                onlyObjects={this.state.selectedConstraint.type === 'flux' || this.state.selectedConstraint.type === 'inputConc'}
                                                gridSize={this.props.model.grid_size}
                                                onChange={this.handleChange}
                                                readOnly
                                            />
                                        </Segment>
                                    </Form.Field>
                                </div>
                                }
                                {this.state.selectedConstraint.type === 'distance' &&
                                <Form.Field>
                                    <label>Distance</label>
                                    <Segment>
                                        <Grid divided={'vertically'}>
                                            <Grid.Row columns={2}>
                                                <Grid.Column width={8}>
                                                    <OptimizationMap
                                                        name="location1"
                                                        label="Edit Location 1"
                                                        area={this.props.model.geometry}
                                                        bbox={this.props.model.bounding_box}
                                                        location={this.state.selectedConstraint.location_1}
                                                        objects={this.props.objects}
                                                        gridSize={this.props.model.grid_size}
                                                        onChange={this.handleChange}
                                                        readOnly
                                                    />
                                                </Grid.Column>
                                                <Grid.Column width={8}>
                                                    <OptimizationMap
                                                        name="location2"
                                                        label="Edit Location 2"
                                                        area={this.props.model.geometry}
                                                        bbox={this.props.model.bounding_box}
                                                        location={this.state.selectedConstraint.location_2}
                                                        objects={this.props.objects}
                                                        gridSize={this.props.model.grid_size}
                                                        onChange={this.handleChange}
                                                        readOnly
                                                    />
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </Segment>
                                </Form.Field>
                                }
                            </Form>

                            }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </LayoutComponents.Column>
        );
    }
}

OptimizationConstraintsComponent.propTypes = {
    constraints: PropTypes.array.isRequired,
    objects: PropTypes.array.isRequired,
    model: PropTypes.object,
    onChange: PropTypes.func.isRequired,
};

export default pure(ConfiguredRadium(OptimizationConstraintsComponent));
