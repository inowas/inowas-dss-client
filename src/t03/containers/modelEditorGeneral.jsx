import React, { Component, PropTypes } from 'react';
import {
    Query, Command, Action
} from '../actions/index';
import {
    model, general
} from '../selectors/index';
import ConfiguredRadium from 'ConfiguredRadium';
import Icon from '../../components/primitive/Icon';
import { connect } from 'react-redux';
import styleGlobals from 'styleGlobals';
import { browserHistory, withRouter } from 'react-router';
import {getErrorMessage, getRequestStatus, hasError, isLoading} from '../../core/webData/selectors/webData';
import uuid from "uuid";
import * as filters from "../../calculations/filter";
import ModelEditorGeneralMap from "../../components/modflow/ModelEditorGeneralMap";

const styles = {
    container: {
        maxHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginTop: 0,
        marginBottom: 'auto'
    },

    content: {
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden'
    },

    generalTr: {
        padding: styleGlobals.dimensions.spacing.small
    },

    labelTr: {
        textAlign: 'right'
    },

    addCoordinateWrapper: {
        marginTop: '2em'
    }
};


const initialState = {
    modflowModel: model.getInitialState()
};

@ConfiguredRadium
class ModelEditorGeneral extends Component {

    static propTypes = {
        style: PropTypes.object,
        editModelArea: PropTypes.func,
        setEditorState: PropTypes.func,
        createModel: PropTypes.func,
        createModelArea: PropTypes.func,
        setModflowModel: PropTypes.func,
        webData: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = initialState;

        this.handleInputChangeModflow = this.handleInputChangeModflow.bind(this);
    }

    componentWillReceiveProps(newProps){
        this.setState(function(prevState, props){
            return { ...prevState, modflowModel: newProps.modflowModel };
        } );
    }

    componentWillMount(){
        const modflowModel = this.props.modflowModel ? this.props.modflowModel : model.getInitialState();

        this.setState(function(prevState, props){
            return { ...prevState, modflowModel };
        } );
    }

    componentWillUnmount(){
        this.props.setModflowModel(this.state.modflowModel);
    }

    componentWillUpdate() {
        if ( this.refs.map ) {
            this.refs.map.leafletElement.fitBounds(this.getModflowModelState('bounding_box'));
        }
    }

    handleInputChangeModflow(event, key) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const filter = target.dataset.filter;

        if (filter) {
            value = filters[filter](value);
        }

