import React, { Component, PropTypes } from 'react';
import {
    addBoundary,
    fetchBoundary,
    setActiveBoundary,
    setActiveBoundaryType,
    setEditorState,
    updateBoundary,
    updatePumpingRate,
    addPumpingRate,
    saveBoundary
} from '../../actions/modelEditor';
import { getActiveBoundary, getActiveBoundaryType } from '../../reducers/ModelEditor/ui';
import { getBoundaries, getBoundary } from '../../reducers/ModelEditor/boundaries';
import { maxBy, minBy } from 'lodash';

import BoundariesOverview from '../../components/modflow/BoundariesOverview';
import ConfiguredRadium from 'ConfiguredRadium';
import FilterableList from '../../components/primitive/FilterableList';
import RiverProperties from '../../components/modflow/RiverProperties';
import WellProperties from '../../components/modflow/WellProperties';
import { connect } from 'react-redux';
import { getArea } from '../../reducers/ModelEditor/general';
import styleGlobals from 'styleGlobals';
import uuid from 'uuid';
import { withRouter } from 'react-router';

const styles = {
    container: {
        display: 'flex',
        maxHeight: '100%'
    },

    left: {
        width: styleGlobals.dimensions.gridColumn,
        marginRight: styleGlobals.dimensions.gridGutter,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%'
    },

    properties: {
        flex: 1
    }
};

@ConfiguredRadium
class ModelEditorBoundaries extends Component {

    static propTypes = {
        style: PropTypes.object,
        id: PropTypes.string,
        boundary: PropTypes.object,
        boundaryType: PropTypes.string,
        setActiveBoundary: PropTypes.func.isRequired,
        setActiveBoundaryType: PropTypes.func.isRequired,
        updateBoundary: PropTypes.func.isRequired,
        addBoundary: PropTypes.func.isRequired,
        boundaries: PropTypes.array,
        setEditorState: PropTypes.func.isRequired,
        area: PropTypes.array,
        fetchBoundary: PropTypes.func.isRequired,
        updatePumpingRate: PropTypes.func.isRequired,
        addPumpingRate: PropTypes.func.isRequired,
        saveBoundary: PropTypes.func.isRequired
    }

    componentDidMount( ) {
        // eslint-disable-next-line no-shadow
        const { boundary, id, fetchBoundary } = this.props;

        if ( boundary ) {
            fetchBoundary( id, boundary.id );
        }
    }

    componentDidUpdate( prevProps ) {
        // eslint-disable-next-line no-shadow
        const { boundary, id, fetchBoundary } = this.props;

        if (boundary && ( !prevProps.boundary || boundary.id !== prevProps.boundary.id )) {
            fetchBoundary( id, boundary.id );
        }
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

    saveBoundary = bid => {
        // eslint-disable-next-line no-shadow
        const { saveBoundary, id } = this.props;
        saveBoundary( id, bid );
    }

    renderProperties( ) {
        const {
            boundary, updateBoundary, // eslint-disable-line no-shadow
            setEditorState, // eslint-disable-line no-shadow
            boundaryType,
            boundaries,
            updatePumpingRate, // eslint-disable-line no-shadow
            addPumpingRate // eslint-disable-line no-shadow
        } = this.props;

        if ( boundary ) {
            switch ( boundary.type.slug ) {
                case 'wel':
                    return ( <WellProperties setEditorState={setEditorState} well={boundary} updateWell={updateBoundary} updatePumpingRate={updatePumpingRate} addPumpingRate={addPumpingRate} saveWell={this.saveBoundary}/> );
                case 'riv':
                    return ( <RiverProperties setEditorState={setEditorState} river={boundary} updateRiver={updateBoundary}/> );
            }
        }

        if ( boundaryType ) {
            return ( <BoundariesOverview boundaries={boundaries.filter(b => ( b.type.slug === boundaryType ))} type={boundaryType} setEditorState={setEditorState}/> );
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
        const { style, boundaries, setActiveBoundary, boundaryType } = this.props;

        return (
            <div style={[ styles.container, style ]}>
                <div style={styles.left}>
                    <FilterableList itemClickAction={setActiveBoundary} groupClickAction={this.setActiveBoundaryType} list={boundaries.map( b => b.toObject )} activeType={boundaryType}/>
                </div>
                <div style={styles.properties}>
                    {this.renderProperties( )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, { tool, params }) => {
    return {
        boundary: getBoundary(state[tool].model.boundaries, getActiveBoundary( state[tool].ui )),
        boundaryType: getActiveBoundaryType( state[tool].ui ),
        boundaries: getBoundaries( state[tool].model.boundaries ),
        area: getArea( state[tool].model ),
        id: params.id
    };
};

const actions = {
    setActiveBoundary,
    setActiveBoundaryType,
    updateBoundary,
    setEditorState,
    addBoundary,
    fetchBoundary,
    updatePumpingRate,
    addPumpingRate,
    saveBoundary
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
ModelEditorBoundaries = withRouter( connect( mapStateToProps, mapDispatchToProps )( ModelEditorBoundaries ));

export default ModelEditorBoundaries;
