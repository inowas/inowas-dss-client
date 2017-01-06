import React from "react";

import reactMixin from "react-mixin";
import UniqeIdMixin from "unique-id-mixin";

export default class Accordion extends React.Component {

    componentWillMount() {
        this.setState({
            id: "accordion_" + this.getNextUid('unique-string')
        });
    }

    getChildContext() {
        return {id: this.state.id};
    }

    render() {
        const className = this.props.className;
        const id = this.state.id;

        return (
            <div className={"panel-group accordion" + " " + className} id={id} role="tablist" aria-multiselectable="true">
                {this.props.children}
            </div>
        );
    }

}

reactMixin(Accordion.prototype, UniqeIdMixin);

Accordion.childContextTypes = {
    id: React.PropTypes.string
};
