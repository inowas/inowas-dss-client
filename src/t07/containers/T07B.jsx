// TODO Replace
import '../../less/4TileTool.less';
import '../../less/toolT07.less';

import React, { Component } from 'react';
import {
    fetchDetails,
    setActiveCoordinate,
    setMapPosition,
    setSelectedLayer,
    setSelectedModelIdsT07B,
    setSelectedResultType,
    setSelectedTotalTimeIndex,
    setupT07b,
    updateResultsT07B
} from '../../actions/T07';

import ArraySlider from '../../components/primitive/ArraySlider';
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
import TotalTime from '../../model/TotalTime';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router';

class T07B extends Component {
    static propTypes = {
        selectedResultType: PropTypes.string,
        selectedLayerNumber: PropTypes.number,
        totalTimes: PropTypes.object,
        t07bSelectedModelIds: PropTypes.array,
        params: PropTypes.object,
        selectedTotalTimeIndex: PropTypes.number,
        layerValues: PropTypes.object,
        models: PropTypes.object,
        t07bDifference: PropTypes.object,
        mapPosition: PropTypes.object,
        activeCoordinate: PropTypes.object,
        fetchDetails: PropTypes.func,
        setActiveCoordinate: PropTypes.func,
        setMapPosition: PropTypes.func,
        setSelectedLayer: PropTypes.func,
        setSelectedModelIdsT07B: PropTypes.func,
        setSelectedResultType: PropTypes.func,
        setSelectedTotalTimeIndex: PropTypes.func,
        setupT07b: PropTypes.func,
        updateResultsT07B: PropTypes.func,
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
        const { fetchDetails } = this.props;
        fetchDetails(this.props.params.id, dispatch => {
            dispatch(setupT07b());
        });
    }

    componentWillReceiveProps(nextProps) {
        const {
            selectedResultType,
            selectedLayerNumber,
            totalTimes,
            t07bSelectedModelIds
        } = this.props;

        const {
            selectedResultType: nextSelectedResultType,
            selectedLayerNumber: nextSelectedLayerNumber,
            totalTimes: nextTotalTimes,
            t07bSelectedModelIds: nextT07bSelectedModelIds
        } = nextProps;

        if (
            (!selectedResultType ||
                !selectedLayerNumber ||
                !totalTimes ||
                !t07bSelectedModelIds) &&
            nextSelectedResultType &&
            nextSelectedLayerNumber &&
            nextTotalTimes &&
            nextT07bSelectedModelIds
        ) {
            this.updateModelResults(
                nextT07bSelectedModelIds,
                nextSelectedResultType,
                nextSelectedLayerNumber,
                nextTotalTimes,
                null
            );
        }
    }

    updateModelResults(
        t07bSelectedModelIds,
        resultType,
        layerNumber,
        totalTimes,
        totalTimeIndex
    ) {
        // eslint-disable-next-line no-shadow
        const { updateResultsT07B } = this.props;
        if (t07bSelectedModelIds.length !== 2) {
            throw new Error(
                'Cannot update ModelResults, due to the number of t07bSelectedModelIds is not equal 2.'
            );
        }

        if (!(layerNumber instanceof LayerNumber)) {
            throw new Error(
                'Cannot update ModelResults, due layerNumber is not from Type LayerNumber.'
            );
        }

        if (resultType instanceof ResultType === false) {
            throw new Error(
                'Cannot update ModelResults, due resultType is not from Type ResultType.'
            );
        }

        const totalTime =
            totalTimeIndex === null
                ? new TotalTime(
                      totalTimes.totalTimes[totalTimes.totalTimes.length - 1]
                  )
                : new TotalTime(totalTimes.totalTimes[totalTimeIndex]);

        updateResultsT07B(
            t07bSelectedModelIds[0],
            t07bSelectedModelIds[1],
            resultType,
            layerNumber,
            totalTime
        );
    }

