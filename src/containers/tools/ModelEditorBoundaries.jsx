import React, { Component, PropTypes } from 'react';
import { addBoundary, setActiveBoundary, setActiveBoundaryType, setState, updateBoundary } from '../../actions/modelEditor';
import { maxBy, minBy } from 'lodash';

import ConfiguredRadium from 'ConfiguredRadium';
import FilterableList from '../../components/primitive/FilterableList';
import Tab from '../../components/primitive/Tab';
import Tabs from '../../components/primitive/Tabs';
import WellProperties from '../../components/modflow/WellProperties';
import RiverProperties from '../../components/modflow/RiverProperties';
import { connect } from 'react-redux';
import { getActiveBoundary, getActiveBoundaryType } from '../../reducers/ModelEditor/ui';
import { getArea } from '../../reducers/ModelEditor/general';
import { getBoundaries } from '../../reducers/ModelEditor/boundaries';
import styleGlobals from 'styleGlobals';
import uuid from 'uuid';
import BoundariesOverview from '../../components/modflow/BoundariesOverview';

const styles = {
    container: {
        display: 'flex'
    },

    left: {
        width: styleGlobals.dimensions.gridColumn,
        marginRight: styleGlobals.dimensions.gridGutter,
        display: 'flex',
        flexDirection: 'column'
    },

    properties: {
        flex: 1
    }
};

@ConfiguredRadium
class ModelEditorBoundaries extends Component {

    static propTypes = {
        style: PropTypes.object,
        boundary: PropTypes.string,
        boundaryType: PropTypes.string,
        setActiveBoundary: PropTypes.func.isRequired,
        setActiveBoundaryType: PropTypes.func.isRequired,
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
        const { updateBoundary, setState, boundaryType, boundaries } = this.props;

        if ( activeBoundary ) {
            switch ( activeBoundary.type ) {
                case 'WEL':
                    return (
                        <Tabs>
                            <Tab title="Summary">
                                <WellProperties setState={setState} well={activeBoundary} updateWell={updateBoundary}/>
                            </Tab>
                            <Tab title="Pumping Rates">Tab 2 Lorem Ipsum ...</Tab>
                        </Tabs>
                    );
                case 'RIV':
                    return (
                        <Tabs>
                            <Tab title="Summary">
                                <RiverProperties setState={setState} river={activeBoundary} updateRiver={updateBoundary}/>
                            </Tab>
                            <Tab title="OB 1">Tab 2 Lorem Ipsum ...</Tab>
                        </Tabs>
                    );
            }
        }

        if ( boundaryType ) {
            return ( <BoundariesOverview boundaries={boundaries.filter(b => ( b.type === boundaryType ))} type={boundaryType} setState={setState} /> );
        }

        return ( <BoundariesOverview boundaries={boundaries}/> );
    }

    setActiveBoundaryType = type => {
        // eslint-disable-next-line no-shadow
        const { setActiveBoundary, setActiveBoundaryType } = this.props;
        setActiveBoundary( null );
        setActiveBoundaryType( type );
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
                    <FilterableList itemClickAction={setActiveBoundary} groupClickAction={this.setActiveBoundaryType} list={boundaries}/>
                </div>
                <div style={styles.properties}>
                    {this.renderProperties( activeBoundary )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, { tool }) => {
    return {
        boundary: getActiveBoundary( state[tool].ui ),
        boundaryType: getActiveBoundaryType( state[tool].ui ),
        boundaries: getBoundaries( state[tool].model.boundaries ),
        area: getArea( state[tool].model.general )
    };
};

const actions = {
    setActiveBoundary,
    setActiveBoundaryType,
    updateBoundary,
    setState,
    addBoundary
};

const mapDispatchToProps = (dispatch, { tool }) => {
    const wrappedActions = {};
    for ( const key in actions ) {
        if (actions.hasOwnProperty( key )) {
            // eslint-disable-next-line no-loop-func
            wrappedActions[key] = function( ) {
                const args = Array.prototype.slice.call( arguments );
                dispatch(actions[key]( tool, ...args ));
            };
        }
    }

    return wrappedActions;
};

// eslint-disable-next-line no-class-assign
ModelEditorBoundaries = connect( mapStateToProps, mapDispatchToProps )( ModelEditorBoundaries );

export default ModelEditorBoundaries;
