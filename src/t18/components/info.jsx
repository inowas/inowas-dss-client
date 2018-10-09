import React from 'react';
import PropTypes from 'prop-types';
import {
    calcAN,
    calcAH,
    calcAO,
    isCtoHigh
} from '../calculations/calculationT18';

const renderCoWarning = (CoToHigh) => {
    if (CoToHigh) {
        return (
            <p>
                <i className="glyphicon glyphicon-warning-sign pull-right"/>
                C<sub>o</sub> is too high and a better pre-treatment is necessary.
            </p>
        );
    }

    return (
        <p>
            <i className="glyphicon glyphicon-warning-sign pull-right"/>
            C<sub>o</sub> is within acceptable loading.
        </p>
    );
};

const renderCnWarning = (CnToHigh) => {
    if (CnToHigh) {
        return (
            <p>
                <i className="glyphicon glyphicon-warning-sign pull-right"/>
                C<sub>n</sub> is too high and a better pre-treatment is necessary.
            </p>
        );
    }

    return (
        <p>
            <i className="glyphicon glyphicon-warning-sign pull-right"/>
            C<sub>n</sub> is within acceptable loading.
        </p>
    );
};

const renderText = (AH, AN, AO) => {
    const maxA = Math.max(AH, AN, AO);

    if (maxA === AH) {
        return (
            <p>
                <b>Infiltration rate</b> is defining the estimated field area. The area can be reduced by lowering the
                flow rate (Q).
            </p>
        );
    }

    if (maxA === AN) {
        return (
            <p>
                <b>Nitrogen loading</b> is defining the estimated field area. The area can be reduced by lowering the
                flow rate (Q) or by the pre-treatment of infiltration water for the reduction of nitrogen concentration.
            </p>
        );
    }


    return (
        <p>
            <b>BOD loading</b> is defining the estimated field area. The area can be reduced by lowering the flow
            rate
            (Q) or by the pre-treatment of infiltration water for the reduction of organic matter concentration.
        </p>
    );
};

const Info = ({LLRN, LLRO, AF, Q, IR, OD, Cn, Co}) => {

    const CoToHigh = isCtoHigh(Co, IR, AF, OD, LLRO);
    const AH = calcAH(Q, IR, AF);
    const AN = calcAN(Cn, IR, AF, OD, LLRN, Q);
    const AO = calcAO(Co, IR, AF, OD, LLRO, Q);

    return (
        <div className="padding-30">
            <div>
                <div>
                    {renderCoWarning(CoToHigh)}
                    {renderCnWarning()}
                    <p>The required area calculated based on: </p>
                </div>
            </div>
            <div>
                <ul>
                    <li> Infiltration rate = {AH.toFixed(2)} m<sup>2</sup></li>
                    <li> BOD loading = {AO.toFixed(2)} m<sup>2</sup></li>
                    <li> Nitrogen loading = {AN.toFixed(2)} m<sup>2</sup></li>
                </ul>
            </div>
            <div className="center-vertical center-horizontal">
                {renderText(AH, AN, AO)}
            </div>
        </div>
    );
};

Info.propTypes = {
    LLRN: PropTypes.number.isRequired,
    LLRO: PropTypes.number.isRequired,
    AF: PropTypes.number.isRequired,
    Q: PropTypes.number.isRequired,
    IR: PropTypes.number.isRequired,
    OD: PropTypes.number.isRequired,
    Cn: PropTypes.number.isRequired,
    Co: PropTypes.number.isRequired,
};

export default Info;
