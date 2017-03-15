import React, { PropTypes, Component } from 'react';

import '../../../less/slider.less';

export default class SliderControl extends Component {

    static propTypes = {
        children: PropTypes.node,
        activeIndex: PropTypes.number,
        setActive: PropTypes.func,
        className: PropTypes.string
    }

    static defaultProps = {
        className: 'slider-control'
    }

    setActive = index => {
        return () => {
            this.props.setActive(index);
        };
    }

    render( ) {
        const { activeIndex, className } = this.props;

        let index = 0;
        const children = React.Children.map(this.props.children, ( child ) => {
            const currentIndex = index++;
            const active = ( currentIndex === activeIndex );
            return React.cloneElement(child, {
                setActive: this.setActive(currentIndex),
                active
            });
        });

        return(
            <div className={className} >
                {children}
            </div>
        );
    }
}
