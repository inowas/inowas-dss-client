import React, { PropTypes, Component } from 'react';

import '../../../less/slider.less';

export default class SliderItem extends Component {

    static propTypes = {
        children: PropTypes.node,
        active: PropTypes.bool,
        className: PropTypes.string
    }

    get clientHeight() {
        return this.item.clientHeight;
    }

    render( ) {
        const {active, className, children} = this.props;

        return(
            <div ref={(item) => { this.item = item; }} className={'item' + ' ' + (className || '')} data-active={active}>
                {children}
            </div>
        );
    }

}
