
const initialState = {
    fetching: false,
    fetched: false,
    error: null,
    model: {},
    styles: {
        inactive: {color: "#000", weight: 0, fillColor: "#000", fillOpacity: 0.7},
        active: {color: "#ff7800", weight: 0, fillColor: "#000", fillOpacity: 0},
        boundingBox: {color: "#000", weight: 0.2, fillColor: "blue", fillOpacity: 0},
        areaGeometry: {color: "#000", weight: 0.2, fillColor: "blue", fillOpacity: 0.1},
        hasNoWell: {color: "#000", weight: 0, fillOpacity: 0},
        hasWell: {color: "blue", weight: 1, fillColor: "darkblue", fillOpacity: 1},
        wells: {
            cw:  {radius: 5, color: 'black', weight: 1, fillColor: 'darkgreen', fillOpacity: 0.7},
            iw:  {radius: 5, color: 'black', weight: 1, fillColor: 'darkgreen', fillOpacity: 0.7},
            sniw:  {radius: 7, color: 'red', weight: 2, fillColor: 'darkgreen', fillOpacity: 0.7},
            puw: {radius: 5, color: 'black', weight: 1, fillColor: 'darkblue', fillOpacity: 0.7},
            snpw:  {radius: 7, color: 'red', weight: 2, fillColor: 'darkblue', fillOpacity: 0.7},
            prw: {radius: 5, color: 'black', weight: 1, fillColor: 'darkblue', fillOpacity: 0.7},
            smw: {radius: 7, color: 'black', weight: 1, fillColor: 'red', fillOpacity: 1},
            snw: {radius: 7, color: 'black', weight: 1, fillColor: 'yellow', fillOpacity: 1},
            snifw:  {radius: 7, color: '#63b3ea', weight: 2, fillColor: '#bbdff6', fillOpacity: 0.7}
        },
        CHD: {color: "green", weight: 3, fillColor: "green", fillOpacity: 1},
        GHB: {color: "red", weight: 3, fillColor: "red", fillOpacity: 1},
        RCH: {color: "blue", weight: 0, fillColor: "blue", fillOpacity: 0.1},
        RIV: {color: "blue", weight: 5, fillColor: "blue", fillOpacity: 1}
    }
};

const modelReducer = ( state=initialState, action ) => {
    switch (action.type) {
        case "FETCH_MODEL_PENDING": {
            state = { ...state, fetching: true };
            break;
        }
        case "FETCH_MODEL_REJECTED": {
            state = { ...state, fetching: false, error: action.payload };
            break;
        }
        case "FETCH_MODEL_FULFILLED": {
            state = {
                ...state,
                fetching: false,
                fetched: true,
                model: action.payload.data
            };
            break;
        }
        case "FETCH_EXAMPLE_MODEL_FULFILLED": {
            state = {
                ...state,
                fetching: false,
                fetched: true,
                model: action.payload
            };
            break;
        }
        case "FETCH_MODEL_BOUNDARY_PENDING": {
            state = { ...state, fetching: true };
            break;
        }
        case "FETCH_MODEL_BOUNDARY_REJECTED": {
            state = { ...state, fetching: false, errorBoundaries: action.payload };
            break;
        }
        case "FETCH_MODEL_BOUNDARY_FULFILLED": {
            state = {
                ...state,
                fetchingBoundaries: false,
                fetchedBoundaries: true,
            };

            state.model.boundaries = state.model.boundaries.map( b => {
                if (b.id == action.payload.data.id) {
                    return b = action.payload.data;
                }
                return b;
            });
            break;
        }

    }
    return state;
};

export default modelReducer;
