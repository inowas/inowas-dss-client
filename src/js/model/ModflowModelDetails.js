export default class ModflowModelDetails{

    id = null;
    name = null;
    description = null;
    area = null;
    boundingBox = null;
    gridSize = null;
    isBaseModel = null;

    constructor(id, name, description, area, boundingBox, gridSize, isBaseModel = false){
        this.id = id;
        this.name = name;
        this.description = description;
        this.area = area;
        this.boundingBox = boundingBox;
        this.gridSize = gridSize;
        this.isBaseModel = isBaseModel;
    };

    getId(){
        return this.id;
    }
}
