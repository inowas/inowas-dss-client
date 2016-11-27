import React from "react";

import {IndexLink, Link} from "react-router";

export default class Wells extends React.Component {

  render() {
    return (
      <div class="wells-wrapper panel panel-primary">
        <div class="panel-heading clearfix">
          <h3 class="panel-title pull-left">Wells</h3>
          <IndexLink class="pull-right" to="/">
            <span class="glyphicon glyphicon-remove"></span>
          </IndexLink>
        </div>
        <div class="panel-body">
          <div class="sidebar col-xs-4 col-md-2">
            <div class="container-fluid">
              <div class="form-group col-sm-12">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Search for..."/>
                  <span class="input-group-btn">
                    <button class="btn btn-default" type="button">
                      <span class="glyphicon glyphicon-search"></span>
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <div class="scroll container-fluid">
              <div class="col-sm-12">
                <ul class="nav nav-pills nav-stacked">
                  <li role="presentation" class="active">
                    <a href="#">
                      <span class="color-dot color-1"></span>PB-93</a>
                  </li>
                  <li role="presentation">
                    <a href="#">
                      <span class="color-dot color-1"></span>PB-94</a>
                  </li>
                  <li role="presentation">
                    <a href="#">
                      <span class="color-dot color-1"></span>PB-95</a>
                  </li>
                  <li role="presentation">
                    <a href="#">
                      <span class="color-dot color-2"></span>GS-173a</a>
                  </li>
                  <li role="presentation">
                    <a href="#">
                      <span class="color-dot color-1"></span>PB-95</a>
                  </li>
                  <li role="presentation">
                    <a href="#">
                      <span class="color-dot color-1"></span>PB-95</a>
                  </li>
                  <li role="presentation">
                    <a href="#">
                      <span class="color-dot color-1"></span>PB-95</a>
                  </li>
                  <li role="presentation">
                    <a href="#">
                      <span class="color-dot color-1"></span>PB-95</a>
                  </li>
                  <li role="presentation">
                    <a href="#">
                      <span class="color-dot color-1"></span>PB-95</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="container-fluid">
              <div class="col-sm-12">
                <button class="btn btn-default btn-block" type="button">
                  <span class="glyphicon glyphicon-plus"></span>
                </button>
              </div>
            </div>
          </div>

          <div class="middlebar col-xs-8 col-md-3">
            <h3>Well Properties</h3>
            <form class="form-horizontal">
              <div class="form-group form-group-sm">
                <label for="inputName" class="col-sm-3 control-label">Well name</label>
                <div class="col-sm-9">
                  <input name="name" id="inputName" type="text" class="form-control input-sm" placeholder="Well name"/>
                </div>
              </div>
              <div class="form-group form-group-sm">
                <label for="inputType" class="col-sm-3 control-label">Well type</label>
                <div class="col-sm-9">
                  <select name="type" id="inputType" class="form-control input-sm">
                    <option>Municipal Well</option>
                    <option>Well type 2</option>
                  </select>
                </div>
              </div>
              <div class="form-group form-group-sm coordinates-group">
                <label for="inputLatitude" class="col-sm-3 control-label margin-bottom">Latitude</label>
                <div class="col-sm-7 margin-bottom">
                  <div class="input-group input-group-sm">
                    <span class="input-group-addon">X</span>
                    <input name="latitude" id="inputLatitude" type="number" step="any" class="form-control input-sm" placeholder="Latitude"/>
                  </div>
                </div>
                <div class="col-sm-2 vert-offset">
                  <button data-toggle="tooltip" data-placement="bottom" title="Get from map!" class="btn btn-sm btn-default" type="button">
                    <span class="glyphicon glyphicon-map-marker"></span>
                  </button>
                </div>
                <label for="inputLongitude" class="col-sm-3 control-label">Longitude</label>
                <div class="col-sm-7">
                  <div class="input-group input-group-sm">
                    <span class="input-group-addon">Y</span>
                    <input name="name" id="inputLongitude" type="number" step="any" class="form-control input-sm" placeholder="Longitude"/>
                  </div>
                </div>
              </div>
              <div class="form-group form-group-sm">
                <label for="inputDepth" class="col-sm-3 control-label">Depth</label>
                <div class="col-sm-9">
                  <div class="input-group input-group-sm">
                    <input name="depth" id="inputDepth" type="number" step="any" class="form-control input-sm" placeholder="Depth"/>
                    <span class="input-group-addon">m</span>
                  </div>
                </div>
              </div>
              <div class="form-group form-group-sm">
                <label for="inputTags" class="col-sm-3 control-label">Tags</label>
                <div class="col-sm-9">
                  <textarea name="tags" id="inputTags" class="form-control input-sm" rows="2" placeholder="Tags"></textarea>
                </div>
              </div>
            </form>

            <div class="container-fluid">
              <div class="soil-diagram pull-right">
                <div class="soil-depth">0.00m</div>
                <div class="soil-layer soil-1" style={{
                  flex: 10
                }}>
                  <span class="layer-badge">Layer 1</span>
                </div>
                <div class="soil-depth">-0.80m</div>
                <div class="soil-layer soil-2" style={{
                  flex: 10
                }}>
                  <span class="layer-badge">Layer 2</span>
                </div>
                <div class="soil-depth">-4.80m</div>
                <div class="soil-layer soil-3" style={{
                  flex: 30
                }}>
                  <span class="layer-badge">Layer 3</span>
                </div>
                <div class="soil-depth">-16.50m</div>
                <div class="soil-layer soil-4" style={{
                  flex: 25
                }}>
                  <span class="layer-badge">Layer 4</span>
                </div>
                <div class="soil-depth">-50.10m</div>
                <div class="soil-layer soil-5" style={{
                  flex: 25
                }}>
                  <span class="layer-badge">Layer 5</span>
                </div>
                <div class="soil-depth">-91.90m</div>
              </div>
            </div>

          </div>

          <div class="mainbar col-md-7">
            <h3>Pumping Rates</h3>
            <ul class="nav nav-tabs">
              <li role="presentation" class="active">
                <a href="#">Table</a>
              </li>
              <li role="presentation">
                <a href="#">Plot</a>
              </li>
            </ul>

            <table class="pump-rates table table-striped">
              <thead>
                <tr>
                  <th>
                    <div class="heading">Start time</div>
                    <div class="description">(dd.mm.yyyy)</div>
                  </th>
                  <th>
                    <div class="heading">End time</div>
                    <div class="description">(dd.mm.yyyy)</div>
                  </th>
                  <th>
                    <div class="heading">Pumping rate</div>
                    <div class="description">(m³/d)</div>
                  </th>
                  <th>
                    <div class="btn-group" role="group">
                      <button type="button" class="btn btn-default">
                        <span class="glyphicon glyphicon-plus"></span>
                      </button>
                      <button type="button" class="btn btn-default">
                        <span class="glyphicon glyphicon-import"></span>
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01.04.2009</td>
                  <td>31.03.2011</td>
                  <td>490</td>
                  <td>
                    <button class="btn btn-xs btn-danger" type="button">
                      <span class="glyphicon glyphicon-trash"></span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>01.04.2009</td>
                  <td>31.03.2011</td>
                  <td>490</td>
                  <td>
                    <button class="btn btn-xs btn-danger" type="button">
                      <span class="glyphicon glyphicon-trash"></span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>01.04.2009</td>
                  <td>31.03.2011</td>
                  <td>490</td>
                  <td>
                    <button class="btn btn-xs btn-danger" type="button">
                      <span class="glyphicon glyphicon-trash"></span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="container-fluid">
              <div class="btn-group pull-right" role="group">
                <button type="button" class="btn btn-default">Cancel</button>
                <button type="button" class="btn btn-primary">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
