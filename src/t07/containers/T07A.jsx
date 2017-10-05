import '../../less/toolT07.less';

import {
    fetchDetails,
    reloadDone,
    resizeDone,
    setActiveCoordinate,
    setMapPosition,
    setSelectedLayer,
    setSelectedResultType,
    setSelectedTotalTimeIndex,
    toggleModelSelection,
    updateResultsT07A
} from '../../actions/T07';

import Accordion from '../../components/primitive/Accordion';
import AccordionItem from '../../components/primitive/AccordionItem';
import ArraySlider from '../../components/primitive/ArraySlider';
import Chart from 'react-c3js';
import { Command, Routing } from '../actions';
import ConfiguredRadium from 'ConfiguredRadium';
import { Formatter } from '../../core';
import Icon from '../../components/primitive/Icon';
import LayerNumber from '../../model/LayerNumber';
import ModflowModelResult from '../../model/ModflowModelResult';
import Navbar from '../../containers/Navbar';
import PropTypes from 'prop-types';
import React from 'react';
import ResultType from '../../model/ResultType';
import ScenarioAnalysisMap from '../../components/modflow/ScenarioAnalysisMap';
import ScenarioAnalysisMapData from '../../model/ScenarioAnalysisMapData';
import ScenarioSelect from '../../components/tools/ScenarioSelect';
import TotalTime from '../../model/TotalTime';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import styleGlobals from 'styleGlobals';
import uuid from 'uuid';
import { withRouter } from 'react-router';

const styles = {
    heading: {
        borderBottom: '1px solid ' + styleGlobals.colors.graySemilight,
        fontWeight: 300,
        fontSize: 16,
        textAlign: 'left',
        paddingBottom: 10
    }
};

