import React from 'react';

import { Map, TileLayer, Rectangle} from 'react-leaflet';

import '../../../less/crossSectionMap.less';

export default class CrossSectionMap extends React.Component {

    constructor(props) {
        super(props);
    }

    handleMove = e => {
        this.props.updateBounds(e.target.getBounds());
    }

    handleClick = e => {
        this.props.setCrossSection(e.latlng.lat, e.latlng.lng);
    }

    render() {
        const {boundingBox, bounds, crossSection} = this.props;
        return (
            <Map className="crossSectionMap" bounds={bounds} onClick={this.handleClick} zoomControl={false} onMoveEnd={this.handleMove}>
                <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'/>
                <Rectangle color="#000000" bounds={boundingBox} />
                {crossSection ? <Rectangle bounds={crossSection} /> : null}
            </Map>
        );
    }

}

CrossSectionMap.propTypes = {
    boundingBox: React.PropTypes.array,
    updateBounds: React.PropTypes.func.isRequired,
    bounds: React.PropTypes.array,
    setCrossSection: React.PropTypes.func.isRequired,
    crossSection: React.PropTypes.array
}
