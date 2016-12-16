import React from "react";

import reactMixin from "react-mixin";
import UniqeIdMixin from "unique-id-mixin";
import Icon from "../primitive/Icon.js";

export default class AccordionItem extends React.Component {

    render() {
        const id = this.getNextUid('unique-string');
        const panelClass = this.props.primary
            ? " panel-primary primary"
            : " panel-default";

        return (
            <div className={"accordion-item panel" + panelClass}>
                <div className="accordion-item-heading panel-heading" role="tab" id={"heading_" + id}>
                    <button class="btn btn-link" role="button" data-toggle="collapse" data-parent={"#" + this.context.id} data-target={'#' + id} aria-expanded="false" aria-controls="collapseOne">
                        {this.props.icon}
                        <Icon className="pull-right" icon="arrow-down" />
                        {this.props.heading}
                    </button>
                </div>
                <div id={id} className="accordion-item-body anel-collapse collapse" role="tabpanel" aria-labelledby={"heading_" + id}>
                    <div className={this.props.list
                        ? 'list-group'
                        : 'panel-body'}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

}

reactMixin(AccordionItem.prototype, UniqeIdMixin);

AccordionItem.contextTypes = {
    id: React.PropTypes.string
};
