// import React, { PropTypes, Component } from 'react';
// import { connect } from 'react-redux';
// import Chart from 'react-c3js';
//
// import Header from '../../components/tools/Header';
// import Icon from '../../components/primitive/Icon';
// import Navbar from '../Navbar';
//
// import '../../less/4TileTool.less';
// import '../../less/toolT07.less';
//
// import {
//     fetchDetails,
//     updateResultsT07A,
//     setSelectedLayer,
//     setSelectedResultType,
//     setSelectedTotalTimeIndex,
//     toggleModelSelection,
//     setMapView,
//     setBounds,
//     setActiveGridCell,
//     updateResults
//
// } from '../../actions/T07';
//
// import LayerNumber from '../../model/LayerNumber';
// import ResultType from '../../model/ResultType';
// import TotalTime from '../../model/TotalTime';
// import ModflowModelResult from '../../model/ModflowModelResult';
//
// @connect(( store ) => {
//     return { tool: store.T07 };
// })
// export default class T07D extends Component {
//
//     static propTypes = {
//         dispatch: PropTypes.func.isRequired,
//         params: PropTypes.object,
//         tool: PropTypes.object.isRequired
//     };
//
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             navigation: [
//                 {
//                     name: 'Cross section',
//                     path: '/tools/T07A/' + props.params.id,
//                     icon: <Icon name="layer_horizontal_hatched"/>
//                 }, {
//                     name: 'Scenarios difference',
//                     path: '/tools/T07B/' + props.params.id,
//                     icon: <Icon name="layer_horizontal_hatched"/>
//                 }, {
//                     name: 'Time series',
//                     path: '/tools/T07C/' + props.params.id,
//                     icon: <Icon name="layer_horizontal_hatched"/>
//                 }, {
//                     name: 'Overall budget',
//                     path: '/tools/T07D/' + props.params.id,
//                     icon: <Icon name="layer_horizontal_hatched"/>
//                 }
//             ]
//         };
//     }
//
//     componentWillMount( ) {
//         this.props.dispatch(fetchDetails( this.props.params.id ));
//     }
//
//     updateModelResults( resultType, layerNumber, totalTimeIndex ) {
//         if ( layerNumber instanceof LayerNumber === false ) {
//             console.error( 'Cannot update ModelResults, due layerNumber is not from Type LayerNumber.' );
//             return;
//         }
//
//         if ( resultType instanceof ResultType === false ) {
//             console.error( 'Cannot update ModelResults, due resultType is not from Type ResultType.' );
//             return;
//         }
//
//         const totalTimes = this.props.tool.totalTimes.totalTimes;
//
//         const totalTime = (totalTimeIndex === null) ? new TotalTime(totalTimes[totalTimes.length - 1]) : new TotalTime(totalTimes[totalTimeIndex]);
//
//         this.props.tool.models.forEach(m => {
//             if ( m.isSelected( ) === false ) {
//                 return;
//             }
//
//             if ( m.result instanceof ModflowModelResult ) {
//                 if (m.result.resultType( ).sameAs( resultType ) && m.result.layerNumber( ).sameAs( layerNumber ) && m.result.totalTime( ).sameAs( totalTime )) {
//                     return;
//                 }
//             }
//
//             this.props.dispatch(updateResultsT07A( m.calculationId, resultType, layerNumber, totalTime ));
//         });
//     }
//
//
//     renderChart( ) {
//         const models = this.props.tool.models;
//
//         if ( models.countModelsWithResults( ) === 0 ) {
//             return null;
//         }
//
//         const rowNumber = this.props.tool.activeGridCell.y;
//         if ( rowNumber === null ) {
//             return null;
//         }
//
//         const colNumber = this.props.tool.activeGridCell.x;
//         if ( colNumber === null ) {
//             return null;
//         }
//
//         const columns = [];
//         models.models().forEach(m => {
//             if (m.isSelected( ) && m.hasResult( )) {
//                 columns.push(m.chartDataByRowNumber( rowNumber ));
//             }
//         });
//
//         const chartData = {
//             columns: columns
//         };
//
//         let grid = {};
//         let axis = {};
//
//         const baseModel = models.baseModel();
//         if (baseModel.hasResult()) {
//             chartData.x = 'x';
//             columns.unshift(baseModel.columnXAxis());
//             grid = {
//                 x: {
//                     show: true,
//                     lines: [
//                         {
//                             value: baseModel.chartLeftBorderByRowNumber( rowNumber ),
//                             text: 'Eastern model border',
//                             position: 'middle'
//                         }, {
//                             value: baseModel.chartRightBorderByRowNumber( rowNumber ),
//                             text: 'Western model border',
//                             position: 'middle'
//                         },
//                         {
//                             value: baseModel.coordinateByGridCell( colNumber, rowNumber ).x,
//                             text: 'Selected column',
//                             position: 'middle'
//                         }
//                     ]
//                 }
//             };
//
//             axis = {
//                 x: {
//                     label: baseModel.labelXAxis()
//                 },
//                 y: {
//                     label: baseModel.labelYAxis()
//                 }
//             };
//         }
//
//         return (
//             <div className="grid-container">
//                 <section className="tile col stretch">
//                     <Chart data={chartData} grid={grid} axis={axis} transition={{duration: 0}} element="testchart" />
//                 </section>
//             </div>
//         );
//     }
//
//     render( ) {
//         const { navigation } = this.state;
//
//         return (
//             <div className="toolT07 app-width">
//                 <Navbar links={navigation}/>
//                 <Header title={'T07. Scenario Analysis'}/>
//                 <div className="grid-container">
//                     <div className="tile col col-abs-1 center-horizontal">
//                         <select className="select block">
//                             <option>1</option>
//                             <option>2</option>
//                         </select>
//                     </div>
//                 </div>
//                 <div className="grid-container">
//                     <div className="tile col stretch">
//                         {this.renderChart( )}
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }
