import React from 'react';

export  function calculateXwd(L, K, w, hL, h0) {
    return (L/2+K*(hL*hL-h0*h0)/(2*w*L));
}

const Info = ({W, K, L, hL, h0, ne, xi, xe, settings}) => {
    const xwd = calculateXwd(L, K, W, hL, h0).toFixed(1);
    return (
        <div className="padding-30">
            <h2>
                SELECT FLOW DOMAIN
            </h2>

            <div className="center-vertical center-horizontal">
                <p>
                    The regional system is divided into the two subdomains on either side of the water divide.
                    The water divide is located at <strong>{xwd}m</strong>.
                </p>
            </div>
        </div>
    )
};

export default Info