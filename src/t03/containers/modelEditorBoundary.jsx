import React, { Component, PropTypes } from 'react';
import {
    Action
} from '../actions/index';
import {boundary} from '../selectors/index';
import { maxBy, minBy } from 'lodash';

import ConfiguredRadium from 'ConfiguredRadium';
import FilterableList from '../../components/primitive/FilterableList';
import RiverProperties from '../../components/modflow/RiverProperties';
import WellProperties from '../../components/modflow/WellProperties';
import { connect } from 'react-redux';
import styleGlobals from 'styleGlobals';
import uuid from 'uuid';
import { withRouter } from 'react-router';
import {BoundaryOverview} from "../../t03/containers/index";
import Input from '../../components/primitive/Input';

import {
    Command,
} from '../../t03/actions/index';
import {makeMapStateToPropsBoundaries} from "../../core/dataTable/selectors";
import {editBoundary} from "../../routes";

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
    },

    searchWrapper: {
        marginBottom: 6
    },
};

@ConfiguredRadium
class ModelEditorBoundary extends Component {

    static propTypes = {
        style: PropTypes.object,
        id: PropTypes.string,
        boundary: PropTypes.object,
        boundaryType: PropTypes.string,
        updateBoundary: PropTypes.func.isRequired,
        addBoundary: PropTypes.func.isRequired,
        boundaries: PropTypes.array,
        updatePumpingRate: PropTypes.func.isRequired,
        addPumpingRate: PropTypes.func.isRequired,
        // saveBoundary: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        };
    }

    handleSearchTerm = value => {
        this.setState(function(prevState, props){
            return {
                ...prevState,
                    searchTerm: value
            };
        });
    };

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
        // // eslint-disable-next-line no-shadow
        // const { saveBoundary, id } = this.props;
        // saveBoundary( id, bid );
        // TODO
    }

    renderProperties( boundaries ) {
        const {
            updateBoundary,
            removeBoundary, // eslint-disable-line no-shadow
            setEditorState, // eslint-disable-line no-shadow
            updatePumpingRate, // eslint-disable-line no-shadow
            addPumpingRate // eslint-disable-line no-shadow
        } = this.props;

        const {type, id, pid, property} = this.props.params;

        if ( pid ) {
            const boundary = boundaries.filter(b => ( b.type === type && b.id === pid ))[0];

            // TODO message if boundary is not available
            if (boundary) {
                switch ( type ) {
                    case 'wel':
                        return (
                            <WellProperties setEditorState={setEditorState} well={boundary} updateWell={updateBoundary}
                                            updatePumpingRate={updatePumpingRate} addPumpingRate={addPumpingRate}
                                            saveWell={this.saveBoundary}/> );
                    case 'riv':
                        return (<RiverProperties setEditorState={setEditorState} river={boundary}
                                                 updateRiver={updateBoundary}/> );
                }
            }
        }

        return (<BoundaryOverview tool={'T03'} property={property}
                                  id={id} type={type} removeBoundary={removeBoundary}
                                  boundaries={boundaries}/> );
    }


    onBoundaryClick = (boundaryId, type) => {
        const {tool} = this.props;
        const {id, property} = this.props.params;

        editBoundary(tool, id, property, type, boundaryId);
    };

    render( ) {
        // eslint-disable-next-line no-shadow
        const { style, boundaries, boundaryType } = this.props;

        const {searchTerm} = this.state;

        let list = boundaries;

        if (searchTerm) {
            const regex = new RegExp(searchTerm, 'i');
            list = list.filter(i => {
                return regex.test(i.name);
            });
        }

        return (
            <div style={[ styles.container, style ]}>
                <div style={styles.left}>
                    <div style={styles.searchWrapper}>
                        <Input type="search" name="searchTerm"
                               placeholder="search..." value={this.state.searchTerm}
                               onChange={this.handleSearchTerm}/>
                    </div>
                    <FilterableList itemClickAction={this.onBoundaryClick}
                                    list={boundary.getBoundaryObjects( list ).map( b => b.toObject )}
                                    activeType={boundaryType}/>
                </div>
                <div style={styles.properties}>
                    {this.renderProperties(list )}
                </div>
            </div>
        );
    }
}

const actions = {
    updateBoundary: Action.updateBoundary,
    addBoundary: Action.addBoundary,
    updatePumpingRate: Action.updatePumpingRate,
    addPumpingRate: Action.addPumpingRate,
    removeBoundary: Command.removeBoundary,
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
ModelEditorBoundary = withRouter( connect( makeMapStateToPropsBoundaries, mapDispatchToProps )( ModelEditorBoundary ));

export default ModelEditorBoundary;
