/**
 * ModflowModel Base Class
 */
export default class ModflowModel {

    modelId = null;
    name = null;
    description = null;
    boundaries = [];
    selected: true;
    isBaseModel;

    static fromModflowDetails(details){
        let model = new ModflowModel(details.modelId, details.isBaseModel);
        console.log(details);
        model.name = details.name;
        model.description = details.description;
        return model;
    }

    constructor(modelId, isBaseModel = false) {
        this.modelId = modelId;
        this.isBaseModel = isBaseModel;
    }

    setName(name) {
        this.name = name;
    }

    setDescription(name) {
        this.description = description;
    }

    addBoundary(boundary) {
        this.boundaries.push(boundary);
    }

    updateBoundary(boundary) {
        this.boundaries.map( b => {
            if (b.id === boundary.id) {
                return boundary;
            }
        })
    }
}
