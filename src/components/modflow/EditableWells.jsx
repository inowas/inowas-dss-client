import React, { Component, PropTypes } from 'react';
import { CircleMarker } from 'react-leaflet';

const styles = {
    cw: {
        radius: 3,
        color: 'black',
        weight: 1,
        fillColor: 'darkgreen',
        fillOpacity: 0.7
    },
    iw: {
        radius: 3,
        color: 'black',
        weight: 1,
        fillColor: 'darkgreen',
        fillOpacity: 0.7
    },
    sniw: {
        radius: 5,
        color: 'red',
        weight: 2,
        fillColor: 'darkgreen',
        fillOpacity: 0.7
    },
    puw: {
        radius: 3,
        color: 'black',
        weight: 1,
        fillColor: 'darkblue',
        fillOpacity: 0.7
    },
    snpw: {
        radius: 5,
        color: 'red',
        weight: 2,
        fillColor: 'darkblue',
        fillOpacity: 0.7
    },
    prw: {
        radius: 3,
        color: 'black',
        weight: 1,
        fillColor: 'darkblue',
        fillOpacity: 0.7
    },
    smw: {
        radius: 5,
        color: 'black',
        weight: 1,
        fillColor: 'red',
        fillOpacity: 1
    },
    snw: {
        radius: 5,
        color: 'black',
        weight: 1,
        fillColor: 'yellow',
        fillOpacity: 1
    },
    snifw: {
        radius: 5,
        color: '#63b3ea',
        weight: 2,
        fillColor: '#bbdff6',
        fillOpacity: 0.7
    },
    activeWell: {
        fillColor: 'yellow'
    }
};

export default class EditableWells extends Component {

    static propTypes = {
        state: PropTypes.oneOf(['minimal', 'edit']),
        wells: PropTypes.array,
        activeBoundary: PropTypes.string,
        draggedBoundary: PropTypes.string,
        setDraggedBoundary: PropTypes.func,
        leafletElement: PropTypes.object,
        updateBoundary: PropTypes.func,
        mousePosition: PropTypes.object
    }

    static defaultProps = {
        state: 'minimal'
    }

    componentDidMount( ) {
        document.addEventListener( 'mouseup', this.wellDragEnd );
    }

    componentWillReceiveProps( nextProps ) {
        this.updateWell( nextProps );
    }

    componentWillUnmount( ) {
        document.removeEventListener( 'mouseup', this.wellDragEnd );
    }

    updateWell = nextProps => {
        const { wells, state, draggedBoundary, mousePosition, updateBoundary } = nextProps;
        if ( draggedBoundary !== null && state === 'edit' ) {
            if ( mousePosition.lat !== this.props.mousePosition.lat || mousePosition.lng !== this.props.mousePosition.lng ) {
                updateBoundary({
                    ...wells.find(w => w.id === draggedBoundary),
                    ...mousePosition
                });
            }
        }
    }

    wellDragStart = id => {
        return ( ) => {
            const { draggedBoundary, leafletElement, setDraggedBoundary, state } = this.props;
            if ( state === 'edit' && draggedBoundary === null && leafletElement ) {
                leafletElement.dragging.disable( );
                setDraggedBoundary( id );
            }
        };
    }

    wellDragEnd = ( ) => {
        const { draggedBoundary, leafletElement, setDraggedBoundary } = this.props;
        if ( draggedBoundary !== null && leafletElement ) {
            leafletElement.dragging.enable( );
            setDraggedBoundary( null );
        }
    }

    renderWells( ) {
        const { wells, activeBoundary } = this.props;
        return wells.map((w, index) => {
            return ( <CircleMarker key={index} onMouseDown={this.wellDragStart(w.id)} center={{
                lat: w.lat,
                lng: w.lng
            }} {...styles.cw} fillColor={w.id === activeBoundary && styles.activeWell.fillColor} /> );
        });
    }

    render( ) {
        return (
            <span>
                {this.renderWells( )}
            </span>
        );
    }

}
