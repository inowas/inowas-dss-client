function getInitialState() {
    return {
        view: 'properties',
        state: 'general',
        activeBoundaryType: null,
        activeBoundary: null,
        draggedBoundary: null,
        mapPosition: null,
        mousePositionOnMap: {
            lat: null,
            lng: null
        },
        draggedAreaControlPoint: null,
        activeAreaControlPoint: null,
        activeBoundaryControlPoint: null
    };
}

const createUiReducer = tool => {
    const ui = ( state = getInitialState(), action ) => {
        if (action.tool !== tool) {
            return state;
        }
        switch ( action.type ) {
            case 'MODEL_EDITOR_UI_SET_VIEW':
                return { ...state, view: action.payload };

            case 'MODEL_EDITOR_UI_SET_STATE':
                return { ...state, state: action.payload };

            case 'MODEL_EDITOR_UI_SET_ACTIVE_BOUNDARY':
                return { ...state, activeBoundary: action.payload };

            case 'MODEL_EDITOR_UI_SET_ACTIVE_BOUNDARY_TYPE':
                return { ...state, activeBoundaryType: action.payload };

            case 'MODEL_EDITOR_UI_SET_DRAGGED_BOUNDARY':
                return { ...state, draggedBoundary: action.payload };

            case 'MODEL_EDITOR_UI_SET_MAP_POSITION':
                return { ...state, mapPosition: action.payload };

            case 'MODEL_EDITOR_UI_SET_MOUSE_POSITION_ON_MAP':
                return { ...state, mousePositionOnMap: action.payload };

            case 'MODEL_EDITOR_UI_SET_DRAGGED_AREA_CONTROL_POINT':
                return { ...state, draggedAreaControlPoint: action.payload };

            case 'MODEL_EDITOR_UI_SET_ACTIVE_AREA_CONTROL_POINT':
                return { ...state, activeAreaControlPoint: action.payload };

            case 'MODEL_EDITOR_UI_SET_ACTIVE_BOUNDARY_CONTROL_POINT':
                return { ...state, activeBoundaryControlPoint: action.payload };

            default:
                return state;
        }
    };

    return ui;
};

export default createUiReducer;

export const getView = state => state.view;
export const getState = state => state.state;
export const getActiveBoundary = state => state.activeBoundary;
export const getActiveBoundaryType = state => state.activeBoundaryType;
export const getDraggedBoundary = state => state.draggedBoundary;
export const getMapPosition = state => state.mapPosition;
export const getMousePositionOnMap = state => state.mousePositionOnMap;
export const getDraggedAreaControlPoint = state => state.draggedAreaControlPoint;
export const getActiveAreaControlPoint = state => state.activeAreaControlPoint;
export const getActiveBoundaryControlPoint = state => state.activeBoundaryControlPoint;
