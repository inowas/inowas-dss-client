import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import {pure} from 'recompose';
import {LayoutComponents} from '../../../core/index';
import {
    Button,
    Dropdown,
    Message,
    Form,
    Grid,
    Icon,
    Table,
    Accordion
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import OptimizationObject from '../../../core/optimization/OptimizationObject';
import InputRange from './inputRange';
import FluxDataTable from './FluxDataTable';
import Stressperiods from '../../../core/modflow/Stressperiods';

class OptimizationObjectsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            objects: props.objects.map((object) => {
                object.numberOfStressPeriods = this.props.stressPeriods.dateTimes.length;
                return object.toObject;
            }),
            selectedObject: null,
            selectedSubstance: null,
            activeIndex: 0
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            objects: nextProps.objects.map((object) => {
                object.numberOfStressPeriods = this.props.stressPeriods.dateTimes.length;
                return object.toObject;
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

    handleClickAccordion = (e, titleProps) => {
        const {index} = titleProps;
        const {activeIndex} = this.state;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({activeIndex: newIndex});
    };

    handleChangeFlux = rows => {
        return this.setState((prevState) => ({
            selectedObject: OptimizationObject.fromObject(prevState.selectedObject).updateFlux(rows).toObject
        }));
    };

    handleChangeSubstanceData = rows => {
        const substance = this.state.selectedSubstance;
        substance.data = rows.map((row, key) => {
            return {
                id: key,
                min: parseFloat(row.min),
                max: parseFloat(row.max)
            };
        });

        return this.setState(prevState => ({
            selectedSubstance: substance,
            selectedObject: OptimizationObject.fromObject(prevState.selectedObject).updateSubstance(substance).toObject
        }));
    };

    handleChangeSubstance = (e, {name, value}) => {
        const substance = this.state.selectedSubstance;
        substance[name] = value;

        return this.setState({
            selectedSubstance: substance,
            selectedObject: OptimizationObject.fromObject(this.state.selectedObject).updateSubstance(substance).toObject,
        });
    };

    handleSelectSubstance = (e, {value}) => {
        return this.setState({
            selectedSubstance: this.state.selectedObject.substances.filter(s => s.id === value)[0]
        });
    };

    addSubstance = name => {
        return this.setState({
            selectedObject: OptimizationObject.fromObject(this.state.selectedObject).addSubstance(name).toObject,
            selectedSubstance: this.state.selectedObject.substances[this.state.selectedObject.substances.length - 1]
        });
    };

    removeSubstance = s => {
        return this.setState({
            selectedSubstance: null,
            selectedObject: OptimizationObject.fromObject(this.state.selectedObject).removeSubstance(s).toObject,
        });
    };

    onClickBack = () => {
        return this.setState({
            selectedObject: null
        });
    };

    onClickSave = () => {
        const {objects, selectedObject} = this.state;

        if (objects.length < 1) {
            objects.push(selectedObject);
        }

        if (objects.length >= 1 && objects.filter(item => item.id === selectedObject.id).length === 0) {
            objects.push(selectedObject);
        }

        this.props.onChange({
            key: 'objects',
            value: objects.map((obj) => {
                if (obj.id === selectedObject.id) {
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
            },
            buttonFix: {
                width: 'auto',
                height: 'auto'
            },
            dropDownWithButtons: {
                marginRight: 0,
                marginLeft: 0,
            },
        };

        const typeOptions = [
            {key: 'type1', text: 'Well', value: 'wel'},
        ];

        const fluxConfig = [
            {property: 'min', label: 'Min'},
            {property: 'max', label: 'Max'}
        ];

        let fluxRows = null;
        let substanceRows = null;

        if (this.state.selectedObject) {
            fluxRows = this.props.stressPeriods.dateTimes.map((dt, key) => {
                return {
                    id: key,
                    date_time: dt,
                    min: this.state.selectedObject.flux[key] ? this.state.selectedObject.flux[key].min : 0,
                    max: this.state.selectedObject.flux[key] ? this.state.selectedObject.flux[key].max : 0
                };
            });
        }

        if(this.state.selectedSubstance) {
            substanceRows = this.props.stressPeriods.dateTimes.map((dt, key) => {
                return {
                    id: key,
                    date_time: dt,
                    min: this.state.selectedSubstance.data[key] ? this.state.selectedSubstance.data[key].min : 0,
                    max: this.state.selectedSubstance.data[key] ? this.state.selectedSubstance.data[key].max : 0
                };
            });
        }

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
                        <Grid.Column/>
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
                                                  key: 'wel',
                                                  value: 'wel',
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
                                    <p>No optimization objects</p>
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
                                                        <Button icon color="red"
                                                                size="small"
                                                                style={styles.iconfix}
                                                                onClick={() => this.onClickDelete(object)}
                                                        >
                                                            <Icon name="trash"/>
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
                                    <Accordion fluid styled>
                                        <Accordion.Title active={this.state.activeIndex === 0} index={0}
                                                         onClick={this.handleClickAccordion}>
                                            <Icon name="dropdown"/>
                                            Position
                                        </Accordion.Title>
                                        <Accordion.Content active={this.state.activeIndex === 0}>
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
                                        </Accordion.Content>
                                        <Accordion.Title active={this.state.activeIndex === 1} index={1}
                                                         onClick={this.handleClickAccordion}>
                                            <Icon name="dropdown"/>
                                            Pumping Rates
                                        </Accordion.Title>
                                        <Accordion.Content active={this.state.activeIndex === 1}>
                                            <FluxDataTable
                                                config={fluxConfig}
                                                readOnly={false}
                                                rows={fluxRows}
                                                onChange={this.handleChangeFlux}
                                            />
                                        </Accordion.Content>
                                        <Accordion.Title active={this.state.activeIndex === 2} index={2}
                                                         onClick={this.handleClickAccordion}>
                                            <Icon name="dropdown"/>
                                            Substances
                                        </Accordion.Title>
                                        <Accordion.Content active={this.state.activeIndex === 2}>
                                            <Form.Group style={styles.dropDownWithButtons}>
                                                <Dropdown
                                                    placeholder="Select Substance"
                                                    fluid
                                                    search
                                                    selection
                                                    options={
                                                        this.state.selectedObject.substances.map(s => {
                                                            return {key: s.id, text: s.name, value: s.id};
                                                        })
                                                    }
                                                    onChange={this.handleSelectSubstance}
                                                    value={this.state.selectedSubstance ? this.state.selectedSubstance.id : null}
                                                />
                                                <Button.Group>
                                                    <Button
                                                        style={styles.buttonFix}
                                                        icon
                                                        onClick={() => this.addSubstance('new substance')}
                                                    >
                                                        <Icon name="add circle"/>
                                                    </Button>

                                                    <Button
                                                        style={styles.buttonFix}
                                                        icon
                                                        onClick={() => this.removeSubstance(this.state.selectedSubstance.id)}
                                                        disabled={this.state.selectedSubstance === null}
                                                    >
                                                        <Icon name="trash"/>
                                                    </Button>
                                                </Button.Group>
                                            </Form.Group>
                                            {this.state.selectedSubstance ?
                                                <div>
                                                    <label>Name</label>
                                                    <Form.Input
                                                        type="text"
                                                        name="name"
                                                        value={this.state.selectedSubstance.name}
                                                        placeholder="name ="
                                                        style={styles.inputfix}
                                                        onChange={this.handleChangeSubstance}
                                                    />
                                                    <FluxDataTable
                                                        config={fluxConfig}
                                                        readOnly={false}
                                                        rows={substanceRows}
                                                        onChange={this.handleChangeSubstanceData}
                                                    />
                                                </div>
                                                :
                                                <p>No substance selected.</p>
                                            }
                                        </Accordion.Content>
                                    </Accordion>
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
    stressPeriods: PropTypes.instanceOf(Stressperiods),
    onChange: PropTypes.func.isRequired,
};

export default pure(ConfiguredRadium(OptimizationObjectsComponent));
