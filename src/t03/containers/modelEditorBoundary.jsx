import * as lodash from 'lodash';

import {
    ConstantHeadProperties,
    GeneralHeadProperties,
    RechargeProperties,
    BoundaryProperties,
    WellProperties
} from '../components';
import React from 'react';
import {browserHistory, withRouter} from 'react-router';
import {first} from 'lodash';

import {Action} from '../actions/index';
import {BoundaryOverview} from '../../t03/containers/index';
import {Routing} from '../../t03/actions';
import {boundary as BoundarySelector} from '../selectors/index';
import Button from '../../components/primitive/Button';
import {Command} from '../../t03/actions/index';
import ConfiguredRadium from 'ConfiguredRadium';
import FilterableList from '../../components/primitive/FilterableList';
import Icon from '../../components/primitive/Icon';
import Input from '../../components/primitive/Input';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {makeMapStateToPropsBoundaries} from '../selectors/mapState';
import styleGlobals from 'styleGlobals';

const styles = {
    container: {
        display: 'flex',
        height: '100%',
        overflow: 'hidden'
    },

    left: {
        width: styleGlobals.dimensions.gridColumn,
        marginRight: styleGlobals.dimensions.gridGutter,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%'
    },

    properties: {
        flex: 1,
        overflowY: 'auto'
    },

    searchWrapper: {
        marginBottom: 6
    },

    backButtonWrapper: {
        padding: styleGlobals.dimensions.spacing.medium
    }
};

@ConfiguredRadium
class ModelEditorBoundary extends React.Component {
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

    updateBoundary = data => {
        const {id} = this.props.params;
        this.props.updateBoundary(id, data);
    };

    renderProperties(boundaries) {
        const {area, permissions, removeBoundary, mapStyles, setBoundary, updateBoundaryStatus, soilmodelLayers, model} = this.props;

        const readOnly = !lodash.includes(permissions, 'w');

        const {type, id, pid, property} = this.props.params;
        const {params, routes} = this.props;

        if (pid) {
            const boundary = boundaries.filter(b => b.type === type && b.id === pid)[0];
            if (boundary) {
                return (
                    <BoundaryProperties
                        boundaryId={boundary.id}
                        model={model}
                        onDelete={() => removeBoundary(pid, id) || this.onBackButtonClick()}
                        onSave={this.updateBoundary}
                        readOnly={readOnly}
                        updateStatus={updateBoundaryStatus}
                    />
                );
            }
            return <p>Loading ...</p>;
        }
        return (
            <BoundaryOverview
                property={property}
                id={id}
                type={type}
                readOnly={readOnly}
                removeBoundary={removeBoundary}
                editBoundary={Routing.editBoundary(routes, params)}
                createBoundary={Routing.createBoundary(routes, params)}
                editBoundaryOnMap={Routing.editBoundaryOnMap(routes, params)}
                boundaries={boundaries}
            />
        );
    }

    onBoundaryClick = (boundaryId, type) => {
        const {property} = this.props.params;
        const {routes, params} = this.props;

        Routing.editBoundary(routes, params)(property, type, boundaryId);
    };

    onBoundaryTypeClick = type => {
        return () => {
            const {property} = this.props.params;
            const {routes, params} = this.props;

            Routing.goToPropertyType(routes, params)(property, type);
        };
    };

    onBackButtonClick = () => {
        const {params, routes} = this.props;
        const {property, type, pid} = params;

        if (pid) {
            Routing.goToPropertyType(routes, params)(property, type);
        } else if (type) {
            Routing.goToProperty(routes, params)(property);
        }
    };

    render() {
        // eslint-disable-next-line no-shadow
        const {style, boundaries, boundaryType, params} = this.props;
        const {type} = params;

        const {searchTerm} = this.state;

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
                    {type &&
                    <div style={styles.backButtonWrapper}>
                        <Button
                            type="link"
                            onClick={this.onBackButtonClick}
                            icon={<Icon name="arrow_left"/>}
                        >
                            Back to Overview
                        </Button>
                    </div>}
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
    updatePumpingRate: Action.updatePumpingRate,
    addPumpingRate: Action.addPumpingRate,
    removeBoundary: Command.removeBoundary,
    setBoundary: Action.setBoundary,
};

const mapDispatchToProps = (dispatch, {tool}) => {
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
    tool: PropTypes.string.isRequired,
    updateBoundaryStatus: PropTypes.object,
};

// eslint-disable-next-line no-class-assign
ModelEditorBoundary = withRouter(
    connect(makeMapStateToPropsBoundaries, mapDispatchToProps)(
        ModelEditorBoundary
    )
);

export default ModelEditorBoundary;
