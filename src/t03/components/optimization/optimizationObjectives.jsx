import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import PropTypes from 'prop-types';
import OptimizationObjective from '../../../core/optimization/OptimizationObjective';
import {pure} from 'recompose';
import {LayoutComponents} from '../../../core/index';
import {Button, Dropdown, Form, Grid, Icon, Segment, Table} from 'semantic-ui-react';
import InputRange from './inputRange';
import InputObjectList from './InputObjectList';
import Location from '../../../core/optimization/Location';

class OptimizationObjectivesComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            objectives: props.objectives.map((objective, key) => {
                const obj = objective.toObject;
                obj.id = key + 1;
                return obj;
            }),
            selectedObjective: null
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            objectives: nextProps.objectives.map((objective, key) => {
                const obj = objective.toObject;
                obj.id = key + 1;
                return obj;
            })
        });
    }

    handleChange = (e, {name, value}) => {
        return this.setState({
            selectedObjective: {...this.state.selectedObjective, [name]: value}
        });
    };

    handleChangeLocation = (e, {name, value}) => {
        return this.setState({
            selectedObjective: {
                ...this.state.selectedObjective,
                location: {...this.state.selectedObjective.location, [name]: value}
            }
        });
    };

    handleChangeLocationRange = ({name, from, to}) => {
        return this.setState({
            selectedObjective: {
                ...this.state.selectedObjective,
                location: {...this.state.selectedObjective.location, [name]: {from: from, to: to}}
            }
        });
    };

    handleChangeLocationObjects = objectIds => {
        return this.setState((prevState) => ({
            selectedObjective: {
                ...this.state.selectedObjective,
                location: Location.fromObject(prevState.selectedObjective.location).updateObjects(objectIds).toObject
            }
        }));
    };

    onClickBack = () => {
        return this.setState({
            selectedObjective: null
        });
    };

    onClickNew = (e, {name, value}) => {
        const newObjective = new OptimizationObjective();
        newObjective.type = value;
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

        this.setState({
            selectedObjective: null
        });

        if (!selectedObjective.id) {
            objectives.push(selectedObjective);
        }

        this.props.onChange({
            key: 'objectives',
            value: objectives.map((obj) => {
                if (selectedObjective.id && obj.id === selectedObjective.id) {
                    return OptimizationObjective.fromObject(selectedObjective);
                }

                return OptimizationObjective.fromObject(obj);
            })
        });
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
            }
        };

        const typeOptions = [
            {key: 'type1', text: 'Concentration', value: 'concentration'},
            {key: 'type2', text: 'Head', value: 'head'},
            {key: 'type3', text: 'Flux', value: 'flux'},
            {key: 'type4', text: 'Distance', value: 'distance'},
            {key: 'type5', text: 'Input Concentration', value: 'inputConc'}
        ];

        return (
            <LayoutComponents.Column heading="Objectives">
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
                        <Grid.Column />
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
                            {
                                (this.state.selectedObjective
                                        ?
                                        <Form>
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
                                                    <label>Name of the concentration output file produced by
                                                        mt3d.</label>
                                                    <Form.Input
                                                        disabled={this.state.selectedObjective.type !== 'concentration'}
                                                        type="text"
                                                        name="conc_file_name"
                                                        value={this.state.selectedObjective.conc_file_name}
                                                        placeholder="conc_file_name ="
                                                        style={styles.inputfix}
                                                        onChange={this.handleChange}
                                                    />
                                                </Form.Field>
                                            </Form.Group>
                                            <Form.Field>
                                                <label>Method how each objective scalar will be calculated.</label>
                                                <Form.Select
                                                    name="summary_method"
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
                                                        name="penalty_value"
                                                        value={this.state.selectedObjective.penalty_value}
                                                        placeholder="penalty_value ="
                                                        style={styles.inputfix}
                                                        onChange={this.handleChange}
                                                    />
                                                </Form.Field>
                                            </Form.Group>
                                            <Segment>
                                                <h4>Location</h4>
                                                <Grid celled="internally">
                                                    <Grid.Row textAlign="center">
                                                        <Grid.Column width={6}>
                                                            {this.props.objects && this.props.objects.length > 0 &&
                                                            <Form.Checkbox
                                                                name="type"
                                                                label="At optimization object"
                                                                value="object"
                                                                checked={this.state.selectedObjective.location.type === 'object'}
                                                                onChange={this.handleChangeLocation}
                                                            />
                                                            }
                                                        </Grid.Column>
                                                        <Grid.Column width={10}>
                                                            <Form.Checkbox
                                                                name="type"
                                                                label="At bounding box"
                                                                value="bbox"
                                                                checked={this.state.selectedObjective.location.type === 'bbox' || !this.props.objects || this.props.objects.length < 0}
                                                                onChange={this.handleChangeLocation}
                                                            />
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                    <Grid.Row>
                                                        <Grid.Column width={6}>
                                                            <InputObjectList
                                                                name="objects"
                                                                label="Optimization Objects"
                                                                placeholder="object ="
                                                                disabled={this.state.selectedObjective.location.type !== 'object' || this.state.selectedObjective.location.objects.length >= this.props.objects.length}
                                                                addableObjects={
                                                                    this.props.objects && this.props.objects.length > 0
                                                                        ? this.props.objects
                                                                        : []
                                                                }
                                                                objectsInList={
                                                                    this.state.selectedObjective.location.objects && this.state.selectedObjective.location.objects.length > 0
                                                                        ? this.state.selectedObjective.location.objects
                                                                        : []
                                                                }
                                                                onChange={this.handleChangeLocationObjects}
                                                            />
                                                        </Grid.Column>
                                                        <Grid.Column width={10}>
                                                            <InputRange
                                                                name="ts"
                                                                from={this.state.selectedObjective.location.ts.from}
                                                                to={this.state.selectedObjective.location.ts.to}
                                                                label="Time steps"
                                                                label_from="from"
                                                                label_to="to"
                                                                disabled={this.state.selectedObjective.location.type !== 'bbox'}
                                                                onChange={this.handleChangeLocationRange}
                                                            />
                                                            <InputRange
                                                                name="lay"
                                                                from={this.state.selectedObjective.location.lay.from}
                                                                to={this.state.selectedObjective.location.lay.to}
                                                                label="Layer"
                                                                label_from="from"
                                                                label_to="to"
                                                                disabled={this.state.selectedObjective.location.type !== 'bbox'}
                                                                onChange={this.handleChangeLocationRange}
                                                            />
                                                            <InputRange
                                                                name="row"
                                                                from={this.state.selectedObjective.location.row.from}
                                                                to={this.state.selectedObjective.location.row.to}
                                                                label="Row"
                                                                label_from="from"
                                                                label_to="to"
                                                                disabled={this.state.selectedObjective.location.type !== 'bbox'}
                                                                onChange={this.handleChangeLocationRange}
                                                            />
                                                            <InputRange
                                                                name="col"
                                                                from={this.state.selectedObjective.location.col.from}
                                                                to={this.state.selectedObjective.location.col.to}
                                                                label="Column"
                                                                label_from="from"
                                                                label_to="to"
                                                                disabled={this.state.selectedObjective.location.type !== 'bbox'}
                                                                onChange={this.handleChangeLocationRange}
                                                            />
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            </Segment>
                                        </Form>
                                        :
                                        <Table celled striped>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell>Type</Table.HeaderCell>
                                                    <Table.HeaderCell>Summary Method</Table.HeaderCell>
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
                                                                    {objective.type}
                                                                </a>
                                                            </Table.Cell>
                                                            <Table.Cell>{objective.summary_method}</Table.Cell>
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
                                )
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
    onChange: PropTypes.func.isRequired,
};

export default pure(ConfiguredRadium(OptimizationObjectivesComponent));
