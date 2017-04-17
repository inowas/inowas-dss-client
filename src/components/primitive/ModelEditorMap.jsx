import '../../less/leaflet.less';
import '../../less/modelEditorMap.less';

import { Map, TileLayer } from 'react-leaflet';
import React, { Component, PropTypes } from 'react';

import FloatingTool from './FloatingTool';
import FloatingToolbox from './FloatingToolbox';
import Icon from './Icon';

// import Coordinate from '../../model/Coordinate';

export default class ModelEditorMap extends Component {

    static propTypes = {
        tool: PropTypes.string,
        setActiveTool: PropTypes.func
    };

    componentDidMount( ) {
        // manually emit a resize event so the leaflet maps recalculate their container size
        const event = document.createEvent( 'HTMLEvents' );
        event.initEvent( 'resize', true, false );
        document.dispatchEvent( event );
    }

    enableMap = ( ) => {
        this.refs.map.leafletElement._handlers.forEach( function( handler ) {
            handler.enable( );
        });
    }

    disableMap = ( ) => {
        this.refs.map.leafletElement._handlers.forEach( function( handler ) {
            handler.disable( );
        });
    }

    unsetActiveTool = () => {
        this.props.setActiveTool('');
    }

    renderTool( ) {
        const { tool } = this.props;

        if ( tool ) {
            return (
                <FloatingTool enableMap={this.enableMap} disableMap={this.disableMap} close={this.unsetActiveTool}>
                    {tool}
                </FloatingTool>
            );
        }

        return null;
    }

    render( ) {
        const { setActiveTool } = this.props;

        return (
            <div className="modelEditorMap-wrapper">
                <Map ref="map" center={[ 51.505, -0.09 ]} zoom={13} className="modelEditorMap" zoomControl={false}>
                    <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'/> {/** <LayersControl position="topleft" /> **/}
                    <button title="reset view" className="button icon-inside resetView" onClick={this.resetView}><Icon name="marker"/></button>
                </Map>
                {this.renderTool( )}
                <FloatingToolbox onToolClick={setActiveTool}/>
            </div>
        );
    }
}
