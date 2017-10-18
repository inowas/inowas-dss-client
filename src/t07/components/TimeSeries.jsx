import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Accordion from '../../components/primitive/Accordion';
import AccordionItem from '../../components/primitive/AccordionItem';
import ScenarioSelect from './ScenarioSelect';
import LayerSelect from './LayerSelect';
import ConfiguredAxios from 'ConfiguredAxios';
import ScenarioAnalysisMapData from '../../model/ScenarioAnalysisMapData';
import ScenarioAnalysisMap from './ScenarioAnalysisMap';
import { isEqual, find } from 'lodash';
import { Formatter } from '../../core';
import TimeSeriesPoint from '../../model/TimeSeriesPoint';
import TimeSeriesGridCell from '../../model/TimeSeriesGridCell';
import TimeSeriesModel from '../../model/TimeSeries';
import ResultType from '../../model/ResultType';
import LayerNumber from '../../model/LayerNumber';
import TwoDData from '../../model/TwoDData';
import TimeSeriesResult from '../../model/TimeSeriesResult';
import Chart from 'react-c3js';
import TimeSeriesChart from './TimeSeriesChart';

class TimeSeries extends Component {

    state = {
        selectedLayer: null,
        selectedResultType: null,
        selectedCoordinate: null,
        mapPosition: null,
        timeSeriesPoints: [],
        calculations: {},
    };

