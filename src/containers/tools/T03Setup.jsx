import React, { Component, PropTypes } from 'react';
import {
    addAreaCoordinate,
    setAreaLatitude,
    setAreaLongitude,
    setDescription,
    setLengthUnit,
    setState,
    setName,
    setTimeUnit
} from '../../actions/T03';
import { getArea, getDescription, getLengthUnit, getName, getTimeUnit } from '../../reducers/T03/model';

import ConfiguredRadium from 'ConfiguredRadium';
import { connect } from 'react-redux';
import styleGlobals from 'styleGlobals';

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
        setAreaLongitude: PropTypes.func,
        setState: PropTypes.func
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

    editAreaOnMap = ( ) => {
        this.props.setState( 'area' );
    }

    // eslint-disable-next-line no-shadow
    renderArea( area, editAreaOnMap ) {
        return (
            <div>
                <h3>Area</h3>
                <button onClick={editAreaOnMap} className="button">Edit on Map</button>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Latitude</th>
                            <th>Longitude</th>
                        </tr>
                        {area.map(( c, index ) => <tr key={index}>
                            <td><input className="input-on-focus" value={c.lat} onChange={this.coordinateChangeLatitudeAction( index )}/></td>
                            <td><input className="input-on-focus" value={c.lng} onChange={this.coordinateChangeLongitudeAction( index )}/></td>
                        </tr>)}
                    </tbody>
                </table>
                <div style={styles.addCoordinateWrapper}>
                    <button className="button" onClick={this.addCoordinateClickAction}>Add coordinate!</button>
                </div>
            </div>
        );
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
                <h3>General</h3>
                <table>
                    <tbody>
                        <tr>
                            <td style={[ styles.generalTr, styles.labelTr ]}>Name</td>
                            <td style={styles.generalTr}><input className="input" value={name} onChange={this.nameChangeAction} placeholder="Name"/></td>
                        </tr>
                        <tr>
                            <td style={[ styles.generalTr, styles.labelTr ]}>Description</td>
                            <td style={styles.generalTr}><input className="input" value={description} onChange={this.descriptionChangeAction} placeholder="Description"/></td>
                        </tr>
                        <tr>
                            <td style={[ styles.generalTr, styles.labelTr ]}>Time Unit</td>
                            <td style={styles.generalTr}>
                                <select className="select" value={timeUnit} onChange={this.timeUnitChangeAction}>
                                    <option value="s">Second</option>
                                    <option value="min">Minute</option>
                                    <option value="h">Hour</option>
                                    <option value="d">Day</option>
                                    <option value="yrs">Year</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style={[ styles.generalTr, styles.labelTr ]}>Length Unit</td>
                            <td style={styles.generalTr}>
                                <select className="select" value={lengthUnit} onChange={this.lengthUnitChangeAction}>
                                    <option value="cm">Centimeter</option>
                                    <option value="m">Meter</option>
                                    <option value="ft">Feet</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {this.renderArea( area, this.editAreaOnMap )}
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
T03Setup = connect(mapStateToProps, {
    setName,
    setDescription,
    setTimeUnit,
    setLengthUnit,
    addAreaCoordinate,
    setAreaLatitude,
    setAreaLongitude,
    setState
})( T03Setup );

export default T03Setup;
