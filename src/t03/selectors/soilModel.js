export const getState = state => state.soilmodel;
// export const getLayersForInput = state => [];
export const getLayersForInput = state => state && state.soilmodel
    ? state.soilmodel.layers.map((layer, index) => {return {value: index, label: layer.name}})
    : [];
