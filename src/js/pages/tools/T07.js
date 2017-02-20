import React from 'react'
import {connect} from 'react-redux';

import Drawer from '../../components/primitive/Drawer';
import ScenarioSelect from '../../components/tools/ScenarioSelect';

import '../../../less/4TileTool.less';


@connect((store) => {
    return {tool: store.T07}
})
export default class T07 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            scenarios: [{
                baseModelId: 0,
                id: 0,
                name: 'name1',
                description: 'description1',
                thumbnail: 'scenarios_thumb.png',
                selected: true
            }, {
                baseModelId: 0,
                id: 1,
                name: 'name2',
                description: 'description2',
                thumbnail: 'scenarios_thumb.png',
                selected: false
            }]
        }
    }

    toggleSelection = (id) => {
        var state = {... this.state};
        var scenario = state.scenarios.find(s => {return s.id == id});
        scenario.selected = ! scenario.selected;
        this.setState(state);
    }

    render() {
        const {scenarios} = this.state;

        return (
            <div className="app-width">
                <Drawer visible={true}>
                    <ScenarioSelect scenarios={scenarios} toggleSelection={this.toggleSelection} />
                </Drawer>
                <div className="grid-container">
                    <section className="tile col stretch">
                    </section>
                </div>

                <div className="grid-container">
                    <section className="tile col col-abs-3 stretch">
                    </section>
                </div>
            </div>
        )
    }
}
