import React from "react";

var reactMixin = require('react-mixin');
var UniqeIdMixin = require('unique-id-mixin');

export default class AccordionItem extends React.Component {

  render() {
    let id = this.getNextUid( 'unique-string' );

    return (
      <div class="panel panel-default">
        <div class="panel-heading" role="tab" id="headingOne">
          <h4 class="panel-title">
            <a role="button" data-toggle="collapse" data-parent="#accordion" href={'#' + id} aria-expanded="false" aria-controls="collapseOne">
              {this.props.heading}
            </a>
          </h4>
        </div>
        <div id={id} class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
          <div class="panel-body">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

}

reactMixin(AccordionItem.prototype, UniqeIdMixin);
