import React from 'react'
import {connect} from 'react-redux';

import {groupBy} from 'lodash';

import {changeCondition} from '../../actions/T06';

@connect((store) => {
    return {tool: store.T06}
})
export default class T06 extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this
            .handleChange
            .bind(this);
    }

    handleChange = (e) => {
        this
            .props
            .dispatch(changeCondition({name: e.target.value, selected: e.target.checked}));
    };

    conditions() {

        var groupedConditions = groupBy(this.props.tool.conditions, 'category');
        var groupedConditionsList = [];


        for (var category in groupedConditions) {
            if (groupedConditions.hasOwnProperty(category)) {
                var conditionsList = groupedConditions[category].map((c) => {
                    return (
                        <li className="condition" key={c.name.replaceAll(' ', '_')}>
                            <label className="condition-label"><input onChange={this.handleChange} value={c.name} checked={c.selected} type="checkbox"/>{c.name}</label>
                        </li>
                    );
                });

                groupedConditionsList.push(
                    <li key={category.replaceAll(' ', '_')}>
                        <span className="category-name">{category}</span>
                        <ul>
                            {conditionsList}
                        </ul>
                    </li>
                );
            }
        }

        return groupedConditionsList;

    }

    intersect(a, b) {
        var t;
        if (b.length > a.length)
            t = b,
            b = a,
            a = t; // indexOf to loop over shorter
        return a.filter(function (e) {
            if (b.indexOf(e) !== -1)
                return true;
            }
        );
    }

    methods() {
        var selectedConditions = this
            .props
            .tool
            .conditions
            .filter((c) => {
                return c.selected
            });

        // get first
        var applicable_methods = (selectedConditions.length > 0)
            ? selectedConditions[0].applicable_methods
            : [];

        for (var i = 0; i < selectedConditions.length; i++) {
            applicable_methods = this.intersect(applicable_methods, selectedConditions[i].applicable_methods);
        }

        return (applicable_methods.map((am) => {
            const method = this.props.tool.methods.find((m) => {return (m.slug == am)});
            return (
                <tr className="method" key={method.slug}>
                    <td className="method-name">
                        {method.name}
                    </td>
                    <td className="method-cost">
                        {method.highCost ? 'high' : 'low'}
                    </td>
                    <td className="method-land-need">
                        {method.highLandNeed ? 'high' : 'low'}
                    </td>
                </tr>
            );
        }));
    }

    render() {
        //const {conditions, methods} = this.props.tool;

        return (
            <div className="page-wrapper">
                <div className="page-width tool-T06">
                    <div className="grid-container">
                        <section className="tile col col-abs-2 stacked">
                            <h2>Input Conditions</h2>
                            <ul className="conditions">
                                {this.conditions()}
                            </ul>
                        </section>

                        <section className="tile col col-abs-3 stretch">
                            <h2>Methods Suggested</h2>
                            <table class="methods">
                                <tr>
                                    <th>MAR methods</th>
                                    <th>Unit costs</th>
                                    <th>Area required</th>
                                </tr>
                                {this.methods()}
                            </table>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}
