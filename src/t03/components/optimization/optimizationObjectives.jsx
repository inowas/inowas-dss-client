import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import PropTypes from 'prop-types';
import OptimizationObjective from '../../../core/optimization/OptimizationObjective';
import {pure} from 'recompose';
import {LayoutComponents} from '../../../core/index';
import {Button, Dropdown, Form, Grid, Icon, Message, Segment, Table} from 'semantic-ui-react';
import OptimizationMap from './optimizationMap';
import Slider from 'rc-slider';
import {createSliderWithTooltip} from 'rc-slider';
import Stressperiods from "../../../core/modflow/Stressperiods";
import {Formatter} from "../../../core";

class OptimizationObjectivesComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            objectives: props.objectives.map((objective) => {
                return objective.toObject;
            }),
            selectedObjective: null
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            objectives: nextProps.objectives.map((objective) => {
                return objective.toObject;
            })
        });
    }

    handleChange = (e, {name, value}) => {
        const objective = OptimizationObjective.fromObject(this.state.selectedObjective);
        objective[name] = value;
        return this.setState({
            selectedObjective: objective.toObject
        });
    };

    handleChangeStressPeriods = (e) => {
        return this.setState({
            selectedObjective: {
                ...this.state.selectedObjective,
                location: {
                    ...this.state.selectedObjective.location,
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
            selectedObjective: null
        });
    };

    onClickNew = (e, {name, value}) => {
        const newObjective = new OptimizationObjective();
        newObjective.type = value;
        newObjective.location.ts.max = this.props.stressPeriods.dateTimes.length - 1;
        return this.setState({
            selectedObjective: newObjective.toObject
        });
    };

    onClickObjective = (objective) => {
        return this.setState({
            selectedObjective: objective
        });
    };

    onClickDelete = (objective) => {
        const objectives = this.state.objectives;
        this.props.onChange({
            key: 'objectives',
            value: objectives
                .filter(obj => obj.id !== objective.id)
                .map(obj => {
                    return OptimizationObjective.fromObject(obj);
                })
        });
    };

    onClickSave = () => {
        const {objectives, selectedObjective} = this.state;

        if (objectives.length < 1) {
            objectives.push(selectedObjective);
        }

        if (objectives.length >= 1 && objectives.filter(item => item.id === selectedObjective.id).length === 0) {
            objectives.push(selectedObjective);
        }

        this.props.onChange({
            key: 'objectives',
            value: objectives.map((obj) => {
                if (obj.id === selectedObjective.id) {
                    return OptimizationObjective.fromObject(selectedObjective);
                }

                return OptimizationObjective.fromObject(obj);
            })
        });

        return this.setState({
            selectedObjective: null
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
                            {this.state.selectedObjective &&
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
                            {!this.state.selectedObjective ?
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
                            {(!this.state.selectedObjective && (!this.state.objectives || this.state.objectives.length < 1)) &&
                            <Message>
                                <p>No optimization objectives</p>
                            </Message>
                            }
                            {(!this.state.selectedObjective && this.state.objectives && this.state.objectives.length >= 1) &&
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
                                        this.state.objectives.map((objective) =>
                                            <Table.Row key={objective.id}>
                                                <Table.Cell>
                                                    <a style={styles.link}
                                                       onClick={() => this.onClickObjective(objective)}>
                                                        {objective.name}
                                                    </a>
                                                </Table.Cell>
                                                <Table.Cell>{objective.type}</Table.Cell>
                                                <Table.Cell textAlign="center">
                                                    <Button icon color="red"
                                                            style={styles.iconfix}
                                                            size="small"
                                                            onClick={() => this.onClickDelete(objective)}>
                                                        <Icon name="trash"/>
                                                    </Button>
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    }
                                </Table.Body>
                            </Table>
                            }
                            {this.state.selectedObjective &&
                            <Form>
                                <Form.Field>
                                    <label>Name</label>
                                    <Form.Input
                                        type="text"
                                        name="name"
                                        value={this.state.selectedObjective.name}
                                        placeholder="name ="
                                        style={styles.inputfix}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Group widths="equal">
                                    <Form.Field>
                                        <label>Objective type</label>
                                        <Form.Select
                                            name="type"
                                            value={this.state.selectedObjective.type}
                                            placeholder="type ="
                                            options={typeOptions}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Method how each objective scalar will be calculated.</label>
                                        <Form.Select
                                            name="summaryMethod"
                                            value={this.state.selectedObjective.summary_method}
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
                                <Form.Group widths="equal">
                                    <Form.Field>
                                        <label>Objective weight factor</label>
                                        <Form.Input
                                            type="number"
                                            name="weight"
                                            value={this.state.selectedObjective.weight}
                                            placeholder="weight ="
                                            style={styles.inputfix}
                                            onChange={this.handleChange}
                                            defaultChecked
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Objective penalty value</label>
                                        <Form.Input
                                            type="number"
                                            name="penaltyValue"
                                            value={this.state.selectedObjective.penalty_value}
                                            placeholder="penalty_value ="
                                            style={styles.inputfix}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                </Form.Group>
                                {this.state.selectedObjective.type !== 'distance' &&
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
                                                defaultValue={[this.state.selectedObjective.location.ts.min, this.state.selectedObjective.location.ts.max]}
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
                                                location={this.state.selectedObjective.location}
                                                objects={this.props.objects}
                                                onlyObjects={this.state.selectedObjective.type === 'flux' || this.state.selectedObjective.type === 'inputConc'}
                                                gridSize={this.props.model.grid_size}
                                                onChange={this.handleChange}
                                                readOnly
                                            />
                                        </Segment>
                                    </Form.Field>
                                </div>
                                }
                                {this.state.selectedObjective.type === 'distance' &&
                                <Form.Field>
                                    <h4>Distance</h4>
                                    <Segment>
                                        <Grid divided={'vertically'}>
                                            <Grid.Row columns={2}>
                                                <Grid.Column width={8}>
                                                    <OptimizationMap
                                                        name="location1"
                                                        label="Edit Location 1"
                                                        area={this.props.model.geometry}
                                                        bbox={this.props.model.bounding_box}
                                                        location={this.state.selectedObjective.location_1}
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
                                                        location={this.state.selectedObjective.location_2}
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

OptimizationObjectivesComponent.propTypes = {
    objectives: PropTypes.array.isRequired,
    objects: PropTypes.array.isRequired,
    model: PropTypes.object,
    stressPeriods: PropTypes.instanceOf(Stressperiods),
    onChange: PropTypes.func.isRequired,
};

export default pure(ConfiguredRadium(OptimizationObjectivesComponent));
