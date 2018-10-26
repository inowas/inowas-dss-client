import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {AppForAuthenticatedUser, AppForAdminUser, AppForAllUsers} from './user/containers';
import tools from './containers/tools';
import * as Dashboard from './dashboard/index';
import * as T01 from './t01/index';
import * as T02 from './t02/index';
import * as T03 from './t03/index';
import * as T04 from './t04/index';
import * as T06 from './t06/index';
import * as T07 from './t07/index';
import * as T08 from './t08/index';
import * as T09 from './t09/index';
import * as T11 from './t11/index';
import * as T12 from './t12/index';
import * as T13 from './t13/index';
import * as T14 from './t14/index';
import * as T18 from './t18/index';
import * as User from './user/index';
import {Login, Logout, SignUp} from './user/containers';
import Impressum from './containers/Impressum';
import {WebData} from './core/index';
import LandingPage from './containers/LandingPage';

const routes = store => (
    <Route path="/" component={AppForAllUsers}>
        <IndexRoute component={LandingPage}/>
        <Route path="impressum" component={Impressum}/>
        <Route path="login" component={Login}/>
        <Route path="logout" component={Logout}/>
        <Route path="signup" component={SignUp}/>
        <Route path="admin" component={AppForAdminUser}>
            <IndexRoute component={Dashboard.Container.AdminDashboard}/>
        </Route>

        <Route path="credentials" component={AppForAuthenticatedUser}>
            <IndexRoute component={User.Container.UserCredentials}/>
        </Route>

        <Route path="profile" component={AppForAuthenticatedUser}>
            <IndexRoute component={User.Container.UserProfile}/>
        </Route>

        <Route path="tools" component={AppForAuthenticatedUser}>
            <IndexRoute component={Dashboard.Container.Dashboard}/>
            <Route path="T01(/:id)" component={T01.Container.Main} tool={'T01'}/>
            <Route path="T02(/:id)" component={T02.Container.Main} tool={'T02'}/>

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

            <Route path="T04" component={T04.Container.Main} tool={'T04'}/>
            <Route path="T06" component={T06.Container.Main} tool={'T06'}/>
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

            <Route path="T08(/:id)" component={T08.Container.Main} tool={'T08'}/>

            <Route path="T09" component={T09.Container.T09} tool={'T09'}/>
            <Route path="T09A(/:id)" component={T09.Container.T09A} tool={'T09A'}/>
            <Route path="T09B(/:id)" component={T09.Container.T09B} tool={'T09B'}/>
            <Route path="T09C(/:id)" component={T09.Container.T09C} tool={'T09C'}/>
            <Route path="T09D(/:id)" component={T09.Container.T09D} tool={'T09D'}/>
            <Route path="T09E(/:id)" component={T09.Container.T09E} tool={'T09E'}/>
            <Route path="T09F(/:id)" component={T09.Container.T09F} tool={'T09F'}/>

            <Route path="T11" component={T11.Container.T11} tool={'T11'}/>

            <Route path="T12(/:id)" component={T12.Container.Main} tool={'T12'}/>

            <Route path="T13" component={T13.Container.T13}/>
            <Route path="T13A(/:id)" component={T13.Container.T13A} tool={'T13A'}/>
            <Route path="T13B(/:id)" component={T13.Container.T13B} tool={'T13B'}/>
            <Route path="T13C(/:id)" component={T13.Container.T13C} tool={'T13C'}/>
            <Route path="T13D(/:id)" component={T13.Container.T13D} tool={'T13D'}/>
            <Route path="T13E(/:id)" component={T13.Container.T13E} tool={'T13E'}/>

            <Route path="T14" component={T14.Container.T14}/>
            <Route path="T14A(/:id)" component={T14.Container.T14A} tool={'T14A'}/>
            <Route path="T14B(/:id)" component={T14.Container.T14B} tool={'T14B'}/>
            <Route path="T14C(/:id)" component={T14.Container.T14C} tool={'T14C'}/>
            <Route path="T14D(/:id)" component={T14.Container.T14D} tool={'T14D'}/>

            <Route path="T16(/:id)" component={tools.T16}/>
            <Route path="T17(/:id)" component={tools.T17}/>

            <Route path="T18(/:id)" component={T18.Container.Main} tool={'T18'}/>
        </Route>
    </Route>
);

export default routes;
