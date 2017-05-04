import '../../less/toolSketch.less';

import React, { Component, PropTypes } from 'react';

export default class Background extends Component {

    static propTypes = {
        image: PropTypes.string
    }

    render( ) {
        const { image } = this.props;
        return (
            <div>
                <h2>Background</h2>
                <div className="center-horizontal center-vertical">
                    <img className="sketch-image" src={image}/>
                </div>
            </div>
        );
    }
}
