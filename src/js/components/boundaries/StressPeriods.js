import React from "react";

import reactMixin from "react-mixin";
import UniqeIdMixin from "unique-id-mixin";

export default class StressPeriods extends React.Component {

  renderStressPeriods() {
    return this.props.data.map(s => {
      return (
        <tr key={s.id}>
          <td>{s.date_time_begin}</td>
          <td>{s.flux}</td>
          <td>
            <button className="btn btn-xs btn-danger" type="button">
              <span className="glyphicon glyphicon-trash"></span>
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {

    const idTable = this.getNextUid( 'unique-string' );
    const idPlot = this.getNextUid( 'unique-string' );

    return (
      <div>
        <ul className="nav nav-tabs">
          <li role="presentation" className="active">
            <a href={'#' + idTable}>Table</a>
          </li>
          <li role="presentation">
            <a href={'#' + idPlot}>Plot</a>
          </li>
        </ul>

        <table id={idTable} className="table table-striped">
          <thead>
            <tr>
              <th>
                Start time
              </th>
              <th>
                Flux
              </th>
              <th>
                <div className="btn-group" role="group">
                  <button type="button" className="btn btn-default">
                    <span className="glyphicon glyphicon-plus"></span>
                  </button>
                  <button type="button" className="btn btn-default">
                    <span className="glyphicon glyphicon-import"></span>
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.renderStressPeriods()}
          </tbody>
        </table>
      </div>
    );
  }

}

reactMixin(StressPeriods.prototype, UniqeIdMixin);
