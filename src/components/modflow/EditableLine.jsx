import { CircleMarker, Polyline } from 'react-leaflet';
import React, { Component, PropTypes } from 'react';

const styles = {
    line: {
        color: '#4040C4',
        weight: 5
    },
    controlPoint: {
        radius: 7,
        color: 'blue',
        stroke: 0,
        weight: 1,
        fillColor: 'blue',
        fillOpacity: 0.7
    },
    activeControlPoint: {
        fillColor: 'yellow'
    },
    addControlPoint: {
        radius: 7,
        color: 'blue',
        stroke: 0,
        weight: 1,
        fillColor: 'blue',
        fillOpacity: 0.3
    }
};

export default class EditableLine extends Component {

    static propTypes = {
        state: PropTypes.oneOf([ 'minimal', 'default', 'draw', 'edit' ]),
        line: PropTypes.array,
        activeControlPoint: PropTypes.number,
        setActiveControlPoint: PropTypes.func.isRequired,
        addControlPoint: PropTypes.func.isRequired,
        updateControlPoint: PropTypes.func.isRequired,
        draggedControlPoint: PropTypes.number,
        setDraggedControlPoint: PropTypes.func.isRequired,
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

    addControlPoint = e => {
        this.props.addControlPoint( e.latlng );
    };

    updateControlPoint = nextProps => {
        const { state, draggedControlPoint, updateControlPoint, mousePosition } = nextProps;
        if ( draggedControlPoint !== null && state === 'edit' ) {
            if ( mousePosition.lat !== this.props.mousePosition.lat || mousePosition.lng !== this.props.mousePosition.lng ) {
                updateControlPoint( draggedControlPoint, mousePosition );
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

    addControlPoint = ( index, controlPoint ) => {
        return ( ) => {
            const { addControlPoint } = this.props;
            addControlPoint( controlPoint, index );
        };
    }

    // setActiveControlPoint = index => {
    //     return ( ) => {
    //         const { setActiveControlPoint, state } = this.props;
    //         if ( state === 'area-edit' ) {
    //             setActiveControlPoint( index );
    //         }
    //     };
    // }

    renderDrawHelperPoint( ) {
        const { state, mousePosition } = this.props;
        if ( state === 'draw' ) {
            return ( <CircleMarker center={mousePosition} {...styles.controlPoint}/> );
        }
        return null;
    }

    renderDrawHelperLines( ) {
        const { line, state, mousePosition } = this.props;
        if ( state === 'draw' && line.length > 0 ) {
            return ( <Polyline positions={[
                line[line.length - 1],
                mousePosition
            ]}/> );
        }
        return null;
    }

    renderAddControlPoints( ) {
        const { line, state } = this.props;
        if ( state === 'edit' ) {
            return line.map(( c, index ) => {
                if ( line.length - 1 > index ) {
                    const nextC = line[index + 1];

                    const position = {
                        lat: ( c.lat + nextC.lat ) / 2,
                        lng: ( c.lng + nextC.lng ) / 2
                    };

                    return ( <CircleMarker onClick={this.addControlPoint( index + 1, position )} key={index} center={position} {...styles.addControlPoint}/> );
                }

                return null;
            });
        }
        return null;
    }

    renderControlPoints( ) {
        const { line, activeControlPoint, state } = this.props;
        if ( [ 'default', 'draw', 'edit' ].indexOf( state ) !== -1 ) {
            return line.map(( c, index ) => {
                return ( <CircleMarker onMouseDown={this.controlPointDragStart( index )} key={index} center={c} {...styles.controlPoint} fillColor={( index === activeControlPoint ) && styles.activeControlPoint.fillColor}/> );
            });
        }
        return null;
    }

    renderLine( ) {
        const { line } = this.props;
        if ( line.length > 1 ) {
            return ( <Polyline positions={line.map(c => ({
                lat: c[1],
                lng: c[0]
            }))} {...styles.line}/> );
        }
        return null;
    }

    render( ) {
        return (
            <span>
                {this.renderLine( )}
                {this.renderAddControlPoints( )}
                {this.renderControlPoints( )}
                {this.renderDrawHelperLines( )}
                {this.renderDrawHelperPoint( )}
            </span>
        );
    }

}
