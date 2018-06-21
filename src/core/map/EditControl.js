import {PropTypes} from 'prop-types';

// eslint-disable-line
import Draw from 'leaflet-draw';
import isEqual from 'lodash.isequal';

import {LayersControl} from 'react-leaflet';
import {Map} from 'leaflet';

const eventHandlers = {
    onEdited: 'draw:edited',
    onEditStart: 'draw:editstart',
    onEditStop: 'draw:editstop',
    onDeleted: 'draw:deleted',
    onDeleteStart: 'draw:deletestart',
    onDeleteStop: 'draw:deletestop',
};

class EditControl extends LayersControl {

    onDrawCreate = (e) => {
        const {onCreated} = this.props;
        const {layerContainer} = this.context;

        layerContainer.addLayer(e.layer);
        onCreated && onCreated(e);
    };

    componentWillMount() {
        const {map} = this.context;

        this.updateDrawControls();

        map.on('draw:created', this.onDrawCreate);

        for (const key in eventHandlers) {
            if (this.props[key]) {
                map.on(eventHandlers[key], this.props[key]);
            }
        }
    }

    componentDidMount() {
        const {onMounted} = this.props;
        super.componentDidMount();
        onMounted && onMounted(this.leafletElement);
    }

    componentWillUnmount() {
        const {map} = this.context;
        this.leafletElement.remove(map);

        map.off('draw:created', this.onDrawCreate);

        for (const key in eventHandlers) {
            if (this.props[key]) {
                map.off(eventHandlers[key], this.props[key]);
            }
        }
    }

    componentDidUpdate(prevProps) {
        // super updates positions if thats all that changed so call this first
        super.componentDidUpdate(prevProps);

        if (isEqual(this.props.draw, prevProps.draw) || this.props.position !== prevProps.position) {
            return false;
        }

        const {map} = this.context;

        this.leafletElement.remove(map);
        this.updateDrawControls();
        this.leafletElement.addTo(map);

        return null;
    }

    updateDrawControls = () => {
        const {layerContainer} = this.context;
        const {draw, edit, position} = this.props;
        const options = {
            edit: {
                ...edit,
                featureGroup: layerContainer
            }
        };

        if (draw) {
            options.draw = draw;
        }

        if (position) {
            options.position = position;
        }

        this.leafletElement = new L.Control.Draw(options); // eslint-disable-line
    };
}

EditControl.contextTypes = {
    map: PropTypes.instanceOf(Map),
    layerContainer: PropTypes.shape({
        addLayer: PropTypes.func.isRequired,
        removeLayer: PropTypes.func.isRequired
    })
};

EditControl.propTypes = {
    ...Object.keys(eventHandlers).reduce((acc, val) => {
        acc[val] = PropTypes.func;
        return acc;
    }, {}),
    onCreated: PropTypes.func,
    onMounted: PropTypes.func,
    draw: PropTypes.shape({
        polyline: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
        polygon: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
        rectangle: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
        circle: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
        marker: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    }),
    edit: PropTypes.shape({
        edit: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
        remove: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
        poly: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
        allowIntersection: PropTypes.bool,
    }),
    position: PropTypes.oneOf([
        'topright',
        'topleft',
        'bottomright',
        'bottomleft'
    ])
};

export default EditControl;

