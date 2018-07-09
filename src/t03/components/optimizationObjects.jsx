import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import {pure} from 'recompose';
import {LayoutComponents} from '../../core';
import {Button, Dropdown, Message, Form, Grid, Icon, Segment, Table} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import OptimizationObject from '../../core/optimization/OptimizationObject';
import InputRange from './inputRange';

class OptimizationObjectsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            objects: props.objects.map((object, key) => {
                const obj = object.toObject;
                obj.id = key + 1;
                return obj;
            }),
            selectedObject: null
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            objects: nextProps.objects.map((object, key) => {
                const obj = object.toObject;
                obj.id = key + 1;
                return obj;
            })
        });
    }

    handleChange = (e, {name, value}) => this.setState({
        selectedObject: {
            ...this.state.selectedObject,
            [name]: value
        }
    });

    handleChangePosition = ({name, from, to}) => this.setState({
        selectedObject: {
            ...this.state.selectedObject,
            position: {
                ...this.state.selectedObject.position,
                [name]: {min: from, max: to}
            }
        }
    });

    onClickNew = (e, {name, value}) => {
        const newObject = new OptimizationObject();
        newObject.type = value;
        return this.setState({
            selectedObject: newObject.toObject
        });
    };

    onClickDelete = (object) => {
        const objects = this.state.objects;
        this.props.onChange({
            key: 'objects',
            value: objects
                .filter(obj => obj.id !== object.id)
                .map(obj => {
                    return OptimizationObject.fromObject(obj);
                })
        });
    };

    onClickObject = (object) => {
        return this.setState({
            selectedObject: object
        });
    };

    onClickBack = () => {
        return this.setState({
            selectedObject: null
        });
    };

    onClickSave = () => {
        const {objects, selectedObject} = this.state;

        if (!selectedObject.id) {
            objects.push(selectedObject);
        }

        this.props.onChange({
            key: 'objects',
            value: objects.map((obj) => {
                if (selectedObject.id && obj.id === selectedObject.id) {
                    return OptimizationObject.fromObject(selectedObject);
                }

                return OptimizationObject.fromObject(obj);
            })
        });

        return this.setState({
            selectedObject: null
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
            {key: 'type1', text: 'Well', value: 'well'},
        ];

        return (
            <LayoutComponents.Column heading="Objects">
                <Grid style={styles.tablewidth}>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            {(this.state.selectedObject &&
                                <Button icon
                                        style={styles.iconfix}
                                        onClick={this.onClickBack}
                                        labelPosition="left">
                                    <Icon name="left arrow"/>
                                    Back
                                </Button>
                            )}
                        </Grid.Column>
                        <Grid.Column>
                            <h3>List</h3>
                        </Grid.Column>
                        <Grid.Column textAlign="right">
                            {!this.state.selectedObject ?
                                <Dropdown button floating labeled
                                          direction="left"
                                          style={styles.iconfix}
                                          name="type"
                                          className="icon"
                                          text="Add New"
                                          icon="plus"
                                          options={[
                                              {
                                                  key: 'well',
                                                  value: 'well',
                                                  text: 'Well'
                                              },
                                          ]}
                                          onChange={this.onClickNew}
                                /> :
                                <Button icon positive
                                        style={styles.iconfix}
                                        labelPosition="left"
                                        onClick={this.onClickSave}
                                >
                                    <Icon name="save"/>
                                    Save
                                </Button>
                            }
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            {(!this.state.selectedObject && (!this.state.objects || this.state.objects.length < 1)) ?
                                <Message>
                                    <p>There are no optimization objects so far.</p>
                                </Message>
                                : ''
                            }
                            {(!this.state.selectedObject && this.state.objects && this.state.objects.length > 0) ?
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
                                            this.state.objects.map((object) =>
                                                <Table.Row key={object.id}>
                                                    <Table.Cell>
                                                        <a style={styles.link}
                                                           onClick={() => this.onClickObject(object)}
                                                        >
                                                            {object.name}
                                                        </a>
                                                    </Table.Cell>
                                                    <Table.Cell>{object.type}</Table.Cell>
                                                    <Table.Cell textAlign="center">
                                                        <Button icon color="orange"
                                                                labelPosition="left"
                                                                size="mini"
                                                                style={styles.iconfix}
                                                                onClick={() => this.onClickDelete(object)}
                                                        >
                                                            <Icon name="trash"/>
                                                            Delete
                                                        </Button>
                                                    </Table.Cell>
                                                </Table.Row>
                                            )
                                        }
                                    </Table.Body>
                                </Table>
                                : ''
                            }
                            {(this.state.selectedObject) ?
                                <Form>
                                    <Form.Group widths="equal">
                                        <Form.Field>
                                            <label>Type</label>
                                            <Form.Select
                                                name="type"
                                                value={this.state.selectedObject.type}
                                                placeholder="type ="
                                                options={typeOptions}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Name</label>
                                            <Form.Input
                                                type="text"
                                                name="name"
                                                value={this.state.selectedObject.name}
                                                placeholder="name ="
                                                style={styles.inputfix}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                    </Form.Group>
                                    <Segment>
                                        <p>Position</p>
                                        <InputRange
                                            name="lay"
                                            from={this.state.selectedObject.position.lay.min}
                                            to={this.state.selectedObject.position.lay.max}
                                            label="Layer"
                                            label_from="min"
                                            label_to="max"
                                            onChange={this.handleChangePosition}
                                        />
                                        <InputRange
                                            name="row"
                                            from={this.state.selectedObject.position.row.min}
                                            to={this.state.selectedObject.position.row.max}
                                            label="Row"
                                            label_from="min"
                                            label_to="max"
                                            onChange={this.handleChangePosition}
                                        />
                                        <InputRange
                                            name="col"
                                            from={this.state.selectedObject.position.col.min}
                                            to={this.state.selectedObject.position.col.max}
                                            label="Column"
                                            label_from="min"
                                            label_to="max"
                                            onChange={this.handleChangePosition}
                                        />
                                    </Segment>
                                </Form>
                                : ''
                            }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </LayoutComponents.Column>
        );
    }
}

OptimizationObjectsComponent.propTypes = {
    objects: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default pure(ConfiguredRadium(OptimizationObjectsComponent));
