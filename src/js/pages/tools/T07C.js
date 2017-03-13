import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Chart from 'react-c3js';

import Drawer from '../../components/primitive/Drawer';
import CrossSectionMap from '../../components/primitive/CrossSectionMap';
import Header from '../../components/tools/Header';
import Icon from '../../components/primitive/Icon';
import Navbar from '../Navbar';
import ScenarioSelect from '../../components/tools/ScenarioSelect';

import '../../../less/4TileTool.less';
import '../../../less/toolT07.less';

import {
    fetchModelDetails,
    updateResultsT07A,
    setSelectedLayer,
    setSelectedResultType,
    setSelectedTotalTimeIndex,
    toggleModelSelection,
    setMapView,
    setBounds,
    addTimeSeriesPoint,
    setTimeSeriesPointSelection,
    fetchTimeSeries
} from '../../actions/T07';

import LayerNumber from '../../model/LayerNumber';
import ResultType from '../../model/ResultType';
import TotalTime from '../../model/TotalTime';
import TimeSeriesPoint from '../../model/TimeSeriesPoint';
import ModflowModelResult from '../../model/ModflowModelResult';

@connect(( store ) => {
    return { tool: store.T07 };
})
export default class T07C extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        params: PropTypes.object,
        tool: PropTypes.object.isRequired
    };

    constructor( props ) {
        super( props );

        this.state = {
            navigation: [
                {
                    name: 'Cross section',
                    path: 'tools/T07A/' + props.params.id,
                    icon: <Icon name="layer_horizontal_hatched"/>
                }, {
                    name: 'Scenarios difference',
                    path: 'tools/T07B/' + props.params.id,
                    icon: <Icon name="layer_horizontal_hatched"/>
                }, {
                    name: 'Time series',
                    path: 'tools/T07C/' + props.params.id,
                    icon: <Icon name="layer_horizontal_hatched"/>
                }, {
                    name: 'Overall budget',
                    path: 'tools/T07D/' + props.params.id,
                    icon: <Icon name="layer_horizontal_hatched"/>
                }
            ]
        };
    }

    componentWillMount( ) {
        this.props.dispatch(fetchModelDetails( this.props.params.id ));
    }

    toggleSelection = id => {
        return ( e ) => {
            this.props.dispatch(toggleModelSelection( id ));
            this.updateModelResults( this.props.tool.selectedResultType, this.props.tool.selectedLayerNumber, this.props.tool.selectedTotalTimeIndex );

            // manually emit a resize event so the leaflet maps recalculate their container size
            const event = document.createEvent( 'HTMLEvents' );
            event.initEvent( 'resize', true, false );
            e.target.dispatchEvent( event );
        };
    };

    changeLayerValue = ( layerNumber, resultType ) => {
        this.props.dispatch(setSelectedLayer( layerNumber ));
        this.props.dispatch(setSelectedResultType( resultType ));
        this.updateModelResults( resultType, layerNumber, this.props.tool.selectedTotalTimeIndex );
    };

    updateModelResults( resultType, layerNumber, totalTimeIndex ) {
        if ( layerNumber instanceof LayerNumber === false ) {
            console.error( 'Cannot update ModelResults, due layerNumber is not from Type LayerNumber.' );
            return;
        }

        if ( resultType instanceof ResultType === false ) {
            console.error( 'Cannot update ModelResults, due resultType is not from Type ResultType.' );
            return;
        }

        const totalTimes = this.props.tool.totalTimes.totalTimes;

        const totalTime = ( totalTimeIndex === null )
            ? new TotalTime(totalTimes[totalTimes.length - 1])
            : new TotalTime(totalTimes[totalTimeIndex]);

        this.props.tool.models.forEach(m => {
            if ( m.isSelected( ) === false ) {
                return;
            }

            if ( m.result instanceof ModflowModelResult ) {
                if (m.result.resultType( ).sameAs( resultType ) && m.result.layerNumber( ).sameAs( layerNumber ) && m.result.totalTime( ).sameAs( totalTime )) {
                    return;
                }
            }

            this.props.dispatch(updateResultsT07A( m.modelId, resultType, layerNumber, totalTime ));
        });
    }

    selectLayer = ( e ) => {
        const valueSplitted = e.target.value.split( '_' );
        this.changeLayerValue(new LayerNumber(valueSplitted[0]), new ResultType(valueSplitted[1]));
    };

    renderSelectOptions( options, optionIndex ) {
        return options.map(( o, index ) => {
            return (
                <option key={index} value={optionIndex + '_' + o}>{'Layer ' + optionIndex + ' ' + o}</option>
            );
        });
    }

    renderSelectOptgroups( layerValues ) {
        if ( layerValues !== null ) {
            return layerValues.map(( l, index ) => {
                return (
                    <optgroup key={index} label={'Layer ' + index}>
                        {this.renderSelectOptions( l, index )}
                    </optgroup>
                );
            });
        }
        return null;
    }

    renderSelect( ) {
        return (
            <select className="layer-select select block" onChange={this.selectLayer} value={this.props.tool.selectedLayerNumber + '_' + this.props.tool.selectedResultType}>
                {this.renderSelectOptgroups( this.props.tool.layerValues )}
            </select>
        );
    }

    updateMapView = ( latLng, zoom ) => {
        this.props.dispatch(setMapView( latLng, zoom ));
    };

    updateBounds = ( bounds ) => {
        this.props.dispatch(setBounds( bounds ));
    };

    addPoint = ( coordinate ) => {
        const point = new TimeSeriesPoint();
        point.coordinate = coordinate;

        this.props.dispatch(addTimeSeriesPoint( point ));
    };

    renderMap( ) {
        const { models, mapPosition, timeSeriesPoints } = this.props.tool;

        if ( models.length <= 0 ) {
            return null;
        }

        const baseModel = models.baseModel;

        const activeCoordinates = timeSeriesPoints.map(p =>{
            const gridCell = baseModel.grid.coordinateToGridCell(p.coordinate);
            const boundingBox = baseModel.grid.gridCellToBoundingBox(gridCell);
            return boundingBox;
        });

        const model = models.baseModel;
        return (
            <CrossSectionMap mapData={model.mapData(null, activeCoordinates, models.globalMinValue(), models.globalMaxValue())} mapPosition={mapPosition} updateMapView={this.updateMapView} updateBounds={this.updateBounds} clickCoordinate={this.addPoint}/>
        );
    }

    setTimeSeriesPointSelection = index => {
        return e => {
            this.props.dispatch(setTimeSeriesPointSelection(index, e.target.checked));
        };
    }

    renderTable() {
        const { timeSeriesPoints } = this.props.tool;
        return(<table className="table">
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
                    return(<tr key={index}>
                        <td><input onChange={this.setTimeSeriesPointSelection(index)} checked={p.selected} type="checkbox"/></td>
                        <td>{p.name}</td>
                        <td>{p.coordinate.lat}</td>
                        <td>{p.coordinate.lng}</td>
                    </tr>);
                })}
            </tbody>
        </table>);
    }

    renderChart( ) {
        const {models, timeSeriesPoints, selectedResultType, selectedLayerNumber} = this.props.tool;


        const grid = {};
        const axis = {};
        const chartData = {
            columns: []
        };

        timeSeriesPoints.filter( p => {return p.selected;}).forEach(p => {
            const resultColumn = [p.name];
            models.filter(m => {return m.selected;}).forEach(m => {
                const result = p.results.find(r => {return (m.modelId === r.modelId && selectedResultType.sameAs(r.resultType) &&  selectedLayerNumber.sameAs(r.layerNumber));});
                if (result && result.timeSeries) {
                    resultColumn.concat(result.timeSeries.data);
                } else {
                    const gridCell = m.grid.coordinateToGridCell(p.coordinate);
                    this.props.dispatch(fetchTimeSeries(p.coordinate, m.modelId, selectedResultType, selectedLayerNumber, gridCell.x, gridCell.y ));
                }
            });
            chartData.columns.push(resultColumn);
        });

            // axis = {
            //     x: {
            //         label: baseModel.labelXAxis()
            //     },
            //     y: {
            //         label: baseModel.labelYAxis()
            //     }
            // };

        return (
            <div className="grid-container">
                <section className="tile col stretch">
                    <Chart data={chartData} grid={grid} axis={axis} transition={{duration: 0}} element="testchart" />
                </section>
            </div>
        );
    }

    changeTotalTimeIndex = index => {
        this.props.dispatch(setSelectedTotalTimeIndex( index ));
        this.updateModelResults( this.props.tool.selectedResultType, this.props.tool.selectedLayerNumber, this.props.tool.selectedTotalTimeIndex );
    };

    render( ) {
        const { navigation } = this.state;
        const models = this.props.tool.models.map(m => {
            m.thumbnail = 'scenarios_thumb.png';
            return m;
        });

        return (
            <div className="toolT07 app-width">
                <Navbar links={navigation}/>
                <Drawer visible>
                    <ScenarioSelect scenarios={models} toggleSelection={this.toggleSelection}/>
                </Drawer>
                <Header title={'T07. Scenario Analysis'}/>
                <div className="grid-container">
                    <div className="tile col col-abs-1 center-horizontal">
                        {this.renderSelect( )}
                    </div>
                </div>
                <div className="grid-container">
                    <section className="tile col col-abs-3">
                        {this.renderMap( )}
                    </section>
                    <section className="tile col col-abs-2">
                        {this.renderTable()}
                    </section>
                </div>
                {this.renderChart( )}
            </div>
        );
    }
}
