import React from 'react';
import {Route, IndexRoute} from 'react-router';
import AppForAuthenticatedUser from './containers/AppForAuthenticatedUser';
import tools from './containers/tools';
import * as T02 from './t02/index';
import * as T03 from './t03/index';
import * as T07 from './t07/index';
import * as T04 from './t04/index';
import * as ToolInstance from './toolInstance/index';
import DashboardContainer from './containers/Dashboard';
import Login from './containers/Login';
import LandingPage from './containers/LandingPage';
import Impressum from './containers/Impressum';
import {WebData} from './core/index';

const routes = store => (
    <Route path="/">
        <IndexRoute component={LandingPage}/>
        <Route path="impressum" component={Impressum}/>
        <Route path="tools" component={AppForAuthenticatedUser}>
            <IndexRoute component={DashboardContainer}/>
            <Route
                path="T02(/:id)"
                component={T02.Container.Main}
                tool={'T02'}
                onEnter={nextState => {
                    // REVIEW Shouldn't this be in componentWillReceiveProps and componentWillMount
                    store.dispatch(WebData.Modifier.Action.clear());
                    if (nextState.params.id) {
                        store.dispatch(
                            ToolInstance.Modifier.Query.getToolInstance(
                                'T02',
                                nextState.params.id,
                            )
                        );
                    }
                }}
            />
            <Route
                path="T03(/:id)(/:property)(/:type)(/:pid)"
                component={T03.Container.Main}
                tool={'T03'}
                onEnter={nextState => {
                    // REVIEW Shouldn't this be in componentWillReceiveProps and componentWillMount
                    store.dispatch(WebData.Modifier.Action.clear());
                    if (nextState.params.id) {
                        store.dispatch(
                            T03.Modifier.Query.getModflowModelDetails(
                                'T03',
                                nextState.params.id,
                                nextState.params.property,
                                nextState.params.type,
                                nextState.params.pid
                            )
                        );
                        return;
                    }
                    store.dispatch(
                        T03.Modifier.Action.destroyModflowModel('T03')
                    );
                }}
            />
            <Route path="T04" component={T04.Container.Main}/>
            <Route path="T06(/:id)" component={tools.T06}/>
            <Route path="T07" component={T07.Container.Main}>
                <IndexRoute component={T07.Component.New}/>
                <Route path=":id">
                    <IndexRoute component={T07.Component.CrossSection}/>
                    <Route
                        path="CrossSection"
                        component={T07.Component.CrossSection}
                    />
                    <Route
                        path="Difference"
                        component={T07.Component.Difference}
                    />
                    <Route
                        path="TimeSeries"
                        component={T07.Component.TimeSeries}
                    />
                </Route>
            </Route>
            <Route path="T07E/:said" tool={'T07E'}>
                <Route
                    path=":id(/:property)(/:type)(/:pid)"
                    component={T03.Container.Main}
                    tool={'T07E'}
                    onEnter={nextState => {
                        // REVIEW Shouldn't this be in componentWillReceiveProps and componentWillMount
                        store.dispatch(WebData.Modifier.Action.clear());
                        if (nextState.params.id) {
                            store.dispatch(
                                T03.Modifier.Query.getModflowModelDetails(
                                    'T07E',
                                    nextState.params.id,
                                    nextState.params.property,
                                    nextState.params.type,
                                    nextState.params.pid
                                )
                            );
                            return;
                        }
                        store.dispatch(
                            T03.Modifier.Action.destroyModflowModel('T07E')
                        );
                    }}
                />
            </Route>
            <Route path="T08/:id" component={tools.T08}/>
            <Route path="T09(/:id)" component={tools.T09}/>
            <Route path="T09A(/:id)" component={tools.T09A}/>
            <Route path="T09B(/:id)" component={tools.T09B}/>
            <Route path="T09C(/:id)" component={tools.T09C}/>
            <Route path="T09D(/:id)" component={tools.T09D}/>
            <Route path="T09E(/:id)" component={tools.T09E}/>
            <Route path="T12(/:id)" component={tools.T12}/>
            <Route path="T13(/:id)" component={tools.T13}/>
            <Route path="T13A(/:id)" component={tools.T13A}/>
            <Route path="T13B(/:id)" component={tools.T13B}/>
            <Route path="T13C(/:id)" component={tools.T13C}/>
            <Route path="T13D(/:id)" component={tools.T13D}/>
            <Route path="T13E(/:id)" component={tools.T13E}/>
            <Route path="T14(/:id)" component={tools.T14}/>
            <Route path="T14A(/:id)" component={tools.T14A}/>
            <Route path="T14B(/:id)" component={tools.T14B}/>
            <Route path="T14C(/:id)" component={tools.T14C}/>
            <Route path="T14D(/:id)" component={tools.T14D}/>
            <Route path="T16(/:id)" component={tools.T16}/>
            <Route path="T17(/:id)" component={tools.T17}/>
            <Route path="T18(/:id)" component={tools.T18}/>
        </Route>
        <Route path="login" component={Login}/>
    </Route>
);

export default routes;
