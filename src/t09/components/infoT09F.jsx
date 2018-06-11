import React from 'react';
import PropTypes from 'prop-types';
import * as calc from '../calculations/calculationT09F';

const Info = ({dz, k, z0, l, w, theta, x, df, ds}) => {
    const newXt = calc.calcNewXt({dz, k, z0, l, w, theta, x, df, ds});
    const xt = calc.calcXt({dz, k, z0, l, w, theta, x, df, ds});
    const dxt = calc.calcDeltaXt({dz, k, z0, l, w, theta, x, df, ds});
    const h = calc.calcH({k, l, w, x, df, ds});
    const I = calc.calcI({dz, k, z0, l, w, theta, x, df, ds});

    return (
        <div className="padding-30">
            <h2>
                INFO
                <i className="glyphicon glyphicon-ok-circle pull-right"/>
            </h2>

            <div className="center-vertical center-horizontal">
                <p>
                    The initial toe of the saltwater freshwater interface is located <strong>{xt.toFixed(1)} m</strong> from the inland boundary or <strong>{(l - xt).toFixed(1)} m</strong> from the coast.<br/><br/>
                    Due to sea level rise of <strong>{dz} m</strong>, the toe of the interface will move <strong>{dxt.toFixed(1)} m</strong> inland. The new position of the toe of the interface is thus <strong>{(newXt).toFixed(1)} m</strong> from the inland boundary.<br/><br/>
                    At a distance of <strong>{x} m</strong> from the inland boundary, the initial water table head is <strong>{h.toFixed(1)} m</strong> above sea level and due to sea level rise of <strong>{dz} m</strong>, the water table will rise about <strong>{I.toFixed(2)} m</strong> at that position.
                </p>
            </div>
        </div>
    );
};

Info.propTypes = {
    dz: PropTypes.number.isRequired,
    k: PropTypes.number.isRequired,
    z0: PropTypes.number.isRequired,
    l: PropTypes.number.isRequired,
    w: PropTypes.number.isRequired,
    theta: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    ds: PropTypes.number.isRequired,
    df: PropTypes.number.isRequired
};

export default Info;
