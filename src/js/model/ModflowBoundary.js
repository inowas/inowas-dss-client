export default class ModflowBoundary {

    id;
    type;
    name;
    geometry;
    metaData;

    static fromParameters(id, name, type, geometry, metaData) {
        return new ModflowBoundary(id, name, type, geometry, metaData);
    }

    constructor(id, name, type, geometry, metaData) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.geometry = geometry;
        this.metaData = metaData;
    }
}
