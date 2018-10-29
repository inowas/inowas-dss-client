import React from 'react';
import PropTypes from 'prop-types';
import {pure} from 'recompose';

import '../../less/toolDiagram.less';

import {CartesianGrid, Legend, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis} from 'recharts';

const cbPalette = ['#999999', '#E69F00', '#56B4E9', '#009E73', '#F0E442', '#0072B2', '#D55E00', '#CC79A7'];

const Chart = ({data}) => {
    const scatterLines = data.map(row => {
        if (row.selected) {
            const scatterData = [];
            const xArr = row.x;
            const yArr = row.y;

            if (xArr.length > 0 && xArr.length === yArr.length) {
                for (let i = 0; i < xArr.length; i++) {
                    scatterData.push({x: xArr[i], y: yArr[i]});
                }
            }
            const color = cbPalette[row.id % cbPalette.length];
            return (
                <Scatter key={row.id} name={row.name} data={scatterData} fill={color} line/>
            );
        }

        return null;
    });

    return (
        <div>
            <h2>Infiltration capacity decline</h2>
            <div className="grid-container">
                <div className="col stretch">
                    <div className="diagram">
                        <ResponsiveContainer width={'100%'} aspect={2}>
                            <ScatterChart data={data} margin={{top: 20, right: 30, left: 20, bottom: 0}}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis type="number" dataKey={'x'} name={'Specific volume'} unit={'L/m²'}/>
                                <YAxis type="number" dataKey={'y'} name={'v50/v50o'}/>
                                <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                                <Legend layout={'vertical'} align={'right'} verticalAlign={'top'}
                                        wrapperStyle={{right: 10}}/>
                                {scatterLines}
                            </ScatterChart>
                        </ResponsiveContainer>
                        <div className="diagram-ylabels"><strong>V<sub>50</sub>/V<sub>50o</sub></strong></div>
                        <div className="center-vertical center-horizontal"><strong>Specific volume (L/m<sup>2</sup>)</strong></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Chart.propTypes = {
    data: PropTypes.array.isRequired
};

export default pure(Chart);
