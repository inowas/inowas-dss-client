import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Accordion from '../../components/primitive/Accordion';
import AccordionItem from '../../components/primitive/AccordionItem';
import ArraySlider from '../../components/primitive/ArraySlider';
import Chart from 'react-c3js';
import ScenarioSelect from './ScenarioSelect';

export default class CrossSection extends Component {
    static propTypes = {
        scenarioAnalysis: PropTypes.object,
        scenarios: PropTypes.array,
        cloneScenario: PropTypes.func,
        deleteScenario: PropTypes.func,
        toggleScenarioSelection: PropTypes.func
    };

    render() {
        const {
            scenarioAnalysis,
            scenarios,
            cloneScenario,
            deleteScenario,
            toggleScenarioSelection
        } = this.props;
        return (
            <div className="grid-container">
                <div className="tile col stretch">
                    <Accordion firstActive={0}>
                        <AccordionItem heading="Scenarios">
                            <ScenarioSelect
                                scenarioAnalysisId={scenarioAnalysis.id}
                                cloneScenario={cloneScenario}
                                deleteScenario={deleteScenario}
                                scenarios={scenarios}
                                toggleSelection={toggleScenarioSelection}
                            />
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        );
    }
}
