import React, { Component, PropTypes } from 'react';
import { addBoundary, setActiveBoundary, setState, updateBoundary } from '../../actions/T03';
import { maxBy, minBy } from 'lodash';

import ConfiguredRadium from 'ConfiguredRadium';
import FilterableList from '../../components/primitive/FilterableList';
import Tab from '../../components/primitive/Tab';
import Tabs from '../../components/primitive/Tabs';
import WellProperties from '../../components/modflow/WellProperties';
import { connect } from 'react-redux';
import { getActiveBoundary } from '../../reducers/T03/ui';
import { getArea } from '../../reducers/T03/general';
import { getBoundaries } from '../../reducers/T03/boundaries';
import styleGlobals from 'styleGlobals';
import uuid from 'uuid';

const styles = {
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        display: 'flex'
    },

    left: {
        flex: '1 1 40%',
        maxWidth: '40%',
        borderRight: '1px solid ' + styleGlobals.colors.graySemilight,
        marginRight: styleGlobals.dimensions.spacing.large,
        display: 'flex',
        flexDirection: 'column'
    },

    list: {
        flex: 1
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
        setActiveBoundary: PropTypes.func.isRequired,
        updateBoundary: PropTypes.func.isRequired,
        addBoundary: PropTypes.func.isRequired,
        boundaries: PropTypes.array,
        setState: PropTypes.func.isRequired,
        area: PropTypes.array
    }

    addBoundary = type => {
        return ( ) => {
            // eslint-disable-next-line no-shadow
            const { addBoundary, area } = this.props;

            addBoundary({
                name: 'New Boundary',
                type,
                optimisic: true,
                id: uuid( ),
                lng: ( minBy( area, 'lng' ).lng + maxBy( area, 'lng' ).lng ) / 2,
                lat: ( minBy( area, 'lat' ).lat + maxBy( area, 'lat' ).lat ) / 2
            });
        };
    }

    renderProperties( activeBoundary ) {
        // eslint-disable-next-line no-shadow
        const { updateBoundary, setState } = this.props;
        if ( activeBoundary ) {
            switch ( activeBoundary.type ) {
                case 'well':
                    return (
                        <Tabs>
                            <Tab title="Summary">
                                <WellProperties setState={setState} well={activeBoundary} updateWell={updateBoundary}/>
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
        // eslint-disable-next-line no-shadow
        const { style, boundary, boundaries, setActiveBoundary } = this.props;

        const activeBoundary = boundaries.find(b => {
            return b.id === boundary;
        });

        return (
            <div style={[ style, styles.container ]}>
                <div style={styles.left}>
                    <FilterableList style={styles.list} clickAction={setActiveBoundary} list={boundaries}/>
                    <button onClick={this.addBoundary( 'well' )} className="button">Add Well</button>
                    <button onClick={this.addBoundary( 'river' )} className="button">Add River</button>
                </div>
                {activeBoundary === undefined || (
                    <div style={styles.properties}>
                        <h3>{activeBoundary.name}</h3>
                        {this.renderProperties( activeBoundary )}
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        boundary: getActiveBoundary( state.T03.ui ),
        boundaries: getBoundaries( state.T03.model.boundaries ),
        area: getArea( state.T03.model.general )
    };
};

// eslint-disable-next-line no-class-assign
T03Boundaries = connect(mapStateToProps, { setActiveBoundary, updateBoundary, setState, addBoundary })( T03Boundaries );

export default T03Boundaries;
