import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';

@ConfiguredRadium
export default class Tab extends Component {

    static propTypes = {
        children: PropTypes.node,
        title: PropTypes.string,
        active: PropTypes.bool
    }

    render( ) {
        const { children, active, ...rest } = this.props;

        if (active) {
            return (
                <div {...rest}>
                    {children}
                </div>
            );
        }

        return null;
    }

}
