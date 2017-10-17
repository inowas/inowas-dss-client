import '../../less/4TileTool.less';
import '../../less/toolT07.less';

import React, { Component } from 'react';
import {
    addTimeSeriesPoint,
    fetchDetails,
    fetchTimeSeries,
    setMapPosition,
    setSelectedLayer,
    setSelectedResultType,
    setSelectedTotalTimeIndex,
    setTimeSeriesPointSelection,
    toggleModelSelection
} from '../../actions/T07';

import Accordion from '../../components/primitive/Accordion';
import AccordionItem from '../../components/primitive/AccordionItem';
import Chart from 'react-c3js';
import { Formatter } from '../../core';
import Header from '../../components/tools/Header';
import Icon from '../../components/primitive/Icon';
import LayerNumber from '../../model/LayerNumber';
import Navbar from '../../containers/Navbar';
import PropTypes from 'prop-types';
import ResultType from '../../model/ResultType';
import ScenarioAnalysisMap from '../../components/modflow/ScenarioAnalysisMap';
import ScenarioAnalysisMapData from '../../model/ScenarioAnalysisMapData';
import ScenarioSelect from '../../components/tools/ScenarioSelect';
import TimeSeriesGridCell from '../../model/TimeSeriesGridCell';
import TimeSeriesPoint from '../../model/TimeSeriesPoint';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';

