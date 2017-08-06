import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';

@ConfiguredRadium
export default class Accordion extends Component {

    static propTypes = {
        style: PropTypes.object,
        children: PropTypes.node.isRequired,
        firstActive: PropTypes.number
    };

    static defaultProps = {
        firstActive: 0
    };

    constructor( props ) {
        super( props );

        this.state = {
            activeIndex: props.firstActive
        };
    }

    componentDidUpdate( prevProps ) {
        const { firstActive } = this.props;

        if ( firstActive !== prevProps.firstActive ) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ activeIndex: firstActive });
        }
    }

    toggleActiveItem = ( index ) => {
        return ( ) => {
            let newIndex = index;
            if ( index === this.state.activeIndex ) {
                newIndex = null;
            }
            this.setState({ activeIndex: newIndex });
        };
    };

    render( ) {
        const { style } = this.props;

        let index = 0;
        const children = React.Children.map(this.props.children, ( child ) => {
            const currentIndex = index++;
            const active = ( currentIndex === this.state.activeIndex );
            return React.cloneElement(child, {
                index: currentIndex,
                active,
                last: (currentIndex + 1 === this.props.children.length || !( this.props.children instanceof Array )),
                toggleActive: this.toggleActiveItem( currentIndex )
            });
        });

        return (
            <div style={[ style ]}>
                {children}
            </div>
        );
    }
}
