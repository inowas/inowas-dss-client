import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Accordion from '../../components/primitive/Accordion';
import AccordionItem from '../../components/primitive/AccordionItem';
import ScenarioSelect from './ScenarioSelect';
import LayerSelect from './LayerSelect';
import TotalTimesSlider from './TotalTimesSlider';
import ConfiguredAxios from 'ConfiguredAxios';
import ScenarioAnalysisMapData from '../../model/ScenarioAnalysisMapData';
import ScenarioAnalysisMap from './ScenarioAnalysisMap';
import { Component as T03Component } from '../../t03';

export default class CrossSection extends Component {
    static propTypes = {
        scenarioAnalysis: PropTypes.object,
        scenarios: PropTypes.array,
        cloneScenario: PropTypes.func,
        deleteScenario: PropTypes.func,
        toggleScenarioSelection: PropTypes.func,
        apiKey: PropTypes.string
    };

    state = {
        selectedLayer: null,
        selectedResultType: null,
        selectedCoordinate: null,
        mapPosition: null,
        selectedTotalTimeIndex: 0,
        calculations: {}
    };

    componentWillReceiveProps(nextProps) {
        // init values for LayerSelection as soon as layerScheme is available
        const { selectedLayer, selectedResultType, mapPosition } = this.state;
        if (
            !selectedLayer &&
            nextProps.scenarioAnalysis &&
            nextProps.scenarioAnalysis.layerScheme
        ) {
            this.setState({
                selectedLayer: nextProps.scenarioAnalysis.layerScheme.length - 1
            });
        }

        if (
            !selectedResultType &&
            nextProps.scenarioAnalysis &&
            nextProps.scenarioAnalysis.layerScheme
        ) {
            const layerScheme = nextProps.scenarioAnalysis.layerScheme;
            this.setState({
                selectedResultType: layerScheme[layerScheme.length - 1][0]
            });
        }

        if (
            !mapPosition &&
            nextProps.scenarioAnalysis &&
            nextProps.scenarioAnalysis.boundingBox
        ) {
            this.setMapPosition({
                bounds: nextProps.scenarioAnalysis.boundingBox.toArray()
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.selectedLayer !== this.state.selectedLayer ||
            prevState.selectedResultType !== this.state.selectedResultType ||
            prevState.selectedTotalTimeIndex !==
                this.state.selectedTotalTimeIndex ||
            prevProps.scenarioAnalysis !== this.props.scenarioAnalysis ||
            prevProps.scenarios !== this.props.scenarios
        ) {
            this.fetchCalculationResults();
        }
    }

    fetchCalculationResults = () => {
        const { scenarios, scenarioAnalysis, apiKey } = this.props;
        const {
            selectedLayer,
            selectedResultType,
            selectedTotalTimeIndex
        } = this.state;
        if (
            selectedLayer !== null &&
            selectedResultType &&
            selectedTotalTimeIndex !== null &&
            scenarioAnalysis &&
            scenarioAnalysis.totalTimes
        ) {
            const time =
                scenarioAnalysis.totalTimes.total_times[selectedTotalTimeIndex];
            ConfiguredAxios.all(
                Object.keys(scenarios)
                    .map(id => {
                        const scenario = scenarios[id];
                        if (scenario.selected) {
                            return ConfiguredAxios.get(
                                `/calculations/${scenario.calculationId}/results/types/${selectedResultType}/layers/${selectedLayer}/totims/${time}`,
                                {
                                    headers: {
                                        'X-AUTH-TOKEN': apiKey
                                    },
                                    params: {
                                        calculationId: scenario.calculationId
                                    }
                                }
                            );
                        }
                        return null;
                    })
                    .filter(r => r !== null)
            )
                .then(results => {
                    results.forEach(result => {
                        // TODO more caching
                        this.setState(prevState => ({
                            ...prevState,
                            calculations: {
                                ...prevState.calculations,
                                [result.config.params.calculationId]:
                                    result.data
                            }
                        }));
                    });
                })
                .catch(error => {
                    // eslint-disable-next-line no-console
                    console.error(error);
                    // TODO user friendly error handling
                });
        }
    };

    onLayerSelectChange = (layer, resultType) => {
        this.setState({
            selectedLayer: layer,
            selectedResultType: resultType
        });
    };

    onTotalTimesSliderChange = totalTimesIndex => {
        this.setState({
            selectedTotalTimeIndex: totalTimesIndex
        });
    };

    setMapPosition = mapPosition => {
        this.setState({
            mapPosition
        });
    };

    setActiveCoordinateHandler = coordinate => {
        this.setState({
            selectedCoordinate: coordinate
        });
    };

    renderMaps() {
        const { scenarios, scenarioAnalysis } = this.props;
        const {
            mapPosition,
            selectedCoordinate,
            selectedResultType,
            calculations
        } = this.state;
        if (scenarios.length <= 0 || !mapPosition) {
            return null;
        }

        const selectedScenarios = scenarios.filter(
            scenario => scenario.selected
        );

        let xCrossSection = null;
        if (selectedCoordinate) {
            const selectedGridCell = scenarioAnalysis.grid.coordinateToGridCell(
                selectedCoordinate
            );
            if (selectedGridCell) {
                xCrossSection = scenarioAnalysis.grid.gridCellToXCrossectionBoundingBox(
                    selectedGridCell
                );
            }
        }

        // search for global min and max value
        // TODO calculation inside the render method will cause unecessary rerendering
        let min = Infinity;
        let max = -Infinity;
        selectedScenarios.forEach(scenario => {
            const calculation = calculations[scenario.calculationId];
            if (calculation) {
                calculation.forEach(row => {
                    row.forEach(value => {
                        min = min > value ? value : min;
                        max = max < value ? value : max;
                    });
                });
            }
        });

        return (
            selectedScenarios
                // .sort((a, b) => (a.isBaseModel ? -1 : a.name.localeCompare(b.name)))
                .map(scenario => {
                    const mapData = new ScenarioAnalysisMapData({
                        area: scenarioAnalysis.area,
                        grid: scenarioAnalysis.grid,
                        type: selectedResultType,
                        boundaries: scenario.boundaries,
                        xCrossSection,
                        heatMapData:
                            calculations[scenario.calculationId] || null,
                        globalMin: min,
                        globalMax: max
                    });
                    return (
                        <section
                            key={scenario.id}
                            className="tile col col-min-2 stretch"
                        >
                            <h2>{scenario.name}</h2>
                            <ScenarioAnalysisMap
                                ref={map => {
                                    if (map) {
                                        map.invalidateMap();
                                    }
                                }}
                                mapData={mapData}
                                mapPosition={mapPosition}
                                setMapPosition={this.setMapPosition}
                                clickCoordinate={
                                    this.setActiveCoordinateHandler
                                }
                            />
                        </section>
                    );
                })
        );
    }

    render() {
        const {
            scenarioAnalysis,
            scenarios,
            cloneScenario,
            deleteScenario,
            toggleScenarioSelection
        } = this.props;
        const {
            selectedLayer,
            selectedResultType,
            selectedTotalTimeIndex,
            selectedCoordinate,
            calculations
        } = this.state;

        const results = scenarios
            .filter(scenario => scenario.selected)
            .map(scenario => {
                if (calculations.hasOwnProperty(scenario.calculationId)) {
                    return {
                        name: scenario.name,
                        data: calculations[scenario.calculationId]
                    };
                }
                return null;
            })
            .filter(result => result !== null);

        return (
            <div>
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
                <div className="grid-container">
                    {scenarioAnalysis.layerScheme && (
                        <div className="tile col col-abs-1 center-horizontal">
                            <LayerSelect
                                layerScheme={scenarioAnalysis.layerScheme}
                                onChange={this.onLayerSelectChange}
                                selectedLayer={selectedLayer}
                                selectedResultType={selectedResultType}
                            />
                        </div>
                    )}
                    {scenarioAnalysis.totalTimes && (
                        <div className="tile col stretch">
                            <TotalTimesSlider
                                totalTimes={scenarioAnalysis.totalTimes}
                                value={selectedTotalTimeIndex}
                                onChange={this.onTotalTimesSliderChange}
                            />
                        </div>
                    )}
                </div>
                <div className="grid-container">
                    <div className="scroll-vertical">{this.renderMaps()}</div>
                </div>
                <div className="tile">
                    <T03Component.HeadResultsChart
                        results={results}
                        activeCoordinate={selectedCoordinate}
                        grid={scenarioAnalysis.grid}
                        selectedType={selectedResultType}
                    />
                </div>
            </div>
        );
    }
}
