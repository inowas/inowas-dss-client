import React, { Component, PropTypes } from 'react';
import {
    createModflowModel,
    setModflowModel,
    updateModel,
    setEditorState, ActionTypeModel,
} from '../../actions/modelEditor';
import {
    getModflowModel
} from '../../reducers/ModelEditor/general';
import ConfiguredRadium from 'ConfiguredRadium';
import Icon from '../../components/primitive/Icon';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import styleGlobals from 'styleGlobals';
import { withRouter } from 'react-router';
import {getRequestStatus, isLoading} from "../../reducers/webData";
import { Map, TileLayer, Polygon } from 'react-leaflet';
import {convertPolygonToPoints, getBoundsOfPolygon} from "../../calculations/geoTools";
import {getInitialState} from "../../reducers/ModelEditor/model";
import uuid from "uuid";
import {stateToCreatePayload} from "../../actions/messageBox";

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
    modflowModel: getInitialState()
};

@ConfiguredRadium
class ModelEditorGeneral extends Component {

    static propTypes = {
        style: PropTypes.object,
        setEditorState: PropTypes.func,
        createModel: PropTypes.func,
        setModflowModel: PropTypes.func,
        updateModel: PropTypes.func,
        webData: PropTypes.array,
        id: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = initialState;

        this.handleInputChangeModflow = this.handleInputChangeModflow.bind(this);
    }

    componentWillMount(){
        this.setState(function(prevState, props){
            return { ...prevState, modflowModel: this.props.modflowModel };
        } );
    }
    componentWillUnmount(){
        this.props.setModflowModel(this.state.modflowModel);
    }

    handleInputChangeModflow(event, key) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

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
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(function(prevState, props){
            let modflowModel = prevState.modflowModel;
            modflowModel['bounding_box'][index][key] = value;
            return {modflowModel};
        });
    }

    getModflowModelState(name) {
        return this.state['modflowModel'][name];
    }

    editAreaOnMap = ( ) => {
        this.props.setEditorState( 'area' );
    };

    save(id) {
        if (id) {
            return;
        }

        this.props.createModflowModel(
            uuid.v4(),
            stateToCreatePayload(this.state['modflowModel'])
        );
    }

    // eslint-disable-next-line no-shadow
    renderArea( area, bounds, editAreaOnMap ) {
        return (
            <div>
                <h3>Area</h3>
                <button onClick={editAreaOnMap} className="link"><Icon name="marker"/>Draw on Map</button>
                <Map className="crossSectionMap" zoomControl={false} bounds={bounds} >
                    <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'/>
                    {(( ) => {
                        if ( area ) {
                            return <Polygon positions={area} />;
                        }
                        return "";
                    })( )}
                </Map>
            </div>
        );
    }

    render( ) {
        const {
            style,
            id,
            // eslint-disable-next-line no-shadow
            webData
        } = this.props;

        // TODO prevent onClick triggers if disabled and make that css works
        const disabled = isLoading(webData.UpdateModel) ? 'disabled' : '';
        const btnClass = isLoading(webData.UpdateModel) ? 'button button-accent is-disabled' : 'button button-accent';

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
                                        onChange={this.handleInputChangeModflow}>
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
                                               onChange={( e ) => this.handleInputChangeModflow( e, "grid_size" )}
                                               placeholder="X="/>
                                    </section>
                                    <section className="col col-rel-2 stacked">
                                        <input type="number" name="n_y" min="1" step="1" className="input"
                                               value={this.getModflowModelState( "grid_size" ).n_y}
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
                                               value={this.getModflowModelState( "bounding_box")[0][0]}
                                               onChange={( e ) => this.handleInputChangeModflowBoundingBox( e, 0, 0 )}
                                               placeholder="X="/>
                                    </section>
                                    <section className="col col-rel-2 stacked">
                                        <input type="number" name="x_max" className="input"
                                               value={this.getModflowModelState( "bounding_box")[1][0]}
                                               onChange={( e ) => this.handleInputChangeModflowBoundingBox( e, 1, 0 )}
                                               placeholder="x_max="/>
                                    </section>
                                </div>
                                <div className="grid-container">
                                    <section className="col col-rel-2 stacked">
                                        <input type="number" name="y_min" className="input"
                                               value={this.getModflowModelState( "bounding_box")[0][1]}
                                               onChange={( e ) => this.handleInputChangeModflowBoundingBox( e, 0, 1 )}
                                               placeholder="X="/>
                                    </section>
                                    <section className="col col-rel-2 stacked">
                                        <input type="number" name="y_max" className="input"
                                               value={this.getModflowModelState( "bounding_box")[1][1]}
                                               onChange={( e ) => this.handleInputChangeModflowBoundingBox( e, 1, 1 )}
                                               placeholder="y_max="/>
                                    </section>
                                </div>
                            </div>
                        </form>
                    </section>

                    <section className="col col-rel-3 stretch">
                        {this.renderArea( this.getModflowModelState( "geometry")["coordinates"], this.getModflowModelState( "bounding_box"), this.editAreaOnMap )}
                        <div>
                            {(( ) => {
                                if ( id === undefined || id === null ) {
                                    return <button disabled={disabled} onClick={() => {this.save();}} className={btnClass}>Create Model</button>;
                                }
                                return <button disabled={disabled} onClick={() => this.save(id)} className={btnClass}>Save (yet to be implemented)</button>;
                            })( )}
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, { tool, params }) => {
    return {
        modflowModel: getModflowModel(state[tool].model),
        id: params.id,
        webData: getRequestStatus(state)
    };
};

const actions = {
    setModflowModel,
    createModflowModel,
    setEditorState
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
