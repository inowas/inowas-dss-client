import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Chart from 'react-c3js';
import dateFormat from 'dateformat';

import CrossSectionMap from '../../components/primitive/CrossSectionMap';
import Header from '../../components/tools/Header';
import Icon from '../../components/primitive/Icon';
import ArraySlider from '../../components/primitive/ArraySlider';
import Navbar from '../Navbar';

import '../../../less/4TileTool.less';
import '../../../less/toolT07.less';

import {
    fetchModelDetails,
    updateResultsT07B,
    setSelectedLayer,
    setSelectedModelIdsT07B,
    setSelectedResultType,
    setSelectedTotalTimeIndex,
    setMapView,
    setBounds,
    setActiveCoordinate,
    setupT07b
} from '../../actions/T07';

import LayerNumber from '../../model/LayerNumber';
import ResultType from '../../model/ResultType';
import TotalTime from '../../model/TotalTime';

@connect(( store ) => {
    return { tool: store.T07 };
})
export default class T07B extends Component {

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
        this.props.dispatch(fetchModelDetails(this.props.params.id, dispatch => {
            dispatch(setupT07b( ));
        }));
    }

    componentWillReceiveProps( nextProps ) {
        const { selectedResultType, selectedLayerNumber, totalTimes, t07bSelectedModelIds } = this.props.tool;
        const { selectedResultType: nextSelectedResultType, selectedLayerNumber: nextSelectedLayerNumber, totalTimes: nextTotalTimes, t07bSelectedModelIds: nextT07bSelectedModelIds } = nextProps.tool;
        if ( ( !selectedResultType || !selectedLayerNumber || !totalTimes || !t07bSelectedModelIds ) && nextSelectedResultType && nextSelectedLayerNumber && nextTotalTimes && nextT07bSelectedModelIds ) {
            this.updateModelResults( nextT07bSelectedModelIds, nextSelectedResultType, nextSelectedLayerNumber, nextTotalTimes, null );
        }
    }

    updateModelResults( t07bSelectedModelIds, resultType, layerNumber, totalTimes, totalTimeIndex ) {
        if ( t07bSelectedModelIds.length !== 2 ) {
            throw new Error( 'Cannot update ModelResults, due to the number of t07bSelectedModelIds is not equal 2.' );
        }

        if (!( layerNumber instanceof LayerNumber )) {
            throw new Error( 'Cannot update ModelResults, due layerNumber is not from Type LayerNumber.' );
        }

        if ( resultType instanceof ResultType === false ) {
            throw new Error( 'Cannot update ModelResults, due resultType is not from Type ResultType.' );
        }

        const totalTime = ( totalTimeIndex === null )
            ? new TotalTime(totalTimes.totalTimes[totalTimes.totalTimes.length - 1])
            : new TotalTime(totalTimes.totalTimes[totalTimeIndex]);

        this.props.dispatch(updateResultsT07B( t07bSelectedModelIds[0], t07bSelectedModelIds[1], resultType, layerNumber, totalTime ));
    }

    changeLayerValue = ( layerNumber, resultType ) => {
        this.props.dispatch(setSelectedLayer( layerNumber ));
        this.props.dispatch(setSelectedResultType( resultType ));

        const { t07bSelectedModelIds, totalTimes, selectedTotalTimeIndex } = this.props.tool;
        this.updateModelResults( t07bSelectedModelIds, resultType, layerNumber, totalTimes, selectedTotalTimeIndex );
    };

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

    renderLayerSelect( ) {
        return (
            <select className="select block" onChange={this.selectLayer} value={this.props.tool.selectedLayerNumber + '_' + this.props.tool.selectedResultType}>
                {this.renderSelectOptgroups( this.props.tool.layerValues )}
            </select>
        );
    }

    renderModelSelect( models ) {
        return models.map(m => {
            return (
                <option key={m.modelId} value={m.modelId}>{m.name}</option>
            );
        });
    }

    selectModel = ( id, e ) => {
        const t07bSelectedModelIds = this.props.tool.t07bSelectedModelIds;
        t07bSelectedModelIds[id] = e.target.value;
        this.props.dispatch(setSelectedModelIdsT07B( t07bSelectedModelIds ));

        const { selectedResultType, selectedLayerNumber, totalTimes, selectedTotalTimeIndex } = this.props.tool;
        this.updateModelResults( t07bSelectedModelIds, selectedResultType, selectedLayerNumber, totalTimes, selectedTotalTimeIndex );
    };

    renderModelsSelect( ) {
        if ( this.props.tool.t07bSelectedModelIds === null ) {
            return null;
        }
        return (
            <div className="grid-container stretch">
                <div className="col stretch">
                    <select className="select block" onChange={this.selectModel.bind( this, 0 )} value={this.props.tool.t07bSelectedModelIds[0]}>
                        {this.renderModelSelect( this.props.tool.models.models )}
                    </select>
                </div>
                <div className="col center-horizontal">
                    <Icon className="col" name="minus"/>
                </div>
                <div className="col stretch">
                    <select className="select block" onChange={this.selectModel.bind( this, 1 )} value={this.props.tool.t07bSelectedModelIds[1]}>
                        {this.renderModelSelect( this.props.tool.models.models )}
                    </select>
                </div>
            </div>
        );
    }

    updateMapView = ( latLng, zoom ) => {
        this.props.dispatch(setMapView( latLng, zoom ));
    };

    updateBounds = ( bounds ) => {
        this.props.dispatch(setBounds( bounds ));
    };

    setActiveCoordinate = ( coordinate ) => {
        this.props.dispatch(setActiveCoordinate( coordinate ));
    };

    renderMap( ) {
        const { t07bDifference, mapPosition, activeCoordinate } = this.props.tool;
        if ( !t07bDifference ) {
            return null;
        }

        let xCrossSection = null;
        if ( activeCoordinate ) {
            const activeGridCell = t07bDifference.grid.coordinateToGridCell( activeCoordinate );
            if ( activeGridCell ) {
                xCrossSection = t07bDifference.grid.gridCellToXCrossectionBoundingBox( activeGridCell );
            }
        }

        return (
            <section className="tile col stretch">
                <CrossSectionMap mapData={t07bDifference.mapData( xCrossSection )} mapPosition={mapPosition} updateMapView={this.updateMapView} updateBounds={this.updateBounds} clickCoordinate={this.setActiveCoordinate}/>
            </section>
        );
    }

    renderChart( ) {
        const { activeCoordinate } = this.props.tool;
        const mfDifference = this.props.tool.t07bDifference;

        if ( !mfDifference || !activeCoordinate ) {
            return null;
        }

        if (!mfDifference.hasResult( )) {
            return null;
        }

        const activeGridCell = mfDifference.grid.coordinateToGridCell( activeCoordinate );

        if ( !activeGridCell ) {
            return null;
        }

        const rowNumber = activeGridCell.y;
        if ( rowNumber === null ) {
            return null;
        }

        const colNumber = activeGridCell.x;
        if ( colNumber === null ) {
            return null;
        }

        const chartData = {
            x: 'x',
            columns: [mfDifference.columnXAxis( ), mfDifference.chartDataByRowNumber( rowNumber )]
        };

        const grid = {
            x: {
                show: true,
                lines: [
                    {
                        value: mfDifference.chartLeftBorderByRowNumber( rowNumber ),
                        text: 'Eastern model border',
                        position: 'middle'
                    }, {
                        value: mfDifference.chartRightBorderByRowNumber( rowNumber ),
                        text: 'Western model border',
                        position: 'middle'
                    }, {
                        value: mfDifference.coordinateByGridCell( colNumber, rowNumber ).x,
                        text: 'Selected column',
                        position: 'middle'
                    }
                ]
            }
        };

        const axis = {
            x: {
                label: mfDifference.labelXAxis( )
            },
            y: {
                label: mfDifference.labelYAxis( )
            }
        };

        return (
            <div className="grid-container">
                <section className="tile col stretch">
                    <Chart data={chartData} grid={grid} axis={axis} element="testchart"/>
                </section>
            </div>
        );
    }

    changeTotalTimeIndex = index => {
        this.props.dispatch(setSelectedTotalTimeIndex( index ));
        const { t07bSelectedModelIds, selectedResultType, selectedLayerNumber, totalTimes, selectedTotalTimeIndex } = this.props.tool;
        this.updateModelResults( t07bSelectedModelIds, selectedResultType, selectedLayerNumber, totalTimes, selectedTotalTimeIndex );
    };

    renderSlider( ) {
        if ( !this.props.tool.totalTimes ) {
            return null;
        }

        const startDate = new Date( this.props.tool.totalTimes.start );
        const totalTimes = this.props.tool.totalTimes.totalTimes.map(t => {
            return startDate.addDays( t );
        });

        let sliderValue = this.props.tool.selectedTotalTimeIndex;
        if ( sliderValue === null ) {
            sliderValue = totalTimes.length - 1;
        }

        return ( <ArraySlider data={totalTimes} value={sliderValue} onChange={this.changeTotalTimeIndex} formatter={function( value ) {
            return dateFormat( value, 'mm/dd/yyyy' );
        }}/> );
    }

    render( ) {
        const { navigation } = this.state;
        // let models = this.props.tool.models.models( );
        // models = models.map(m => {
        //     m.thumbnail = 'scenarios_thumb.png';
        //     return m;
        // });

        return (
            <div className="toolT07 app-width">
                <Navbar links={navigation}/>
                <Header title={'T07. Scenario Analysis'}/>
                <div className="grid-container">
                    <div className="tile col col-abs-1 center-horizontal">
                        {this.renderLayerSelect( )}
                    </div>
                    <div className="tile col col-abs-4 center-horizontal">
                        {this.renderModelsSelect( )}
                    </div>
                </div>
                <div className="grid-container">
                    {this.renderMap( )}
                </div>
                <div className="grid-container">
                    <div className="tile col stretch">
                        {this.renderSlider( )}
                    </div>
                </div>
                {this.renderChart( )}
            </div>
        );
    }
}
