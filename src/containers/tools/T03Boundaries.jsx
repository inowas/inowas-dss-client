import React, { Component, PropTypes } from 'react';
import { setActiveBoundary, updateBoundary } from '../../actions/T03';

import ConfiguredRadium from 'ConfiguredRadium';
import FilterableList from '../../components/primitive/FilterableList';
import Tab from '../../components/primitive/Tab';
import Tabs from '../../components/primitive/Tabs';
import WellProperties from '../../components/modflow/WellProperties';
import { connect } from 'react-redux';
import { getActiveBoundary } from '../../reducers/T03/ui';
import { getBoundaries } from '../../reducers/T03/boundaries';
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
        flex: '1 1 40%',
        borderRight: '1px solid ' + styleGlobals.colors.graySemilight,
        marginRight: styleGlobals.dimensions.spacing.large
    },

    properties: {
        flex: '1 1 60%'
    }
};

@ConfiguredRadium
class T03Boundaries extends Component {

    static propTypes = {
        style: PropTypes.object,
        boundary: PropTypes.string,
        setActiveBoundary: PropTypes.func,
        updateBoundary: PropTypes.func,
        boundaries: PropTypes.array
    }

    renderProperties( activeBoundary ) {
        // eslint-disable-next-line no-shadow
        const { updateBoundary } = this.props;
        if ( activeBoundary ) {
            switch ( activeBoundary.type ) {
                case 'well':
                    return (
                        <Tabs>
                            <Tab title="Summary">
                                <WellProperties well={activeBoundary} updateWell={updateBoundary}/>
                            </Tab>
                            <Tab title="Pumping Rates">Tab 2 Lorem Ipsum ...</Tab>
                        </Tabs>
                    );
                default:
                    return null;
            }
        }

        return null;
    }

    render( ) {
        const {
            style, boundary,
            // eslint-disable-next-line no-shadow
            setActiveBoundary,
            boundaries,
            // eslint-disable-next-line no-shadow, no-unused-vars
            updateBoundary,
            ...rest
        } = this.props;

        const activeBoundary = boundaries.find(b => {
            return b.id === boundary;
        });

        return (
            <div {...rest} style={[ style, styles.container ]}>
                <FilterableList style={styles.list} clickAction={setActiveBoundary} list={boundaries}/> {(activeBoundary === undefined || (
                    <div style={styles.properties}>
                        <h3>{activeBoundary.name}</h3>
                        {this.renderProperties( activeBoundary )}
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        boundary: getActiveBoundary( state.T03.ui ),
        boundaries: getBoundaries( state.T03.model.boundaries )
    };
};

// eslint-disable-next-line no-class-assign
T03Boundaries = connect(mapStateToProps, { setActiveBoundary, updateBoundary })( T03Boundaries );

export default T03Boundaries;
