import PropTypes from 'prop-types';
import React from 'react';
import {calcXtQ0Flux, calcXtQ0Head, dRho, calculateDiagramData} from '../calculations/calculationT09E';

const renderInfo = (method, i, data, q0, q0slr) => {
    if (method === 'constFlux') {
        return (
            <div className="center-vertical center-horizontal" style={{padding: 20}}>
                <p>
                    With a hydraulic gradient i of {-i.toFixed(3)} m/m, the calculated distance of the toe of interface prior sea
                    level rise is {Math.abs(data[1].xt).toFixed(1)} m. The distance of the toe of the interface after sea level rise is {Math.abs(data[2].xt).toFixed(1)} m.
                    Therefore, the toe of the freshwater-saltwater interface will move {(Math.abs(data[2].xt) - Math.abs(data[1].xt)).toFixed(2)} m inland caused by sea level
                    rise.
                </p>
            </div>
        );
    }

    return (
        <div className="center-vertical center-horizontal" style={{padding: 20}}>
            <p>
                The off-shore discharge rate pre-sea level rise is {q0.toFixed(2)} m²/d and the toe of the interface is located {Math.abs(data[1].xt).toFixed(1)} m inland.
                After a sea level rise, the off-shore discharge rate decreases to {q0slr.toFixed(2)} m²/d and the toe of the interface is {Math.abs(data[2].xt).toFixed(1)} m inland.
                Therefore, the toe of the freshwater-seawater interface will move {(Math.abs(data[2].xt) - Math.abs(data[1].xt)).toFixed(2)} m inland caused by sea level rise.
            </p>
        </div>
    );
};

const settings = ({method, handleChange, k, z0, l, w, dz, hi, i, df, ds}) => {
    let data;
    let maxIter = false;
    let isValid = true;
    let q0 = 0;
    let q0slr = 0;
    const alpha = dRho(df, ds);
    if (method === 'constHead') {
        const xtQ0Head1 = calcXtQ0Head(k, z0, 0, l, w, hi, alpha);
        const xt = xtQ0Head1[0];
        q0 = xtQ0Head1[1];
        maxIter = xtQ0Head1[2];
        isValid = xtQ0Head1[3];

        const xtQ0Head2 = calcXtQ0Head(k, z0, dz, l, w, hi - dz, alpha);
        const xtSlr = xtQ0Head2[0]; // slr: after sea level rise
        q0slr = xtQ0Head2[1];
        if (maxIter === false) {
            maxIter = xtQ0Head2[2];
        }

        if (isValid) {
            isValid = xtQ0Head2[3];
        }

        data = calculateDiagramData(xt, z0, xtSlr, z0 + dz, isValid);
    }

    if (method === 'constFlux') {
        const [xt, xtSlr] = calcXtQ0Flux(k, z0, dz, l, w, i, alpha);
        data = calculateDiagramData(xt, z0, xtSlr, z0 + dz, isValid);
    }

    return (
        <div>
            <h2>Settings</h2>
            <div className="center-vertical center-horizontal">
                <h4>Please choose the appropriate boundary condition:</h4>
            </div>
            <div className="center-vertical center-horizontal" style={{padding: 20}}>
                <div className="radio-group">
                    <div>
                        <input
                            name="settings"
                            id="radio1"
                            type="radio"
                            value="constHead"
                            checked={method === 'constHead'}
                            onChange={handleChange}
                        />
                        <label htmlFor="radio1">Constant head</label>
                    </div>
                    <div>
                        <input
                            name="settings"
                            id="radio2"
                            type="radio"
                            value="constFlux"
                            checked={method === 'constFlux'}
                            onChange={handleChange}
                        />

                        <label htmlFor="radio2">Constant flux</label>
                    </div>
                </div>
            </div>
            {renderInfo(method, i, data, q0, q0slr)}
        </div>
    );
};

settings.propTypes = {
    handleChange: PropTypes.func.isRequired,
    method: PropTypes.string.isRequired,
    k: PropTypes.number.isRequired,
    l: PropTypes.number.isRequired,
    w: PropTypes.number.isRequired,
    z0: PropTypes.number.isRequired,
    ds: PropTypes.number.isRequired,
    df: PropTypes.number.isRequired,
    dz: PropTypes.number.isRequired,
    hi: PropTypes.number.isRequired,
    i: PropTypes.number.isRequired
};

export default settings;
