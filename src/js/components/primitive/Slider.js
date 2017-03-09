import React, { PropTypes, Component } from 'react';

import Icon from './Icon';

import '../../../less/slider.less';

export default class Slider extends Component {

    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string
    }

    state = {
        activeIndex: 0
    }

    componentDidMount( ) {
        this.updateSliderHeight( );
    }

    componentDidUpdate( ) {
        this.updateSliderHeight( );
    }

    sliderItems = [ ]

    updateSliderHeight( ) {
        this.slider.style.height = this.sliderItems[this.state.activeIndex].clientHeight + 'px';
    }

    incrementActive = ( ) => {
        let nextIndex = this.state.activeIndex + 1;

        if ( nextIndex >= this.props.children.length ) {
            nextIndex = 0;
        }

        this.setState({ activeIndex: nextIndex });
    }

    decrementActive = ( ) => {
        let nextIndex = this.state.activeIndex - 1;

        if ( nextIndex < 0 ) {
            nextIndex = this.props.children.length - 1;
        }

        this.setState({ activeIndex: nextIndex });
    }

    render( ) {
        let index = 0;
        const children = React.Children.map(this.props.children, ( child ) => {
            const currentIndex = index++;
            const active = ( currentIndex === this.state.activeIndex );
            return React.cloneElement(child, {
                ref: ( el ) => {
                    this.sliderItems[currentIndex] = el;
                },
                active
            });
        });

        const { className } = this.props;

        return (
            <div ref={( slider ) => {
                this.slider = slider;
            }} className={'slider' + ' ' + ( className || '' )}>
                {children}
                <button onClick={this.decrementActive} className="prev-control"><Icon name="arrow_left"/></button>
                <button onClick={this.incrementActive} className="next-control"><Icon name="arrow_right"/></button>
            </div>
        );
    }

}
