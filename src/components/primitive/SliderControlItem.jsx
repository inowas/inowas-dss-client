import React, { PropTypes, Component } from 'react';

import '../../less/slider.less';

export default class SliderControlItem extends Component {

    static propTypes = {
        children: PropTypes.node,
        active: PropTypes.bool,
        setActive: PropTypes.func,
        className: PropTypes.string
    }

    static defaultProps = {
        active: false,
        className: 'slider-control-item'
    }

    render() {
        const { className, children, setActive, active } = this.props;

        return (
            <button className={className} data-active={active} onClick={setActive} >
              {children}
            </button>
        );
    }
}