    componentDidMount() {
        // init values for LayerSelection as soon as layerScheme is available
        const { scenarioAnalysis } = this.props;
        const { selectedLayer, selectedResultType, mapPosition } = this.state;
        if (
            !selectedLayer &&
            scenarioAnalysis &&
            scenarioAnalysis.layerScheme
        ) {
            // eslint-disable-next-line react/no-did-mount-set-state
            this.setState({
                selectedLayer: scenarioAnalysis.layerScheme.length - 1
            });
        }

        if (
            !selectedResultType &&
            scenarioAnalysis &&
            scenarioAnalysis.layerScheme
        ) {
            const layerScheme = scenarioAnalysis.layerScheme;
            // eslint-disable-next-line react/no-did-mount-set-state
            this.setState({
                selectedResultType: layerScheme[layerScheme.length - 1][0]
            });
        }
        if (
            !mapPosition &&
            this.props.scenarioAnalysis &&
            this.props.scenarioAnalysis.boundingBox
        ) {
            this.setMapPosition({
                bounds: this.props.scenarioAnalysis.boundingBox.toArray()
            });
        }
    }

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
        if (!isEqual( prevState, this.state )) {
            this.fetchCalculationResults();
        }
    }

    fetchCalculationResults = () => {
        const { scenarioModels, scenarioAnalysis, apiKey } = this.props;
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
            scenarioAnalysis.totalTimes &&
            scenarioModels !== null
        ) {
            const time = scenarioAnalysis.totalTimes.total_times[ selectedTotalTimeIndex ];

            if (time === undefined) {
                return null;
            }

            ConfiguredAxios.all(
                scenarioModels
                    .map(scenarioModel => {
                        if (scenarioModel.selected) {
                            return ConfiguredAxios.get(
                                `/calculations/${scenarioModel.calculationId}/results/types/${selectedResultType}/layers/${selectedLayer}/totims/${time}`,
                                {
                                    headers: {
                                        'X-AUTH-TOKEN': apiKey
                                    },
                                    params: {
                                        calculationId:
                                            scenarioModel.calculationId
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

    setMapPosition = mapPosition => {
        this.setState({
            mapPosition
        });
    };

    fetchTimeSeriesForPoint = (
        coordinate,
        modelId,
        gridCell,
    ) => {
        const { scenarioModels, apiKey, scenarioAnalysis } = this.props;
        const {
            selectedLayer,
            selectedResultType,
        } = this.state;
        const startDate = new Date(scenarioAnalysis.totalTimes.start_date_time);
        const model = find(scenarioModels, {id: modelId});

        ConfiguredAxios.get(
            `/calculations/${model.calculationId}/results/timeseries/types/${selectedResultType}/layers/${selectedLayer}/x/${gridCell.x}/y/${gridCell.y}`,
            {
                headers: {
                    'X-AUTH-TOKEN': apiKey
                },
            } )
            .then( result => {
                const data = [];
                Object.keys(result.data).map(key => {
                    data.push(new TwoDData(key, result.data[key]));
                });
                const timeSeries = new TimeSeriesModel(startDate, data);
                const timeSeriesResult = new TimeSeriesResult(
                    model.calculationId,
                    new ResultType(selectedResultType),
                    new LayerNumber(selectedLayer)
                );
                timeSeriesResult.timeSeries = timeSeries;
// TODO set state
                this.setState( prevState => {

                    const timeSeriesPoint = prevState.timeSeriesPoints.find( p => { return (p.coordinate.sameAs( coordinate )); } );

                    if (timeSeriesPoint
                        && !timeSeriesPoint.timeSeriesResults.find( r => {
                            return (
                                r.calculationId === model.calculationId
                                && r.resultType.sameAs( selectedResultType )
                                && r.layerNumber.sameAs( selectedLayer )
                            );
                        } )
                    ) {
                        timeSeriesPoint.addResult( timeSeriesResult );
                    }
                } );
            } )
            .catch( error => {
                // eslint-disable-next-line no-console
                console.error( error );
                // TODO user friendly error handling
            } );
    };

    fetchTimeSeriesForPoints = (
        timeSeriesPoints
    ) => {
        const {
            scenarioModels,
            scenarioAnalysis,
        } = this.props;

        timeSeriesPoints
            .filter(p => {
                return p.selected;
            })
            .forEach(p => {
                scenarioModels
                    .filter(m => {
                        return m.selected;
                    })
                    .forEach(m => {
                        const gridCell = scenarioAnalysis.grid.coordinateToGridCell(
                            p.coordinate
                        );
                        this.fetchTimeSeriesForPoint(
                            p.coordinate,
                            m.id,
                            gridCell
                        );
                    });
            });
    };

    addTimeSeriesPoint = (point) => {
        this.setState(prevState => ({
            ...prevState,
            timeSeriesPoints: [
                ...prevState.timeSeriesPoints,
                point
            ]
        }));
    };

    addPoint = coordinate => {
        const { scenarioAnalysis, scenarioModels } = this.props;
        const grid = scenarioAnalysis.grid;
        const gridCell = grid.coordinateToGridCell(coordinate);

        if (!gridCell) {
            return;
        }
        // eslint-disable-next-line no-shadow
        const { timeSeriesPoints, selectedResultType, selectedLayerNumber } = this.state;
        // add Point to store
        const point = new TimeSeriesPoint('Point ' + timeSeriesPoints.length);
        point.coordinate = coordinate;
        this.addTimeSeriesPoint(point);

        scenarioModels
            .filter(m => {
                return m.selected;
            })
            .forEach(m => {
                this.fetchTimeSeriesForPoint(
                    coordinate,
                    m.id,
                    gridCell
                );
            });
    };

    renderMap() {
        const { scenarioModels, scenarioAnalysis } = this.props;
        const { mapPosition, timeSeriesPoints } = this.state;

        if (scenarioModels.length <= 0) {
            return null;
        }

        // convert timeSeriesPoints to timeSeriesGridCells
        const timeSeriesGridCells = timeSeriesPoints.map(p => {
            const gridCell = scenarioAnalysis.grid.coordinateToGridCell(p.coordinate);
            const boundingBox = scenarioAnalysis.grid.gridCellToBoundingBox(gridCell);

            return new TimeSeriesGridCell({
                boundingBox,
                coordinate: p.coordinate,
                opacity: p.selected ? 0.9 : 0.2
            });
        });

        const mapData = new ScenarioAnalysisMapData({
            area: scenarioAnalysis.area,
            grid: scenarioAnalysis.grid,
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
            e.persist();
            this.setState(prevState => ({
                ...prevState,
                timeSeriesPoints: prevState.timeSeriesPoints.map((p, k) => {
                    if (k === index) {
                        p.selected =  e.target.checked;
                        return p;
                    }
                    return p;
                })
            }));
        };
    };

    renderTable() {
        const { timeSeriesPoints } = this.state;
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
        if (resultType === 'head') {
            return 'Groundwater Head [m]';
        }

        if (resultType === 'drawdown') {
            return 'Groundwater DrawDown [m]';
        }

        return null;
    };

    toggleScenarioSelection = id => () => {
        this.props.toggleScenarioSelection(id)();

        const {
            timeSeriesPoints,
        } = this.state;

        this.fetchTimeSeriesForPoints(timeSeriesPoints);
    };

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
        const {
            scenarioAnalysis,
            scenarioModels,
            cloneScenario,
            deleteScenario,
        } = this.props;

        const {
            selectedLayer,
            selectedResultType,
        } = this.state;

        if (!scenarioAnalysis || !scenarioModels) {
            return null;
        }

        const resultType = selectedResultType ? new ResultType(selectedResultType) : null;
        const layerNumber = new LayerNumber(selectedLayer);

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
                                    scenarioModels={scenarioModels}
                                    toggleSelection={this.toggleScenarioSelection}
                                    permissions={scenarioAnalysis.permissions}
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
                </div>
                <div className="grid-container">
                    <section className="tile col col-abs-3">
                        {this.renderMap()}
                    </section>
                    <section className="tile col col-abs-2">
                        {this.renderTable()}
                    </section>
                </div>
                <div className="tile">
                    <TimeSeriesChart scenarioAnalysis={scenarioAnalysis}
                                     scenarioModels={scenarioModels}
                                     resultType={resultType}
                                     layerNumber={layerNumber}
                                     timeSeriesPoints={this.state.timeSeriesPoints}
                                     labelXAxis={this.labelXAxis}
                    />
                </div>
            </div>
        );
    }
}

TimeSeries.propTypes = {
    scenarioAnalysis: PropTypes.object,
    scenarioModels: PropTypes.array,
    cloneScenario: PropTypes.func,
    deleteScenario: PropTypes.func,
    toggleScenarioSelection: PropTypes.func,
    apiKey: PropTypes.string
};

export default TimeSeries;
