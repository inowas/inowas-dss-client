import React, { PropTypes, Component } from 'react';

import Icon from './Icon';

import '../../../less/slider.less';

export default class Slider extends Component {

    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        nextPrevNavigation: PropTypes.bool,
        control: PropTypes.element,
        interval: PropTypes.number,
        activeIndex: PropTypes.number
    }

    static defaultProps = {
        nextPrevNavigation: true,
        interval: 5000,
        activeIndex: 0
    }

    constructor(props) {
        super(props);

        this.state = {
            activeIndex: props.activeIndex
        };
    }

    componentDidMount( ) {
        this.updateSliderHeight( );
        this.startInterval();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.activeIndex !== this.props.activeIndex) {
            this.setActive(nextProps.activeIndex);
        }
    }

    componentDidUpdate( ) {
        this.updateSliderHeight( );
    }

    componentWillUnmount() {
        this.stopInterval();
    }

    incrementInterval;
    startInterval = () => {
        this.incrementInterval = setInterval(this.incrementActive, this.props.interval);
    }

    stopInterval =() => {
        clearInterval(this.incrementInterval);
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

    setActive = index => {
        if ( index < 0 || index >= this.props.children.length ) {
            // eslint-disable-next-line no-console
            console.warn( 'Index out of bounds! Received index of ' + index + ' but got just ' + this.props.children.length + ' elements in Slider!' );
        } else {
            this.setState({ activeIndex: index });
        }
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

        let control = this.props.control;
        if ( control ) {
            control = React.cloneElement(control, {
                setActive: this.setActive,
                activeIndex: this.state.activeIndex
            });
        }

        const { className, nextPrevNavigation } = this.props;

        return (
            <div ref={( slider ) => {
                this.slider = slider;
            }} className={'slider' + ' ' + ( className || '' )} onMouseOver={this.stopInterval} onMouseOut={this.startInterval}>
                {children}
                {nextPrevNavigation && (
                    <div className="next-prev-navigation">
                        <button onClick={this.decrementActive} className="prev-navigation"><Icon name="arrow_left"/></button>
                        <button onClick={this.incrementActive} className="next-navigation"><Icon name="arrow_right"/></button>
                    </div>
                )}
                {control}
            </div>
        );
    }

}
