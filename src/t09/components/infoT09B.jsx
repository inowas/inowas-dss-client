import React from 'react';

export function calculateXT(i, b, rho_f, rho_s) {
    const frac1 = (i*b*rho_f) / (rho_s - rho_f);
    return ((b*b - frac1*frac1)*(rho_s - rho_f)) / (2*i*b);
}

const Info = ({b, i, df, ds}) => {
    const xT = calculateXT(i, b, df, ds);
    return (
        <div className="padding-30">
            <h2>
                Info
                <i className="glyphicon glyphicon-ok-circle pull-right"/>
            </h2>

            <div className="center-vertical center-horizontal">
                <p>
                    Inland extent of the toe of the saltwater interface at the base of the aquifer
                     is <strong>{xT.toFixed(2)} m </strong>.
                </p>
            </div>
        </div>
    );
};

export default Info;
