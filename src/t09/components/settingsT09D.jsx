import PropTypes from 'prop-types';
import React from 'react';
import {calcLambda, calcMu, calculateQCrit} from '../calculations/calculationT09D';

const renderInfo = (qCrit, Q, xT) => {
    if (Q >= qCrit) {
        return (
            <div className="center-vertical center-horizontal" style={{padding: '0px 20px'}}>
                <p>
                    With the chosen pumping rate of <strong>{Q.toFixed(0)} m³/d</strong>, seawater will intrude
                    about <strong>{xT}</strong> m inland, which is
                    higher than the distance from the well to the coast line.<br/>
                    Seawater will most likely intrude the well.<br/>
                    The critical well discharge is <strong>{qCrit.toFixed(0)}</strong> m³/d.<br/>
                    The pumping rate needs to be kept below that threshold so that seawater will not intrude the well.
                </p>
            </div>
        );
    }

    return (
        <div className="center-vertical center-horizontal" style={{padding: '0px 20px'}}>
            <p>
                With the chosen pumping rate of <strong>{Q.toFixed(0)}</strong> m³/d, seawater will intrude
                about <strong>{xT}</strong> m inland, which is lower than
                the distance from the well to the coast line and hence no seawater will intrude the well.<br/>
                The critical well discharge is <strong>{qCrit.toFixed(0)}</strong> m³/d.<br/>
                The pumping rate needs to be kept below that threshold so that seawater will not intrude the well.
            </p>
        </div>
    );
};

const settings = ({value, handleChange, k, b, q, Q, xw, rhof, rhos, AqType}) => {
    const lambda = calcLambda(k, b, q, xw, rhof, rhos, AqType);
    const mu = calcMu(lambda);
    const qCrit = calculateQCrit(q, mu, xw);
    const xT = '{shouldBeCalculated}';

    return (
        <div>
            <h2>Settings</h2>
            <div className="center-vertical center-horizontal">
                <h4>Please choose the aquifer type:</h4>
            </div>

            <div className="center-vertical center-horizontal" style={{padding: 20}}>
                <div className="radio-group">
                    <div>
                        <input
                            name="settings"
                            id="radio1"
                            type="radio"
                            value="confined"
                            checked={value === 'confined'}
                            onChange={handleChange}
                        />
                        <label htmlFor="radio1">Confined Aquifer</label>
                    </div>
                    <div>
                        <input
                            name="settings"
                            id="radio2"
                            type="radio"
                            value="unconfined"
                            checked={value === 'unconfined'}
                            onChange={handleChange}
                        />

                        <label htmlFor="radio2">Unconfined Aquifer</label>
                    </div>
                </div>
            </div>

            <h2>Info</h2>
            {renderInfo(qCrit, Q, xT)}

        </div>
    );
};

settings.propTypes = {
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    k: PropTypes.number.isRequired,
    b: PropTypes.number.isRequired,
    xw: PropTypes.number.isRequired,
    q: PropTypes.number.isRequired,
    Q: PropTypes.number.isRequired,
    rhos: PropTypes.number.isRequired,
    rhof: PropTypes.number.isRequired,
    AqType: PropTypes.string.isRequired
};

export default settings;
