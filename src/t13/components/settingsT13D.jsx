import PropTypes from 'prop-types';
import React from 'react';
import image13B from '../images/intro_13b.png';
import image13C from '../images/intro_13c.png';

export function image(xwd) {
    let object = [];
    if (xwd >= 0) {
        object = {
            name: 'Tool 13B',
            img: image13B,
            href: 'T13B'
        };
    } else {
        object = {
            name: 'Tool 13C',
            img: image13C,
            href: 'T13C'
        };
    }
    return object;
}

export function calculateXwd(L, K, w, hL, h0) {
    return (L / 2 + K * (hL * hL - h0 * h0) / (2 * w * L));
}

const settings = ({W, K, L, hL, h0, redirectTo}) => {
    const xwd = calculateXwd(L, K, W, hL, h0).toFixed(1);
    return (
        <div>
            <a style={{'cursor': 'pointer'}} onClick={() => redirectTo(image(xwd).href)}>
                <div className="center-vertical center-horizontal">

                    <img className="sketch-image" src={image(xwd).img}/>
                </div>
                <div className="center-vertical center-horizontal">
                    <p>The water divide is located at {xwd} m</p>
                </div>
                <div className="center-vertical center-horizontal">
                    <p>
                        Proceed with: <strong style={{color: 'red'}}>{image(xwd).name}</strong>
                    </p>
                </div>
            </a>
        </div>
    );
};

settings.propTypes = {
    redirectTo: PropTypes.func.isRequired,
    W: PropTypes.number.isRequired,
    K: PropTypes.number.isRequired,
    L: PropTypes.number.isRequired,
    hL: PropTypes.number.isRequired,
    h0: PropTypes.number.isRequired
};

export default settings;
