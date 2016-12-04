import React from "react";

import reactMixin from "react-mixin";
import UniqeIdMixin from "unique-id-mixin";

export default class AccordionItem extends React.Component {

  render() {
    const id = this.getNextUid( 'unique-string' );

    return (
      <div className="panel panel-default">
        <div className="panel-heading" role="tab" id="headingOne">
          <h4 className="panel-title">
            <a role="button" data-toggle="collapse" data-parent="#accordion" href={'#' + id} aria-expanded="false" aria-controls="collapseOne">
              {this.props.heading}
            </a>
          </h4>
        </div>
        <div id={id} className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
          <div className={this.props.list ? 'list-group' : 'panel-body'}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

}

reactMixin(AccordionItem.prototype, UniqeIdMixin);
