import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import styleGlobals from 'styleGlobals';

const styles = {
    nav: {
        marginTop: styleGlobals.dimensions.spacing.medium,
        marginBottom: styleGlobals.dimensions.spacing.medium,
        display: 'flex',
        alignItems: 'flex-start',
        width: '100%',
        borderBottom: '1px solid ' + styleGlobals.colors.graySemilight
    },

    navItem: {

        base: {
            padding: styleGlobals.dimensions.spacing.medium,
            cursor: 'pointer',

            ':hover': {
                color: '#000000'
            }
        },

        active: {
            textDecoration: 'underline',
            position: 'relative'
        },

        notFirst: {
            borderLeft: '1px solid ' + styleGlobals.colors.graySemilight
        }
    }
};

@ConfiguredRadium
export default class Tabs extends Component {

    static propTypes = {
        children: PropTypes.node
    }

    state = {
        activeIndex: 0
    }

    setActive = index => {
        return ( ) => {
            this.setState({ activeIndex: index });
        };
    }

    render( ) {
        const {
            // eslint-disable-next-line no-unused-vars
            children,
            ...rest
        } = this.props;

        // inject active prop to children and build the navigation
        let index = 0;
        const nav = [ ];
        const clonedChildren = React.Children.map(this.props.children, ( child ) => {
            const currentIndex = index++;
            const active = ( currentIndex === this.state.activeIndex );

            nav.push(
                <div style={[
                    styles.navItem.base,
                    ( currentIndex !== 0 && styles.navItem.notFirst ),
                    ( active && styles.navItem.active )
                ]} key={currentIndex} onClick={this.setActive( currentIndex )}>
                    {child.props.title}
                </div>
            );

            return React.cloneElement(child, { active });
        });

        return (
            <div {...rest}>
                <div style={styles.nav}>
                    {nav}
                </div>
                {clonedChildren}
            </div>
        );
    }

}
