import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import PropTypes from 'prop-types';
import OptimizationObjective from '../../core/optimization/OptimizationObjective';
import {pure} from 'recompose';
import {LayoutComponents} from '../../core';
import {Grid} from 'semantic-ui-react';
import Icon from '../../components/primitive/Icon';
import Button from '../../components/primitive/Button';

class OptimizationObjectivesComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            objectives: props.objectives.map((objective) => objective.toObject),
            selectedObjective: null
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            objectives: nextProps.objectives.map((objective) => objective.toObject)
        });
    }

    onBackButtonClick = () => {
        this.setState({
            selectedObjective: null
        });
    };

    onNewButtonClick = () => {
        const newObjective = new OptimizationObjective();
        this.setState({
            objectives: [...this.state.objectives, newObjective.toObject],
            // selectedObjective: (this.state.objectives.length - 1) // TODO: Navigating to the right ID
        });
    };

    onObjectiveListClick = (objectiveId) => {
        this.setState({
            selectedObjective: objectiveId
        });
    };

    render() {
        return (
            <LayoutComponents.Column heading="Objectives">
                <Grid>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            {this.state.selectedObjective &&
                            <Button
                                type="link"
                                onClick={this.onBackButtonClick}
                                icon={<Icon name="arrow_left"/>}
                            >
                                Back to List
                            </Button>
                            }
                        </Grid.Column>
                        <Grid.Column>
                            {
                                (this.state.selectedObjective
                                        ?
                                        <h3>Details</h3>
                                        // TODO: Save-Button
                                        :
                                        <h3>Liste</h3>
                                )}
                        </Grid.Column>
                        <Grid.Column textAlign="right">
                            {!this.state.selectedObjective &&
                            <Button
                                icon={<Icon name="add"/>}
                                onClick={this.onNewButtonClick}
                                type="link">
                                Add new
                            </Button>
                            }
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            {
                                (this.state.selectedObjective
                                    ?
                                    <p>Details</p>
                                    :
                                    <table>
                                        <tbody>
                                        {
                                            this.state.objectives.map((objective, key) =>
                                                <tr key={key} onClick={() => this.onObjectiveListClick(key)}>
                                                    <td>{objective.type}</td>
                                                    <td>{objective.summary_method}</td>
                                                </tr>
                                            )
                                        }
                                        </tbody>
                                    </table>
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
    onChange: PropTypes.func.isRequired,
};

export default pure(ConfiguredRadium(OptimizationObjectivesComponent));
