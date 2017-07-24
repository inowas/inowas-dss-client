import React, { Component, PropTypes } from 'react';
import {
    createModel,
    updateModel,
    setEditorState,
} from '../../actions/modelEditor';
import {
    getModflowModel
} from '../../reducers/ModelEditor/general';
import ConfiguredRadium from 'ConfiguredRadium';
import Icon from '../../components/primitive/Icon';
import { connect } from 'react-redux';
import styleGlobals from 'styleGlobals';
import { withRouter } from 'react-router';
import {getRequestStatus, isLoading} from "../../reducers/webData";
import { Map, TileLayer, Polygon } from 'react-leaflet';
import {convertPolygonToPoints, getBoundsOfPolygon, latLngToXY} from "../../calculations/geoTools";
import {getInitialState} from "../../reducers/ModelEditor/model";


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

    // static propTypes = {
    //     style: PropTypes.object,
    //     name: PropTypes.string,
    //     description: PropTypes.string,
    //     timeUnit: PropTypes.instanceOf( TimeUnit ),
    //     lengthUnit: PropTypes.instanceOf( LengthUnit ),
    //     gridX: PropTypes.number,
    //     gridY: PropTypes.number,
    //     area: PropTypes.array,
    //     setName: PropTypes.func,
    //     setDescription: PropTypes.func,
    //     setTimeUnit: PropTypes.func,
    //     setLengthUnit: PropTypes.func,
    //     addAreaCoordinate: PropTypes.func,
    //     setAreaLatitude: PropTypes.func,
    //     setAreaLongitude: PropTypes.func,
    //     setEditorState: PropTypes.func,
    //     createModel: PropTypes.func,
    //     updateModel: PropTypes.func,
    //     webData: PropTypes.array,
    //     id: PropTypes.string
    // };

    constructor(props) {
        super(props);
        this.state = initialState;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChangeModflow = this.handleInputChangeModflow.bind(this);
    }

    componentWillReceiveProps(props){
        console.log('componentWillReceiveProps', props);
        // this.setState(function(prevState, newState){
        //     console.log({props, prevState, newState});
        // })
    }

    handleInputChange(event, key) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(function(prevState, props){
            if (key) {
                return {[key]: {name: value}}
            }
            return {[name]: value}
        });
    }

    handleInputChangeModflow(event, key) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(function(prevState, props){
            let modflowModel = prevState.modflowModel;
            if (key) {
                modflowModel[key][name] = value;
            } else {
                modflowModel[name] = value;
            }
            return {modflowModel};
        });
    }

    getState(name) {
        return this.state[name];
    }

    getModflowModelState(name) {
        return this.state['modflowModel'][name];
    }

    editAreaOnMap = ( ) => {
        this.props.setEditorState( 'area' );
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
            createModel,
            updateModel,
            modflowModel,
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
                                               value={this.getModflowModelState( "bounding_box" )[0].lat}
                                               onChange={( e ) => this.handleInputChangeModflow( e, "bounding_box" )}
                                               placeholder="X="/>
                                    </section>
                                    <section className="col col-rel-2 stacked">
                                        <input type="number" name="x_max" className="input"
                                               value={this.getModflowModelState( "bounding_box" )[0].lng}
                                               onChange={( e ) => this.handleInputChangeModflow( e, "bounding_box" )}
                                               placeholder="x_max="/>
                                    </section>
                                </div>
                                <div className="grid-container">
                                    <section className="col col-rel-2 stacked">
                                        <input type="number" name="y_min" className="input"
                                               value={this.getModflowModelState( "bounding_box" )[1].lat}
                                               onChange={( e ) => this.handleInputChangeModflow( e, "bounding_box" )}
                                               placeholder="X="/>
                                    </section>
                                    <section className="col col-rel-2 stacked">
                                        <input type="number" name="y_max" className="input"
                                               value={this.getModflowModelState( "bounding_box" )[1].lng}
                                               onChange={( e ) => this.handleInputChangeModflow( e, "bounding_box" )}
                                               placeholder="y_max="/>
                                    </section>
                                </div>
                            </div>
                        </form>
                    </section>

                    <section className="col col-rel-3 stretch">
                        {/*{this.renderArea( this.getModflowModelState('geometry').coordinates, this.editAreaOnMap )}*/}
                        {this.renderArea( modflowModel.geometry.coordinates, modflowModel.bounding_box, this.editAreaOnMap )}
                        <div>
                            {(( ) => {
                                if ( id === undefined || id === null ) {
                                    return <button disabled={disabled} onClick={createModel} className={btnClass}>Create Model</button>;
                                }
                                return <button disabled={disabled} onClick={() => updateModel(id)} className={btnClass}>Save (yet to be implemented)</button>;
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
    setEditorState,
    createModel,
    updateModel
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