class T07C extends Component {
    static propTypes = {
        params: PropTypes.object,
        models: PropTypes.object,
        selectedResultType: PropTypes.string,
        selectedLayerNumber: PropTypes.number,
        timeSeriesPoints: PropTypes.array,
        totalTimes: PropTypes.object,
        layerValues: PropTypes.object,
        mapPosition: PropTypes.object,
        selectedTotalTimeIndex: PropTypes.number,
        addTimeSeriesPoint: PropTypes.func,
        fetchDetails: PropTypes.func,
        fetchTimeSeries: PropTypes.func,
        setMapPosition: PropTypes.func,
        setSelectedLayer: PropTypes.func,
        setSelectedResultType: PropTypes.func,
        setSelectedTotalTimeIndex: PropTypes.func,
        setTimeSeriesPointSelection: PropTypes.func,
        toggleModelSelection: PropTypes.func,
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
                }
                // {
                //     name: 'Overall budget',
                //     path: 'tools/T07D/' + props.params.id,
                //     icon: <Icon name="layer_horizontal_hatched"/>
                // }
            ]
        };
    }

    componentWillMount() {
        // eslint-disable-next-line no-shadow
        const { fetchDetails, params } = this.props;
        fetchDetails(params.id);
    }

    fetchTimeSeriesForPoint(
        coordinate,
        modelId,
        resultType,
        layerNumber,
        gridCell,
        startDate
    ) {
        // eslint-disable-next-line no-shadow
        const { fetchTimeSeries } = this.props;
        fetchTimeSeries(
            coordinate,
            modelId,
            resultType,
            layerNumber,
            gridCell.x,
            gridCell.y,
            startDate
        );
    }

    fetchTimeSeriesForPoints(
        models,
        resultType,
        layerNumber,
        timeSeriesPoints,
        startDate
    ) {
        timeSeriesPoints
            .filter(p => {
                return p.selected;
            })
            .forEach(p => {
                models
                    .filter(m => {
                        return m.selected;
                    })
                    .forEach(m => {
                        const gridCell = m.grid.coordinateToGridCell(
                            p.coordinate
                        );
                        this.fetchTimeSeriesForPoint(
                            p.coordinate,
                            m.modelId,
                            resultType,
                            layerNumber,
                            gridCell,
                            startDate
                        );
                    });
            });
    }

    toggleScenarioSelection = id => {
        return () => {
            // eslint-disable-next-line no-shadow
            const { toggleModelSelection } = this.props;
            toggleModelSelection(id);

            // update results
            const {
                models,
                selectedResultType,
                selectedLayerNumber,
                timeSeriesPoints,
                totalTimes
            } = this.props;
            this.fetchTimeSeriesForPoints(
                models,
                selectedResultType,
                selectedLayerNumber,
                timeSeriesPoints,
                new Date(totalTimes.start)
            );
        };
    };

    changeLayerValue = (layerNumber, resultType) => {
        const {
            setSelectedLayer, // eslint-disable-line no-shadow
            setSelectedResultType, // eslint-disable-line no-shadow
            models,
            timeSeriesPoints,
            totalTimes
        } = this.props;
        setSelectedLayer(layerNumber);
        setSelectedResultType(resultType);

        // update results
        this.fetchTimeSeriesForPoints(
            models,
            resultType,
            layerNumber,
            timeSeriesPoints,
            new Date(totalTimes.start)
        );
    };

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
                className="layer-select select block"
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

    addPoint = coordinate => {
        const { models } = this.props;
        const grid = models.baseModel.grid;
        const gridCell = grid.coordinateToGridCell(coordinate);

        if (!gridCell) {
            return;
        }
        // eslint-disable-next-line no-shadow
        const { timeSeriesPoints, addTimeSeriesPoint } = this.props;
        // add Point to store
        const point = new TimeSeriesPoint('Point ' + timeSeriesPoints.length);
        point.coordinate = coordinate;
        addTimeSeriesPoint(point);

        // fetch data for this point
        const {
            selectedResultType,
            selectedLayerNumber,
            totalTimes
        } = this.props;
        models
            .filter(m => {
                return m.selected;
            })
            .forEach(m => {
                this.fetchTimeSeriesForPoint(
                    coordinate,
                    m.modelId,
                    selectedResultType,
                    selectedLayerNumber,
                    gridCell,
                    new Date(totalTimes.start)
                );
            });
    };

    renderMap() {
        const { models, mapPosition, timeSeriesPoints } = this.props;

        if (models.length <= 0) {
            return null;
        }

        const model = models.baseModel;

        // convert timeSeriesPoints to timeSeriesGridCells
        const timeSeriesGridCells = timeSeriesPoints.map(p => {
            const gridCell = model.grid.coordinateToGridCell(p.coordinate);
            const boundingBox = model.grid.gridCellToBoundingBox(gridCell);

            return new TimeSeriesGridCell({
                boundingBox,
                coordinate: p.coordinate,
                opacity: p.selected ? 0.9 : 0.2
            });
        });

        const mapData = new ScenarioAnalysisMapData({
            area: model.area,
            grid: model.grid,
            timeSeriesGridCells
        });
        return (
            <ScenarioAnalysisMap
                mapData={mapData}
                mapPosition={mapPosition}
                setMapPosition={this.setMapPosition}
                clickCoordinate={this.addPoint}
            />
        );
    }

    setTimeSeriesPointSelection = index => {
        return e => {
            // eslint-disable-next-line no-shadow
            const { setTimeSeriesPointSelection } = this.props;
            setTimeSeriesPointSelection(index, e.target.checked);
        };
    };

    renderTable() {
        const { timeSeriesPoints } = this.props;
        return (
            <div
                style={{
                    maxHeight: 300,
                    overflow: 'auto'
                }}
            >
                <table className="table">
                    <thead>
                        <tr>
                            <th>Active</th>
                            <th>Point</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timeSeriesPoints.map((p, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <input
                                            onChange={this.setTimeSeriesPointSelection(
                                                index
                                            )}
                                            checked={p.selected}
                                            type="checkbox"
                                        />
                                    </td>
                                    <td>{p.name}</td>
                                    <td>{p.coordinate.lat}</td>
                                    <td>{p.coordinate.lng}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

    labelXAxis = resultType => {
        if (resultType.toString() === 'head') {
            return 'Groundwater Head [m]';
        }

        if (resultType.toString() === 'drawdown') {
            return 'Groundwater DrawDown [m]';
        }

        return null;
    };

    renderChart() {
        const {
            models,
            totalTimes,
            timeSeriesPoints,
            selectedResultType,
            selectedLayerNumber
        } = this.props;

        if (!models || !totalTimes) {
            return null;
        }

        const chartData = {
            x: 'x',
            columns: []
        };

        const xAxisColumn = ['x'];
        const startDate = new Date(totalTimes.start);

        totalTimes.totalTimes.forEach(t => {
            xAxisColumn.push(startDate.addDays(t));
        });

        chartData.columns.push(xAxisColumn);

        timeSeriesPoints
            .filter(p => {
                return p.selected;
            })
            .forEach(p => {
                models
                    .filter(m => {
                        return m.selected;
                    })
                    .forEach(m => {
                        const result = p.timeSeriesResults.find(r => {
                            return (
                                m.modelId === r.modelId &&
                                selectedResultType.sameAs(r.resultType) &&
                                selectedLayerNumber.sameAs(r.layerNumber)
                            );
                        });
                        if (result && result.timeSeries) {
                            const resultColumn = [p.name + ' ' + m.name];
                            chartData.columns.push(
                                resultColumn.concat(result.timeSeries.values)
                            );
                        }
                    });
            });

        const axis = {
            x: {
                type: 'timeseries',
                tick: {
                    format: function(x) {
                        return Formatter.dateToDate(x);
                    }
                },
                label: 'Date'
            },
            y: {
                label: this.labelXAxis(selectedResultType)
            }
        };

        const grid = {
            x: {
                show: true
            }
        };

        return (
            <div className="grid-container">
                <section className="tile col stretch">
                    <Chart
                        data={chartData}
                        grid={grid}
                        axis={axis}
                        transition={{
                            duration: 0
                        }}
                        element="testchart"
                    />
                </section>
            </div>
        );
    }

    changeTotalTimeIndex = index => {
        this.props.setSelectedTotalTimeIndex(index);

        const {
            selectedResultType,
            selectedLayerNumber,
            selectedTotalTimeIndex
        } = this.props;
        this.updateModelResults(
            selectedResultType,
            selectedLayerNumber,
            selectedTotalTimeIndex
        );
    };

    render() {
        const { navigation } = this.state;
        const { models } = this.props;

        return (
            <div className="toolT07 app-width">
                <Navbar links={navigation} />
                <Header title={'T07. Scenario Analysis'} />
                <div className="grid-container">
                    <div className="tile col stretch">
                        <Accordion firstActive={0}>
                            <AccordionItem heading="Scenarios">
                                <ScenarioSelect
                                    scenarios={models}
                                    toggleSelection={
                                        this.toggleScenarioSelection
                                    }
                                />
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
                <div className="grid-container">
                    <div className="tile col col-abs-1 center-horizontal">
                        {this.renderSelect()}
                    </div>
                </div>
                <div className="grid-container">
                    <section className="tile col col-abs-3">
                        {this.renderMap()}
                    </section>
                    <section className="tile col col-abs-2">
                        {this.renderTable()}
                    </section>
                </div>
                {this.renderChart()}
            </div>
        );
    }
}

const mapStateToProps = (state, { params, route }) => {
    return {
        models: state.T07.models,
        selectedResultType: state.T07.selectedResultType,
        selectedLayerNumber: state.T07.selectedLayerNumber,
        timeSeriesPoints: state.T07.timeSeriesPoints,
        totalTimes: state.T07.totalTimes,
        layerValues: state.T07.layerValues,
        mapPosition: state.T07.mapPosition,
        selectedTotalTimeIndex: state.T07.selectedTotalTimeIndex,
        params,
        route
    };
};

export default withRouter(
    connect(mapStateToProps, {
        addTimeSeriesPoint,
        fetchDetails,
        fetchTimeSeries,
        setMapPosition,
        setSelectedLayer,
        setSelectedResultType,
        setSelectedTotalTimeIndex,
        setTimeSeriesPointSelection,
        toggleModelSelection,
        push
    })(T07C)
);
