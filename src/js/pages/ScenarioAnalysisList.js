import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { fetchAllModels, fetchModelMap } from "../actions/ModelActions"
import ModelListMap from "../components/map/ModelListMap"

@connect((store) => {
    return {
        models: store.models,
    }
})
export default class ScenarioAnalysisList extends React.Component {

    hasData(){
        return this.props.models.fetched;
    }

    componentWillMount(){
        this.props.dispatch(fetchAllModels());
        this.props.dispatch(fetchModelMap());
    }

    render() {
        if (this.hasData()){
            const models = this.props.models.models.map( model => {
                return (
                    <tr key={model.id}>
                        <td>#</td>
                        <td><Link to={'/scenarioanalysis/' + model.id}>{model.name}</Link></td>
                    </tr>
                )
            });

            return (
                <div className="page-wrapper">
                    <div className="page-width">
                        <div className="grid-container">
                            <section className="tile col col-abs-3 stacked">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <ul className="nav nav-pills">
                                                <li role="presentation" className="clickable"><a>My models</a></li>
                                                <li role="presentation" className="clickable active"><a>Public models</a></li>
                                            </ul>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Search for..." />
                                                <span className="input-group-btn">
                                                    <button className="btn btn-default" type="button">Go!</button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <table id="table_public_models" className="table table-striped table-hover table_models">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Model name</th>
                                                <th>Creator</th>
                                                <th>Created</th>
                                                <th>Last modified</th>
                                                <th>Public</th>
                                                <th>State</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {models}
                                        </tbody>
                                    </table>
                            </section>
                            <section className="col col-abs-2 stacked">
                                <ModelListMap mapData={this.props.models.mapData}/>
                            </section>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="page-wrapper">
                <span>LOADING</span>
            </div>
        );
    }
}
