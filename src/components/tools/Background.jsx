import '../../less/toolSketch.less';

import React from 'react';
import { pure } from 'recompose';

export default pure( ({image}) => {
    return (
        <div>
            <h2>Background</h2>
            <div className="center-horizontal center-vertical">
                <img className="sketch-image" src={image}/>
            </div>
        </div>
    );
} );
