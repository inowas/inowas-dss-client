/* eslint-disable guard-for-in */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import '../../less/4TileTool.less';
import '../../less/toolT06.less';

import lodash from 'lodash';

import Header from '../../components/tools/Header';
import Icon from '../../components/primitive/Icon';
import Navbar from '../../containers/Navbar';

const navigation = [{
    name: 'Documentation',
    path: 'https://inowas.hydro.tu-dresden.de/tools/t06-mar-method-selection/',
    icon: <Icon name="file"/>
}];

class T06 extends React.Component {

    constructor(props) {
        super(props);
        this.state = props.toolInstance;
    }

    changeCondition = (changeCondition) => {
        const newState = this.state.conditions.map((c) => {
            if (c.name === changeCondition.name) {
                c.selected = changeCondition.selected;
            }

            return c;
        });

        this.setState({...newState});
    };

    handleChange = (e) => {
        this.changeCondition({name: e.target.value, selected: e.target.checked});
    };

    conditions() {
        const conditions = this.state.conditions;
        const groupedConditions = lodash.groupBy(conditions, 'category');
        const groupedConditionsList = [];

        for (const category in groupedConditions) {
            if (groupedConditions.hasOwnProperty(category)) {
                const conditionsList = groupedConditions[category].map((c) => {
                    return (
                        <li className="condition" key={c.name.replaceAll(' ', '_')}>
                            <label className="condition-label">
                                <input
                                    onChange={this.handleChange}
                                    value={c.name}
                                    checked={c.selected}
                                    type="checkbox"/>
                                {c.name}
                            </label>
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

    methods() {
        const selectedConditions = this.state.conditions.filter((c) => {
            return c.selected;
        });

        const groupSelectedConditions = lodash.groupBy(selectedConditions, 'category');
        const groupSelectedMethods = [];
        for (const category in groupSelectedConditions) {
            let selectedMethods = [];
            for (let i = 0; i < groupSelectedConditions[category].length; i++) {
                selectedMethods = lodash.union(selectedMethods, groupSelectedConditions[category][i].applicable_methods);
            }
            groupSelectedMethods.push({
                category: category,
                selectedMethod: selectedMethods
            });
        }

        // get first
        let applicableMethods = (groupSelectedMethods.length > 0)
            ? groupSelectedMethods[0].selectedMethod
            : [];

        for (let i = 0; i < groupSelectedMethods.length; i++) {
            applicableMethods = lodash.intersection(applicableMethods, groupSelectedMethods[i].selectedMethod);
        }

        return (applicableMethods.map((am) => {
            const method = this.state.methods.find((m) => {
                return (m.slug === am);
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
        return (
            <div className="app-width tool-T06">
                <Navbar links={navigation}/>
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

const mapStateToProps = (state) => {
    return {
        toolInstance: state.T06
    };
};

T06.propTypes = {
    toolInstance: PropTypes.object,
};

export default withRouter(connect(mapStateToProps)(T06));
