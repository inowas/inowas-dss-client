import { setName, setDescription, setTimeUnit, setLengthUnit, addAreaCoordinate, setAreaLatitude, setAreaLongitude } from '../../actions/T03';

import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import { connect } from 'react-redux';
import { getName, getDescription, getTimeUnit, getLengthUnit, getArea } from '../../reducers/T03/model';

const styles = {
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

@ConfiguredRadium
class T03Setup extends Component {

    static propTypes = {
        style: PropTypes.object,
        name: PropTypes.string,
        description: PropTypes.string,
        timeUnit: PropTypes.string,
        lengthUnit: PropTypes.string,
        area: PropTypes.array,
        setName: PropTypes.func,
        setDescription: PropTypes.func,
        setTimeUnit: PropTypes.func,
        setLengthUnit: PropTypes.func,
        addAreaCoordinate: PropTypes.func,
        setAreaLatitude: PropTypes.func,
        setAreaLongitude: PropTypes.func
    }

    nameChangeAction = ( e ) => {
        this.props.setName( e.target.value );
    }

    descriptionChangeAction = ( e ) => {
        this.props.setDescription( e.target.value );
    }

    timeUnitChangeAction = ( e ) => {
        this.props.setTimeUnit( e.target.value );
    }

    lengthUnitChangeAction = ( e ) => {
        this.props.setLengthUnit( e.target.value );
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

    render( ) {
        const {
            style,
            name,
            description,
            timeUnit,
            lengthUnit,
            area
        } = this.props;

        return (
            <div style={[ style, styles.container ]}>
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td><input value={name} onChange={this.nameChangeAction} placeholder="Name"/></td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td><input value={description} onChange={this.descriptionChangeAction} placeholder="Description"/></td>
                        </tr>
                        <tr>
                            <td>Time Unit</td>
                            <td>
                                <select value={timeUnit} onChange={this.timeUnitChangeAction}>
                                    <option value="s">Second</option>
                                    <option value="min">Minute</option>
                                    <option value="h">Hour</option>
                                    <option value="d">Day</option>
                                    <option value="yrs">Year</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Length Unit</td>
                            <td>
                                <select value={lengthUnit} onChange={this.lengthUnitChangeAction}>
                                    <option value="cm">Centimeter</option>
                                    <option value="m">Meter</option>
                                    <option value="ft">Feet</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    Area:
                    <table>
                        <tbody>
                            <tr>
                                <th>Latitude</th>
                                <th>Longitude</th>
                            </tr>
                            {area.map(( c, index ) => <tr key={index}>
                                <td><input value={c.lat} onChange={this.coordinateChangeLatitudeAction( index )}/></td>
                                <td>{c.lng}</td>
                            </tr>)}
                        </tbody>
                    </table>
                    <button onClick={this.addCoordinateClickAction}>Add coordinate!</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        name: getName( state.T03.model ),
        description: getDescription( state.T03.model ),
        timeUnit: getTimeUnit( state.T03.model ),
        lengthUnit: getLengthUnit( state.T03.model ),
        area: getArea( state.T03.model )
    };
};

// eslint-disable-next-line no-class-assign
T03Setup = connect(mapStateToProps, { setName, setDescription, setTimeUnit, setLengthUnit, addAreaCoordinate, setAreaLatitude, setAreaLongitude })( T03Setup );

export default T03Setup;
