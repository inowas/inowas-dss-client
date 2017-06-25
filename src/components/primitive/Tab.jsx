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
        // eslint-disable-next-line no-unused-vars
        const { children, active, title, ...rest } = this.props;

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
