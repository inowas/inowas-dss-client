import React, { Component, PropTypes } from 'react';
import { addAreaCoordinate, setActiveAreaCoordinate, setAreaLatitude, setAreaLongitude, setMapMode, deleteAreaCoordinate } from '../../actions/T03';

import ConfiguredRadium from 'ConfiguredRadium';
import { connect } from 'react-redux';
import { getArea } from '../../reducers/T03/model';
import { getMapMode } from '../../reducers/T03/ui';
import styleGlobals from 'styleGlobals';
import Icon from '../../components/primitive/Icon';

const styles = {
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        padding: styleGlobals.dimensions.spacing.large,
        overflow: 'auto'
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

@ConfiguredRadium
class T03Area extends Component {

    static propTypes = {
        style: PropTypes.object,
        area: PropTypes.array,
        addAreaCoordinate: PropTypes.func,
        setAreaLatitude: PropTypes.func,
        setAreaLongitude: PropTypes.func,
        setMapMode: PropTypes.func,
        mapMode: PropTypes.string,
        setActiveAreaCoordinate: PropTypes.func,
        deleteAreaCoordinate: PropTypes.func
    }

    addCoordinateClickAction = ( ) => {
        this.props.addAreaCoordinate( 0, 0 );
    }

    coordinateChangeLatitudeAction = ( index ) => {
        return ( e ) => {
            this.props.setAreaLatitude( index, e.target.value );
        };
    }

    coordinateChangeLongitudeAction = ( index ) => {
        return ( e ) => {
            this.props.setAreaLongitude( index, e.target.value );
        };
    }

    setActiveAreaCoordinate = index => {
        return ( ) => {
            this.props.setActiveAreaCoordinate( index );
        };
    }

    render( ) {
        // eslint-disable-next-line no-shadow
        const { style, area, setMapMode, mapMode, deleteAreaCoordinate } = this.props;

        return (
            <div style={[ style, styles.container ]}>
                <h3>Area</h3>
                {([ 'area-draw', 'area-edit' ].indexOf( mapMode ) === -1 && <button className="button" onClick={( ) => setMapMode( 'area-draw' )}>draw</button>)}
                {([ 'area-draw', 'area-edit' ].indexOf( mapMode ) === -1 && area.length > 0 && <button className="button" onClick={( ) => setMapMode( 'area-edit' )}>edit</button>)}
                {([ 'area-draw', 'area-edit' ].indexOf( mapMode ) !== -1 && <button className="button" onClick={( ) => setMapMode( 'area' )}>finish</button>)}

                <table className="table">
                    <tbody>
                        <tr>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th />
                        </tr>
                        {area.map(( c, index ) => <tr key={index} onMouseOver={this.setActiveAreaCoordinate( index )} onMouseOut={this.setActiveAreaCoordinate( null )}>
                            <td><input className="input-on-focus" value={c.lat} onChange={this.coordinateChangeLatitudeAction( index )}/></td>
                            <td><input className="input-on-focus" value={c.lng} onChange={this.coordinateChangeLongitudeAction( index )}/></td>
                            <td><button onClick={() => deleteAreaCoordinate(index)} className="button"><Icon name="trash" /></button></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        area: getArea( state.T03.model ),
        mapMode: getMapMode( state.T03.ui )
    };
};

// eslint-disable-next-line no-class-assign
T03Area = connect(mapStateToProps, { addAreaCoordinate, setAreaLatitude, setAreaLongitude, setMapMode, setActiveAreaCoordinate, deleteAreaCoordinate })( T03Area );

export default T03Area;
