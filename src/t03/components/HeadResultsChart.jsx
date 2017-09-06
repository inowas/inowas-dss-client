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
    data,
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
            if (data) {
                const selectedRowData = data[activeGridCell.y];
                const xAxisTicks = grid.lngOfCellCenters;

                chartData = {
                    x: 'x',
                    columns: [
                        ['x'].concat(xAxisTicks),
                        ['results'].concat(selectedRowData)
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

                let leftBorderIndex = 0;
                for (let i = 0; i < selectedRowData.length; i++) {
                    if (selectedRowData[i] === null) {
                        continue;
                    }

                    leftBorderIndex = i;
                    break;
                }

                let rightBorderIndex = 0;
                for (let i = selectedRowData.length - 1; i >= 0; i--) {
                    if (selectedRowData[i] === null) {
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
    data: PropTypes.array,
    activeCoordinate: PropTypes.object,
    grid: PropTypes.object,
    selectedType: PropTypes.string,
    style: PropTypes.object
};

export default pure(ConfiguredRadium(HeadResultsChart));
