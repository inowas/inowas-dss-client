import React, { Component, PropTypes } from 'react';
import {
    addAreaCoordinate,
    deleteAreaCoordinate,
    setActiveAreaCoordinate,
    setAreaLatitude,
    setAreaLongitude,
    setState
} from '../../actions/T03';

import ConfiguredRadium from 'ConfiguredRadium';
import Icon from '../../components/primitive/Icon';
import { connect } from 'react-redux';
import { getArea } from '../../reducers/T03/general';
import { getState } from '../../reducers/T03/ui';
import styleGlobals from 'styleGlobals';
import { withRouter } from 'react-router';

const styles = {
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        // padding: styleGlobals.dimensions.spacing.large,
        overflow: 'auto'
    },

    generalTr: {
        padding: styleGlobals.dimensions.spacing.small
    },

    labelTr: {
        textAlign: 'right'
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
        setState: PropTypes.func,
        state: PropTypes.string,
        setActiveAreaCoordinate: PropTypes.func,
        deleteAreaCoordinate: PropTypes.func,
        id: PropTypes.string
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

    deleteAreaCoordinate = index => {
        return ( ) => {
            this.props.deleteAreaCoordinate( index );
            this.props.setActiveAreaCoordinate( null );
        };
    }

    render( ) {
        // eslint-disable-next-line no-shadow
        const { style, area, setState, state } = this.props;

        return (
            <div style={[ styles.container, style ]}>
                <h3>Area</h3>
                <div>
                    <button className="link" onClick={( ) => setState( 'general' )}>back to GENERAL<Icon name="arrow_right" /></button>
                </div>
                {([ 'area-draw', 'area-edit' ].indexOf( state ) === -1 && <button className="button" onClick={( ) => setState( 'area-draw' )}>draw</button>)}
                {([ 'area-draw', 'area-edit' ].indexOf( state ) === -1 && area.length > 0 && <button className="button" onClick={( ) => setState( 'area-edit' )}>edit</button>)}
                {([ 'area-draw', 'area-edit' ].indexOf( state ) !== -1 && <button className="button" onClick={( ) => setState( 'area' )}>finish</button>)}

                <table className="table">
                    <tbody>
                        <tr>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th/>
                        </tr>
                        {area.map(( c, index ) => <tr key={index} onMouseOver={this.setActiveAreaCoordinate( index )} onMouseOut={this.setActiveAreaCoordinate( null )}>
                            <td><input className="input-on-focus" value={c.lat} onChange={this.coordinateChangeLatitudeAction( index )}/></td>
                            <td><input className="input-on-focus" value={c.lng} onChange={this.coordinateChangeLongitudeAction( index )}/></td>
                            <td>
                                <button onClick={this.deleteAreaCoordinate( index )} className="button"><Icon name="trash"/></button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state, { params }) => {
    return {
        area: getArea( state.T03.model.general ),
        state: getState( state.T03.ui ),
        id: params.id
    };
};

// eslint-disable-next-line no-class-assign
T03Area = withRouter( connect(mapStateToProps, {
    addAreaCoordinate,
    setAreaLatitude,
    setAreaLongitude,
    setState,
    setActiveAreaCoordinate,
    deleteAreaCoordinate
})( T03Area ));

export default T03Area;
