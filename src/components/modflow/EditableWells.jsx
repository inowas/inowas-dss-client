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
    rbf: {
        radius: 5,
        color: 'black',
        weight: 1,
        fillColor: 'yellow',
        fillOpacity: 1
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
        state: PropTypes.oneOf([
            'minimal',
            'edit',
            'move',
            'add',
            'delete',
            'default'
        ]),
        setEditorState: PropTypes.func.isRequired,
        wells: PropTypes.array,
        setActiveBoundary: PropTypes.func.isRequired,
        activeBoundary: PropTypes.string,
        removeBoundary: PropTypes.func.isRequired,
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
        if ( draggedBoundary !== null && state === 'move' ) {
            if ( mousePosition.lat !== this.props.mousePosition.lat || mousePosition.lng !== this.props.mousePosition.lng ) {
                updateBoundary({
                    ...wells.find( w => w.id === draggedBoundary ),
                    ...mousePosition
                });
            }
        }
    }

    wellDragStart = id => {
        return ( ) => {
            const { draggedBoundary, leafletElement, setDraggedBoundary, state } = this.props;
            if ( state === 'move' && draggedBoundary === null && leafletElement ) {
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

    deleteWell = id => {
        return ( ) => {
            this.props.removeBoundary( id );
        };
    }

    editWell = id => {
        return ( ) => {
            this.props.setActiveBoundary( id );
            this.props.setEditorState( 'boundariesOverlay' );
        };
    }

    setActiveBoundary = id => {
        return ( ) => {
            const { state } = this.props;
            if ( state !== 'minimal' ) {
                this.props.setActiveBoundary( id );
            }
        };
    }

    renderAddHelperWell( ) {
        const { state, mousePosition } = this.props;

        if ( state === 'add' ) {
            return ( <CircleMarker center={mousePosition} {...styles.cw}/> );
        }
        return null;
    }

    renderWells( ) {
        const { wells, activeBoundary, state } = this.props;

        return wells.map(( w, index ) => {
            const handler = (( ) => {
                if ( state === 'move' ) {
                    return {
                        onMouseDown: this.wellDragStart( w.id )
                    };
                }

                if ( state === 'delete' ) {
                    return {
                        onClick: this.deleteWell( w.id )
                    };
                }

                if ( state === 'edit' ) {
                    return {
                        onClick: this.editWell( w.id )
                    };
                }

                return { };
            })( );

            return ( <CircleMarker key={index} onMouseOver={this.setActiveBoundary( w.id )} onMouseOut={this.setActiveBoundary( null )} {...handler} center={{
                lat: w.geometry.coordinates[1],
                lng: w.geometry.coordinates[0]
            }} {...styles.cw} fillColor={w.id === activeBoundary && styles.activeWell.fillColor}/> );
        });
    }

    render( ) {
        return (
            <span>
                {this.renderWells( )}
                {this.renderAddHelperWell( )}
            </span>
        );
    }

}
