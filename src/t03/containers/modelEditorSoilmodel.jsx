import React from 'react';
import PropTypes from 'prop-types';
import ConfiguredRadium from 'ConfiguredRadium';
import FilterableList from '../../components/primitive/FilterableList';
import {connect} from 'react-redux';
import styleGlobals from 'styleGlobals';
import {withRouter} from 'react-router';
import {Routing} from '../actions';
import * as lodash from 'lodash';
import {Command} from '../../t03/actions/index';
import {
    SoilmodelGeneral,
    SoilModelLayerOverview,
    SoilmodelLayer
} from '../components';
import Input from '../../components/primitive/Input';
import {getInitialLayerState} from '../selectors/model';
import uuid from 'uuid';
import {WebData} from '../../core';
import * as Query from '../actions/queries';

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
class ModelEditorSoilmodel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        };
    }

    onLayerClick = pid => {
        const {routes, params} = this.props;

        Routing.editLayer(routes, params)(pid);
    };

    onSave = data => {
        const {id} = this.props.params;

        this.props.updateLayer(id, data);
    };

    onCreateLayer = () => {
        const {id} = this.props.params;
        const {routes, params} = this.props;

        this.props.createLayer(
            id,
            {
                id: uuid.v4(),
                ...getInitialLayerState()
            },
            routes,
            params
        );
    };

    handleSearchTerm = value => {
        this.setState(function(prevState) {
            return {
                ...prevState,
                searchTerm: value
            };
        });
    };

    renderProperties(soilmodel) {
        const readOnly = !lodash.includes(this.props.permissions, 'w');
        const {addLayerStatus, removeLayer, updateLayerStatus} = this.props;
        const {pid, property, id} = this.props.params;
        const {area, boundingBox, gridSize, isLoading, params, routes} = this.props;

        if (pid) {
            const layer = soilmodel.layers.filter(b => b.id === pid)[0];
            if (layer) {
                return (
                    <SoilmodelLayer
                        area={area}
                        onSave={this.onSave}
                        boundingBox={boundingBox}
                        gridSize={gridSize}
                        layer={layer}
                        readOnly={readOnly}
                        updateLayerStatus={updateLayerStatus}
                        isLoading={isLoading}
                    />
                );
            }

            return <p>Loading ...</p>;
        }

        return (
            <div>
                <SoilmodelGeneral soilmodel={soilmodel} readOnly={readOnly}/>
                <SoilModelLayerOverview
                    id={id}
                    property={property}
                    readOnly={readOnly}
                    removeLayer={removeLayer}
                    createLayer={this.onCreateLayer}
                    editLayer={Routing.editLayer(routes, params)}
                    layers={soilmodel.layers}
                    addLayerStatus={addLayerStatus}
                />
            </div>
        );
    }

    render() {
        const {soilmodel} = this.props;

        if (!soilmodel) {
            return null;
        }

        const {searchTerm} = this.state;
        let list = soilmodel.layers || [];

        if (searchTerm) {
            const regex = new RegExp(searchTerm, 'i');
            list = list.filter(i => {
                return regex.test(i.name);
            });
        }

        return (
            <div style={[styles.container]}>
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
                        itemClickAction={this.onLayerClick}
                        list={list}
                    />
                </div>
                <div style={styles.properties}>
                    {this.renderProperties(soilmodel)}
                </div>
            </div>
        );
    }
}

const actions = {
    createLayer: Command.addLayer,
    removeLayer: Command.removeLayer,
    updateLayer: Command.updateLayer
};

const mapStateToProps = (state, {tool}) => {
    return {
        area: state[tool].model.geometry,
        boundingBox: state[tool].model.bounding_box,
        gridSize: state[tool].model.grid_size,
        soilmodel: state[tool].model.soilmodel,
        permissions: state[tool].model.permissions,
        addLayerStatus: WebData.Selector.getStatusObject(
            state,
            Command.ADD_LAYER
        ),
        updateLayerStatus: WebData.Selector.getStatusObject(
            state,
            Command.UPDATE_LAYER
        ),
        isLoading: WebData.Selector.getRequestStatusByType(
            state,
            Query.GET_MODFLOW_MODEL_DETAILS
        ).type !== 'success'
    };
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

// eslint-disable-next-line no-class-assign
ModelEditorSoilmodel = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ModelEditorSoilmodel)
);

ModelEditorSoilmodel.propTypes = {
    addLayerStatus: PropTypes.object,
    createLayer: PropTypes.func,
    gridSize: PropTypes.object,
    isLoading: PropTypes.bool,
    params: PropTypes.object,
    permissions: PropTypes.string,
    removeLayer: PropTypes.func,
    routes: PropTypes.array,
    soilmodel: PropTypes.object,
    tool: PropTypes.string.isRequired,
    updateLayer: PropTypes.func,
    updateLayerStatus: PropTypes.object
};

export default ModelEditorSoilmodel;
