import React from 'react';
import PropTypes from 'prop-types';
import {model as modelSelector, results} from '../selectors';

import ArraySlider from '../../components/primitive/ArraySlider';
import Button from '../../components/primitive/Button';
import BoundingBox from '../../model/BoundingBox';
import ConfiguredRadium from 'ConfiguredRadium';
import Coordinate from '../../model/Coordinate';
import {Formatter, WebData} from '../../core';
import Grid from '../../model/Grid';
import {Query} from '../actions/index';
import {Modifier as T07} from '../../t07';
import LayerSelect from '../../t07/components/LayerSelect';
import ScenarioAnalysisMap from '../../t07/components/ScenarioAnalysisMap';
import ScenarioAnalysisMapData from '../../model/ScenarioAnalysisMapData';
import {connect} from 'react-redux';
import styleGlobals from 'styleGlobals';
import {HeadResultsChart} from '../components';
import uuid from 'uuid';
import {includes} from 'lodash';

const styles = {
    selectWrapper: {
        display: 'flex'
    },

    layerSelectWrapper: {
        width: styleGlobals.dimensions.gridColumn,
        padding: styleGlobals.dimensions.spacing.medium
    },

    sliderWrapper: {
        width:
            4 * styleGlobals.dimensions.gridColumn +
            3 * styleGlobals.dimensions.gridGutter,
        padding: styleGlobals.dimensions.spacing.medium
    },

    chartWrapper: {
        marginTop: styleGlobals.dimensions.spacing.medium
    }
};

class ModelEditorResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLayer: 0,
            selectedResultType: 'head',
            selectedTotalTimeIndex: 0,
            mapPosition: {
                bounds: [
                    {
                        lat: props.model.bounding_box[0][1],
                        lng: props.model.bounding_box[0][0]
                    },
                    {
                        lat: props.model.bounding_box[1][1],
                        lng: props.model.bounding_box[1][0]
                    }
                ]
            },
            activeCoordinate: null
        };
    }

    componentDidMount() {
        this.fetchCalculation(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.layerValues && !this.state.selectedLayerAndType) {
            this.setState({
                selectedLayerAndType: `0_${nextProps.layerValues[0][0]}`
            });
        }

        if (this.props.model !== nextProps.model) {
            this.fetchCalculation(nextProps);

            this.setState({
                mapPosition: {
                    bounds: [
                        {
                            lat: nextProps.model.bounding_box[0][1],
                            lng: nextProps.model.bounding_box[0][0]
                        },
                        {
                            lat: nextProps.model.bounding_box[1][1],
                            lng: nextProps.model.bounding_box[1][0]
                        }
                    ]
                }
            });
        }
    }

    fetchCalculation = () => {
        const {selectedLayer, selectedResultType, selectedTotalTimeIndex} = this.state;
        const {calculationId, times} = this.props;

        if (!calculationId || !times || selectedTotalTimeIndex === null) {
            return;
        }

        const time = this.props.times.total_times[selectedTotalTimeIndex];

        this.props.sendQuery(
            `calculations/${this.props.calculationId}/results/types/${selectedResultType}/layers/${selectedLayer}/totims/${time}`,
            Query.GET_MODFLOW_MODEL_CALCULATION
        );
    };

    onLayerSelectChange = (selectedLayer, selectedType) => {
        this.setState(
            {
                selectedLayer: selectedLayer,
                selectedResultType: selectedType
            },
            () => this.fetchCalculation()
        );
    };

    onTimeSliderChange = nextSelectedTotalTimeIndex => {
        this.setState(
            {selectedTotalTimeIndex: nextSelectedTotalTimeIndex},
            () => this.fetchCalculation(this.props)
        );
    };

    setMapPosition = newMapPosition => {
        this.setState({
            mapPosition: newMapPosition
        });
    };

    setActiveCoordinate = newActiveCoordinate => {
        this.setState({
            activeCoordinate: newActiveCoordinate
        });
    };

    createScenarioAnalysis = () => {
        this.props.createScenarioAnalysis(uuid.v4(), {
            basemodel_id: this.props.model.id,
            name: 'Scenario Analysis of ' + this.props.model.name,
            description: '',
            public: true
        });
    };

    render() {
        const {
            model,
            times,
            layerValues,
            getCalculationStatus,
            createScenarioAnalysisStatus
        } = this.props;

        const {
            selectedLayer,
            selectedResultType,
            selectedTotalTimeIndex,
            mapPosition,
            activeCoordinate
        } = this.state;

        if (!model || !times || !layerValues) {
            return <div>Loading!</div>;
        }

        const readOnly = !includes(model.permissions, 'w');
        const selectedType = selectedResultType;
        const startDate = new Date(times.start_date_time);
        const totalTimes = times.total_times.map(t => startDate.addDays(t));

        const grid = new Grid(
            new BoundingBox(
                new Coordinate(
                    model.bounding_box[0][1],
                    model.bounding_box[0][0]
                ),
                new Coordinate(
                    model.bounding_box[1][1],
                    model.bounding_box[1][0]
                )
            ),
            model.grid_size.n_x,
            model.grid_size.n_y
        );

        let xCrossSection = null;
        if (activeCoordinate) {
            const activeGridCell = grid.coordinateToGridCell(activeCoordinate);
            if (activeGridCell) {
                xCrossSection = grid.gridCellToXCrossectionBoundingBox(
                    activeGridCell
                );
            }
        }

        const data =
            getCalculationStatus && getCalculationStatus.type === 'success'
                ? getCalculationStatus.data
                : null;

        const mapData = new ScenarioAnalysisMapData({
            area: model.geometry,
            grid,
            type: selectedType,
            boundaries: model.boundaries,
            xCrossSection,
            heatMapData: data
        });

        // TODO use TotalTimesSlider and LayerSelect Components from t07

        return (
            <div>
                <div style={[styles.selectWrapper]}>
                    <div style={[styles.layerSelectWrapper]}>
                        <LayerSelect
                            layerScheme={layerValues}
                            onChange={this.onLayerSelectChange}
                            selectedLayer={selectedLayer}
                            selectedResultType={selectedType}
                        />
                    </div>
                    <div style={[styles.sliderWrapper]}>
                        {totalTimes.length > 1 && (
                            <ArraySlider
                                data={totalTimes}
                                value={selectedTotalTimeIndex}
                                onChange={this.onTimeSliderChange}
                                formatter={Formatter.dateToDate}
                            />
                        )}
                    </div>
                </div>
                <div>
                    <ScenarioAnalysisMap
                        mapData={mapData}
                        mapPosition={mapPosition}
                        setMapPosition={this.setMapPosition}
                        clickCoordinate={this.setActiveCoordinate}
                    />
                </div>
                <div style={[styles.chartWrapper]}>
                    <WebData.Component.Loading status={getCalculationStatus}>
                        <HeadResultsChart
                            results={[
                                {
                                    name: model.name,
                                    data: mapData.heatMapData
                                }
                            ]}
                            activeCoordinate={activeCoordinate}
                            grid={grid}
                            selectedType={selectedType}
                        />
                    </WebData.Component.Loading>
                </div>
                {!readOnly && (
                    <div style={[styles.saveButtonWrapper]}>
                        <WebData.Component.Loading
                            status={createScenarioAnalysisStatus}
                        >
                            <Button onClick={this.createScenarioAnalysis}>
                                Create new Scenario Analysis
                            </Button>
                        </WebData.Component.Loading>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state, {tool}) => {
    return {
        tool,
        model: modelSelector.getModflowModel(state[tool]),
        calculationId: results.getCalculationID(state[tool].model.results),
        layerValues: results.getLayerValues(state[tool].model.results),
        times: results.getTimes(state[tool].model.results),
        getCalculationStatus: WebData.Selector.getRequestStatusByType(state, Query.GET_MODFLOW_MODEL_CALCULATION),
        createScenarioAnalysisStatus: WebData.Selector.getRequestStatusByType(state, T07.Command.CREATE_SCENARIO_ANALYSIS)
    };
};

const actions = {
    sendQuery: WebData.Modifier.Action.sendQuery,
    createScenarioAnalysis: T07.Command.createScenarioAnalysis,
};

ModelEditorResults.propTypes = {
    tool: PropTypes.string.isRequired,
    model: PropTypes.object,
    times: PropTypes.object,
    layerValues: PropTypes.array,
    calculationId: PropTypes.string,
    sendQuery: PropTypes.func.isRequired,
    getCalculationStatus: PropTypes.object,
    createScenarioAnalysis: PropTypes.func.isRequired,
    createScenarioAnalysisStatus: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actions)(ConfiguredRadium(ModelEditorResults));
