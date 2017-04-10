export default class ResultType {

    availableTypes = ['head', 'drawdown'];

    type;

    constructor(type) {
        if (this.availableTypes.indexOf(type) === -1) {
            throw Error('Type expected to be head or drawdown');
        }
        this.type = type;
    }

    toString() {
        return this.type.toString();
    }

    sameAs(element) {
        return (this.type.toString() === element.toString());
    }
}
