import React, { Component, PropTypes } from 'react';
import ConfiguredRadium from 'ConfiguredRadium';
import FilterableList from '../../components/primitive/FilterableList';
import { connect } from 'react-redux';
import styleGlobals from 'styleGlobals';
import { withRouter } from 'react-router';
import {editlayer} from "../../routes";

import * as lodash from "lodash";

import SoilmodelGeneral from "../components/soilmodelGeneral"
import SoilmodelLayer from "../components/soilmodelLayer"

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
class ModelEditorSoilmodel extends Component {

    onLayerClick = (layerId ) => {
        const {tool} = this.props;
        const {id, property} = this.props.params;
        const type = "!";

        editlayer(tool, id, property, type, layerId);
    };

    renderProperties( soilmodel ) {

        const readOnly = !lodash.includes(this.props.permissions, 'w');
        const { pid } = this.props.params;

        if ( pid ) {
            const layer = soilmodel.layers.filter(b => ( b.id === pid ))[0];
            if (layer) {
                return (
                    <SoilmodelLayer layer={layer} readOnly={readOnly} />
                )
            }

            return <p>Loading ...</p>;
        }

        return (
            <SoilmodelGeneral soilmodel={soilmodel} readOnly={readOnly} />
        );
    }

    render( ) {

        const { soilmodel } = this.props;
        if (! soilmodel) {
            return null;
        }

        const list = soilmodel.layers || [];

        return (
            <div style={[ styles.container ]}>
                <div style={styles.left}>
                     <FilterableList itemClickAction={this.onLayerClick} list={list} />
                </div>
                <div style={styles.properties}>
                    {this.renderProperties( soilmodel )}
                </div>
            </div>
        );
    }
}

const actions = {
};

const mapStateToProps = (state, { tool, params }) => {
    return {
        soilmodel: state[tool].model.soilmodel,
        permissions: state[tool].model.permissions
    };
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
ModelEditorSoilmodel = withRouter( connect( mapStateToProps, mapDispatchToProps )( ModelEditorSoilmodel ));

export default ModelEditorSoilmodel;
