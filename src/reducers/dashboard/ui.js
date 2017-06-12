const initialState = {
    activeToolSlug: 'T07',
    publicInstances: false
};

const ui = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'DASHBOARD_SET_ACTIVE_TOOL':
            return {
                ...state,
                activeToolSlug: action.payload
            };

        case 'DASHBOARD_SET_PUBLIC':
            return {
                ...state,
                publicInstances: action.payload
            };
        default:
            return state;
    }
};

export default ui;

export const getActiveToolSlug = state => state.activeToolSlug;
export const getPublic = state => state.publicInstances;
