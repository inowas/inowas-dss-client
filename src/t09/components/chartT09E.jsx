import React from 'react';
import PropTypes from 'prop-types';
import {pure} from 'recompose';

import '../../less/toolDiagram.less';

import {
    Bar,
    BarChart,
    Legend,
    ResponsiveContainer,
    XAxis
} from 'recharts';

const Chart = () => {
    return (
        <div>
            <h2>Calculation</h2>
            <div className="grid-container">
                <div className="col stretch">
                    <div className="diagram">
                        <ResponsiveContainer width="100%" aspect={2.0 / 1.0}>
                            <p>CHART HERE</p>
                        </ResponsiveContainer>
                        <div className="diagram-labels-right">
                            <div className="diagram-label">
                                <p>Label here</p>
                            </div>
                            <div className="diagram-label">
                                <p>Label here</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col col-rel-0-5">
                    <ul className="nav nav-stacked" role="navigation">
                        <li><button className="button">PNG</button></li>
                        <li><button className="button">CSV</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

Chart.propTypes = {
    h: PropTypes.number.isRequired,
    df: PropTypes.number.isRequired,
    ds: PropTypes.number.isRequired
};

export default pure(Chart);
