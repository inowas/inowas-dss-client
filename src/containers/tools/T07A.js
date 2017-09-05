import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Chart from 'react-c3js';
import { Formatter } from '../../core';

import ScenarioAnalysisMap from '../../components/modflow/ScenarioAnalysisMap';
import Accordion from '../../components/primitive/Accordion';
import AccordionItem from '../../components/primitive/AccordionItem';
import Header from '../../components/tools/Header';
import Icon from '../../components/primitive/Icon';
import ArraySlider from '../../components/primitive/ArraySlider';
import Navbar from '../Navbar';
import ScenarioSelect from '../../components/tools/ScenarioSelect';
import { withRouter } from 'react-router';
import { Modifier } from '../../t07';
import uuid from 'uuid';

import '../../less/4TileTool.less';
import '../../less/toolT07.less';

import {
    fetchDetails,
    updateResultsT07A,
    resizeDone,
    reloadDone,
    setSelectedLayer,
    setSelectedResultType,
    setSelectedTotalTimeIndex,
    toggleModelSelection,
    setMapPosition,
    setActiveCoordinate
} from '../../actions/T07';

import LayerNumber from '../../model/LayerNumber';
import ResultType from '../../model/ResultType';
import TotalTime from '../../model/TotalTime';
import ModflowModelResult from '../../model/ModflowModelResult';
import ScenarioAnalysisMapData from '../../model/ScenarioAnalysisMapData';

class T07A extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            navigation: [
                {
                    name: 'Cross section',
                    path: '/tools/T07A/' + props.params.id,
                    icon: <Icon name="layer_horizontal_hatched" />
                },
                {
                    name: 'Scenarios difference',
                    path: '/tools/T07B/' + props.params.id,
                    icon: <Icon name="layer_horizontal_hatched" />
                },
                {
                    name: 'Time series',
                    path: '/tools/T07C/' + props.params.id,
                    icon: <Icon name="layer_horizontal_hatched" />
                } /* , {
                    name: 'Overall budget',
                    path: 'tools/T07D/' + props.params.id,
                    icon: <Icon name="layer_horizontal_hatched"/>
                }*/
            ]
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchDetails(this.props.params.id));
    }

    componentWillReceiveProps(props) {
        if (props.tool.resize) {
            // manually emit a resize event so the leaflet maps recalculate their container size
            const event = document.createEvent('HTMLEvents');
            event.initEvent('resize', true, false);
            document.dispatchEvent(event);
            this.props.dispatch(resizeDone());
        }

        if (props.tool.reload) {
            if (
                this.props.tool.totalTimes &&
                this.props.tool.selectedLayerNumber &&
                this.props.tool.selectedResultType
            ) {
                this.updateModelResults(
                    this.props.tool.selectedResultType,
                    this.props.tool.selectedLayerNumber,
                    this.props.tool.selectedTotalTimeIndex
                );
                this.props.dispatch(reloadDone());
            }
        }
    }

    toggleSelection = id => {
        return e => {
            this.props.dispatch(toggleModelSelection(id));
            this.updateModelResults(
                this.props.tool.selectedResultType,
                this.props.tool.selectedLayerNumber,
                this.props.tool.selectedTotalTimeIndex
            );

            // manually emit a resize event so the leaflet maps recalculate their container size
            const event = document.createEvent('HTMLEvents');
            event.initEvent('resize', true, false);
            e.target.dispatchEvent(event);
        };
    };

    changeLayerValue = (layerNumber, resultType) => {
        this.props.dispatch(setSelectedLayer(layerNumber));
        this.props.dispatch(setSelectedResultType(resultType));
        this.updateModelResults(
            resultType,
            layerNumber,
            this.props.tool.selectedTotalTimeIndex
        );
    };

    updateModelResults(resultType, layerNumber, totalTimeIndex) {
        if (layerNumber instanceof LayerNumber === false) {
            console.error(
                'Cannot update ModelResults, due layerNumber is not from Type LayerNumber.'
            );
            return;
        }

        if (resultType instanceof ResultType === false) {
            console.error(
                'Cannot update ModelResults, due resultType is not from Type ResultType.'
            );
            return;
        }

        const totalTimes = this.props.tool.totalTimes.totalTimes;

        const totalTime =
            totalTimeIndex === null
                ? new TotalTime(totalTimes[totalTimes.length - 1])
                : new TotalTime(totalTimes[totalTimeIndex]);

        this.props.tool.models.forEach(m => {
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

            this.props.dispatch(
                updateResultsT07A(
                    m.calculationId,
                    resultType,
                    layerNumber,
                    totalTime
                )
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
        return (
            <select
                className="select block"
                onChange={this.selectLayer}
                value={
                    this.props.tool.selectedLayerNumber +
                    '_' +
                    this.props.tool.selectedResultType
                }
            >
                {this.renderSelectOptgroups(this.props.tool.layerValues)}
            </select>
        );
    }

    setMapPosition = mapPosition => {
        this.props.dispatch(setMapPosition(mapPosition));
    };

    setActiveCoordinateHandler = coordinate => {
        this.props.dispatch(setActiveCoordinate(coordinate));
    };

    renderMaps() {
        const { models, mapPosition, activeCoordinate } = this.props.tool;
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
            .map(model => {
                const mapData = new ScenarioAnalysisMapData({
                    area: model.area,
                    grid: model.grid,
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
                        <h2>
                            {model.name}
                        </h2>
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
            this.props.dispatch( Modifier.Command.createScenario(this.props.route.tool, this.props.params.id, id, uuid.v4() ) )
        }
    }

    deleteScenario() {
        return id => {
            this.props.dispatch( Modifier.Command.deleteScenario(this.props.route.tool, this.props.params.id, id) )
        }
    }

    renderChart() {
        const {
            activeCoordinate,
            models,
            selectedResultType
        } = this.props.tool;
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
        // this.props.dispatch(setSelectedTotalTime(new TotalTime( value )));
        this.props.dispatch(setSelectedTotalTimeIndex(index));
        this.updateModelResults(
            this.props.tool.selectedResultType,
            this.props.tool.selectedLayerNumber,
            this.props.tool.selectedTotalTimeIndex
        );
    };

    renderSlider() {
        if (!this.props.tool.totalTimes) {
            return null;
        }

        const startDate = new Date(this.props.tool.totalTimes.start);
        const totalTimes = this.props.tool.totalTimes.totalTimes.map(t => {
            return startDate.addDays(t);
        });

        let sliderValue = this.props.tool.selectedTotalTimeIndex;
        if (sliderValue === null) {
            sliderValue = totalTimes.length - 1;
        }

        return (
            <ArraySlider
                data={totalTimes}
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
        const models = this.props.tool.models;

        return (
            <div className="toolT07 app-width">
                <Navbar links={navigation} />
                <Header title={'T07. Scenario Analysis'} />
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
                    <div className="scroll-vertical">
                        {this.renderMaps()}
                    </div>
                </div>
                {this.renderChart()}
            </div>
        );
    }
}

T07A.propTypes = {
    tool: PropTypes.object
};

const mapStateToProps = (state, props) => {
    return {
        tool: state[props.route.tool],
    };
};

export default withRouter(
    connect(mapStateToProps)(T07A)
);