@ConfiguredRadium
class T07A extends React.Component {
    static propTypes = {
        totalTimes: PropTypes.object,
        selectedLayerNumber: PropTypes.number,
        selectedResultType: PropTypes.string,
        selectedTotalTimeIndex: PropTypes.number,
        models: PropTypes.array,
        scenarioAnalysis: PropTypes.object,
        layerValues: PropTypes.array,
        mapPosition: PropTypes.object,
        activeCoordinate: PropTypes.object,
        resize: PropTypes.bool,
        reload: PropTypes.bool,
        route: PropTypes.object,
        params: PropTypes.object,
        fetchDetails: PropTypes.func,
        updateResultsT07A: PropTypes.func,
        resizeDone: PropTypes.func,
        reloadDone: PropTypes.func,
        setSelectedLayer: PropTypes.func,
        setSelectedResultType: PropTypes.func,
        setSelectedTotalTimeIndex: PropTypes.func,
        toggleModelSelection: PropTypes.func,
        setMapPosition: PropTypes.func,
        setActiveCoordinate: PropTypes.func,
        createScenario: PropTypes.func,
        deleteScenario: PropTypes.func,
        push: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            navigation: [
                {
                    name: 'Cross section',
                    path: '/tools/T07A/' + props.params.id,
                    icon: <Icon name="layer_horizontal_hatched" />
                    // },
                    // {
                    //     name: 'Scenarios difference',
                    //     path: '/tools/T07B/' + props.params.id,
                    //     icon: <Icon name="layer_horizontal_hatched" />
                    // },
                    // {
                    //     name: 'Time series',
                    //     path: '/tools/T07C/' + props.params.id,
                    //     icon: <Icon name="layer_horizontal_hatched" />
                } /* , {
                    name: 'Overall budget',
                    path: 'tools/T07D/' + props.params.id,
                    icon: <Icon name="layer_horizontal_hatched"/>
                }*/
            ]
        };
    }

    componentWillMount() {
        // eslint-disable-next-line no-shadow
        const { params, fetchDetails } = this.props;
        fetchDetails(params.id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.resize) {
            // manually emit a resize event so the leaflet maps recalculate their container size
            const event = document.createEvent('HTMLEvents');
            event.initEvent('resize', true, false);
            document.dispatchEvent(event);
            resizeDone();
        }

        if (nextProps.reload) {
            const {
                totalTimes,
                selectedLayerNumber,
                selectedResultType,
                selectedTotalTimeIndex,
                reloadDone // eslint-disable-line no-shadow
            } = this.props;

            if (totalTimes && selectedLayerNumber && selectedResultType) {
                this.updateModelResults(
                    selectedResultType,
                    selectedLayerNumber,
                    selectedTotalTimeIndex
                );
                reloadDone();
            }
        }
    }

    toggleSelection = id => {
        return e => {
            const {
                toggleModelSelection, // eslint-disable-line no-shadow
                selectedResultType,
                selectedLayerNumber,
                selectedTotalTimeIndex
            } = this.props;
            toggleModelSelection(id);
            this.updateModelResults(
                selectedResultType,
                selectedLayerNumber,
                selectedTotalTimeIndex
            );

            // manually emit a resize event so the leaflet maps recalculate their container size
            const event = document.createEvent('HTMLEvents');
            event.initEvent('resize', true, false);
            e.target.dispatchEvent(event);
        };
    };

    changeLayerValue = (layerNumber, resultType) => {
        const {
            setSelectedLayer, // eslint-disable-line no-shadow
            setSelectedResultType, // eslint-disable-line no-shadow
            selectedTotalTimeIndex
        } = this.props;
        setSelectedLayer(layerNumber);
        setSelectedResultType(resultType);
        this.updateModelResults(
            resultType,
            layerNumber,
            selectedTotalTimeIndex
        );
    };

    updateModelResults(resultType, layerNumber, totalTimeIndex) {
        if (layerNumber instanceof LayerNumber === false) {
            throw new Error(
                'Cannot update ModelResults, due layerNumber is not from Type LayerNumber.'
            );
        }

        if (resultType instanceof ResultType === false) {
            throw new Error(
                'Cannot update ModelResults, due resultType is not from Type ResultType.'
            );
        }

        // eslint-disable-next-line no-shadow
        const { totalTimes, models, updateResultsT07A } = this.props;

        const totalTime =
            totalTimeIndex === null
                ? new TotalTime(
                      totalTimes.totalTimes[totalTimes.totalTimes.length - 1]
                  )
                : new TotalTime(totalTimes.totalTimes[totalTimeIndex]);

        models.forEach(m => {
            if (m.isSelected() === false) {
                return;
            }

            if (m.result instanceof ModflowModelResult) {
                if (
                    m.result.resultType().sameAs(resultType) &&
                    m.result.layerNumber().sameAs(layerNumber) &&
                    m.result.totalTime().sameAs(totalTime)
                ) {
                    return;
                }
            }

            updateResultsT07A(
                m.calculationId,
                resultType,
                layerNumber,
                totalTime
            );
        });
    }

    selectLayer = e => {
        const valueSplitted = e.target.value.split('_');
        this.changeLayerValue(
            new LayerNumber(valueSplitted[0]),
            new ResultType(valueSplitted[1])
        );
    };

    renderSelectOptions(options, optionIndex) {
        return options.map((o, index) => {
            return (
                <option key={index} value={optionIndex + '_' + o}>
                    {'Layer ' + optionIndex + ' ' + o}
                </option>
            );
        });
    }

    renderSelectOptgroups(layerValues) {
        if (layerValues !== null) {
            return layerValues.map((l, index) => {
                return (
                    <optgroup key={index} label={'Layer ' + index}>
                        {this.renderSelectOptions(l, index)}
                    </optgroup>
                );
            });
        }
        return null;
    }

    renderSelect() {
        const {
            selectedLayerNumber,
            selectedResultType,
            layerValues
        } = this.props;
        return (
            <select
                className="select block"
                onChange={this.selectLayer}
                value={selectedLayerNumber + '_' + selectedResultType}
            >
                {this.renderSelectOptgroups(layerValues)}
            </select>
        );
    }

    setMapPosition = mapPosition => {
        // eslint-disable-next-line no-shadow
        const { setMapPosition } = this.props;
        setMapPosition(mapPosition);
    };

    setActiveCoordinateHandler = coordinate => {
        // eslint-disable-next-line no-shadow
        const { setActiveCoordinate } = this.props;
        setActiveCoordinate(coordinate);
    };

    renderMaps() {
        const {
            models,
            mapPosition,
            activeCoordinate,
            selectedResultType
        } = this.props;
        if (models.length <= 0) {
            return null;
        }

        let xCrossSection = null;
        if (activeCoordinate) {
            const activeGridCell = models.baseModel.grid.coordinateToGridCell(
                activeCoordinate
            );
            if (activeGridCell) {
                xCrossSection = models.baseModel.grid.gridCellToXCrossectionBoundingBox(
                    activeGridCell
                );
            }
        }

        const min = models.globalMinValue();
        const max = models.globalMaxValue();

        return models
            .filter(model => {
                return model.selected;
            })
            .sort((a, b) => (a.isBaseModel ? -1 : a.name.localeCompare(b.name)))
            .map(model => {
                const mapData = new ScenarioAnalysisMapData({
                    area: model.area,
                    grid: model.grid,
                    type: selectedResultType ? selectedResultType.type : null,
                    boundaries: model.boundaries,
                    xCrossSection,
                    heatMapData: model.result ? model.result.data : null,
                    globalMin: min,
                    globalMax: max
                });
                return (
                    <section
                        key={model.modelId}
                        className="tile col col-min-2 stretch"
                    >
                        <h2>{model.name}</h2>
                        <ScenarioAnalysisMap
                            mapData={mapData}
                            mapPosition={mapPosition}
                            setMapPosition={this.setMapPosition}
                            clickCoordinate={this.setActiveCoordinateHandler}
                        />
                    </section>
                );
            });
    }

    labelYAxis = resultType => {
        if (resultType.toString() === 'head') {
            return 'Groundwater Head [m]';
        }

        if (resultType.toString() === 'drawdown') {
            return 'Groundwater DrawDown [m]';
        }

        return '';
    };

    labelXAxis = () => {
        return 'Longitude';
    };

    cloneScenario() {
        return id => {
            const { createScenario, route, params } = this.props;
            createScenario(route.tool, params.id, id, uuid.v4());
        };
    }

    deleteScenario() {
        return id => {
            const { deleteScenario, route, params } = this.props;
            deleteScenario(route.tool, params.id, id);
        };
    }

    renderChart() {
        const { activeCoordinate, models, selectedResultType } = this.props;
        if (models.length <= 0 || !activeCoordinate) {
            return null;
        }

        const activeGridCell = models.baseModel.grid.coordinateToGridCell(
            activeCoordinate
        );

        if (!activeGridCell) {
            return null;
        }

        if (models.countModelsWithResults() === 0) {
            return null;
        }

        const rowNumber = activeGridCell.y;
        if (rowNumber === null) {
            return null;
        }

        const colNumber = activeGridCell.x;
        if (colNumber === null) {
            return null;
        }

        const columns = [];
        models.models.forEach(m => {
            if (m.isSelected() && m.hasResult()) {
                columns.push(m.chartDataByRowNumber(rowNumber));
            }
        });

        const chartData = {
            columns: columns
        };

        let grid = {};
        let axis = {};

        const baseModel = models.baseModel;
        if (baseModel.hasResult()) {
            chartData.x = 'x';
            columns.unshift(baseModel.columnXAxis());
            grid = {
                x: {
                    show: true,
                    lines: [
                        {
                            value: baseModel.chartLeftBorderByRowNumber(
                                rowNumber
                            ),
                            text: 'Eastern model border',
                            position: 'middle'
                        },
                        {
                            value: baseModel.chartRightBorderByRowNumber(
                                rowNumber
                            ),
                            text: 'Western model border',
                            position: 'middle'
                        },
                        {
                            value: activeCoordinate.lng,
                            text: 'Selected column',
                            position: 'middle'
                        }
                    ]
                }
            };

            axis = {
                x: {
                    label: this.labelXAxis()
                },
                y: {
                    label: this.labelYAxis(selectedResultType)
                }
            };
        }

        return (
            <div className="grid-container">
                <section className="tile col stretch">
                    <Chart
                        data={chartData}
                        grid={grid}
                        axis={axis}
                        transition={{ duration: 0 }}
                        element="testchart"
                    />
                </section>
            </div>
        );
    }

    changeTotalTimeIndex = index => {
        const {
            setSelectedTotalTimeIndex, // eslint-disable-line no-shadow
            selectedResultType,
            selectedLayerNumber,
            selectedTotalTimeIndex
        } = this.props;
        setSelectedTotalTimeIndex(index);
        this.updateModelResults(
            selectedResultType,
            selectedLayerNumber,
            selectedTotalTimeIndex
        );
    };

    renderSlider() {
        const { totalTimes, selectedTotalTimeIndex } = this.props;
        if (!totalTimes) {
            return null;
        }

        const startDate = new Date(totalTimes.start);
        const totalTimesDates = totalTimes.totalTimes.map(t => {
            return startDate.addDays(t);
        });

        let sliderValue = selectedTotalTimeIndex;
        if (sliderValue === null) {
            sliderValue = totalTimesDates.length - 1;
        }

        return (
            <ArraySlider
                data={totalTimesDates}
                value={sliderValue}
                onChange={this.changeTotalTimeIndex}
                formatter={function(value) {
                    return Formatter.dateToDate(value);
                }}
            />
        );
    }

    render() {
        const { navigation } = this.state;
        const { id } = this.props.params;
        // eslint-disable-next-line no-shadow
        const { models, scenarioAnalysis, push } = this.props;

        return (
            <div className="toolT07 app-width">
                <Navbar links={navigation} />
                <h3 style={[styles.heading]}>
                    T07. Scenario Analysis - {scenarioAnalysis.name} |{' '}
                    <a
                        href="#"
                        onClick={() =>
                            push(
                                Routing.editScenarioAnalysisGeneralUrl(
                                    scenarioAnalysis.id
                                )
                            )}
                    >
                        Edit
                    </a>
                </h3>
                <div className="grid-container">
                    <div className="tile col stretch">
                        <Accordion firstActive={null}>
                            <AccordionItem heading="Description">
                                <p>
                                    <pre>{scenarioAnalysis.description}</pre>
                                </p>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                <div className="grid-container">
                    <div className="tile col stretch">
                        <Accordion firstActive={0}>
                            <AccordionItem heading="Scenarios">
                                <ScenarioSelect
                                    said={id}
                                    clone={this.cloneScenario()}
                                    deleteScenario={this.deleteScenario()}
                                    scenarios={models}
                                    toggleSelection={this.toggleSelection}
                                />
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
                <div className="grid-container">
                    <div className="tile col col-abs-1 center-horizontal">
                        {this.renderSelect()}
                    </div>
                    <div className="tile col stretch">
                        {this.renderSlider()}
                    </div>
                </div>
                <div className="grid-container">
                    <div className="scroll-vertical">{this.renderMaps()}</div>
                </div>
                {this.renderChart()}
            </div>
        );
    }
}

const mapStateToProps = (state, { params, route }) => {
    return {
        // tool: state.T07
        selectedLayerNumber: state.T07.selectedLayerNumber,
        totalTimes: state.T07.totalTimes,
        selectedResultType: state.T07.selectedResultType,
        selectedTotalTimeIndex: state.T07.selectedTotalTimeIndex,
        models: state.T07.models,
        scenarioAnalysis: state.T07.scenarioAnalysis,
        layerValues: state.T07.layerValues,
        mapPosition: state.T07.mapPosition,
        activeCoordinate: state.T07.activeCoordinate,
        resize: state.T07.resize,
        reload: state.T07.reload,
        params,
        route
    };
};

export default withRouter(
    connect(mapStateToProps, {
        fetchDetails,
        updateResultsT07A,
        resizeDone,
        reloadDone,
        setSelectedLayer,
        setSelectedResultType,
        setSelectedTotalTimeIndex,
        toggleModelSelection,
        setMapPosition,
        setActiveCoordinate,
        createScenario: Command.createScenario,
        deleteScenario: Command.deleteScenario,
        push
    })(T07A)
);