    changeLayerValue = (layerNumber, resultType) => {
        // eslint-disable-next-line no-shadow
        const { setSelectedLayer, setSelectedResultType } = this.props;
        setSelectedLayer(layerNumber);
        setSelectedResultType(resultType);

        const {
            t07bSelectedModelIds,
            totalTimes,
            selectedTotalTimeIndex
        } = this.props;

        this.updateModelResults(
            t07bSelectedModelIds,
            resultType,
            layerNumber,
            totalTimes,
            selectedTotalTimeIndex
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

    renderLayerSelect() {
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

    renderModelSelect(models) {
        return models.map(m => {
            return (
                <option key={m.modelId} value={m.modelId}>
                    {m.name}
                </option>
            );
        });
    }

    selectModel = (id, e) => {
        const {
            t07bSelectedModelIds,
            setSelectedModelIdsT07B, // eslint-disable-line no-shadow
            selectedResultType,
            selectedLayerNumber,
            totalTimes,
            selectedTotalTimeIndex
        } = this.props;
        t07bSelectedModelIds[id] = e.target.value;

        setSelectedModelIdsT07B(t07bSelectedModelIds);

        this.updateModelResults(
            t07bSelectedModelIds,
            selectedResultType,
            selectedLayerNumber,
            totalTimes,
            selectedTotalTimeIndex
        );
    };

    renderModelsSelect() {
        const { t07bSelectedModelIds, models } = this.props;
        if (t07bSelectedModelIds === null) {
            return null;
        }

        return (
            <div className="grid-container stretch">
                <div className="col stretch">
                    <select
                        className="select block"
                        onChange={this.selectModel}
                        value={t07bSelectedModelIds[0]}
                    >
                        {this.renderModelSelect(models.models)}
                    </select>
                </div>
                <div className="col center-horizontal">
                    <Icon className="col" name="minus" />
                </div>
                <div className="col stretch">
                    <select
                        className="select block"
                        onChange={this.selectModel.bind(this, 1)}
                        value={t07bSelectedModelIds[1]}
                    >
                        {this.renderModelSelect(models.models)}
                    </select>
                </div>
            </div>
        );
    }

    setMapPosition = mapPosition => {
        // eslint-disable-next-line no-shadow
        const { setMapPosition } = this.props;
        setMapPosition(mapPosition);
    };

    setActiveCoordinate = coordinate => {
        // eslint-disable-next-line no-shadow
        const { setActiveCoordinate } = this.props;
        setActiveCoordinate(coordinate);
    };

    renderMap() {
        const { t07bDifference, mapPosition, activeCoordinate } = this.props;

        if (!t07bDifference) {
            return null;
        }

        let xCrossSection = null;
        if (activeCoordinate) {
            const activeGridCell = t07bDifference.grid.coordinateToGridCell(
                activeCoordinate
            );
            if (activeGridCell) {
                xCrossSection = t07bDifference.grid.gridCellToXCrossectionBoundingBox(
                    activeGridCell
                );
            }
        }

        const mapData = new ScenarioAnalysisMapData({
            area: t07bDifference.area,
            grid: t07bDifference.grid,
            xCrossSection,
            heatMapData: t07bDifference.result
                ? t07bDifference.result.data
                : null
        });

        return (
            <section className="tile col stretch">
                <ScenarioAnalysisMap
                    mapData={mapData}
                    mapPosition={mapPosition}
                    setMapPosition={this.setMapPosition}
                    clickCoordinate={this.setActiveCoordinate}
                />
            </section>
        );
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

    renderChart() {
        const {
            activeCoordinate,
            t07bDifference,
            selectedResultType
        } = this.props;

        if (!t07bDifference || !activeCoordinate) {
            return null;
        }

        if (!t07bDifference.hasResult()) {
            return null;
        }

        const activeGridCell = t07bDifference.grid.coordinateToGridCell(
            activeCoordinate
        );

        if (!activeGridCell) {
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

        const chartData = {
            x: 'x',
            columns: [
                t07bDifference.columnXAxis(),
                t07bDifference.chartDataByRowNumber(rowNumber)
            ]
        };

        const grid = {
            x: {
                show: true,
                lines: [
                    {
                        value: t07bDifference.chartLeftBorderByRowNumber(
                            rowNumber
                        ),
                        text: 'Eastern model border',
                        position: 'middle'
                    },
                    {
                        value: t07bDifference.chartRightBorderByRowNumber(
                            rowNumber
                        ),
                        text: 'Western model border',
                        position: 'middle'
                    },
                    {
                        value: t07bDifference.coordinateByGridCell(
                            colNumber,
                            rowNumber
                        ).x,
                        text: 'Selected column',
                        position: 'middle'
                    }
                ]
            }
        };

        const axis = {
            x: {
                label: this.labelXAxis()
            },
            y: {
                label: this.labelYAxis(selectedResultType)
            }
        };

        return (
            <div className="grid-container">
                <section className="tile col stretch">
                    <Chart
                        data={chartData}
                        grid={grid}
                        axis={axis}
                        element="testchart"
                    />
                </section>
            </div>
        );
    }

    changeTotalTimeIndex = index => {
        const {
            t07bSelectedModelIds,
            selectedResultType,
            selectedLayerNumber,
            totalTimes,
            selectedTotalTimeIndex,
            setSelectedTotalTimeIndex // eslint-disable-line no-shadow
        } = this.props;
        setSelectedTotalTimeIndex(index);

        this.updateModelResults(
            t07bSelectedModelIds,
            selectedResultType,
            selectedLayerNumber,
            totalTimes,
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
            sliderValue = totalTimes.length - 1;
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

        return (
            <div className="toolT07 app-width">
                <Navbar links={navigation} />
                <Header title={'T07. Scenario Analysis'} />
                <div className="grid-container">
                    <div className="tile col col-abs-1 center-horizontal">
                        {this.renderLayerSelect()}
                    </div>
                    <div className="tile col col-abs-4t07bDifference,
            mapPosition,
            activeCoordinate center-horizontal">
                        {this.renderModelsSelect()}
                    </div>
                </div>
                <div className="grid-container">{this.renderMap()}</div>
                <div className="grid-container">
                    <div className="tile col stretch">
                        {this.renderSlider()}
                    </div>
                </div>
                {this.renderChart()}
            </div>
        );
    }
}

const mapStateToProps = (state, { params, route }) => {
    return {
        selectedResultType: state.T07.selectedResultType,
        selectedLayerNumber: state.T07.selectedLayerNumber,
        totalTimes: state.T07.totalTimes,
        t07bSelectedModelIds: state.T07.t07bSelectedModelIds,
        selectedTotalTimeIndex: state.T07.selectedTotalTimeIndex,
        layerValues: state.T07.layerValues,
        models: state.T07.models,
        t07bDifference: state.T07.t07bDifference,
        mapPosition: state.T07.mapPosition,
        activeCoordinate: state.T07.activeCoordinate,
        params,
        route
    };
};

export default withRouter(
    connect(mapStateToProps, {
        fetchDetails,
        setActiveCoordinate,
        setMapPosition,
        setSelectedLayer,
        setSelectedModelIdsT07B,
        setSelectedResultType,
        setSelectedTotalTimeIndex,
        setupT07b,
        updateResultsT07B,
        push
    })(T07B)
);
