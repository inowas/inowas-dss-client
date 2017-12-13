import React from 'react';

export  function calculateQ(k, d, df, ds) {
    return (0.6 * Math.PI * d * d * k * dRo(df, ds));
}

export  function calculateZCrit(d) {
    return 0.3 * d;
}

export  function calculateZ(q, k, d, df, ds) {
    return (q/(2*Math.PI*d*k*dRo(df, ds)));
}

export function dRo(df, ds){
    return ((ds-df)/df);
}

const Info = ({q, k, d, df, ds}) => {
    const z = calculateZ(q, k, d, df, ds);
    const qmax = calculateQ(k, d, df, ds);
    const zCrit = calculateZCrit(d);

    if (Number(z) > Number(zCrit)) {
        return (
            <div className="padding-30">
                <h2>
                    Warning
                    <i className="glyphicon glyphicon-warning-sign pull-right"/>
                </h2>

                <div className="center-vertical center-horizontal">
                    <p>
                        The calculated upconing level of <strong>{z.toFixed(2)} m </strong>
                        is higher than the critical elevation of <strong>{zCrit.toFixed(1)} m</strong>.
                        At the current pumping rate, saltwater might enter the well.
                        We recommend a maximum pumping rate of <strong>{qmax.toFixed(2)} m<sup>3</sup>/d</strong>.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="padding-30">
            <h2>
                OK
                <i className="glyphicon glyphicon-ok-circle pull-right"/>
            </h2>

            <div className="center-vertical center-horizontal">
                <p>
                    The calculated upconing level of <strong>{z.toFixed(2)} m </strong>
                    is lower than the critical elevation of <strong>{zCrit.toFixed(1)} m </strong>
                    so saltwater shouldn't enter the well. However, we recommend a maximum
                    pumping rate of <strong>{qmax.toFixed(2)} m<sup>3</sup>/d</strong>.
                </p>
            </div>
        </div>
    );
};

export default Info;
