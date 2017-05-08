function getInitialState() {
    return {
        mapMode: null,
        activeBoundary: null,
        mapPosition: {
            center: [
                0, 0
            ],
            zoom: 2
        },
        mousePositionOnMap: {
            lat: null,
            lng: null
        },
        draggedAreaCoordinate: null,
        activeAreaCoordinate: null
    };
}

const ui = ( state = getInitialState(), action ) => {
    switch ( action.type ) {
        case 'T03_UI_SET_MAP_MODE':
            return { ...state, mapMode: action.payload };

        case 'T03_UI_SET_ACTIVE_BOUNDARY':
            return { ...state, activeBoundary: action.payload };

        case 'T03_UI_SET_MAP_POSITION':
            return { ...state, mapPosition: action.payload };

        case 'T03_UI_SET_MOUSE_POSITION_ON_MAP':
            return { ...state, mousePositionOnMap: action.payload };

        case 'T03_UI_SET_DRAGGED_AREA_COORDINATE':
            return { ...state, draggedAreaCoordinate: action.payload };

        case 'T03_UI_SET_ACTIVE_AREA_COORDINATE':
            return { ...state, activeAreaCoordinate: action.payload };

        default:
            return state;
    }
};

export default ui;

export const getMapMode = state => state.mapMode;
export const getActiveBoundary = state => state.activeBoundary;
export const getMapPosition = state => state.mapPosition;
export const getMousePositionOnMap = state => state.mousePositionOnMap;
export const getDraggedAreaCoordinate = state => state.draggedAreaCoordinate;
export const getActiveAreaCoordinate = state => state.activeAreaCoordinate;
