import React from 'react';
import {pure} from 'recompose';
import PropTypes from 'prop-types';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

const cbPalette = ['#999999', '#E69F00', '#56B4E9', '#009E73', '#F0E442', '#0072B2', '#D55E00', '#CC79A7'];

const Info = ({data}) => {

    const barChartData1 = [];
    data.map(row => {
        if (row.selected) {
            barChartData1.push({
                name: row.name,
                micr: row.micr,
                reduction: row.reduction
            });
        }
    });

    const barChartData2 = [];
    data.map(row => {
        if (row.selected) {
            barChartData2.push({
                name: row.name,
                lpsv: row.lpsv,
                dpsv: row.dpsv
            });
        }
    });

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
            <ResponsiveContainer width={'100%'} aspect={1.5}>
                <BarChart data={barChartData1} margin={{top: 5, right: 30, left: 0, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="micr" fill="#0072B2"/>
                    <Bar dataKey="reduction" fill="#E69F00"/>
                </BarChart>
            </ResponsiveContainer>
            <ResponsiveContainer width={'100%'} aspect={1.5}>
                <BarChart data={barChartData2} margin={{top: 5, right: 30, left: 0, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="lpsv" fill="#0072B2"/>
                    <Bar dataKey="dpsv" fill="#E69F00"/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

Info.propTypes = {
    data: PropTypes.array.isRequired
};

export default pure(Info);
