import '../../less/scenarioSelect.less';

import PropTypes from 'prop-types';
import React from 'react';
import { Formatter } from '../../core';
import ResultType from '../../model/ResultType';
import Chart from 'react-c3js';
import LayerNumber from '../../model/LayerNumber';

const TimeSeriesChart = ({
                             scenarioModels,
                             scenarioAnalysis,
                             timeSeriesPoints,
                             resultType,
                             layerNumber,
                             labelXAxis,
                         }) => {
    if (!scenarioModels || !scenarioAnalysis.totalTimes || !resultType) {
        return null;
    }

    const chartData = {
        x: 'x',
        columns: []
    };

    const xAxisColumn = [ 'x' ];
    const startDate = new Date( scenarioAnalysis.totalTimes.start_date_time );

    scenarioAnalysis.totalTimes.total_times.forEach( t => {
        xAxisColumn.push( startDate.addDays( t ) );
    } );

    chartData.columns.push( xAxisColumn );

    timeSeriesPoints
        .filter( p => {
            return p.selected;
        } )
        .forEach( p => {
            scenarioModels
                .filter( m => {
                    return m.selected;
                } )
                .forEach( m => {
                    const result = p.timeSeriesResults.find( r => {
                        return (
                            m.calculationId === r.calculationId
                            && r.resultType.sameAs( resultType )
                            && r.layerNumber.sameAs( layerNumber )
                        );
                    } );
                    if (result && result.timeSeries) {
                        const resultColumn = [ p.name + ' ' + m.name ];
                        chartData.columns.push(
                            resultColumn.concat( result.timeSeries.values )
                        );
                    }
                } );
        } );

    const axis = {
        x: {
            type: 'timeseries',
            tick: {
                format: function (x) {
                    return Formatter.dateToDate( x );
                }
            },
            label: 'Date'
        },
        y: {
            label: labelXAxis( resultType )
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
};

TimeSeriesChart.propTypes = {
    resultType: PropTypes.instanceOf( ResultType ),
    layerNumber: PropTypes.instanceOf( LayerNumber ),
    scenarioAnalysis: PropTypes.object.isRequired,
    scenarioModels: PropTypes.array.isRequired,
    timeSeriesPoints: PropTypes.array.isRequired,
    labelXAxis: PropTypes.func.isRequired,
};

export default TimeSeriesChart;
