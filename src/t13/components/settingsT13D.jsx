import PropTypes from 'prop-types';
import React from 'react';
import image13B from '../../images/tools/intro_13b.png';
import image13C from '../../images/tools/intro_13c.png';

export function image(xwd) {
    let object= [];
    if (xwd >= 0) {
        object= {
            name: 'Tool 13B',
            img: image13B,
            href: "T13B"
        }
    } else {
        object= {
            name: 'Tool 13C',
            img: image13C,
            href: "T13C"
        }
    }
    return object;
}

export  function calculateXwd(L, K, w, hL, h0) {
    return (L/2+K*(hL*hL-h0*h0)/(2*w*L));
}

const settings = ({W, K, L, hL, h0, redirectTo}) => {
    const xwd = calculateXwd(L, K, W, hL, h0).toFixed(1);
    return (
        <div className="padding-30">
            The water divide is located at {xwd}. Proceed with:
            <div className="center-vertical center-horizontal">
                <a style={{'cursor': 'pointer'}} onClick={() => redirectTo(image(xwd).href)}>
                    <strong>{image(xwd).name}</strong>
                    <img className="sketch-image" src={image(xwd).img} />
                </a>
            </div>
        </div>
    )
};

settings.propTypes = {
    redirectTo: PropTypes.func.isRequired,
};

export default settings;
