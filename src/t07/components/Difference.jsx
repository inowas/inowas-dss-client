import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LayerSelect from './LayerSelect';
import TotalTimesSlider from './TotalTimesSlider';
import ConfiguredAxios from 'ConfiguredAxios';
import ScenarioAnalysisMapData from '../../model/ScenarioAnalysisMapData';
import ScenarioAnalysisMap from './ScenarioAnalysisMap';
import { Component as T03Component } from '../../t03';
import { isEqual, find, pick } from 'lodash';
import SelectModel from './SelectModel';
import Icon from '../../components/primitive/Icon';

class Difference extends Component {
    state = {
        selectedLayer: null,
        selectedResultType: null,
        selectedCoordinate: null,
        mapPosition: null,
        selectedTotalTimeIndex: 0,
        modelLeft: null,
        modelRight: null,
        heatMapData: null,
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
        if (!isEqual(
                pick(prevState, ['selectedLayer', 'selectedResultType', 'selectedCoordinate', 'selectedTotalTimeIndex', 'modelLeft', 'modelRight', ]),
                pick(this.state, ['selectedLayer', 'selectedResultType', 'selectedCoordinate', 'selectedTotalTimeIndex', 'modelLeft', 'modelRight', ])
            )
        ) {
            this.fetchCalculationResults();
        }
    }

    fetchCalculationResults = () => {
        const { scenarioModels, scenarioAnalysis, apiKey } = this.props;
        const {
            selectedLayer,
            selectedResultType,
            selectedTotalTimeIndex,
            modelLeft,
            modelRight,
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

            const leftModelCalculation = find( scenarioModels, { id: modelLeft } );
            const rightModelCalculation = find( scenarioModels, { id: modelRight } );

            if (!leftModelCalculation || !rightModelCalculation) {
                return null;
            }

            ConfiguredAxios.get(
                `/calculations/${leftModelCalculation.calculationId}/results/differences/${rightModelCalculation.calculationId}/types/${selectedResultType}/layers/${selectedLayer}/totims/${time}`,
                {
                    headers: {
                        'X-AUTH-TOKEN': apiKey
                    },
                } )
                .then( result => {
                    this.setState( prevState => ({
                            ...prevState,
                            heatMapData: result.data
                        })
                    );
                } )
                .catch( error => {
                    // eslint-disable-next-line no-console
                    console.error( error );
                    // TODO user friendly error handling
                } );
        }
    };

    onModelChange = property => value => {
        this.setState(prevState => ({
            ...prevState,
            [property]: value.hasOwnProperty('value') ? value.value : value // dirty fix for react-select-plus returning an object
        }));
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
        const { scenarioAnalysis } = this.props;
        const {
            mapPosition,
            selectedCoordinate,
            selectedResultType,
            heatMapData,
        } = this.state;

        let xDifference = null;
        if (selectedCoordinate) {
            const selectedGridCell = scenarioAnalysis.grid.coordinateToGridCell(
                selectedCoordinate
            );
            if (selectedGridCell) {
                xDifference = scenarioAnalysis.grid.gridCellToXCrossectionBoundingBox(
                    selectedGridCell
                );
            }
        }

        // search for global min and max value
        // TODO calculation inside the render method will cause unecessary rerendering
        let min = null;
        let max = null;

        if (heatMapData) {
            heatMapData.forEach( row => {
                row.forEach( value => {
                    min = min > value ? value : min;
                    max = max < value ? value : max;
                } );
            } );
        }

        const mapData = new ScenarioAnalysisMapData( {
            area: scenarioAnalysis.area,
            grid: scenarioAnalysis.grid,
            type: selectedResultType,
            xDifference,
            heatMapData: heatMapData,
            globalMin: min,
            globalMax: max
        } );

        return (
            <section
                className="tile col col-min-2 stretch"
            >
                <ScenarioAnalysisMap
                    ref={map => {
                        if (map) {
                            map.invalidateMap();
                        }
                    }}
                    mapData={mapData}
                    mapPosition={mapPosition}
                    setMapPosition={this.setMapPosition}
                    clickCoordinate={this.setActiveCoordinateHandler}
                />
            </section>
        );
    }

    render() {
        const {
            scenarioAnalysis,
            scenarioModels,
        } = this.props;
        const {
            selectedLayer,
            selectedResultType,
            selectedTotalTimeIndex,
            selectedCoordinate,
            modelLeft,
            modelRight,
            heatMapData,
        } = this.state;

        if (!scenarioAnalysis || !scenarioModels) {
            return null;
        }

        const results = [{
            name: 'Difference',
            data: heatMapData
        }];

        return (
            <div>
                <div className="grid-container">
                    <div className="tile col col-abs-5 center-horizontal">
                        <div className="grid-container stretch">
                            <div className="col stretch">
                                <SelectModel
                                    label={null}
                                    value={modelLeft}
                                    handleSelectChange={this.onModelChange( 'modelLeft' )}
                                    models={scenarioModels}
                                />
                            </div>
                            <div className="col center-horizontal">
                                <Icon name="minus"/>
                            </div>
                            <div className="col stretch">
                                <SelectModel
                                    label={null}
                                    value={modelRight}
                                    handleSelectChange={this.onModelChange( 'modelRight' )}
                                    models={scenarioModels}
                                />
                            </div>
                        </div>
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

Difference.propTypes = {
    scenarioAnalysis: PropTypes.object,
    scenarioModels: PropTypes.array,
    apiKey: PropTypes.string
};

export default Difference;
