import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Action } from '../actions/index';
import { boundary as BoundarySelector } from '../selectors/index';
import { maxBy, minBy, first } from 'lodash';

import ConfiguredRadium from 'ConfiguredRadium';
import FilterableList from '../../components/primitive/FilterableList';
import {
    RiverProperties,
    WellProperties,
    RechargeProperties,
    ConstantHeadProperties,
    GeneralHeadProperties
} from '../components';
import { connect } from 'react-redux';
import styleGlobals from 'styleGlobals';
import uuid from 'uuid';
import { browserHistory, withRouter } from 'react-router';
import { BoundaryOverview } from '../../t03/containers/index';
import Input from '../../components/primitive/Input';
import { Command } from '../../t03/actions/index';
import { editBoundary, goToBoundaryOverview } from '../../routes';
import { makeMapStateToPropsBoundaries } from '../selectors/mapState';
import * as lodash from 'lodash';

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
    }
};

@ConfiguredRadium
class ModelEditorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        };
    }

    handleSearchTerm = value => {
        this.setState(function(prevState, props) {
            return {
                ...prevState,
                searchTerm: value
            };
        });
    };

    handleEditBoundaryOnMap = () => {
        browserHistory.push(this.props.location.pathname + '#edit');
    };

    addBoundary = type => {
        return () => {
            // eslint-disable-next-line no-shadow
            const { addBoundary, area } = this.props;

            addBoundary({
                name: 'New Boundary',
                type,
                optimisic: true,
                id: uuid(),
                lng: (minBy(area, 'lng').lng + maxBy(area, 'lng').lng) / 2,
                lat: (minBy(area, 'lat').lat + maxBy(area, 'lat').lat) / 2
            });
        };
    };

    updateBoundary = data => {
        const { id } = this.props.params;
        this.props.updateBoundary(id, data);
    };

    renderProperties(boundaries) {
        const { area, permissions, removeBoundary, mapStyles } = this.props;

        const readOnly = !lodash.includes(permissions, 'w');

        const { type, id, pid, property } = this.props.params;
        if (pid) {
            const boundary = boundaries.filter(
                b => b.type === type && b.id === pid
            )[0];

            if (boundary) {
                let selected = '';
                switch (type) {
                    case 'wel':
                        return (
                            <WellProperties
                                boundary={boundary}
                                editBoundaryOnMap={() =>
                                    this.handleEditBoundaryOnMap(boundary.id)}
                                area={area}
                                mapStyles={mapStyles}
                                onSave={this.updateBoundary}
                                readOnly={readOnly}
                            />
                        );
                    case 'rch':
                        return (
                            <RechargeProperties
                                editBoundaryOnMap={() =>
                                    this.handleEditBoundaryOnMap(boundary.id)}
                                boundary={boundary}
                                area={area}
                                mapStyles={mapStyles}
                                onSave={this.updateBoundary}
                                readOnly={readOnly}
                            />
                        );
                    case 'riv':
                        selected = first(boundary.observation_points) || [];
                        return (
                            <RiverProperties
                                editBoundaryOnMap={() =>
                                    this.handleEditBoundaryOnMap(boundary.id)}
                                boundary={boundary}
                                selectedObservationPoint={selected.id || null}
                                area={area}
                                mapStyles={mapStyles}
                                onSave={this.updateBoundary}
                                readOnly={readOnly}
                            />
                        );
                    case 'chd':
                        selected = first(boundary.observation_points) || [];
                        return (
                            <ConstantHeadProperties
                                editBoundaryOnMap={() =>
                                    this.handleEditBoundaryOnMap(boundary.id)}
                                boundary={boundary}
                                selectedObservationPoint={selected.id || null}
                                area={area}
                                mapStyles={mapStyles}
                                onSave={this.updateBoundary}
                                readOnly={readOnly}
                            />
                        );

                    case 'ghb':
                        selected = first(boundary.observation_points) || [];
                        return (
                            <GeneralHeadProperties
                                editBoundaryOnMap={() =>
                                    this.handleEditBoundaryOnMap(boundary.id)}
                                boundary={boundary}
                                selectedObservationPoint={selected.id || null}
                                area={area}
                                mapStyles={mapStyles}
                                onSave={this.updateBoundary}
                                readOnly={readOnly}
                            />
                        );
                }
            }
            return <p>Loading ...</p>;
        }
        return (
            <BoundaryOverview
                tool={'T03'}
                property={property}
                id={id}
                type={type}
                removeBoundary={removeBoundary}
                boundaries={boundaries}
            />
        );
    }

    onBoundaryClick = (boundaryId, type) => {
        const { tool } = this.props;
        const { id, property } = this.props.params;

        editBoundary(tool, id, property, type, boundaryId);
    };

    onBoundaryTypeClick = type => {
        return () => {
            const { tool } = this.props;
            const { id, property } = this.props.params;

            goToBoundaryOverview(tool, id, property, type);
        };
    };

    render() {
        // eslint-disable-next-line no-shadow
        const { style, boundaries, boundaryType } = this.props;

        const { searchTerm } = this.state;

        let list = boundaries || [];

        if (searchTerm) {
            const regex = new RegExp(searchTerm, 'i');
            list = list.filter(i => {
                return regex.test(i.name);
            });
        }

        return (
            <div style={[styles.container, style]}>
                <div style={styles.left}>
                    <div style={styles.searchWrapper}>
                        <Input
                            type="search"
                            name="searchTerm"
                            placeholder="search..."
                            value={this.state.searchTerm}
                            onChange={this.handleSearchTerm}
                        />
                    </div>
                    <FilterableList
                        onCategoryClick={this.onBoundaryTypeClick}
                        itemClickAction={this.onBoundaryClick}
                        list={BoundarySelector.getBoundaryObjects(list).map(
                            b => b.toObject
                        )}
                        activeType={boundaryType}
                    />
                </div>
                <div style={styles.properties}>
                    {this.renderProperties(list)}
                </div>
            </div>
        );
    }
}

const actions = {
    updateBoundary: Command.updateBoundary,
    addBoundary: Action.addBoundary,
    updatePumpingRate: Action.updatePumpingRate,
    addPumpingRate: Action.addPumpingRate,
    removeBoundary: Command.removeBoundary
};

const mapDispatchToProps = (dispatch, { tool }) => {
    const wrappedActions = {};
    for (const key in actions) {
        if (actions.hasOwnProperty(key)) {
            // eslint-disable-next-line no-loop-func
            wrappedActions[key] = function() {
                const args = Array.prototype.slice.call(arguments);
                dispatch(actions[key](tool, ...args));
            };
        }
    }

    return wrappedActions;
};

ModelEditorBoundary.propTypes = {
    tool: PropTypes.string.isRequired
};

// eslint-disable-next-line no-class-assign
ModelEditorBoundary = withRouter(
    connect(makeMapStateToPropsBoundaries, mapDispatchToProps)(
        ModelEditorBoundary
    )
);

export default ModelEditorBoundary;
