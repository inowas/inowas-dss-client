import React, { PropTypes } from 'react';
import { pure } from 'recompose';
import ConfiguredRadium from 'ConfiguredRadium';
import Chart from 'react-c3js';

function labelYAxis(resultType) {
    if (resultType === 'head') {
        return 'Groundwater Head [m]';
    }

    if (resultType === 'drawdown') {
        return 'Groundwater DrawDown [m]';
    }

    return '';
}

const HeadResultsChart = ({
    results,
    activeCoordinate,
    grid,
    selectedType,
    style
}) => {
    let chartData = { columns: [] };
    let chartAxis = null;
    let chartGrid = null;
    if (activeCoordinate) {
        const activeGridCell = grid.coordinateToGridCell(activeCoordinate);
        if (activeGridCell) {
            if (results) {
                const xAxisTicks = grid.lngOfCellCenters;

                chartData = {
                    x: 'x',
                    columns: [
                        ['x'].concat(xAxisTicks),
                        ...results.map(result => {
                            return [result.name].concat(
                                result.data[activeGridCell.y]
                            );
                        })
                    ]
                };

                chartAxis = {
                    x: {
                        label: 'Longitude',
                        tick: {
                            format: x => Number(x).toFixed(3)
                        }
                    },
                    y: {
                        label: labelYAxis(selectedType)
                    }
                };

                const firstResultSelectedRowData =
                    results[0].data[activeGridCell.y];
                let leftBorderIndex = 0;
                for (let i = 0; i < firstResultSelectedRowData.length; i++) {
                    if (firstResultSelectedRowData[i] === null) {
                        continue;
                    }

                    leftBorderIndex = i;
                    break;
                }

                let rightBorderIndex = 0;
                for (
                    let i = firstResultSelectedRowData.length - 1;
                    i >= 0;
                    i--
                ) {
                    if (firstResultSelectedRowData[i] === null) {
                        continue;
                    }

                    rightBorderIndex = i;
                    break;
                }

                chartGrid = {
                    x: {
                        show: true,
                        lines: [
                            {
                                value: grid.lngOfCellCenter(rightBorderIndex),
                                text: 'Eastern model border',
                                position: 'middle'
                            },
                            {
                                value: grid.lngOfCellCenter(leftBorderIndex),
                                text: 'Western model border',
                                position: 'middle'
                            },
                            {
                                value: activeCoordinate.lng,
                                text: 'Selected column',
                                position: 'middle'
                            }
                        ]
                    }
                };
            }
        }
    }
    return (
        <Chart
            style={style}
            data={chartData}
            axis={chartAxis}
            grid={chartGrid}
        />
    );
};

HeadResultsChart.propTypes = {
    results: PropTypes.array,
    activeCoordinate: PropTypes.object,
    grid: PropTypes.object,
    selectedType: PropTypes.string,
    style: PropTypes.object
};

export default pure(ConfiguredRadium(HeadResultsChart));
