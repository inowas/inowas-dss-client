import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Chart from 'react-c3js'

import CrossSectionMap from '../../components/primitive/CrossSectionMap';
import Drawer from '../../components/primitive/Drawer';
import Header from '../../components/tools/Header';
import Icon from '../../components/primitive/Icon';
import Navbar from '../Navbar';
import ScenarioSelect from '../../components/tools/ScenarioSelect';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';

import '../../../less/4TileTool.less';
import '../../../less/toolT07.less';

import {
    fetchModelDetails,
    updateResults,
    setSelectedLayer,
    setSelectedResultType,
    setSelectedTotalTime,
    toggleModelSelection,
    setMapView
} from '../../actions/T07';

import LayerNumber from '../../model/LayerNumber';
import ResultType from '../../model/ResultType';
import TotalTime from '../../model/TotalTime';
import ModflowModelResult from '../../model/ModflowModelResult';

@connect(( store ) => {
    return { tool: store.T07 };
})
export default class T07 extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        params: PropTypes.object,
        tool: PropTypes.object.isRequired
    };

    state = {
        grid: [
            160, 170
        ],
        crossSection: null,
        navigation: [
            {
                name: 'Cross section',
                path: '',
                icon: <Icon name="layer_horizontal_hatched"/>
            }, {
                name: 'Scenarios difference',
                path: '',
                icon: <Icon name="layer_horizontal_hatched"/>
            }, {
                name: 'Time series',
                path: '',
                icon: <Icon name="layer_horizontal_hatched"/>
            }, {
                name: 'Overall budget',
                path: '',
                icon: <Icon name="layer_horizontal_hatched"/>
            }
        ]
    };

    componentWillMount( ) {
        this.props.dispatch(fetchModelDetails( this.props.params.id ));
    }

    setCrossSection = ( lat, lng ) => {
        const { boundingBox } = this.props.tool;
        const { grid } = this.state;
        const dlat = ( boundingBox[1][0 ] - boundingBox[0][0 ]) / grid[0]; // row width of bounding box grid
        const dlng = ( boundingBox[1][1 ] - boundingBox[0][1 ]) / grid[1]; // column width of bounding box grid
        const roundedLat = Math.floor( lat / dlat ) * dlat; // start of the row

        console.log( 'Clicked Cell in grid of bounding box:' );
        console.log('x:', Math.floor( ( lng - boundingBox[0][1 ]) / dlng )); // x coordinate of bounding box grid from 0 to grid[1]-1
        console.log('y:', grid[0] - 1 - Math.floor( ( lat - boundingBox[0][0 ]) / dlat )); // y coordinate of bounding box grid from 0 to grid[0]-1

        if ( lat < boundingBox[0][0 ] || lat > boundingBox[1][0 ] || lng < boundingBox[0][1 ] || lng > boundingBox[1][1 ]) {
            // clickedPoint is outside boundingBox
            return;
        }

        this.setState({
            crossSection: [
                [roundedLat, boundingBox[0][1 ]
                ],
                [
                    roundedLat + dlat,
                    boundingBox[1][1 ]
                ]
            ]
        });
    };

    toggleSelection = id => {
        return ( e ) => {
            this.props.dispatch(toggleModelSelection( id ));
            this.updateModelResults( this.props.tool.selectedResultType, this.props.tool.selectedLayerNumber, this.props.tool.selectedTotalTime );
            const event = document.createEvent( 'HTMLEvents' );
            event.initEvent( 'resize', true, false );
            e.target.dispatchEvent( event );
        };
    };

    changeLayerValue = ( layerNumber, resultType ) => {
        this.props.dispatch(setSelectedLayer( layerNumber ));
        this.props.dispatch(setSelectedResultType( resultType ));
        this.updateModelResults( resultType, layerNumber, this.props.tool.selectedTotalTime );
    };

    changeTotalTime = totalTime => {
        this.props.dispatch(setSelectedTotalTime( totalTime ));
        this.updateModelResults( this.props.tool.selectedResultType, this.props.tool.selectedLayerNumber, totalTime );
    };

    updateModelResults( resultType, layerNumber, totalTime ) {
        if ( layerNumber instanceof LayerNumber === false ) {
            console.error( 'Cannot update ModelResults, due layerNumber is not from Type LayerNumber.' );
            return;
        }

        if ( resultType instanceof ResultType === false ) {
            console.error( 'Cannot update ModelResults, due resultType is not from Type ResultType.' );
            return;
        }

        if ( totalTime instanceof TotalTime === false ) {
            console.error( 'Cannot update ModelResults, due totalTime is not from Type TotalTime.' );
            return;
        }

        this.props.tool.models.forEach(m => {
            if ( m.isSelected( ) == false ) {
                return;
            }

            if ( m.result instanceof ModflowModelResult ) {
                if (m.result.resultType( ).sameAs( resultType ) && m.result.layerNumber( ).sameAs( layerNumber ) && m.result.totalTime( ).sameAs( totalTime )) {
                    return;
                }
            }

            this.props.dispatch(updateResults( m.modelId, resultType, layerNumber, totalTime ));
        });
    }

    updateMapView = ( latLng, zoom ) => {
        this.props.dispatch(setMapView( latLng, zoom ));
    };

    renderMaps( models ) {
        const { crossSection } = this.state;
        const { mapPosition } = this.props.tool;
        return models.filter(model => {
            return model.selected;
        }).map(( model ) => {
            return (
                <section key={model.modelId} className="tile col col-min-2 stretch">
                    <CrossSectionMap model={model} min={models[0].minValue( )} max={models[0].maxValue( )} mapPosition={mapPosition} updateMapView={this.updateMapView} setCrossSection={this.setCrossSection} crossSection={crossSection}/>
                </section>
            );
        });
    }

    renderChart(rowNumber) {
        const models = this.props.tool.models;

        if (models.countModelsWithResults() == 0) {
            return null;
        }

        const columns = [];
        let leftBorder = 0;
        let rightBorder = 0;

        models.models().forEach( m => {
            if (m.isSelected() && m.hasResult()){
                columns.push(m.chartDataByRowNumber(rowNumber));
            }
        });

        let chartData = {columns: columns};
        let grid = {};

        const baseModel = models.models()[0];

        if (baseModel.hasResult()) {
            leftBorder = baseModel.chartLeftBorderByRowNumber(rowNumber);
            rightBorder = baseModel.chartRightBorderByRowNumber(rowNumber);

            grid = {
                x: {
                    show: true,
                    lines: [
                        {value: leftBorder, text: 'Eastern model border', position: 'middle'},
                        {value: rightBorder, text: 'Western model border', position: 'middle'}
                    ]
                }
            };
        }

        return (
            <div className="grid-container">
                <section className="tile col stretch">
                    <ResponsiveContainer width={'100%'} aspect={3}>
                        <Chart data={chartData} grid={grid} element='testchart' type='pie' />
                    </ResponsiveContainer>
                </section>
            </div>
        )
    }

    render() {
        const { navigation } = this.state;
        let models = this.props.tool.models.models();
        models = models.map(m => {
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
                    {this.renderMaps( models )}
                </div>
                {this.renderChart(30)}
            </div>
        );
    }
}
