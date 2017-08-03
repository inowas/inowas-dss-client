import { CircleMarker, Polygon, Polyline } from 'react-leaflet';
import React, { Component, PropTypes } from 'react';
import styleGlobals from 'styleGlobals';

const styles = {
    area: {
        color: styleGlobals.colors.primary,
        weight: 1,
        fillColor: 'transparent',
    },
    controlPoint: {
        radius: 7,
        stroke: 0,
        weight: 1,
        fillColor: styleGlobals.colors.primary,
        fillOpacity: 0.7
    },
    drawHelperLine: {
        color: styleGlobals.colors.accent,
        weight: 1
    },
    activeControlPoint: {
        fillColor: styleGlobals.colors.accent
    },
    addControlPoint: {
        radius: 7,
        stroke: 0,
        weight: 1,
        fillColor: styleGlobals.colors.primary,
        fillOpacity: 0.3
    }
};

export default class EditableArea extends Component {

    static propTypes = {
        state: PropTypes.oneOf([ 'minimal', 'default', 'draw', 'edit', 'delete' ]),
        area: PropTypes.array,
        activeControlPoint: PropTypes.number,
        setActiveControlPoint: PropTypes.func.isRequired,
        addControlPoint: PropTypes.func.isRequired,
        deleteControlPoint: PropTypes.func.isRequired,
        draggedControlPoint: PropTypes.number,
        setDraggedControlPoint: PropTypes.func.isRequired,
        setControlPointLatitude: PropTypes.func.isRequired,
        setControlPointLongitude: PropTypes.func.isRequired,
        mousePosition: PropTypes.object,
        leafletElement: PropTypes.object
    }

    static defaultProps = {
        state: 'minimal'
    }

    componentDidMount( ) {
        document.addEventListener( 'mouseup', this.controlPointDragEnd );
    }

    componentWillReceiveProps( nextProps ) {
        this.updateControlPoint( nextProps );
    }

    componentWillUnmount( ) {
        document.removeEventListener( 'mouseup', this.controlPointDragEnd );
    }

    addAreaControlPoint = e => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        this.props.addControlPoint( lat, lng );
    };

    updateControlPoint = nextProps => {
        const { state, draggedControlPoint, setControlPointLatitude, setControlPointLongitude, mousePosition } = nextProps;
        if ( draggedControlPoint !== null && state === 'edit' ) {
            if ( mousePosition.lat !== this.props.mousePosition.lat || mousePosition.lng !== this.props.mousePosition.lng ) {
                setControlPointLatitude( draggedControlPoint, mousePosition.lat );
                setControlPointLongitude( draggedControlPoint, mousePosition.lng );
            }
        }
    }

    controlPointDragStart = index => {
        return ( ) => {
            const { draggedControlPoint, leafletElement, setDraggedControlPoint } = this.props;
            if ( draggedControlPoint === null && leafletElement ) {
                leafletElement.dragging.disable( );
                setDraggedControlPoint( index );
            }
        };
    }

    controlPointDragEnd = ( ) => {
        const { draggedControlPoint, leafletElement, setDraggedControlPoint } = this.props;
        if ( draggedControlPoint !== null && leafletElement ) {
            leafletElement.dragging.enable( );
            setDraggedControlPoint( null );
        }
    }

    insertControlPoint = ( lat, lng, index ) => {
        return ( ) => {
            this.props.addControlPoint( lat, lng, index );
        };
    }

    deleteControlPoint = index => {
        return ( ) => {
            this.props.deleteControlPoint( index );
        };
    }

    setActiveControlPoint = index => {
        return ( ) => {
            this.props.setActiveControlPoint( index );
        };
    }

    renderDrawHelperPoint( ) {
        const { state, mousePosition } = this.props;
        if ( state === 'draw' ) {
            return ( <CircleMarker center={mousePosition} {...styles.controlPoint} {...styles.activeControlPoint}/> );
        }
        return null;
    }

    renderDrawHelperLines( ) {
        const { area, state, mousePosition } = this.props;
        if ( state === 'draw' && area.length > 0 ) {
            return ( <Polyline positions={[
                area[0],
                mousePosition,
                area[area.length - 1]
            ]} {...styles.drawHelperLine}/> );
        }
        return null;
    }

    renderAddControlPoints( ) {
        const { area, state } = this.props;
        if ( state === 'edit' ) {
            return area.map(( c, index ) => {
                const nextIndex = ( area.length <= index + 1 )
                    ? 0
                    : ( index + 1 );

                const nextC = area[nextIndex];

                const position = {
                    lat: ( c[1] + nextC[1] ) / 2,
                    lng: ( c[0] + nextC[0] ) / 2
                };

                return ( <CircleMarker onClick={this.insertControlPoint( position.lat, position.lng, nextIndex )} key={index} center={position} {...styles.addControlPoint}/> );
            });
        }
        return null;
    }

    renderControlPoints( ) {
        const { area, activeControlPoint, state } = this.props;
        if ( [ 'default', 'draw', 'edit', 'delete' ].indexOf( state ) !== -1 ) {
            return area.map(( c, index ) => {
                const handler = (( ) => {
                    if ( state === 'edit' ) {
                        return {
                            onMouseDown: this.controlPointDragStart( index )
                        };
                    }

                    if ( state === 'delete' ) {
                        return {onClick: this.deleteControlPoint( index )};
                    }

                    return { };
                })( );

                return ( <CircleMarker {...handler} onMouseOver={this.setActiveControlPoint( index )} onMouseOut={this.setActiveControlPoint( null )} key={index} center={c} {...styles.controlPoint} fillColor={( index === activeControlPoint ) && styles.activeControlPoint.fillColor}/> );
            });
        }
        return null;
    }

    renderPolygon( ) {
        const { area } = this.props;
        if ( area.length > 1 ) {
            return ( <Polygon positions={area} {...styles.area}/> );
        }
        return null;
    }

    render( ) {
        return (
            <span>
                {this.renderPolygon( )}
                {this.renderAddControlPoints( )}
                {this.renderControlPoints( )}
                {this.renderDrawHelperLines( )}
                {this.renderDrawHelperPoint( )}
            </span>
        );
    }

}
