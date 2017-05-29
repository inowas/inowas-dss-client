import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import { connect } from 'react-redux';
import { getActiveBoundary } from '../../reducers/T03/ui';
import { getBoundary } from '../../reducers/T03/boundaries';
import { updateBoundary, setState } from '../../actions/T03';
import Icon from '../../components/primitive/Icon';

// import styleGlobals from 'styleGlobals';

const styles = {
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        overflow: 'auto'
    }
};

@ConfiguredRadium
class T03Boundary extends Component {

    static propTypes = {
        style: PropTypes.object,
        well: PropTypes.object,
        updateBoundary: PropTypes.func.isRequired,
        setState: PropTypes.func.isRequired
    }

    updateLatitude = ( e ) => {
        // eslint-disable-next-line no-shadow
        const { well, updateBoundary } = this.props;
        updateBoundary({
            ...well,
            lat: e.target.value
        });
    }

    updateLongitude = ( e ) => {
        // eslint-disable-next-line no-shadow
        const { well, updateBoundary } = this.props;
        updateBoundary({
            ...well,
            lng: e.target.value
        });
    }

    render( ) {
        // eslint-disable-next-line no-shadow
        const { style, well, setState } = this.props;

        return (
            <div style={[ styles.container, style ]}>
                <h3>{well.name}</h3>
                <div>
                    <button className="link" onClick={( ) => setState( 'boundariesOverlay' )}>back to Boundaries<Icon name="arrow_right"/></button>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td>Latitude:</td>
                            <td>
                                <input onChange={this.updateLatitude} value={well.lat} type="number" className="input" placeholder="Latitude"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Longitude:</td>
                            <td>
                                <input onChange={this.updateLongitude} value={well.lng} type="number" className="input" placeholder="Longitude"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        well: getBoundary(state.T03.model.boundaries, getActiveBoundary( state.T03.ui ))
    };
};

// eslint-disable-next-line no-class-assign
T03Boundary = connect(mapStateToProps, { updateBoundary, setState })( T03Boundary );

export default T03Boundary;