        this.setState(function(prevState, props){
            if (key) {
                return {
                    ...prevState,
                    modflowModel: {
                        ...prevState.modflowModel,
                        [key]: {
                            ...prevState.modflowModel[key],
                            [name]: value
                        }
                    }
                };
            }

            return {
                ...prevState,
                modflowModel: {
                    ...prevState.modflowModel,
                    [name]: value
                }
            };
        });
    }

    handleInputChangeModflowBoundingBox(event, index, key) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;

        const filter = target.dataset.filter;

        if (filter) {
            value = filters[filter](value);
        }
        this.setState(function(prevState, props){
            return {
                ...prevState,
                modflowModel: {
                    ...prevState.modflowModel,
                    bounding_box: prevState.modflowModel.bounding_box.map((item, i) => {
                        if(i !== index) {
                            return item;
                        }
                        item[key] = value;
                        return item;
                    })
                }
            };
        });
    }

    getModflowModelState(name) {
        return this.state['modflowModel'][name];
    }

    editAreaOnMap = ( ) => {
        this.props.editModelArea();
        browserHistory.push(this.props.location.pathname + '#edit');
    };

    createAreaOnMap = ( ) => {
        this.setState(function(prevState, props){
            browserHistory.push(this.props.location.pathname + '#edit');
            return {
                ...prevState,
                modflowModel: {
                    ...prevState.modflowModel,
                    geometry: { create: true }
                }
            };
        });
    };

    save(id) {
        if (id) {
            this.props.updateModflowModel(
                id,
                this.state.modflowModel
            );
            return;
        }

        this.props.createModflowModel(
            uuid.v4(),
            this.state.modflowModel
        );
    }

    renderMapAndSaveButton = () => {
        const { webData } = this.props;
        const { id } = this.props.params;

        // TODO prevent onClick triggers if disabled and make that css works
        const disabled = isLoading(webData[Command.UPDATE_MODFLOW_MODEL]) ? 'disabled' : '';
        const btnClass = isLoading(webData[Command.UPDATE_MODFLOW_MODEL]) ? 'button button-accent is-disabled' : 'button button-accent';

        if (id) {
            return (
                <section className="col col-rel-3 stretch">
                    <button onClick={this.editAreaOnMap} className="link"><Icon name="marker"/>Edit on Map</button>
                    <ModelEditorGeneralMap model={this.props.modflowModel} />
                    <button disabled={disabled} onClick={() => this.save(id)} className={btnClass}>Save</button>
                </section>
            )
        }

        return (
            <section className="col col-rel-3 stretch">
                <button onClick={this.createAreaOnMap} className="link"><Icon name="marker"/>Draw on Map</button>
                <ModelEditorGeneralMap model={this.props.modflowModel} />
                <button disabled={disabled} onClick={() => {this.save()}} className={btnClass}>Create Model</button>
            </section>
        )
    };

    render( ) {
        const { webData } = this.props;
        const { id } = this.props.params;

        if (id && isLoading(webData[Query.GET_MODFLOW_MODEL])) {
            // TODO move to dump component
            return (
                <p>Loading ...</p>
            );
        }
        if (id && hasError(webData[Query.GET_MODFLOW_MODEL])) {
            // TODO move to dump component
            return (
                <p>Error while loading ... ({getErrorMessage(webData[Query.GET_MODFLOW_MODEL])})</p>
            );
        }

        return (
            <div>
                <div className="grid-container">
                    <section className="col col-rel-2 stacked">
                        <form>
                            <div className="form-group">
                                <label>Name</label>
                                <input className="input" name="name" value={this.getModflowModelState( "name" )}
                                       onChange={this.handleInputChangeModflow}
                                       placeholder="Name"/>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea className="input" name="description"
                                          value={this.getModflowModelState( "description" )}
                                          onChange={this.handleInputChangeModflow}
                                          placeholder="Description"/>
                            </div>
                            <div className="form-group">
                                <label>Time Unit</label>
                                <select className="select" name="time_unit"
                                        value={this.getModflowModelState( "time_unit" )}
                                        onChange={this.handleInputChangeModflow}
                                        data-filter="filterInt">
                                    <option value="1">Second</option>
                                    <option value="2">Minute</option>
                                    <option value="3">Hour</option>
                                    <option value="4">Day</option>
                                    <option value="5">Year</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Length Unit</label>
                                <select className="select" name="length_unit"
                                        data-filter="filterInt"
                                        value={this.getModflowModelState( "length_unit" )}
                                        onChange={this.handleInputChangeModflow}>
                                    <option value="1">Centimeter</option>
                                    <option value="2">Meter</option>
                                    <option value="3">Feet</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Grid Resolution</label>
                                <div className="grid-container">
                                    <section className="col col-rel-2 stacked">
                                        <input type="number" name="n_x" min="1" step="1" className="input"
                                               value={this.getModflowModelState( "grid_size" ).n_x}
                                               data-filter="filterInt"
                                               onChange={( e ) => this.handleInputChangeModflow( e, "grid_size" )}
                                               placeholder="X="/>
                                    </section>
                                    <section className="col col-rel-2 stacked">
                                        <input type="number" name="n_y" min="1" step="1" className="input"
                                               value={this.getModflowModelState( "grid_size" ).n_y}
                                               data-filter="filterInt"
                                               onChange={( e ) => this.handleInputChangeModflow( e, "grid_size" )}
                                               placeholder="Y="/>
                                    </section>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Bounding Box</label>
                                <div className="grid-container">
                                    <section className="col col-rel-2 stacked">
                                        <input type="number" name="x_min" className="input"
                                               data-filter="filterFloat"
                                               value={this.getModflowModelState( "bounding_box")[0][0]}
                                               onChange={( e ) => this.handleInputChangeModflowBoundingBox( e, 0, 0 )}
                                               placeholder="X="/>
                                    </section>
                                    <section className="col col-rel-2 stacked">
                                        <input type="number" name="x_max" className="input"
                                               data-filter="filterFloat"
                                               value={this.getModflowModelState( "bounding_box")[1][0]}
                                               onChange={( e ) => this.handleInputChangeModflowBoundingBox( e, 1, 0 )}
                                               placeholder="x_max="/>
                                    </section>
                                </div>
                                <div className="grid-container">
                                    <section className="col col-rel-2 stacked">
                                        <input type="number" name="y_min" className="input"
                                               data-filter="filterFloat"
                                               value={this.getModflowModelState( "bounding_box")[0][1]}
                                               onChange={( e ) => this.handleInputChangeModflowBoundingBox( e, 0, 1 )}
                                               placeholder="X="/>
                                    </section>
                                    <section className="col col-rel-2 stacked">
                                        <input type="number" name="y_max" className="input"
                                               data-filter="filterFloat"
                                               value={this.getModflowModelState( "bounding_box")[1][1]}
                                               onChange={( e ) => this.handleInputChangeModflowBoundingBox( e, 1, 1 )}
                                               placeholder="y_max="/>
                                    </section>
                                </div>
                            </div>
                        </form>
                    </section>

                    {this.renderMapAndSaveButton()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, { tool, params }) => {
    return {
        modflowModel: general.getModflowModel(state[tool].model),
        webData: getRequestStatus(state)
    };
};

const actions = {
    createModelArea: Action.createModelArea,
    editModelArea: Action.editModelArea,
    setModflowModel: Action.setModflowModel,
    createModflowModel: Command.createModflowModel,
    updateModflowModel: Command.updateModflowModel,
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
ModelEditorGeneral = withRouter( connect( mapStateToProps, mapDispatchToProps )( ModelEditorGeneral ));

export default ModelEditorGeneral;
