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
    };

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
    addition(a,b){
        let t= b.filter(function(e) {
                if (a.indexOf(e) == -1)                {
                    return true;
                }
            });
        return a.concat(t);
    }

    methods() {
        const selectedConditions = this.props.tool.conditions.filter((c) => {
            return c.selected;
        });
        const groupSelectedConditions = groupBy(selectedConditions, 'category');
        let groupSelectedMethods = [];
        for (const category in groupSelectedConditions) {
            let selectedMethods = [];
            for(let i = 0; i <groupSelectedConditions[category].length; i++){
                selectedMethods = this.addition(selectedMethods, groupSelectedConditions[category][i].applicable_methods);
            }
            groupSelectedMethods.push({
                category: category,
                selectedMethod: selectedMethods
            })
        }

//        for (let i = 0; i < selectedConditions.length; i++) {
//        for(let i = selectedConditions.length; i  0; i--){
//            applicable_methods = this.intersect(applicable_methods, selectedConditions[i].applicable_methods);
//        }
//        for(let i = 0; i <selectedConditions.length; i++){
//            applicable_methods = this.addition(applicable_methods, selectedConditions[i].applicable_methods);
//        }

        // get first
        let applicable_methods = (groupSelectedMethods.length > 0)
            ? groupSelectedMethods[0].selectedMethod
            : [];

        for (let i = 0; i < groupSelectedMethods.length; i++) {
            applicable_methods = this.intersect(applicable_methods, groupSelectedMethods[i].selectedMethod);
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
                    <td className="method-land-need">
                        <a href={method.href} target="_blank">
                            <img className="icon-image" src={method.image}/>
                        </a>
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
                                    <th>More information</th>
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
