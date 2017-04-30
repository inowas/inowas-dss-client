import React from 'react';
import {connect} from 'react-redux';

import '../../less/4TileTool.less';
import '../../less/toolT06.less';

import {groupBy} from 'lodash';

import {changeCondition} from '../../actions/T06';
import Header from '../../components/tools/Header';
import Icon from '../../components/primitive/Icon';
import Navbar from '../Navbar';

@connect((store) => {
    return {tool: store.T06};
})
export default class T06 extends React.Component {

    state = {
        navigation: [{
            name: 'Documentation',
            path: 'https://wiki.inowas.hydro.tu-dresden.de/t06-mar-method-selection/',
            icon: <Icon name="file"/>
        }]
    }

    handleChange = (e) => {
        this.props.dispatch(changeCondition({name: e.target.value, selected: e.target.checked}));
    };

    conditions() {
        const groupedConditions = groupBy(this.props.tool.conditions, 'category');
        const groupedConditionsList = [];

        for (const category in groupedConditions) {
            if (groupedConditions.hasOwnProperty(category)) {
                const conditionsList = groupedConditions[category].map((c) => {
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
        let t;
        if (b.length > a.length)            {
            t = b,
            b = a,
            a = t;
        } // indexOf to loop over shorter
        return a.filter(function(e) {
            if (b.indexOf(e) !== -1)                {
                return true;
            }
        }
        );
    }

    methods() {
        const selectedConditions = this.props.tool.conditions.filter((c) => {
            return c.selected;
        });

        // get first
        let applicable_methods = (selectedConditions.length > 0)
            ? selectedConditions[0].applicable_methods
            : [];

        for (let i = 0; i < selectedConditions.length; i++) {
            applicable_methods = this.intersect(applicable_methods, selectedConditions[i].applicable_methods);
        }

        return (applicable_methods.map((am) => {
            const method = this.props.tool.methods.find((m) => {
                return (m.slug == am);
            });
            return (
                <tr className="method" key={method.slug}>
                    <td className="method-name">
                        {method.name}
                    </td>
                    <td className="method-cost">
                        {method.highCost
                            ? 'high'
                            : 'low'}
                    </td>
                    <td className="method-land-need">
                        {method.highLandNeed
                            ? 'high'
                            : 'low'}
                    </td>
                </tr>
            );
        }));
    }

    render() {
        const { navigation } = this.state;
        return (
            <div className="app-width tool-T06">
                <Navbar links={navigation} />
                <Header title={'T06. MAR method selection'}/>
                <div className="grid-container">
                    <section className="tile col col-abs-2 stacked">
                        <h2>Input Conditions</h2>
                        <ul className="conditions">
                            {this.conditions()}
                        </ul>
                    </section>

                    <section className="tile col col-abs-3 stretch">
                        <h2>Methods Suggested</h2>
                        <table className="methods">
                            <thead>
                                <tr>
                                    <th>MAR methods</th>
                                    <th>Unit costs</th>
                                    <th>Area required</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.methods()}
                            </tbody>
                        </table>
                    </section>
                </div>
            </div>
        );
    }
}
