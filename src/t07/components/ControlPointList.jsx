import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import Icon from '../../components/primitive/Icon';
import styleGlobals from 'styleGlobals';

const styles = {
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
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
export default class ControlPointList extends Component {

    static propTypes = {
        title: PropTypes.string,
        statePrefix: PropTypes.string,
        backTo: PropTypes.string,
        style: PropTypes.object,
        list: PropTypes.array,
        state: PropTypes.string,
        addControlPoint: PropTypes.func,
        updateControlPoint: PropTypes.func,
        setEditorState: PropTypes.func,
        setActiveControlPoint: PropTypes.func,
        deleteControlPoint: PropTypes.func
    }

    addControlPointClickAction = ( ) => {
        this.props.addControlPoint( 0, 0 );
    }

    updateLatitude = index => {
        return e => {
            const { list, updateControlPoint } = this.props;
            const controlPoint = list[index];
            updateControlPoint(index, {
                ...controlPoint,
                lat: e.target.value
            });
        };
    }

    updateLongitude = index => {
        return e => {
            const { list, updateControlPoint } = this.props;
            const controlPoint = list[index];
            updateControlPoint(index, {
                ...controlPoint,
                llng: e.target.value
            });
        };
    }

    setActiveControlPoint = index => {
        return ( ) => {
            this.props.setActiveControlPoint( index );
        };
    }

    deleteControlPoint = index => {
        return ( ) => {
            this.props.deleteControlPoint( index );
            this.props.setActiveControlPoint( null );
        };
    }

    render( ) {
        // eslint-disable-next-line no-shadow
        const { style, title, list, setEditorState, state, statePrefix, backTo } = this.props;
        const stateWithoutPrefix = state.replace(statePrefix + '-', '' );

        return (
            <div style={[ styles.container, style ]}>
                <h3>{title}</h3>
                <div>
                    <button className="link" onClick={( ) => setState( backTo )}>back<Icon name="arrow_right" /></button>
                </div>
                {([ 'draw', 'edit' ].indexOf( stateWithoutPrefix ) === -1 && <button className="button" onClick={( ) => setState( statePrefix + '-draw' )}>draw</button>)}
                {([ 'draw', 'edit' ].indexOf( stateWithoutPrefix ) === -1 && list.length > 0 && <button className="button" onClick={( ) => setState( statePrefix + '-edit' )}>edit</button>)}
                {([ 'draw', 'edit' ].indexOf( stateWithoutPrefix ) !== -1 && <button className="button" onClick={( ) => setState( statePrefix )}>finish</button>)}

                <table className="table">
                    <tbody>
                        <tr>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th/>
                        </tr>
                        {list.map(( c, index ) => <tr key={index} onMouseOver={this.setActiveControlPoint( index )} onMouseOut={this.setActiveControlPoint( null )}>
                            <td><input className="input-on-focus" value={c.lat} onChange={this.updateLatitude( index )}/></td>
                            <td><input className="input-on-focus" value={c.lng} onChange={this.updateLongitude( index )}/></td>
                            <td>
                                <button onClick={this.deleteControlPoint( index )} className="button"><Icon name="trash"/></button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        );
    }
}
