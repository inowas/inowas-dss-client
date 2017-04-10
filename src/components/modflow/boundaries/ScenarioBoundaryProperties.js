import React from 'react'

import Sidebar from './BoundarySidebar';
import Content from './ScenarioBoundaryContent';

import { setActiveBoundary } from '../../../actions/ApplicationActions'
import { fetchScenarioBoundary, removeWell, choosePointForNewWell} from '../../../actions/ScenarioAnalysisActions'

import store from '../../../store';

export default class ScenarioBoundaryProperties extends React.Component {

    setActiveBoundary(bType, id){
        store.dispatch(setActiveBoundary(bType, id));
        store.dispatch(fetchScenarioBoundary(store.getState().scenarioAnalysis.baseModel, store.getState().scenarioAnalysis.activeScenario, id));
    }

    addBoundary(){
        store.dispatch(choosePointForNewWell());
    }

    removeBoundary(){
        const appState = this.props.appState;
        const bType = this.props.appState.boundaryProperties;
        const boundaries = this.props.model.boundaries.filter(b => b.type == bType);
        const selectedBoundary = this.props.model.boundaries.filter(b => b.id == appState.activeBoundaries[bType])[0];
        store.dispatch(removeWell(store.getState().scenarioAnalysis.baseModel, store.getState().scenarioAnalysis.activeScenario, selectedBoundary.id));
        this.setActiveBoundary(bType, boundaries[0].id);
    }

    componentWillMount(){
        const appState = this.props.appState;
        const bType = appState.boundaryProperties;
        const boundaries = this.props.model.boundaries.filter(b => b.type == bType);

        if (appState.activeBoundaries.hasOwnProperty(bType) == false){
            if (boundaries.length > 0) {
                this.setActiveBoundary(bType, boundaries[0].id);
            }
        }
    }

    render() {
        const appState = this.props.appState;
        const bType = this.props.appState.boundaryProperties;
        const boundaries = this.props.model.boundaries.filter(b => b.type == bType);
        const selectedBoundary = this.props.model.boundaries.filter(b => b.id == appState.activeBoundaries[bType]);

        return (
            <div className="boundaries-wrapper">
                <Sidebar boundaries={boundaries}
                         appState={appState}
                         setActiveBoundary={::this.setActiveBoundary}
                         addBoundary={::this.addBoundary}
                         removeBoundary={::this.removeBoundary}
                />
                <Content boundary={selectedBoundary} />
            </div>
        );
    }
}

ScenarioBoundaryProperties.contextTypes = {
    model: React.PropTypes.object,
};
