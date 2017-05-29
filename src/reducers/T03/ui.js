function getInitialState() {
    return {
        state: 'general',
        activeBoundary: null,
        draggedBoundary: null,
        mapPosition: null,
        mousePositionOnMap: {
            lat: null,
            lng: null
        },
        draggedAreaControlPoint: null,
        activeAreaControlPoint: null
    };
}

const ui = ( state = getInitialState(), action ) => {
    switch ( action.type ) {
        case 'T03_UI_SET_MAP_MODE':
            return { ...state, state: action.payload };

        case 'T03_UI_SET_ACTIVE_BOUNDARY':
            return { ...state, activeBoundary: action.payload };

        case 'T03_UI_SET_DRAGGED_BOUNDARY':
            return { ...state, draggedBoundary: action.payload };

        case 'T03_UI_SET_MAP_POSITION':
            return { ...state, mapPosition: action.payload };

        case 'T03_UI_SET_MOUSE_POSITION_ON_MAP':
            return { ...state, mousePositionOnMap: action.payload };

        case 'T03_UI_SET_DRAGGED_AREA_CONTROL_POINT':
            return { ...state, draggedAreaControlPoint: action.payload };

        case 'T03_UI_SET_ACTIVE_AREA_CONTROL_POINT':
            return { ...state, activeAreaControlPoint: action.payload };

        default:
            return state;
    }
};

export default ui;

export const getState = state => state.state;
export const getActiveBoundary = state => state.activeBoundary;
export const getDraggedBoundary = state => state.draggedBoundary;
export const getMapPosition = state => state.mapPosition;
export const getMousePositionOnMap = state => state.mousePositionOnMap;
export const getDraggedAreaControlPoint = state => state.draggedAreaControlPoint;
export const getActiveAreaControlPoint = state => state.activeAreaControlPoint;
