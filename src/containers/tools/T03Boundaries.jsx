import { setActiveBoundary } from '../../actions/T03';

import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import FilterableList from '../../components/primitive/FilterableList';
import { connect } from 'react-redux';
import { getActiveBoundary } from '../../reducers/T03/ui';
import styleGlobals from 'styleGlobals';

const styles = {
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        display: 'flex'
    },

    list: {
        width: '40%',
        borderRight: '1px solid ' + styleGlobals.colors.graySemilight,
        marginRight: styleGlobals.dimensions.spacing.large
    }
};

@ConfiguredRadium
class T03Boundaries extends Component {

    static propTypes = {
        style: PropTypes.object,
        boundary: PropTypes.string,
        setActiveBoundary: PropTypes.func
    }

    state = {
        boundaries: [
            {
                name: 'Well 1',
                type: 'well'
            }, {
                name: 'Well 2',
                type: 'well'
            }, {
                name: 'Well 3',
                type: 'well'
            }, {
                name: 'Well 4',
                type: 'well'
            }, {
                name: 'Well 5',
                type: 'well'
            }, {
                name: 'Well 6',
                type: 'well'
            }, {
                name: 'River 1',
                type: 'river'
            }, {
                name: 'River 2',
                type: 'river'
            }, {
                name: 'River 3',
                type: 'river'
            }, {
                name: 'River 4',
                type: 'river'
            }, {
                name: 'River 5',
                type: 'river'
            }
        ]
    }

    render( ) {
        const { boundaries } = this.state;
        const {
            style,
            boundary,
            // eslint-disable-next-line no-shadow
            setActiveBoundary,
            ...rest
        } = this.props;

        return (
            <div {...rest} style={[ style, styles.container ]}>
                <FilterableList style={styles.list} clickAction={setActiveBoundary} list={boundaries}/>
                <div>
                    {boundary}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        boundary: getActiveBoundary( state.T03.ui )
    };
};

// eslint-disable-next-line no-class-assign
T03Boundaries = connect( mapStateToProps, { setActiveBoundary } )( T03Boundaries );

export default T03Boundaries;
