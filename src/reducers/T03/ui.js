function getInitialState() {
    return {
        activeTool: null,
        activeBoundary: null
    };
}

const ui = ( state = getInitialState(), action ) => {
    switch ( action.type ) {
        case 'T03_UI_SET_ACTIVE_TOOL':
            return { ...state, activeTool: action.payload };

        case 'T03_UI_SET_ACTIVE_BOUNDARY':
            return { ...state, activeBoundary: action.payload };

        default:
            return state;
    }
};

export default ui;

export const getActiveTool = state => state.activeTool;
export const getActiveBoundary = state => state.activeBoundary;
